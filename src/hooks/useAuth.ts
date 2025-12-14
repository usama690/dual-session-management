import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getSession } from '@/lib/storage';
import { SessionUser, Admin } from '@/types/auth';

interface UseAuthOptions {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

interface AuthState {
  user: SessionUser | null;
  admin: Admin | null;
  isImpersonated: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(options: UseAuthOptions = {}): AuthState {
  const {
    requireAuth = false,
    requireAdmin = false,
    redirectTo = '/login',
  } = options;

  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedSession = getSession();

    if (storedSession) {
      setUser(storedSession.user ? { ...storedSession.user, isImpersonated: storedSession.admin !== null } : null);
      setAdmin(storedSession.admin);
    }

    if (status !== 'loading') {
      setIsLoading(false);

      // Check authentication requirements
      if (requireAuth && !storedSession?.user && status === 'unauthenticated') {
        router.push(redirectTo);
      }

      if (requireAdmin && !storedSession?.admin) {
        router.push(redirectTo);
      }
    }
  }, [session, status, router, requireAuth, requireAdmin, redirectTo]);

  return {
    user,
    admin,
    isImpersonated: admin !== null && user !== null,
    isLoading,
    isAuthenticated: user !== null || admin !== null,
  };
}
