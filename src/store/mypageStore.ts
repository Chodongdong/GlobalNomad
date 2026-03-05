import { create } from "zustand";

interface MypageState {
  showMobileContent: boolean;
  setShowMobileContent: (show: boolean) => void;
}

export const useMypageStore = create<MypageState>((set) => ({
  showMobileContent: false,
  setShowMobileContent: (show) => set({ showMobileContent: show }),
}));
