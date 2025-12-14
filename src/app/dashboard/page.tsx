'use client';

import { UserProfile } from '@/components/features/UserProfile';
import { Navigation } from '@/components/layout/Navigation';
import { PageContainer, PageMain } from '@/components/layout/PageContainer';
import { useLogout } from '@/hooks/useLogout';
import { getSession, updateSession } from '@/lib/storage';
import { SessionUser } from '@/types/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { logout } = useLogout();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isImpersonated, setIsImpersonated] = useState(false);

  useEffect(() => {
    const storedSession = getSession();
    console.log(storedSession, 'my storedsessions');
    
    if (storedSession?.user) {
      setUser({
        ...storedSession.user,
        isImpersonated: storedSession.admin !== null
      });
      setIsImpersonated(storedSession.admin !== null);
      
      updateSession({
        user: storedSession.user,
        admin: storedSession.admin
      });
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  const handleLogout = () => {
    logout(isImpersonated);
  };


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No user session found</div>
      </div>
    );
  }

  return (
    <PageContainer>
      <Navigation
        title="User Dashboard"
        userName={user.name}
        isImpersonated={isImpersonated}
        onLogout={handleLogout}
        logoutText={isImpersonated ? 'Exit Impersonation' : 'Logout'}
      />
      
      <PageMain>
        <div className="space-y-6">
          <UserProfile user={user} />
        </div>
      </PageMain>
    </PageContainer>
  );
}
