'use client';

import { useEffect, useState } from 'react';
import { getSession } from '@/lib/storage';
import { SessionUser } from '@/types/auth';
import ChangePasswordModal from '@/components/ChangePasswordModal';

export default function UserDetailsPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isImpersonated, setIsImpersonated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const storedSession = getSession();
    
    if (storedSession?.user) {
      setUser({
        ...storedSession.user,
        isImpersonated: storedSession.admin !== null
      });
      setIsImpersonated(storedSession.admin !== null);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No user session found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">User Details</h1>
              {isImpersonated && (
                <span className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  Admin View
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-600">
              <h3 className="text-lg leading-6 font-medium text-white">
                Complete User Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-indigo-100">
                Detailed information about the user account
              </p>
            </div>
            
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">User ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">{user.id}</dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">{user.name}</dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <a href={`mailto:${user.email}`} className="text-indigo-600 hover:text-indigo-800">
                      {user.email}
                    </a>
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phone ? (
                      <a href={`tel:${user.phone}`} className="text-indigo-600 hover:text-indigo-800">
                        {user.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                      {user.gender}
                    </span>
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.dateOfBirth ? (
                      <span>{new Date(user.dateOfBirth).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    ) : (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                    {isImpersonated && (
                      <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Being Impersonated
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change Password
                </button>
                
                <button
                  onClick={() => window.close()}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showPasswordModal && (
        <ChangePasswordModal
          userEmail={user.email}
          onClose={() => setShowPasswordModal(false)}
          isAdminImpersonated={isImpersonated}
        />
      )}
    </div>
  );
}
