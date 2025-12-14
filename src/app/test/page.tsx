'use client';

import { useEffect, useState } from 'react';
import { getRegisteredUsers, saveUser } from '@/lib/storage';
import { User } from '@/types/auth';

export default function TestPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [syncStatus, setSyncStatus] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getRegisteredUsers();
    setUsers(allUsers);
  };

  const createTestUser = async () => {
    const testUser: User = {
      id: `user-${Date.now()}`,
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123',
      phone: '+1234567890',
      gender: 'male',
      dateOfBirth: '1990-01-01'
    };

    const success = saveUser(testUser);
    if (success) {
      // Sync to server
      const allUsers = getRegisteredUsers();
      const response = await fetch('/api/sync-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: allUsers })
      });
      const result = await response.json();
      setSyncStatus(result.success ? 'Test user created and synced!' : 'Failed to sync');
      loadUsers();
    } else {
      setSyncStatus('User already exists');
    }
  };

  const syncToServer = async () => {
    const allUsers = getRegisteredUsers();
    const response = await fetch('/api/sync-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: allUsers })
    });
    const result = await response.json();
    setSyncStatus(result.success ? 'Synced successfully!' : 'Sync failed');
  };

  const clearAll = () => {
    localStorage.clear();
    loadUsers();
    setSyncStatus('Storage cleared');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Test & Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={createTestUser}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Test User
            </button>
            <button
              onClick={syncToServer}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Sync to Server
            </button>
            <button
              onClick={loadUsers}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Reload Users
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear All Data
            </button>
          </div>
          {syncStatus && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800">
              {syncStatus}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Credentials</h2>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-purple-50 rounded">
              <p className="font-semibold">Admin Login:</p>
              <p>Email: admin@admin.com</p>
              <p>Password: admin123</p>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <p className="font-semibold">Test User Login:</p>
              <p>Email: test@test.com</p>
              <p>Password: test123</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Registered Users ({users.length})
          </h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users registered yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2 text-sm">{user.name}</td>
                      <td className="px-4 py-2 text-sm">{user.email}</td>
                      <td className="px-4 py-2 text-sm">{user.phone || 'N/A'}</td>
                      <td className="px-4 py-2 text-sm capitalize">{user.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Usage Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
            <li>Click &quot;Create Test User&quot; to add a test account</li>
            <li>Go to <a href="/login" className="underline">/login</a> and use test@test.com / test123</li>
            <li>Or register your own user at <a href="/signup" className="underline">/signup</a></li>
            <li>If login fails, click &quot;Sync to Server&quot; and try again</li>
            <li>Use &quot;Clear All Data&quot; to reset everything</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
