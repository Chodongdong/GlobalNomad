'use client';

import React from 'react';
import SearchIcon from '@/assets/icon_search.svg';

export type SearchProps = {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function Search({
  title = '무엇을 체험하고 싶으신가요?',
  value,
  onChange,
  onSearch,
  placeholder = '체험을 검색해보세요',
  className = '',
}: SearchProps) {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value.trim());
    }
  };

  const handleSearch = () => {
    onSearch?.(value.trim());
  };

  return (
    <div className={`flex flex-col items-center gap-6 py-8 ${className}`}>
      {title && (
        <h1 className="text-h1 font-bold text-gray-950">
          {title}
        </h1>
      )}

      <div className="flex w-full items-center gap-3 pl-6 pr-2 py-2
                      bg-white border border-gray-200 rounded-2xl
                      shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                      focus-within:border-primary-500 focus-within:shadow-[0_2px_12px_rgba(99,102,241,0.12)]
                      transition-all duration-150">
        <SearchIcon className="w-5 h-5 shrink-0 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full text-gray-950 text-body-lg placeholder:text-gray-400
                     caret-primary-500 focus:placeholder:text-transparent outline-none bg-transparent"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 h-11 px-6 bg-primary-500 hover:bg-primary-600
                     text-white text-body font-semibold rounded-xl
                     transition-colors duration-150 cursor-pointer"
        >
          검색
        </button>
      </div>
    </div>
  );
}
