"use client";

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import { LoadingState } from '@/components/design-system';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('🔒 User not authenticated, redirecting to login...');
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState 
          variant="spinner" 
          text="Authenticating..." 
          size="lg" 
        />
      </div>
    );
  }

  // Show fallback or nothing while redirecting
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState 
          variant="dots" 
          text="Redirecting to login..." 
          size="md" 
        />
      </div>
    );
  }

  // User is authenticated, show children
  return <>{children}</>;
}

// Higher-order component for protecting pages
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
