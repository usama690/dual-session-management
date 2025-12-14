'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { getSession, clearSession, updateSession, getRegisteredUsers, findUserByEmail } from '@/lib/storage';
import { User, Admin } from '@/types/auth';

export default function AdminPage() {
  const router = useRouter();
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

  const handleLogout = async () => {
    clearSession();
    await signOut({ callbackUrl: '/login' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                Administrator
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {admin?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Registered Users
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage and impersonate user accounts
              </p>
            </div>

            {users.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-gray-500">No users registered yet.</p>
                <p className="text-sm text-gray-400 mt-2">Users can register at /signup</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 capitalize">{user.gender}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleImpersonate(user)}
                            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              impersonatedUserId === user.id
                                ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                            }`}
                          >
                            {impersonatedUserId === user.id ? 'Impersonated' : 'Impersonate Login'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Admin Email</p>
                <p className="text-lg font-medium text-gray-900">{admin?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
