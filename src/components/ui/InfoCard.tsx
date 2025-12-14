import React from 'react';
import { cn } from '@/lib/utils';

export interface InfoCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ label, value, icon, className }) => {
  return (
    <div className={cn('bg-white p-6 rounded-lg shadow-md', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {icon && <div className="text-3xl text-indigo-600">{icon}</div>}
      </div>
    </div>
  );
};
