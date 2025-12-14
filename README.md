# Dual Session Management System

A comprehensive Next.js application implementing dual session authentication with user impersonation capabilities using NextAuth.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Dual Authentication System**: Separate authentication flows for regular users and administrators
- **User Impersonation**: Admins can impersonate users to view their dashboards and details
- **Session Persistence**: LocalStorage-based session management supporting three distinct states
- **Responsive UI**: Modern, responsive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation for robust type checking
- **Secure Authentication**: NextAuth.js v5 with credentials provider

## 📋 Session States

The application supports three distinct session states:

### 1. User Only
```json
{
  "user": { "userData" },
  "admin": null
}
```

### 2. Admin Only
```json
{
  "user": null,
  "admin": { "adminData" }
}
```

### 3. Admin Impersonating User
```json
{
  "user": { "userData", "isImpersonated": true },
  "admin": { "adminData" }
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd dual-session-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env.local` file is already created with default values. For production, update `NEXTAUTH_SECRET`:
   ```bash
   # Generate a secure secret
   openssl rand -base64 32
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

### Admin Access
- **Email**: admin@admin.com
- **Password**: admin123

### User Access
- Register a new account at `/signup` or create test users

## 📁 Project Structure

```
dual-session-management/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # NextAuth API routes
│   │   ├── admin/                   # Admin panel page
│   │   ├── dashboard/               # User dashboard page
│   │   ├── login/                   # Login page
│   │   ├── signup/                  # Registration page
│   │   ├── user-details/            # User details page (impersonation)
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ChangePasswordModal.tsx  # Password change modal
│   │   └── SessionProvider.tsx      # NextAuth session provider
│   ├── lib/
│   │   ├── auth.ts                  # NextAuth configuration
│   │   └── storage.ts               # LocalStorage utilities
│   └── types/
│       └── auth.ts                  # TypeScript type definitions
├── .env.local                       # Environment variables
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies
```

## 🎯 Key Pages and Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page with feature overview | Public |
| `/signup` | User registration | Public |
| `/login` | Login for users and admins | Public |
| `/dashboard` | User private dashboard | Authenticated Users |
| `/admin` | Admin panel with user management | Admins Only |
| `/user-details` | Detailed user information | Impersonation Only |

## 🔄 User Flows

### Regular User Flow
1. Navigate to `/signup`
2. Fill in registration form
3. Login at `/login`
4. Redirected to `/dashboard`
5. View personal information
6. Logout returns to `/login`

### Admin Flow
1. Login at `/login` with admin credentials
2. Redirected to `/admin` panel
3. View list of registered users
4. Click "Impersonate Login" on any user
5. Redirected to `/dashboard` as that user
6. `/user-details` opens in new tab
7. "Exit Impersonation" returns to admin panel

### Impersonation Flow
1. Admin logs in and navigates to admin panel
2. Clicks "Impersonate Login" button next to a user
3. Session updates to include both admin and user data
4. Admin is redirected to user's dashboard
5. User details page opens in new tab
6. Admin can view all user information
7. "Exit Impersonation" clears user session but maintains admin session

## 🛠️ Technical Implementation

### Authentication
- **NextAuth.js v5** with Credentials Provider
- Custom JWT callbacks for dual session support
- Session strategy with LocalStorage persistence

### Session Management
- Centralized session utilities in `lib/storage.ts`
- Three-state session management (user-only, admin-only, dual)
- Real-time session synchronization across tabs

### Data Storage
- User data stored in LocalStorage (`registered-users` key)
- Session data stored in LocalStorage (`dual-session-auth` key)
- No backend required - fully client-side demonstration

### Security Features
- Password validation (minimum 6 characters)
- Email uniqueness checking
- Protected routes with session verification
- Admin credential validation

## 🎨 UI/UX Features

- Gradient backgrounds for visual distinction
- Session state indicators (badges)
- Responsive tables and forms
- Modal dialogs for password changes
- Color-coded interfaces:
  - Blue/Indigo: User pages
  - Purple/Pink: Admin pages
  - Green/Blue: User details
  - Yellow: Impersonation indicators

## 📝 Component Documentation

### Session Storage Utilities (`lib/storage.ts`)
- `saveSession()` - Save session to LocalStorage
- `getSession()` - Retrieve current session
- `clearSession()` - Remove session data
- `updateSession()` - Update session (for impersonation)
- `saveUser()` - Register new user
- `findUserByEmail()` - Find user by email
- `updateUserPassword()` - Change user password

### NextAuth Configuration (`lib/auth.ts`)
- Credentials provider setup
- JWT callbacks for session management
- Custom session callbacks
- Admin and user authentication logic

## 🔧 Configuration

### Tailwind CSS
Custom theme with extended colors and responsive breakpoints configured in `tailwind.config.ts`.

### TypeScript
Strict mode enabled with Next.js-specific type definitions in `tsconfig.json`.

### NextAuth
Custom pages, callbacks, and session strategy configured in `lib/auth.ts`.

## 📦 Build and Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 🔍 Testing the Application

1. **Test User Registration**
   - Go to `/signup`
   - Create a new user account
   - Verify redirect to login

2. **Test User Login**
   - Login with created credentials
   - Verify redirect to dashboard
   - Check personal information display

3. **Test Admin Login**
   - Login with admin@admin.com / admin123
   - Verify redirect to admin panel
   - View registered users list

4. **Test Impersonation**
   - As admin, click "Impersonate Login"
   - Verify dual session state
   - Check user details page opens
   - Test "Exit Impersonation"

5. **Test Password Change**
   - Open user details page
   - Click "Change Password"
   - Fill form and submit
   - Verify password update

## 🛡️ Security Considerations

### Current Implementation (Demo)
- LocalStorage for session persistence
- Client-side only authentication
- Hardcoded admin credentials
- Plain text password storage

### Production Recommendations
- Implement server-side session management
- Use database for user storage
- Hash passwords (bcrypt, argon2)
- Add JWT refresh tokens
- Implement CSRF protection
- Add rate limiting
- Use HTTPS only
- Implement proper authorization
- Add session timeout
- Use environment-based admin credentials

## 🤝 Best Practices Implemented

- **Separation of Concerns**: Clear separation between auth logic, UI, and utilities
- **Type Safety**: Comprehensive TypeScript types for all data structures
- **Component Reusability**: Modular components for better maintainability
- **User Experience**: Clear feedback, loading states, and error handling
- **Code Organization**: Logical file structure following Next.js conventions
- **Documentation**: Inline comments explaining impersonation flow and session management

## 📚 Technologies Used

- **Next.js 14+** - React framework with App Router
- **NextAuth.js v5** - Authentication framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library
- **LocalStorage API** - Client-side data persistence

## 🐛 Troubleshooting

### Session not persisting
- Check browser LocalStorage is enabled
- Clear LocalStorage and try again: `localStorage.clear()`

### Admin login not working
- Verify credentials: admin@admin.com / admin123
- Check console for errors

### Impersonation not working
- Ensure user is registered first
- Check LocalStorage for session data
- Verify admin is logged in

## 📄 License

This project is for demonstration purposes.

## 👨‍💻 Development

Built with best practices for scalability and maintainability. The architecture supports easy extension with additional features like:
- Role-based access control (RBAC)
- Multi-level admin hierarchy
- Audit logging
- Real-time notifications
- OAuth providers integration

## 🎓 Learning Outcomes

This project demonstrates:
- Advanced NextAuth.js configuration
- Dual session management patterns
- TypeScript with Next.js
- LocalStorage state management
- User impersonation implementation
- Modern React patterns (hooks, context)
- Tailwind CSS responsive design

---

**Ready to explore dual session management!** 🚀

For questions or issues, check the inline code documentation or refer to the official documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
