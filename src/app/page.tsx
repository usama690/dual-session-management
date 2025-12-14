import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/features/FeatureCard';
import { FeatureHighlight } from '@/components/features/FeatureHighlight';
import { ROUTES, APP_NAME } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            {APP_NAME}
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Next.js application with dual session authentication using NextAuth.js
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <FeatureCard
              icon="👤"
              title="User Access"
              description="Sign up as a regular user to access your personal dashboard"
              primaryAction={{
                label: 'Sign Up',
                href: ROUTES.SIGNUP,
              }}
              secondaryAction={{
                label: 'Login',
                href: ROUTES.LOGIN,
              }}
            />

            <FeatureCard
              icon="👨‍💼"
              title="Admin Access"
              description="Login as admin to manage users and enable impersonation"
              primaryAction={{
                label: 'Admin Login',
                href: ROUTES.LOGIN,
              }}
              info={
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Admin Credentials:</p>
                  <p className="text-xs text-gray-600">Email: admin@admin.com</p>
                  <p className="text-xs text-gray-600">Password: admin123</p>
                </div>
              }
            />
          </div>

          <Card padding="lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureHighlight
                icon="🔐"
                title="Dual Authentication"
                description="Separate authentication flows for users and administrators"
              />
              <FeatureHighlight
                icon="🎭"
                title="User Impersonation"
                description="Admins can impersonate users to view their dashboard"
              />
              <FeatureHighlight
                icon="💾"
                title="Session Persistence"
                description="LocalStorage-based session management for dual sessions"
              />
            </div>
          </Card>

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
