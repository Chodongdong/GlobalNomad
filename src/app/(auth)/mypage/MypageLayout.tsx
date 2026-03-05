"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SideMenu from "@/src/components/SideMenu/SideMenu";
import { useUserStore } from "@/src/store/userStore";
import { useMypageStore } from "@/src/store/mypageStore";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userData, isLoading, fetchUser, updateProfileImage } = useUserStore();
  const { showMobileContent, setShowMobileContent } = useMypageStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleProfileEdit = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        await updateProfileImage(file);
        router.refresh();
        alert("프로필 이미지가 변경되었습니다.");
      } catch {
        alert("이미지 변경에 실패했습니다.");
      }
    };
    input.click();
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-[calc(100vh-160px)] py-6">
        <div className="w-full max-w-245 mx-auto px-6 h-full">
          <div className="flex gap-14 h-full">
            <aside
              className={`w-65 shrink-0 ${
                showMobileContent ? "hidden md:block" : "block"
              }`}
            >
              <SideMenu
                profileImageUrl={userData?.profileImageUrl}
                onProfileEdit={handleProfileEdit}
                onMenuClick={() => setShowMobileContent(true)}
                showMobileContent={showMobileContent}
              />
            </aside>

            <section
              className="
                flex-1 min-w-0
                overflow-y-auto
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
                pb-6
              "
            >
              {children}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
