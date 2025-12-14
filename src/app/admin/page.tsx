'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, updateSession, getRegisteredUsers } from '@/lib/storage';
import { User, Admin } from '@/types/auth';
import { PageContainer, PageMain } from '@/components/layout/PageContainer';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { UsersTable } from '@/components/features/UsersTable';
import { AdminStats } from '@/components/features/AdminStats';
import { useLogout } from '@/hooks/useLogout';

export default function AdminPage() {
  const router = useRouter();
  const { logout } = useLogout();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = getSession();
    
    if (!storedSession?.admin) {
      router.push('/login');
      return;
    }

    setAdmin(storedSession.admin);
    setImpersonatedUserId(storedSession.user?.id || null);
    
    const registeredUsers = getRegisteredUsers();
    setUsers(registeredUsers);
    setLoading(false);
  }, [router]);

  const handleImpersonate = (user: User) => {
    if (!admin) return;

    updateSession({
      user: {
        ...user,
        isImpersonated: true
      },
      admin: admin
    });

    setImpersonatedUserId(user.id);

    window.open('/user-details', '_blank');

    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <PageContainer className="bg-gradient-to-br from-purple-50 to-pink-100">
      <Navigation
        title="Admin Panel"
        userName={admin?.name}
        onLogout={handleLogout}
        logoutText="Logout"
      />

      <PageMain>
        <div className="space-y-6">
          <Card padding="none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>Manage and impersonate user accounts</CardDescription>
                </div>
                <Badge variant="info">Administrator</Badge>
              </div>
            </CardHeader>
            <UsersTable
              users={users}
              impersonatedUserId={impersonatedUserId}
              onImpersonate={handleImpersonate}
            />
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Information</h3>
            <AdminStats
              totalUsers={users.length}
              adminEmail={admin?.email || ''}
            />
          </Card>
        </div>
      </PageMain>
    </PageContainer>
  );
}
