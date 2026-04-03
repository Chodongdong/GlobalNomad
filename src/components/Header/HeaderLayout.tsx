import { PropsWithChildren } from "react";

export default function HeaderLayout({ children }: PropsWithChildren) {
  return (
    <header className="w-full h-16 bg-surface-dark sticky top-0 z-50 border-b border-white/[0.06]">
      <div className="h-full px-12 flex items-center">{children}</div>
    </header>
  );
}
