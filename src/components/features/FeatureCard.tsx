import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  info?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  info,
}) => {
  return (
    <Card padding="lg">
      <div className="text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        {info && <div className="mb-6">{info}</div>}

        <div className="space-y-3">
          {primaryAction && (
            <Link href={primaryAction.href} className="block">
              <Button variant="primary" className="w-full">
                {primaryAction.label}
              </Button>
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href} className="block">
              <Button variant="outline" className="w-full">
                {secondaryAction.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};
