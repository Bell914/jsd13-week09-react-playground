import { useState, useEffect } from 'react';

/**
 * useWindowSize Hook
 * ตรวจจับความกว้าง-ความสูงของหน้าจอพร้อมคำนวณ Breakpoints
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  let currentBreakpoint = 'Desktop (lg)';
  if (isMobile) currentBreakpoint = 'Mobile (sm)';
  else if (isTablet) currentBreakpoint = 'Tablet (md)';

  return {
    ...windowSize,
    isMobile,
    isTablet,
    isDesktop,
    currentBreakpoint,
  };
}
