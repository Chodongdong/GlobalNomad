# Roami

**Roami는 하나의 계정으로 판매자와 체험자 역할을 모두 수행할 수 있는 로컬 체험 예약 플랫폼입니다.**

> GlobalNomad 팀 프로젝트를 기반으로 리브랜딩 및 리디자인한 개인 포크 버전입니다.

---

## ✨ 주요 기능

- **체험 탐색** — 평점순 추천 체험 슬라이드쇼, 카테고리/가격 필터, 키워드 검색
- **체험 예약** — 날짜·인원 선택 후 실시간 예약
- **체험 등록 및 관리** — 판매자로서 체험 CRUD, 예약 현황 대시보드
- **마이페이지** — 예약 내역, 리뷰 작성, 프로필 수정
- **인증** — 이메일 로그인 / 카카오 소셜 로그인
- **알림** — 예약 상태 변경 실시간 알림

---

## 🛠 기술 스택

### 프레임워크 & 언어

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

| 기술       | 버전 | 용도                                          |
| ---------- | ---- | --------------------------------------------- |
| Next.js    | 16   | App Router, Route Handlers, Server Components |
| React      | 19   | UI 구성                                       |
| TypeScript | 5    | 정적 타입 검사                                |

### 스타일링

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- **Tailwind CSS 4** — 유틸리티 퍼스트 CSS
- **Pretendard** — 한국어 최적화 폰트

### 상태 관리

- **Zustand 5** — 클라이언트 상태 관리
  - `userStore` — 유저 프로필
  - `mypageStore` — 마이페이지 UI 상태
  - `activitiesStore` — 활동 목록/필터

### 개발 도구

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

- ESLint 9, Prettier, Husky + commitlint

---

## 🎨 디자인 시스템

| 항목       | 값                    |
| ---------- | --------------------- |
| Primary    | `#6366F1` (Indigo)    |
| Background | `#F5F6FF`             |
| Header     | `#0F172A` (Dark Navy) |
| Font       | Pretendard (500, 700) |

---

## 📂 디렉토리 구조

```
src/
├── app/
│   ├── (auth)/               # 인증 필요 라우트
│   │   ├── activities/       # 체험 등록·수정
│   │   ├── mypage/           # 마이페이지
│   │   ├── loading.tsx       # 로딩 UI
│   │   └── layout.tsx        # 헤더·푸터 포함 레이아웃
│   ├── (public)/             # 비인증 라우트
│   │   ├── login/
│   │   ├── signup/
│   │   └── oauth/
│   ├── activities/           # 체험 상세
│   ├── api/                  # Route Handlers
│   ├── error.tsx             # 글로벌 에러 페이지
│   ├── not-found.tsx         # 404 페이지
│   └── layout.tsx
├── components/               # 공통 UI 컴포넌트
│   ├── Button/
│   ├── Card/
│   ├── Dropdown/
│   ├── Header/
│   ├── Footer/
│   ├── Input/
│   ├── Modal/
│   ├── Notification/
│   ├── Pagination/
│   ├── Search/
│   └── SideMenu/
├── features/                 # 기능별 모듈
│   ├── ActivityCreate/
│   ├── mainpage/
│   ├── mypage/
│   └── notification/
├── store/                    # Zustand 스토어
│   ├── userStore.ts
│   ├── mypageStore.ts
│   └── activitiesStore.ts
├── lib/
│   ├── api/                  # fetch 유틸 (authFetch, serverAuthFetch)
│   ├── hooks/
│   └── server/
├── styles/
│   ├── theme.css             # 디자인 토큰
│   └── fonts.css
└── types/
```

---

## 🚀 로컬 실행

### 사전 요구사항

- Node.js 18+
- pnpm 10+

### 설치 및 실행

```bash
# 1. 클론
git clone https://github.com/Chodongdong/GlobalNomad.git
cd GlobalNomad

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일에 아래 값 입력
```

```bash
# 4. 개발 서버 실행
pnpm dev
```

### 스크립트

```bash
pnpm dev        # 개발 서버
pnpm build      # 프로덕션 빌드
pnpm start      # 프로덕션 서버
pnpm lint       # ESLint 검사
```

---
