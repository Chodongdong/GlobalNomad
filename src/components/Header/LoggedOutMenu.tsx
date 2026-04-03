import Link from "next/link";

export default function LoggedOutMenu() {
  return (
    <div className="flex items-center gap-3">
      <Link
        className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-150"
        href="/login"
      >
        로그인
      </Link>
      <Link
        className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
        href="/signup"
      >
        회원가입
      </Link>
    </div>
  );
}
