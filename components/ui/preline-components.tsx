"use client";

import React from 'react';
import { usePreline } from './preline-init';

// Preline Dropdown Component
export interface PrelineDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export function PrelineDropdown({ trigger, children, className = '', placement = 'bottom-left' }: PrelineDropdownProps) {
  usePreline();

  return (
    <div className={`hs-dropdown relative inline-flex ${className}`} data-hs-dropdown-placement={placement}>
      {trigger}
      <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 hs-dropdown-open:mt-1 hidden opacity-0 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700">
        {children}
      </div>
    </div>
  );
}

// Preline Modal Component
export interface PrelineModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PrelineModal({ trigger, children, title, size = 'md', className = '' }: PrelineModalProps) {
  usePreline();

  const sizeClasses = {
    sm: 'max-w-lg',
    md: 'max-w-2xl', 
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <>
      {trigger}
      <div id={`preline-modal-${Math.random().toString(36).substr(2, 9)}`} className="hs-overlay hidden fixed top-0 start-0 z-[80] w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            {title && (
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
              </div>
            )}
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Preline Accordion Component
export interface PrelineAccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
}

export interface PrelineAccordionProps {
  items: PrelineAccordionItem[];
  className?: string;
  alwaysOpen?: boolean;
}

export function PrelineAccordion({ items, className = '', alwaysOpen = false }: PrelineAccordionProps) {
  usePreline();

  return (
    <div className={`hs-accordion-group ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={`hs-accordion ${item.open ? 'hs-accordion-active' : ''}`}
          id={`preline-accordion-${index}`}
        >
          <button 
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start py-4 px-5 inline-flex items-center gap-x-3 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition-colors dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-white dark:hover:bg-gray-700 dark:hs-accordion-active:text-white dark:hs-accordion-active:hover:bg-transparent"
            data-hs-accordion={`#preline-accordion-content-${index}`}
            aria-controls={`preline-accordion-content-${index}`}
          >
            {item.title}
            <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
            <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
          <div 
            id={`preline-accordion-content-${index}`}
            className={`hs-accordion-content ${item.open ? 'block' : 'hidden'} w-full overflow-hidden transition-[height] duration-300`}
            aria-labelledby={`preline-accordion-${index}`}
          >
            <div className="pb-4 px-5 text-sm text-gray-600 dark:text-gray-400">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Preline Tooltip Component
export interface PrelineTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  className?: string;
}

export function PrelineTooltip({ content, children, placement = 'top', trigger = 'hover', className = '' }: PrelineTooltipProps) {
  usePreline();

  return (
    <div className={`hs-tooltip inline-block ${className}`}>
      {children}
      <div 
        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs text-white rounded-lg dark:bg-gray-700"
        data-hs-tooltip-position={placement}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}

// Preline Tabs Component
export interface PrelineTabItem {
  label: React.ReactNode;
  content: React.ReactNode;
  active?: boolean;
}

export interface PrelineTabsProps {
  items: PrelineTabItem[];
  className?: string;
  vertical?: boolean;
}

export function PrelineTabs({ items, className = '', vertical = false }: PrelineTabsProps) {
  usePreline();

  const orientation = vertical ? 'vertical' : 'horizontal';
  const tabListClass = vertical 
    ? 'flex flex-col gap-y-2' 
    : 'flex flex-wrap gap-x-2';

  return (
    <div className={`hs-tabs ${className}`}>
      <div className={tabListClass}>
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`hs-tab-active:bg-blue-600 hs-tab-active:text-white hs-tab-active:dark:bg-gray-700 hs-tab-active:dark:text-white py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium text-center text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 ${item.active ? 'bg-blue-600 text-white' : ''}`}
            data-hs-tab={`#preline-tab-${index}`}
            aria-controls={`preline-tab-${index}`}
            role="tab"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>
        {items.map((item, index) => (
          <div
            key={index}
            id={`preline-tab-${index}`}
            className={`hs-tab-content ${item.active ? 'block' : 'hidden'}`}
            role="tabpanel"
            aria-labelledby={`preline-tab-${index}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
