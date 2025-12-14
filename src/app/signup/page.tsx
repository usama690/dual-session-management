'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveUser, getRegisteredUsers, getSession } from '@/lib/storage';
import { User } from '@/types/auth';
import { SignupForm } from '@/components/features/SignupForm';
import { AUTH_MESSAGES, VALIDATION_MESSAGES } from '@/lib/constants';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: 'male' as 'male' | 'female' | 'other',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.admin && session?.user) {
      router.push('/admin');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(VALIDATION_MESSAGES.PASSWORD_MISMATCH);
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH);
      setLoading(false);
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth
    };

    const success = saveUser(newUser);
    
    if (success) {
      try {
        const allUsers = getRegisteredUsers();
        await fetch('/api/sync-users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ users: allUsers })
        });
      } catch (error) {
        console.error('Failed to sync users:', error);
      }
      
      alert(AUTH_MESSAGES.SIGNUP_SUCCESS);
      router.push('/login');
    } else {
      setError(AUTH_MESSAGES.SIGNUP_ERROR);
      setLoading(false);
    }
  };

  return (
    <SignupForm
      formData={formData}
      error={error}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
