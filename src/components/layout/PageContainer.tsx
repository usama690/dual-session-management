import React from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100', className)}>
      {children}
    </div>
  );
};

export const PageMain: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <main className={cn('max-w-7xl mx-auto py-6 sm:px-6 lg:px-8', className)}>
      <div className="px-4 py-6 sm:px-0">{children}</div>
    </main>
  );
};
