"use client";

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { MasterShellProps } from '../interfaces';

export function MasterShell({ 
  children, 
  navigation, 
  className = '' 
}: MasterShellProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <div className={`min-h-screen bg-background text-foreground transition-all duration-500 ${className}`}>
        {/* Navigation Container */}
        {navigation && (
          <div className="relative z-50">
            {navigation}
          </div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

// Export as default for convenience
export default MasterShell;
