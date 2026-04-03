import Link from 'next/link';
import Image from 'next/image';
import DefaultThumbnail from '@/assets/activity-default-thumbnail.svg';
import StarIcon from '@/assets/icon_star.svg';

export interface ActivityCardProps {
  id: number;
  title: string;
  rating?: number;
  reviewCount?: number;
  price: number;
  bannerImageUrl?: string;
}

export default function ActivityCard({
  id,
  title,
  rating = 0,
  reviewCount = 0,
  price = 0,
  bannerImageUrl,
}: ActivityCardProps) {
  return (
    <Link href={`/activities/${id}`} className="block group">
      <div className="rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-shadow duration-300">

        {/* 이미지 영역 */}
        <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
          {bannerImageUrl ? (
            <Image
              src={bannerImageUrl}
              alt={`${title} 체험 썸네일 이미지`}
              fill
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 332px"
            />
          ) : (
            <DefaultThumbnail
              aria-label="체험 썸네일 이미지"
              className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              preserveAspectRatio="xMidYMid slice"
            />
          )}

          {/* 평점 배지 */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
            <StarIcon className="w-3 h-3" />
            <span className="text-white text-xs font-semibold leading-none">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="px-5 py-4 flex flex-col gap-2.5">
          <h3 className="font-bold text-gray-950 text-[15px] leading-snug line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">
              리뷰 {reviewCount.toLocaleString()}개
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-gray-950 text-[15px]">
                ₩{price.toLocaleString()}
              </span>
              <span className="text-gray-400 text-xs">/ 인</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
