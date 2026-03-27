import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createAuthRedirectResponse = (
  req: NextRequest,
  redirectPath: string,
  accessToken: string,
  refreshToken: string
) => {
  const response = NextResponse.redirect(new URL(redirectPath, req.url));
  const isSecure = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax" as const,
    path: "/",
  };

  response.cookies.set("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 60 * 60,
  });

  response.cookies.set("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/kakao`;

  if (!code) {
    return NextResponse.redirect(
      new URL(state === "signup" ? "/signup?error=oauth" : "/login?error=oauth", req.url)
    );
  }

  try {
    if (state === "signup") {
      const signUpRes = await fetch(`${API_URL}/oauth/sign-up/kakao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: `user_${Date.now()}`,
          token: code,
          redirectUri,
        }),
      });

      if (signUpRes.ok) {
        const { accessToken, refreshToken } = await signUpRes.json();
        return createAuthRedirectResponse(req, "/", accessToken, refreshToken);
      }

      // 이미 가입된 계정이면 로그인 페이지로
      if (signUpRes.status === 409) {
        return NextResponse.redirect(
          new URL("/login?error=already_registered", req.url)
        );
      }

      return NextResponse.redirect(new URL("/signup?error=oauth", req.url));
    }

    // 로그인 플로우
    const signInRes = await fetch(`${API_URL}/oauth/sign-in/kakao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: code, redirectUri }),
    });

    if (signInRes.ok) {
      const { accessToken, refreshToken } = await signInRes.json();
      return createAuthRedirectResponse(req, "/", accessToken, refreshToken);
    }

    // 미가입 계정 → 회원가입 페이지로 (가이드 기준 404)
    if (signInRes.status === 404) {
      return NextResponse.redirect(
        new URL("/signup?error=not_registered", req.url)
      );
    }

    return NextResponse.redirect(new URL("/login?error=oauth", req.url));
  } catch {
    return NextResponse.redirect(
      new URL(state === "signup" ? "/signup?error=oauth" : "/login?error=oauth", req.url)
    );
  }
}
