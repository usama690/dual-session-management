import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { GENDER_OPTIONS } from '@/lib/constants';

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
}

export interface SignupFormProps {
  formData: SignupFormData;
  error: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  error,
  loading,
  onChange,
  onSubmit,
}) => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </>
      }
    >
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {error && <Alert variant="error">{error}</Alert>}

        <div className="space-y-4">
          <Input
            label="Full Name"
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={onChange}
            placeholder="John Doe"
          />

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onChange}
            placeholder="john@example.com"
          />

          <Input
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            placeholder="+1234567890"
          />

          <Select
            label="Gender"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            options={GENDER_OPTIONS}
          />

          <Input
            label="Date of Birth"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={onChange}
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={onChange}
            placeholder="Min 6 characters"
            helperText="Password must be at least 6 characters"
          />

          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm your password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={loading}
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
    </AuthLayout>
  );
};
