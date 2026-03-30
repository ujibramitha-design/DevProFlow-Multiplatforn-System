"use client";

import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { StatelessTableProps, TableColumn } from '../interfaces';
import { cn } from '@/lib/utils';

export function StatelessTable<T = Record<string, any>>({
  data,
  columns,
  className = '',
  hover = true,
  striped = false,
  bordered = true,
  compact = false,
  onRowClick,
  emptyMessage = 'No data available'
}: StatelessTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (column: TableColumn) => {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === column.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: column.key, direction });
    console.log('📊 Table sorted by:', column.key, direction);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, any>)[sortConfig.key];
      const bValue = (b as Record<string, any>)[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (column: TableColumn) => {
    if (!column.sortable) return null;

    if (sortConfig?.key === column.key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      );
    }

    return <ArrowUpDown className="w-4 h-4 opacity-50" />;
  };

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (data.length === 0) {
    return (
      <div className={cn(
        'rounded-lg border border-border/50 bg-card',
        'p-8 text-center',
        className
      )}>
        <div className="text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className={cn(
              'border-b border-border/50',
              'bg-muted/30'
            )}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 font-medium text-foreground text-sm',
                    'transition-colors duration-200',
                    getAlignmentClass(column.align),
                    column.sortable && 'cursor-pointer touch-manipulation hover:bg-accent/50',
                    column.sortable && 'active:scale-95 active:bg-accent/80',
                    compact && 'px-3 py-2'
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className={cn(
                    'flex items-center gap-2',
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    <span>{column.label}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-border/30',
                  'transition-colors duration-200',
                  hover && 'hover:bg-accent/50',
                  striped && rowIndex % 2 === 1 && 'bg-muted/20',
                  onRowClick && 'cursor-pointer touch-manipulation active:scale-98 active:bg-accent/70',
                  compact && 'text-sm'
                )}
                onClick={() => {
    console.log('📝 Row clicked:', row, 'Index:', rowIndex);
    onRowClick?.(row, rowIndex);
  }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-foreground',
                      'transition-colors duration-200',
                      getAlignmentClass(column.align),
                      compact && 'px-3 py-2'
                    )}
                  >
                    {(row as Record<string, any>)[column.key] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer with row count */}
      <div className={cn(
        'px-4 py-2 text-xs text-muted-foreground',
        'border-t border-border/30',
        'bg-muted/20'
      )}>
        {data.length} {data.length === 1 ? 'row' : 'rows'} total
      </div>
    </div>
  );
}

// Table Container for better responsive behavior
export function TableContainer({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      'rounded-lg border border-border/50 bg-card overflow-hidden',
      className
    )}>
      {children}
    </div>
  );
}

// Export as default for convenience
export default StatelessTable;
