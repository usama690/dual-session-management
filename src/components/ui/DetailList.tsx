import React from 'react';
import { cn } from '@/lib/utils';

export interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export const DetailRow: React.FC<DetailRowProps> = ({ 
  label, 
  value, 
  highlight = false,
  className 
}) => {
  return (
    <div
      className={cn(
        'px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6',
        highlight ? 'bg-gray-50' : 'bg-white',
        className
      )}
    >
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
};

export interface DetailListProps {
  children: React.ReactNode;
  className?: string;
}

export const DetailList: React.FC<DetailListProps> = ({ children, className }) => {
  return (
    <div className={cn('border-t border-gray-200', className)}>
      <dl>{children}</dl>
    </div>
  );
};
