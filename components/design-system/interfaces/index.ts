// Universal Master Design System - TypeScript Interfaces

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface AdaptiveNavProps {
  items: NavigationItem[];
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  className?: string;
}

export interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  shadow?: boolean;
}

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface StatelessTableProps<T = Record<string, any>> {
  data: T[];
  columns: TableColumn[];
  className?: string;
  hover?: boolean;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'dots';
  className?: string;
  text?: string;
}

export interface MasterShellProps {
  children: React.ReactNode;
  navigation?: React.ReactNode;
  className?: string;
}

export interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface PlatformDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  platform: 'mobile' | 'tablet' | 'desktop';
}
