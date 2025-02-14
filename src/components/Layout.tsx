import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-purple-secondary p-12">
      <div className="w-full max-w-[51rem]">{children}</div>
    </div>
  );
}
