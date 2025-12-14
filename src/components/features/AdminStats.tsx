import React from 'react';
import { Card } from '@/components/ui/Card';
import { InfoCard } from '@/components/ui/InfoCard';

export interface AdminStatsProps {
  totalUsers: number;
  adminEmail: string;
}

export const AdminStats: React.FC<AdminStatsProps> = ({ totalUsers, adminEmail }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <InfoCard
        label="Total Users"
        value={totalUsers}
        icon="👥"
      />
      <InfoCard
        label="Admin Email"
        value={adminEmail}
      />
    </div>
  );
};
