import React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'warning' | 'success' | 'info';
  className?: string;
}

const alertVariants = {
  error: 'bg-red-50 border-red-200 text-red-600',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-600',
  success: 'bg-green-50 border-green-200 text-green-600',
  info: 'bg-blue-50 border-blue-200 text-blue-600',
};

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'info', 
  className 
}) => {
  return (
    <div
      className={cn(
        'border px-4 py-3 rounded-md',
        alertVariants[variant],
        className
      )}
      role="alert"
    >
      {children}
    </div>
  );
};
