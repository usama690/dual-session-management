import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Dual Session Management
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Next.js application with dual session authentication using NextAuth.js
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Access</h2>
              <p className="text-gray-600 mb-6">
                Sign up as a regular user to access your personal dashboard
              </p>
              <div className="space-y-3">
                <Link
                  href="/signup"
                  className="block w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="block w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Access</h2>
              <p className="text-gray-600 mb-6">
                Login as admin to manage users and enable impersonation
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Admin Credentials:</p>
                <p className="text-xs text-gray-600">Email: admin@admin.com</p>
                <p className="text-xs text-gray-600">Password: admin123</p>
              </div>
              <Link
                href="/login"
                className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-3xl mb-2">🔐</div>
                <h4 className="font-semibold text-gray-900 mb-2">Dual Authentication</h4>
                <p className="text-sm text-gray-600">
                  Separate authentication flows for users and administrators
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎭</div>
                <h4 className="font-semibold text-gray-900 mb-2">User Impersonation</h4>
                <p className="text-sm text-gray-600">
                  Admins can impersonate users to view their dashboard
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💾</div>
                <h4 className="font-semibold text-gray-900 mb-2">Session Persistence</h4>
                <p className="text-sm text-gray-600">
                  LocalStorage-based session management for dual sessions
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-gray-600">
            <p className="text-sm">
              Built with Next.js 14, NextAuth.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
