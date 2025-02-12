import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center p-12 h-dvh w-dvw bg-purple-secondary">
      {children}
    </div>
  );
}
