import { useEffect, RefObject } from 'react';

export function useOnClickOutside(
  ref:  RefObject<HTMLDivElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || (ref.current as Node).contains(event.target as HTMLElement)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    // document.addEventListener("touchstart", listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      // document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
