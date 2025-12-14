import React from 'react';
import { User } from '@/types/auth';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';

export interface UsersTableProps {
  users: User[];
  impersonatedUserId: string | null;
  onImpersonate: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  impersonatedUserId,
  onImpersonate,
}) => {
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => (
        <div className="text-sm font-medium text-gray-900">{user.name}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (user) => (
        <div className="text-sm text-gray-900">{user.email}</div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (user) => (
        <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
      ),
    },
    {
      key: 'gender',
      header: 'Gender',
      render: (user) => (
        <div className="text-sm text-gray-500 capitalize">{user.gender}</div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user) => (
        <Button
          size="sm"
          variant={impersonatedUserId === user.id ? 'secondary' : 'primary'}
          onClick={() => onImpersonate(user)}
        >
          {impersonatedUserId === user.id ? 'Impersonated' : 'Impersonate Login'}
        </Button>
      ),
      className: 'text-sm font-medium',
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      emptyMessage="No users registered yet. Users can register at /signup"
    />
  );
};
