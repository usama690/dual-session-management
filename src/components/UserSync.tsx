'use client';

import { useEffect } from 'react';

export default function UserSync() {
  useEffect(() => {
    const syncUsers = async () => {
      if (typeof window !== 'undefined') {
        const usersData = localStorage.getItem('registered-users');
        if (usersData) {
          try {
            const users = JSON.parse(usersData);
            await fetch('/api/sync-users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ users })
            });
          } catch (error) {
            console.error('Failed to sync users:', error);
          }
        }
      }
    };

    syncUsers();
  }, []);

  return null;
}
