import ButtonIcon from "@/components/molecules/ButtonIcon";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const isHomeRoute = location.pathname === "/";

  return (
    <div className="realative flex h-screen w-screen flex-col bg-purple-secondary pb-12 pl-8 pr-24 pt-20">
      {isHomeRoute && (
        <div className="fixed left-0 top-0 z-50 flex h-12 w-screen justify-center bg-card">
          <ButtonIcon
            iconType="preview"
            visibleToolTip
            onClick={() => window.open("/preview", "_blank")}
          />
        </div>
      )}
      <div className="mx-auto w-full max-w-[51rem]">{children}</div>
    </div>
  );
}

//
