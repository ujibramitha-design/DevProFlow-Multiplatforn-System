"use client";

import { useState, useEffect } from 'react';
import { PlatformDetection, ResponsiveBreakpoints } from '../interfaces';

const breakpoints: ResponsiveBreakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1024,
};

export function usePlatformDetection(): PlatformDetection {
  const [platform, setPlatform] = useState<PlatformDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    platform: 'desktop',
  });

  useEffect(() => {
    const updatePlatform = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.mobile) {
        setPlatform({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          platform: 'mobile',
        });
      } else if (width < breakpoints.desktop) {
        setPlatform({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          platform: 'tablet',
        });
      } else {
        setPlatform({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          platform: 'desktop',
        });
      }
    };

    updatePlatform();
    window.addEventListener('resize', updatePlatform);
    return () => window.removeEventListener('resize', updatePlatform);
  }, []);

  return platform;
}
