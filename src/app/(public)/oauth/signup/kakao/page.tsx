import Link from "next/link";
import { redirect } from "next/navigation";

type KakaoOauthCallbackPageProps = {
  searchParams: Promise<{
    code?: string;
    state?: string;
    error?: string;
  }>;
};

export default async function KakaoOauthCallbackPage({
  searchParams,
}: KakaoOauthCallbackPageProps) {
  const { code, state, error } = await searchParams;

  if (error || !code) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-lg font-semibold text-gray-800">카카오 인증 실패</h1>
        <p className="text-sm text-gray-500">
          인증 정보를 확인하지 못했습니다. 다시 시도해 주세요.
        </p>
        <Link className="text-sm text-green-500 underline" href="/login">
          로그인으로 돌아가기
        </Link>
      </main>
    );
  }

  const params = new URLSearchParams();
  params.set("code", code);
  if (state) params.set("state", state);
  redirect(`/api/oauth/kakao?${params.toString()}`);
}
