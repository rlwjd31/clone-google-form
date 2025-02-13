import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        callback();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

export default useClickOutside;
