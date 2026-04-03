import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function requireApiUrl() {
  if (!API_URL) {
    return NextResponse.json(
      { message: 'NEXT_PUBLIC_API_URL이 설정되지 않았습니다.' },
      { status: 500 }
    );
  }
  return null;
}

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value ?? null;
}

// GET /api/activities?...
export async function GET(req: NextRequest) {
  const apiErr = requireApiUrl();
  if (apiErr) return apiErr;

  const url = new URL(req.url);
  const backendUrl = new URL(`${API_URL}/activities`);
  url.searchParams.forEach((v, k) => backendUrl.searchParams.set(k, v));

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      cache: 'no-store',
    });

    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  } catch (error) {
    console.error('GET /api/activities error:', error);
    return NextResponse.json(
      { message: '체험 목록을 불러오지 못했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/activities
export async function POST(req: NextRequest) {
  const apiErr = requireApiUrl();
  if (apiErr) return apiErr;

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const res = await fetch(`${API_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  } catch (error) {
    console.error('POST /api/activities error:', error);
    return NextResponse.json(
      { message: '체험 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
}
