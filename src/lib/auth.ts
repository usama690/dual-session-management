import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { 
  findUserByEmail, 
  validateAdminCredentials, 
  ADMIN_CREDENTIALS,
  getSession,
  saveSession
} from '@/lib/storage';

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isAdmin: { label: 'Is Admin', type: 'text' },
        impersonateUserId: { label: 'Impersonate User ID', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const isAdmin = credentials.isAdmin === 'true';
        const impersonateUserId = credentials.impersonateUserId as string | undefined;

        if (isAdmin || email === ADMIN_CREDENTIALS.email) {
          if (validateAdminCredentials(email, password)) {
            return {
              id: ADMIN_CREDENTIALS.id,
              email: ADMIN_CREDENTIALS.email,
              name: ADMIN_CREDENTIALS.name,
              isAdmin: true
            };
          }
          return null;
        }

        const user = findUserByEmail(email);
        if (user && user.password === password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            isImpersonated: false,
            isAdmin: false
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.isAdmin) {
          token.admin = {
            id: user.id,
            email: user.email,
            name: user.name
          };
          token.user = undefined;
        } else {
          token.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone || '',
            gender: user.gender || 'other',
            dateOfBirth: user.dateOfBirth || '',
            password: '',
            isImpersonated: user.isImpersonated || false
          };
          token.admin = undefined;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.admin) {
        session.admin = token.admin as any;
      }
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
