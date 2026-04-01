"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function EmptyState({ 
  icon,
  title, 
  description,
  action,
  className = '',
  size = 'md'
}: EmptyStateProps) {
  const sizeConfig = {
    sm: {
      container: 'py-8 px-4',
      icon: 'w-8 h-8',
      title: 'text-lg',
      description: 'text-sm'
    },
    md: {
      container: 'py-12 px-6',
      icon: 'w-12 h-12',
      title: 'text-xl',
      description: 'text-base'
    },
    lg: {
      container: 'py-16 px-8',
      icon: 'w-16 h-16',
      title: 'text-2xl',
      description: 'text-lg'
    }
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      'bg-card/50 border border-border/30 rounded-xl',
      sizeConfig[size].container,
      className
    )}>
      {icon && (
        <div className={cn(
          'text-muted-foreground mb-4',
          sizeConfig[size].icon
        )}>
          {icon}
        </div>
      )}
      
      <h3 className={cn(
        'font-semibold text-foreground mb-2',
        sizeConfig[size].title
      )}>
        {title}
      </h3>
      
      {description && (
        <p className={cn(
          'text-muted-foreground mb-6 max-w-md',
          sizeConfig[size].description
        )}>
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}

// Default empty state for data tables
export function TableEmptyState({ 
  message = "No data available",
  description = "There are no items to display at the moment."
}: { 
  message?: string;
  description?: string;
}) {
  return (
    <EmptyState
      title={message}
      description={description}
      size="sm"
      className="my-8"
    />
  );
}

// Export as default for convenience
export default EmptyState;
