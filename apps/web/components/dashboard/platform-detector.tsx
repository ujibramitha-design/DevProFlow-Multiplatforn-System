'use client'

import { useEffect, useState } from 'react'
import { Platform } from './types'

interface PlatformDetectorProps {
  children: (platform: Platform) => React.ReactNode
}

export function PlatformDetector({ children }: PlatformDetectorProps) {
  const [platform, setPlatform] = useState<Platform>('WEB')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Detect platform based on window size and user agent
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /iphone|ipad|android|mobile/.test(userAgent)
      const width = window.innerWidth
      
      // Mobile: < 768px or mobile device
      if (isMobile || width < 768) {
        setPlatform('MOBILE')
      }
      // Desktop: > 1024px or specific desktop indicators
      else if (width >= 1024 || userAgent.includes('windows') || userAgent.includes('macintosh')) {
        setPlatform('DESKTOP')
      }
      // Web: Default fallback
      else {
        setPlatform('WEB')
      }
    }

    detectPlatform()
    window.addEventListener('resize', detectPlatform)
    
    return () => window.removeEventListener('resize', detectPlatform)
  }, [])

  if (!isClient) {
    return <>{children('WEB')}</>
  }

  return <>{children(platform)}</>
}

// Hook for detecting current platform
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('WEB')

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = /iphone|ipad|android|mobile/.test(navigator.userAgent.toLowerCase())

    if (isMobile || width < 768) {
      setPlatform('MOBILE')
    } else if (width >= 1024) {
      setPlatform('DESKTOP')
    } else {
      setPlatform('WEB')
    }
  }, [])

  return platform
}

// Hook for responsive grid columns
export function useGridColumns(): number {
  const platform = usePlatform()
  
  switch (platform) {
    case 'DESKTOP':
      return 12
    case 'WEB':
      return 8
    case 'MOBILE':
      return 4
    default:
      return 8
  }
}
