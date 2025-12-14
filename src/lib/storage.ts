import { User, AuthSession } from '@/types/auth';

const AUTH_STORAGE_KEY = 'dual-session-auth';
const USERS_STORAGE_KEY = 'registered-users';

let serverSideUsers: User[] = [];

export const saveSession = (session: AuthSession): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }
};

export const getSession = (): AuthSession | null => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  }
  return null;
};

export const clearSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const updateSession = (updates: Partial<AuthSession>): void => {
  const currentSession = getSession() || { user: null, admin: null };
  const updatedSession = { ...currentSession, ...updates };
  saveSession(updatedSession);
};

export const getRegisteredUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const users = JSON.parse(stored);
        serverSideUsers = users;
        return users;
      }
    } catch (error) {
      console.log(error,'my errors')
    }
  }
  return serverSideUsers;
};

export const saveUser = (user: User): boolean => {
  const users = getRegisteredUsers();

  if (users.some(u => u.email === user.email)) {
    return false;
  }

  users.push(user);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
  serverSideUsers = users;
  
  return true;
};

export const findUserByEmail = (email: string): User | null => {
  const users = getRegisteredUsers();
  return users.find(u => u.email === email) || null;
};

export const updateUserPassword = (email: string, newPassword: string): boolean => {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
    serverSideUsers = users;
    
    return true;
  }
  return false;
};

export const initializeUsers = (users: User[]): void => {
  serverSideUsers = users;
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const ADMIN_CREDENTIALS = {
    email: 'admin@admin.com',
    password: 'admin123',
    name: 'Admin User',
    id: 'admin-001'
};

export const validateAdminCredentials = (email: string, password: string): boolean => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

