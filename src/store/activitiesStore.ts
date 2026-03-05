import { create } from "zustand";
import {
  Activity,
  SortOption,
  getActivities,
} from "@/src/features/mainpage/activities";

interface ActivitiesState {
  activities: Activity[];
  totalCount: number;
  isLoading: boolean;
  selectedCategory: string | null;
  priceSort: SortOption;

  fetchActivities: (params: { page: number; itemsPerPage?: number }) => Promise<void>;
  setCategory: (category: string | null) => void;
  setPriceSort: (sort: SortOption) => void;
  reset: () => void;
}

export const useActivitiesStore = create<ActivitiesState>((set, get) => ({
  activities: [],
  totalCount: 0,
  isLoading: false,
  selectedCategory: null,
  priceSort: "latest",

  fetchActivities: async ({ page, itemsPerPage = 8 }) => {
    const { selectedCategory, priceSort } = get();
    set({ isLoading: true });
    try {
      const data = await getActivities({
        method: "offset",
        page,
        size: itemsPerPage,
        category: selectedCategory === "전체" ? null : selectedCategory,
        sort: priceSort,
      });
      set({ activities: data.activities, totalCount: data.totalCount });
    } catch (error) {
      console.error("활동 데이터 로드 실패:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setCategory: (category) => set({ selectedCategory: category }),
  setPriceSort: (sort) => set({ priceSort: sort }),
  reset: () => set({ selectedCategory: null, priceSort: "latest" }),
}));
