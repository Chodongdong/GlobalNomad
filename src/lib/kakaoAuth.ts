export const getKakaoAuthUrl = (flow: "login" | "signup") => {
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/kakao`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: redirectUri,
    state: flow,
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};
