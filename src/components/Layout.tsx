import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-purple-secondary px-16 py-12">
      <div className="mx-auto w-full max-w-[51rem] bg-green-50 ">
        {children}
      </div>
    </div>
  );
}

//
