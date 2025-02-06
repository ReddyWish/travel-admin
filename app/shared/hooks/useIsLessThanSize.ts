import { useEffect, useState } from 'react';
import { WindowSize } from '~/shared/types/WindowSize';

export function useIsLessThanSize(screenSize: WindowSize) {
  const [isLessThanSize, setIsLessThanSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLess =
        window.innerWidth !== null && window.innerWidth <= screenSize;

      if (isLess !== isLessThanSize) {
        setIsLessThanSize(isLess);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLessThanSize, screenSize]);

  return isLessThanSize;
}
