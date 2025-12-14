import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession, updateSession } from '@/lib/storage';

export function useLogout() {
  const router = useRouter();

  const logout = async (isImpersonated: boolean = false) => {
    const storedSession = getSession();

    if (storedSession?.admin && isImpersonated) {
      // Exit impersonation mode - keep admin session
      updateSession({
        user: null,
        admin: storedSession.admin,
      });
      router.push('/admin');
    } else {
      // Full logout
      clearSession();
      await signOut({ callbackUrl: '/login' });
    }
  };

  return { logout };
}
