"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ActivityCard from "@/src/components/Card/ActivityCard";
import ArrowRightIcon from "@/src/assets/icon_arrow_right.svg";
import ArrowLeftIcon from "@/src/assets/icon_arrow_left.svg";
import {
  Activity,
  getPopularActivities,
} from "@/src/features/mainpage/activities";
import { useInfiniteScroll } from "@/src/lib/hooks/useInfiniteScroll";

const CARDS_PER_PAGE = 4;
const SCROLL_DURATION_MS = 600;

export default function PopularActivitiesList() {
  const [items, setItems] = useState<Activity[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const remainder = items.length % CARDS_PER_PAGE;
  const emptyCardsCount = remainder === 0 ? 0 : CARDS_PER_PAGE - remainder;
  const totalPages = Math.ceil(items.length / CARDS_PER_PAGE);
  const showLeftBtn = currentPage > 0;
  const showRightBtn = currentPage < totalPages - 1 || hasMore;

  // loadMore가 새 아이템 수를 반환해 handleNextBtn에서 itemsRef 없이 페이지 계산 가능
  const loadMore = useCallback(async (): Promise<number> => {
    if (isLoading || !hasMore) return 0;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getPopularActivities(cursorId, CARDS_PER_PAGE);

      if (result?.activities && result.activities.length > 0) {
        let newLength = 0;
        setItems((prevItems) => {
          const merged = [...prevItems, ...result.activities];
          const map = new Map(merged.map((item) => [item.id, item]));
          const deduped = Array.from(map.values());
          newLength = deduped.length; // setState 콜백 내 동기 실행으로 안전하게 읽기
          return deduped;
        });
        setCursorId(result.cursorId);
        setHasMore(result.cursorId !== null);
        return newLength;
      } else {
        setHasMore(false);
        return items.length;
      }
    } catch {
      setError("데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      return items.length;
    } finally {
      setIsLoading(false);
    }
  }, [cursorId, hasMore, isLoading, items.length]);

  // 초기 로드
  useEffect(() => {
    loadMore();
  }, []);

  // 마지막 페이지 도달 시 미리 다음 데이터 로드
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

  // 무한 스크롤 - 기존 useInfiniteScroll 훅 활용
  const loaderRef = useInfiniteScroll({
    onIntersect: loadMore,
    disabled: !hasMore || isLoading,
  });

  const getPageScrollLeft = (page: number) => {
    if (!scrollRef.current?.firstElementChild) return 0;
    const cardWidth = (scrollRef.current.firstElementChild as HTMLElement)
      .offsetWidth;
    return page * (cardWidth + 16) * CARDS_PER_PAGE;
  };

  const handlePrevBtn = () => {
    if (isScrolling || currentPage === 0) return;
    setIsScrolling(true);

    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    scrollRef.current?.scrollTo({
      left: getPageScrollLeft(prevPage),
      behavior: "smooth",
    });

    setTimeout(() => setIsScrolling(false), SCROLL_DURATION_MS);
  };

  const handleNextBtn = async () => {
    if (isScrolling) return;
    setIsScrolling(true);

    const nextPage = currentPage + 1;
    let newTotalPages = totalPages;

    if (nextPage >= totalPages && hasMore) {
      const newLength = await loadMore();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      newTotalPages = Math.ceil(newLength / CARDS_PER_PAGE);
    }

    const safePage = Math.min(nextPage, newTotalPages - 1);
    setCurrentPage(safePage);
    scrollRef.current?.scrollTo({
      left: getPageScrollLeft(safePage),
      behavior: "smooth",
    });

    setTimeout(() => setIsScrolling(false), SCROLL_DURATION_MS);
  };

  return (
    <div className="relative w-full">
      {/* 왼쪽 화살표 버튼 */}
      {showLeftBtn && (
        <button
          onClick={handlePrevBtn}
          disabled={isScrolling}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-20
                     w-12 h-12 flex items-center justify-center
                     bg-white border border-gray-200 rounded-full shadow-xl
                     hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {error && (
        <p className="text-center text-red-500 py-4 text-sm">{error}</p>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth py-3"
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[calc(25%-12px)]">
            <ActivityCard {...item} />
          </div>
        ))}

        {/* 비어 있는 카드 영역 */}
        {emptyCardsCount > 0 &&
          Array.from({ length: emptyCardsCount }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex-shrink-0 w-[calc(25%-12px)]"
              aria-hidden="true"
            />
          ))}

        {/* 무한 스크롤 감지 타겟 */}
        <div ref={loaderRef} className="flex-shrink-0" />
      </div>

      {/* 오른쪽 화살표 버튼 */}
      {showRightBtn && (
        <button
          onClick={handleNextBtn}
          disabled={isScrolling}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-20
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
