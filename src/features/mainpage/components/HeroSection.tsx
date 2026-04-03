'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowLeftIcon from '@/src/assets/icon_arrow_left.svg';
import ArrowRightIcon from '@/src/assets/icon_arrow_right.svg';
import { Activity, getActivities } from '@/src/features/mainpage/activities';

const SLIDE_INTERVAL = 5000;

function HeroFallback() {
  return (
    <section className="relative mx-auto mb-12">
      <div className="w-full h-120 rounded-2xl overflow-hidden relative bg-[#0F172A]">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-950/80 to-[#0F172A]" />
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col gap-2">
          <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase">
            이달의 추천 체험
          </p>
          <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">
            특별한 순간을 만드는<br />로컬 체험을 찾아보세요
          </h1>
          <p className="text-white/60 text-base mt-1">
            전 세계 가이드와 함께하는 잊을 수 없는 여행
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  const [slides, setSlides] = useState<Activity[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getActivities({ method: 'offset', page: 1, size: 20, sort: 'most_reviewed' })
      .then((res) => {
        const sorted = res.activities
          .filter((a) => a.bannerImageUrl && a.rating !== undefined)
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 6);
        if (sorted.length > 0) setSlides(sorted);
      })
      .catch(() => {});
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // current가 바뀔 때마다 타이머 리셋 → 수동 이동 후에도 5초 유지
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [current, slides.length, goNext]);

  if (slides.length === 0) return <HeroFallback />;

  const slide = slides[current];

  return (
    <section className="relative mx-auto mb-12">
      <div className="w-full h-120 rounded-2xl overflow-hidden relative group/hero">

        {/* 슬라이드 이미지 */}
        {slides.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.bannerImageUrl!}
              alt={item.title}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        ))}

        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* 좌측 화살표 */}
        {slides.length > 1 && (
          <button
            onClick={goPrev}
            aria-label="이전 슬라이드"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 flex items-center justify-center
                       bg-black/30 hover:bg-black/50 backdrop-blur-sm
                       rounded-full border border-white/20
                       opacity-0 group-hover/hero:opacity-100
                       transition-all duration-200 cursor-pointer"
          >
            <ArrowLeftIcon className="w-5 h-5 brightness-0 invert" />
          </button>
        )}

        {/* 우측 화살표 */}
        {slides.length > 1 && (
          <button
            onClick={goNext}
            aria-label="다음 슬라이드"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 flex items-center justify-center
                       bg-black/30 hover:bg-black/50 backdrop-blur-sm
                       rounded-full border border-white/20
                       opacity-0 group-hover/hero:opacity-100
                       transition-all duration-200 cursor-pointer"
          >
            <ArrowRightIcon className="w-5 h-5 brightness-0 invert" />
          </button>
        )}

        {/* 하단 콘텐츠 */}
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-8 flex flex-col gap-2.5">
          <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase">
            이달의 추천 체험
          </p>

          <Link href={`/activities/${slide.id}`} className="group/title">
            <h1 className="text-white text-4xl font-bold leading-tight tracking-tight
                           group-hover/title:text-white/80 transition-colors line-clamp-2">
              {slide.title}
            </h1>
          </Link>

          <div className="flex items-center gap-3 mt-1">
            <span className="text-white/60 text-sm">
              ₩{slide.price.toLocaleString()} / 인
            </span>
            {slide.rating !== undefined && (
              <span className="text-white/60 text-sm">
                ★ {slide.rating.toFixed(1)}
              </span>
            )}

            {/* 슬라이드 점 인디케이터 */}
            <div className="ml-auto flex gap-1.5 items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`슬라이드 ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
                    ${i === current
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
