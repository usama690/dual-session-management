/**
 * Application-wide constants
 */

export const APP_NAME = 'Dual Session Management';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  USER_DETAILS: '/user-details',
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGIN_ERROR: 'Invalid credentials',
  SIGNUP_SUCCESS: 'Registration successful! Please login.',
  SIGNUP_ERROR: 'Email already exists',
  LOGOUT_SUCCESS: 'Successfully logged out',
  UNAUTHORIZED: 'You are not authorized to access this page',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_PHONE: 'Please enter a valid phone number',
} as const;

export const GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
