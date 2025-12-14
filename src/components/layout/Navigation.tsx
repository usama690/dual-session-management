import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface NavigationProps {
  title: string;
  userName?: string;
  isImpersonated?: boolean;
  onLogout: () => void;
  logoutText?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  title,
  userName,
  isImpersonated = false,
  onLogout,
  logoutText = 'Logout',
}) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {isImpersonated && (
              <Badge variant="warning">Impersonated Session</Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {userName && (
              <span className="text-sm text-gray-700">Welcome, {userName}</span>
            )}
            <Button
              variant="danger"
              size="sm"
              onClick={onLogout}
            >
              {logoutText}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
