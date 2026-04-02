// Universal Master Design System - Main Export File

// Core Components
export { MasterShell } from './components/MasterShell';
export { AdaptiveNav } from './components/AdaptiveNav';
export { PremiumCard, PremiumCardHeader, PremiumCardContent, PremiumCardFooter } from './components/PremiumCard';
export { ThemeToggle } from './components/ThemeToggle';
export { StatelessTable, TableContainer } from './components/StatelessTable';
export { EmptyState, TableEmptyState } from './components/EmptyState';
export { LoadingState, TableSkeleton, CardSkeleton } from './components/LoadingState';

// Hooks
export { usePlatformDetection } from './hooks/use-platform-detection';

// Interfaces
export type {
  ThemeConfig,
  NavigationItem,
  AdaptiveNavProps,
  PremiumCardProps,
  ThemeToggleProps,
  TableColumn,
  StatelessTableProps,
  MasterShellProps,
  ResponsiveBreakpoints,
  PlatformDetection,
  EmptyStateProps,
  LoadingStateProps
} from './interfaces';

// Default exports for convenience
export { default as MasterShellDefault } from './components/MasterShell';
export { default as AdaptiveNavDefault } from './components/AdaptiveNav';
export { default as PremiumCardDefault } from './components/PremiumCard';
export { default as ThemeToggleDefault } from './components/ThemeToggle';
export { default as StatelessTableDefault } from './components/StatelessTable';
export { default as EmptyStateDefault } from './components/EmptyState';
export { default as LoadingStateDefault } from './components/LoadingState';
