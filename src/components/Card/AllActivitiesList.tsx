'use client';

import ActivityCard from '@/src/components/Card/ActivityCard';
import PriceSortDropdown from '@/src/components/Dropdown/PriceSortDropdown';
import CategoryFilter from '@/src/components/Card/CategoryFilter';
import { useActivitiesStore } from '@/src/store/activitiesStore';

const CATEGORIES = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

interface AllActivitiesListProps {
  onCategoryChange: (category: string | null) => void;
}

export default function AllActivitiesList({ onCategoryChange }: AllActivitiesListProps) {
  const { activities, selectedCategory, setPriceSort } = useActivitiesStore();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={onCategoryChange}
          />
        </div>

        <div className="flex items-center flex-end">
          <PriceSortDropdown
            value={'price_asc'}
            onChange={setPriceSort}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-6 gap-y-[30px]">
        {activities.map((item) => (
          <ActivityCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
