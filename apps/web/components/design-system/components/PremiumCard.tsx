"use client";

import React from 'react';
import { PremiumCardProps } from '../interfaces';
import { cn } from '@/lib/utils';

export function PremiumCard({ 
  children, 
  className = '', 
  hover = true,
  glassmorphism = false,
  padding = 'md',
  border = true,
  shadow = true
}: PremiumCardProps) {
  // Padding configurations
  const paddingConfig = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-300 group',
        'bg-card text-card-foreground',
        paddingConfig[padding],
        
        // Border styles
        border && 'border border-border/50',
        
        // Shadow styles
        shadow && 'shadow-sm',
        
        // Glassmorphism effect
        glassmorphism && [
          'bg-card/60 backdrop-blur-md',
          'border-border/30',
          'shadow-lg shadow-black/5'
        ],
        
        // Hover effects
        hover && [
          'hover:shadow-lg hover:shadow-black/10',
          'hover:border-border/70',
          'hover:-translate-y-0.5',
          'dark:hover:shadow-black/20'
        ],
        
        // Touch-friendly for mobile
        'touch-manipulation',
        
        className
      )}
    >
      {/* Subtle gradient overlay for premium feel */}
      <div 
        className={cn(
          'absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent',
          'pointer-events-none opacity-0 transition-opacity duration-300 z-10',
          'group-hover:opacity-100'
        )}
      />
      
      {/* Card content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

// Premium Card with Header variant
export function PremiumCardHeader({ 
  title, 
  description, 
  action,
  className = '' 
}: { 
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between mb-6', className)}>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0 ml-4">
          {action}
        </div>
      )}
    </div>
  );
}

// Premium Card Content variant
export function PremiumCardContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

// Premium Card Footer variant
export function PremiumCardFooter({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex items-center justify-between pt-4 mt-4',
      'border-t border-border/50',
      className
    )}>
      {children}
    </div>
  );
}

// Export as default for convenience
export default PremiumCard;
