"use client";

import { useEffect } from 'react';

export function PrelineInit() {
  useEffect(() => {
    // Import Preline dynamically only on client side
    if (typeof window !== 'undefined') {
      import('preline').then((preline) => {
        // Initialize Preline components
        preline.HSStaticMethods.autoInit();
      }).catch((error) => {
        console.warn('Preline initialization failed:', error);
      });
    }

    // Cleanup on unmount
    return () => {
      // Preline cleanup if needed
    };
  }, []);

  return null;
}

// Hook for manual initialization
export function usePreline() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('preline').then((preline) => {
        preline.HSStaticMethods.autoInit();
      }).catch((error) => {
        console.warn('Preline initialization failed:', error);
      });
    }
  }, []);
}

// Re-export main Preline components for convenience
export { default as Preline } from 'preline';
