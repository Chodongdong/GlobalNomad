'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        {/* 아이콘 */}
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 3L29 27H3L16 3Z"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
            <line x1="16" y1="13" x2="16" y2="19" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="23" r="1.2" fill="#EF4444" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-h2 font-bold text-gray-950">
            문제가 발생했습니다
          </h1>
          <p className="text-body-lg text-gray-400">
            일시적인 오류입니다. 잠시 후 다시 시도해 주세요.
          </p>
          {error.digest && (
            <p className="text-body text-gray-300 font-mono mt-1">
              {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold
                       px-6 py-3 rounded-xl transition-colors duration-150
                       hover:shadow-lg hover:shadow-primary-500/25"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold
                       px-6 py-3 rounded-xl border border-gray-200
                       transition-colors duration-150"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
