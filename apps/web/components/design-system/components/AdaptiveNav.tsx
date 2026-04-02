"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AdaptiveNavProps, NavigationItem } from '../interfaces';
import { usePlatformDetection } from '../hooks/use-platform-detection';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

export function AdaptiveNav({ 
  items, 
  collapsed = false, 
  onCollapseChange,
  className = '' 
}: AdaptiveNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const pathname = usePathname();
  const router = useRouter();
  const { isDesktop, isMobile } = usePlatformDetection();

  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
    console.log('🔄 Sidebar collapsed:', newCollapsed);
  };

  const handleNavigation = (item: NavigationItem) => {
    if (item.href) {
      console.log('🧭 Navigating to:', item.href, item.label);
      router.push(item.href);
    }
  };

  const isActive = (item: NavigationItem) => {
    if (!item.href) return false;
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  // Desktop Sidebar
  if (isDesktop) {
    return (
      <aside
        className={cn(
          'relative flex h-screen flex-col border-r border-border',
          'bg-card/80 backdrop-blur-lg',
          'transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16' : 'w-64',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DS</span>
              </div>
              <span className="font-semibold text-foreground">Design System</span>
            </div>
          )}
          
          <button
            onClick={handleCollapseToggle}
            className={cn(
              'p-2 rounded-lg hover:bg-accent transition-colors',
              'touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                    'transition-all duration-200 touch-manipulation min-h-[44px]',
                    'hover:bg-accent hover:text-accent-foreground',
                    'active:scale-95 active:bg-accent/80',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    active 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground',
                    item.disabled && 'opacity-50 cursor-not-allowed',
                    isCollapsed && 'justify-center px-2'
                  )}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          'px-2 py-0.5 text-xs rounded-full',
                          active 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <div className={cn(
            'flex items-center gap-3',
            isCollapsed && 'justify-center'
          )}>
            <ThemeToggle size="sm" />
            {!isCollapsed && (
              <span className="text-sm text-muted-foreground">Theme</span>
            )}
          </div>
        </div>
      </aside>
    );
  }

  // Mobile Bottom Navigation + Hamburger Menu
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="grid grid-cols-5 gap-1 p-2">
          {items.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                disabled={item.disabled}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-1 rounded-lg',
                  'transition-all duration-200 touch-manipulation min-h-[60px]',
                  'hover:bg-accent hover:text-accent-foreground',
                  'active:scale-95 active:bg-accent/80',
                  'cursor-pointer',
                  active 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate max-w-full">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </button>
            );
          })}
          
          {/* More Items Button - hanya jika ada lebih dari 5 items */}
          {items.length > 5 && (
            <button
              className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg opacity-50 cursor-not-allowed"
              disabled
              aria-label="More navigation items (disabled)"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">More</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// Export as default for convenience
export default AdaptiveNav;
