import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { AuthLayout } from '@/components/layout/AuthLayout';

export interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </>
      }
      footer={
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Admin:</strong> admin@admin.com / admin123</p>
            <p><strong>User:</strong> Register a new account or use existing</p>
          </div>
        </div>
      }
    >
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-4">
          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
};
