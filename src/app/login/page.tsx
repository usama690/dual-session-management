'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { saveSession, ADMIN_CREDENTIALS, getSession, findUserByEmail } from '@/lib/storage';
import { LoginForm } from '@/components/features/LoginForm';
import { AUTH_MESSAGES } from '@/lib/constants';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const session = getSession();
        if (session?.admin && session?.user) {
            router.push('/admin');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const session = getSession();
            const isAdmin = email === ADMIN_CREDENTIALS.email;

            const result = await signIn('credentials', {
                email,
                password,
                isAdmin: isAdmin.toString(),
                redirect: false
            });

            if (result?.error) {
                setError(AUTH_MESSAGES.LOGIN_ERROR);
                setLoading(false);
                return;
            }

            if (isAdmin) {
                saveSession({
                    user: session?.user ?? null,
                    admin: {
                        id: ADMIN_CREDENTIALS.id,
                        email: ADMIN_CREDENTIALS.email,
                        name: ADMIN_CREDENTIALS.name
                    }
                });
                router.push('/admin');
            } else {
                const user = findUserByEmail(email);

                saveSession({
                    user: user ?? null,
                    admin: session?.admin || null
                });
                router.push("/dashboard")

            }
        } catch (err) {
            setError('An error occurred during login');
            setLoading(false);
        }
    };

    return (
        <LoginForm
            email={email}
            password={password}
            error={error}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
        />
    );
}
