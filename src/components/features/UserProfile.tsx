import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { DetailList, DetailRow } from '@/components/ui/DetailList';
import { SessionUser } from '@/types/auth';
import { formatDate } from '@/lib/utils';

export interface UserProfileProps {
  user: SessionUser;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card padding="none">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your account details and information</CardDescription>
      </CardHeader>
      <DetailList>
        <DetailRow label="Full name" value={user.name} highlight />
        <DetailRow label="Email address" value={user.email} />
        <DetailRow label="Phone number" value={user.phone || 'Not provided'} highlight />
        <DetailRow label="Gender" value={<span className="capitalize">{user.gender}</span>} />
        <DetailRow 
          label="Date of Birth" 
          value={user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'} 
          highlight 
        />
      </DetailList>
    </Card>
  );
};
