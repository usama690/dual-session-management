export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  isImpersonated?: boolean;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  user: User | null;
  admin: Admin | null;
}

export interface SessionUser extends User {
  isImpersonated: boolean;
}

export interface SessionData {
  user?: SessionUser;
  admin?: Admin;
}

declare module 'next-auth' {
  interface Session {
    user?: SessionUser;
    admin?: Admin;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    isImpersonated?: boolean;
    isAdmin?: boolean;
  }
}
