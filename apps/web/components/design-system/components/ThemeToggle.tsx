"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeToggleProps } from '../interfaces';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'w-8 h-8 p-1.5',
      icon: 'w-4 h-4'
    },
    md: {
      button: 'w-10 h-10 p-2',
      icon: 'w-5 h-5'
    },
    lg: {
      button: 'w-12 h-12 p-2.5',
      icon: 'w-6 h-6'
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('🌓 Theme switching to:', newTheme);
    setTheme(newTheme);
    
    // Reset animation after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!mounted) {
    return (
      <div className={cn(
        'rounded-full bg-muted border border-border',
        sizeConfig[size].button,
        className
      )} />
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'relative rounded-full bg-card border border-border',
        'hover:bg-accent hover:border-accent-foreground/20',
        'active:scale-95 active:bg-accent/80',
        'transition-all duration-500 ease-in-out',
        'shadow-sm hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        'touch-manipulation cursor-pointer',
        sizeConfig[size].button,
        className,
        isAnimating && 'scale-95'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Sun Icon (Light Mode) */}
        <Sun
          className={cn(
            'absolute text-yellow-500 transition-all duration-500',
            sizeConfig[size].icon,
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
          )}
        />
        
        {/* Moon Icon (Dark Mode) */}
        <Moon
          className={cn(
            'absolute text-blue-400 transition-all duration-500',
            sizeConfig[size].icon,
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
          )}
        />
        
        {/* Subtle glow effect */}
        <div 
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r from-yellow-400/20 to-blue-400/20',
            'transition-opacity duration-500',
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </button>
  );
}

// Export as default for convenience
export default ThemeToggle;
