import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* 큰 숫자 */}
        <div className="relative">
          <span className="text-[160px] font-black leading-none text-primary-100 select-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[160px] font-black leading-none text-primary-500/20 select-none blur-sm">
            404
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-h2 font-bold text-gray-950">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-body-lg text-gray-400">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>

        <Link
          href="/"
          className="mt-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold
                     px-8 py-3 rounded-xl transition-colors duration-150
                     hover:shadow-lg hover:shadow-primary-500/25"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
