import { create } from "zustand";
import {
  getMyProfile,
  uploadProfileImage,
  updateMyProfile,
  UserProfile,
} from "@/src/features/mypage/services/userService";

interface UserState {
  userData: UserProfile | null;
  isLoading: boolean;

  fetchUser: () => Promise<void>;
  updateProfileImage: (file: File) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  isLoading: false,

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const data = await getMyProfile();
      // 브라우저 캐시 방지용 타임스탬프
      if (data?.profileImageUrl) {
        data.profileImageUrl = `${data.profileImageUrl}?v=${Date.now()}`;
      }
      set({ userData: data });
    } catch (error) {
      console.error("사용자 정보 로드 실패:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfileImage: async (file: File) => {
    const uploadRes = await uploadProfileImage(file);
    await updateMyProfile({ profileImageUrl: uploadRes.profileImageUrl });
    // 업로드 후 최신 프로필 다시 fetch
    const data = await getMyProfile();
    if (data?.profileImageUrl) {
      data.profileImageUrl = `${data.profileImageUrl}?v=${Date.now()}`;
    }
    set({ userData: data });
  },
}));
