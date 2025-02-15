import ButtonIcon from "@/components/molecules/ButtonIcon";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="realative flex h-screen w-screen flex-col bg-purple-secondary pb-12 pl-8 pr-24 pt-20">
      <div className="fixed left-0 top-0 z-50 flex h-12 w-screen justify-center bg-card">
        <ButtonIcon
          iconType="preview"
          visibleToolTip
          onClick={() => alert("미리보기 모드로 전환합니다.")}
        />
      </div>
      <div className="mx-auto w-full max-w-[51rem]">{children}</div>
    </div>
  );
}

//
