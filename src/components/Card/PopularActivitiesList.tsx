"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ActivityCard from "@/src/components/Card/ActivityCard";
import ArrowRightIcon from "@/src/assets/icon_arrow_right.svg";
import ArrowLeftIcon from "@/src/assets/icon_arrow_left.svg";
import {
  Activity,
  getPopularActivities,
} from "@/src/features/mainpage/activities";

export default function PopularActivitiesList() {
  const [items, setItems] = useState<Activity[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  // async 함수 내 클로저에서 최신 items에 접근하기 위한 ref
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // 마지막 카드 그룹 빈 영역을 채우기 위한 카드 개수 계산
  const remainder = items.length % 4;
  const emptyCardsCount = remainder === 0 ? 0 : 4 - remainder;

  const totalPages = Math.ceil(items.length / 4);
  const showLeftBtn = currentPage > 0;
  const showRightBtn = currentPage < totalPages - 1 || hasMore;

  // 데이터 로드 함수
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const result = await getPopularActivities(cursorId, 4);

      if (result?.activities && result.activities.length > 0) {
        setItems((prevItems) => {
          const merged = [...prevItems, ...result.activities];
          const map = new Map(merged.map((item) => [item.id, item]));
          return Array.from(map.values());
        });
        setCursorId(result.cursorId);
        setHasMore(result.cursorId !== null);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cursorId, hasMore, isLoading]);

  // 마지막 요소가 보이면 로드 - 모바일
  useEffect(() => {
    loadMore();
  }, []);

  // 마지막 로드된 페이지에 도달하면 미리 다음 데이터 로드
  useEffect(() => {
    if (
      currentPage > 0 &&
      currentPage === totalPages - 1 &&
      hasMore &&
      !isLoading
    ) {
      loadMore();
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // 페이지 인덱스 기반 절대 스크롤 위치 계산
  const getPageScrollLeft = (page: number) => {
    if (!scrollRef.current?.firstElementChild) return 0;
    const cardWidth = (scrollRef.current.firstElementChild as HTMLElement)
      .offsetWidth;
    return page * (cardWidth + 16) * 4;
  };

  // 왼쪽 화살표 버튼 - 이전으로 이동
  const handlePrevBtn = () => {
    if (isScrolling || currentPage === 0) return;
    setIsScrolling(true);

    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    scrollRef.current?.scrollTo({
      left: getPageScrollLeft(prevPage),
      behavior: "smooth",
    });

    setTimeout(() => setIsScrolling(false), 600);
  };

  // 오른쪽 화살표 버튼 - 다음으로 이동
  const handleNextBtn = async () => {
    if (isScrolling) return;
    setIsScrolling(true);

    const nextPage = currentPage + 1;

    if (nextPage >= totalPages && hasMore) {
      await loadMore();
      // DOM 렌더링 완료 후 카드 너비 계산
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }

    // loadMore 이후 실제 items 기준으로 유효 페이지 범위 확인
    const newTotalPages = Math.ceil(itemsRef.current.length / 4);
    const safePage = Math.min(nextPage, newTotalPages - 1);

    setCurrentPage(safePage);
    scrollRef.current?.scrollTo({
      left: getPageScrollLeft(safePage),
      behavior: "smooth",
    });

    setTimeout(() => setIsScrolling(false), 600);
  };

  return (
    <div className="relative w-full">
      {/* 왼쪽 화살표 버튼 */}
      {showLeftBtn && (
        <button
          onClick={handlePrevBtn}
          disabled={isScrolling}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20
                     w-12 h-12 flex items-center justify-center
                     bg-white border border-gray-200 rounded-full shadow-xl
                     hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth"
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[calc(25%-12px)]">
            <ActivityCard {...item} />
          </div>
        ))}

        {/* 비어 있는 카드 영역 생성 */}
        {emptyCardsCount > 0 &&
          Array.from({ length: emptyCardsCount }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex-shrink-0 w-[calc(25%-12px)]"
              aria-hidden="true"
            />
          ))}

        {/* 무한 스크롤 감지를 위한 타겟 요소 */}
        <div ref={loaderRef} className="flex-shrink-0" />
      </div>

      {/* 오른쪽 화살표 버튼 */}
      {showRightBtn && (
        <button
          onClick={handleNextBtn}
          disabled={isScrolling}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20
                     w-12 h-12 flex items-center justify-center
                     bg-white border border-gray-200 rounded-full shadow-xl
                     hover:bg-gray-50 cursor-pointer"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  );
}
