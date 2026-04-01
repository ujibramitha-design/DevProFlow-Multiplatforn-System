"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'dots';
  className?: string;
  text?: string;
}

export function LoadingState({ 
  size = 'md',
  variant = 'spinner',
  className = '',
  text
}: LoadingStateProps) {
  const sizeConfig = {
    sm: {
      spinner: 'w-4 h-4',
      skeleton: 'h-4',
      dots: 'w-1 h-1',
      text: 'text-sm'
    },
    md: {
      spinner: 'w-6 h-6',
      skeleton: 'h-6',
      dots: 'w-2 h-2',
      text: 'text-base'
    },
    lg: {
      spinner: 'w-8 h-8',
      skeleton: 'h-8',
      dots: 'w-3 h-3',
      text: 'text-lg'
    }
  };

  if (variant === 'spinner') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div 
          className={cn(
            'animate-spin rounded-full border-2 border-border border-t-primary',
            sizeConfig[size].spinner
          )}
        />
        {text && (
          <span className={cn('text-muted-foreground', sizeConfig[size].text)}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className={cn(
          'bg-primary rounded-full animate-bounce',
          sizeConfig[size].dots
        )} style={{ animationDelay: '0ms' }} />
        <div className={cn(
          'bg-primary rounded-full animate-bounce',
          sizeConfig[size].dots
        )} style={{ animationDelay: '150ms' }} />
        <div className={cn(
          'bg-primary rounded-full animate-bounce',
          sizeConfig[size].dots
        )} style={{ animationDelay: '300ms' }} />
        {text && (
          <span className={cn('text-muted-foreground ml-3', sizeConfig[size].text)}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Skeleton variant
  return (
    <div className={cn('space-y-3', className)}>
      <div className={cn(
        'bg-muted rounded animate-pulse',
        sizeConfig[size].skeleton
      )} />
      {text && (
        <div className={cn(
          'bg-muted rounded animate-pulse w-3/4',
          sizeConfig[size].skeleton
        )} />
      )}
    </div>
  );
}

// Table skeleton loader
export function TableSkeleton({ 
  rows = 5,
  columns = 4
}: { 
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-border/50">
        {Array.from({ length: columns }).map((_, i) => (
          <div 
            key={`header-${i}`}
            className="bg-muted rounded h-6 animate-pulse flex-1"
          />
        ))}
      </div>
      
      {/* Rows */}
      <div className="py-4 space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={`row-${rowIndex}`}
            className="flex gap-4"
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`}
                className="bg-muted rounded h-4 animate-pulse flex-1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Card skeleton loader
export function CardSkeleton({ 
  lines = 3,
  className = ''
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn(
      'rounded-xl border border-border/50 bg-card p-6 space-y-3',
      className
    )}>
      <div className="bg-muted rounded h-6 w-3/4 animate-pulse" />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div 
          key={i}
          className="bg-muted rounded h-4 animate-pulse" 
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

// Export as default for convenience
export default LoadingState;
