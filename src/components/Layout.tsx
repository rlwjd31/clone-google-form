import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-screen h-screen py-12 pl-8 pr-24 bg-purple-secondary">
      <div className="mx-auto w-full max-w-[51rem]">{children}</div>
    </div>
  );
}

//
