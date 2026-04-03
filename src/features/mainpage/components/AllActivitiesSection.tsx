'use client';

import { useEffect } from 'react';
import AllActivitiesList from '@/src/components/Card/AllActivitiesList';
import { Pagination } from '@/src/components/Pagination/Pagination';
import { useActivitiesStore } from '@/src/store/activitiesStore';

interface AllActivitiesSectionProps {
  page: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 8;

export default function AllActivitiesSection({
  page,
  onPageChange,
}: AllActivitiesSectionProps) {
  const { fetchActivities, totalCount, selectedCategory, priceSort } =
    useActivitiesStore();

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchActivities({ page, itemsPerPage: ITEMS_PER_PAGE });
  }, [page, selectedCategory, priceSort]);

  const handleCategoryChange = (category: string | null) => {
    useActivitiesStore.getState().setCategory(category);
    onPageChange(1);
  };

  return (
    <section className="w-full h-241 flex flex-col gap-7.5">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-primary-500 tracking-widest uppercase">
          All Experiences
        </p>
        <h2 className="text-h1 font-bold text-gray-950">모든 체험</h2>
      </div>
      <div>
        <AllActivitiesList onCategoryChange={handleCategoryChange} />
      </div>

      {totalPages > 1 && (
        <div className="mt-7.5 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            maxPageButtons={7}
          />
        </div>
      )}
    </section>
  );
}
