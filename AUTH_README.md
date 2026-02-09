# Giggo Authentication & Database Setup

## ✅ Database Tables Created

### 1. **users** (Table ID: 74990)
Core user accounts table for the Giggo platform.

**Fields:**
- `id` - Auto-generated UUID (Primary Key)
- `email` - User email address (Unique)
- `password_hash` - Password hash (managed by EZsite Auth)
- `full_name` - User's full name
- `role` - User role: `brand`, `creator`, or `admin`
- `phone` - WhatsApp phone number
- `created_at` - Timestamp (auto-generated)

### 2. **creator_profiles** (Table ID: 74435)
Extended profile information for creator users (1:1 relationship with users).

**Fields:**
- `id` - Auto-generated UUID (Primary Key)
- `user_id` - Foreign key reference to users.id
- `portfolio_urls` - JSON array of portfolio links
- `tiktok_handle` - TikTok username
- `instagram_handle` - Instagram username
- `is_verified` - Creator verification status (Default: false)
- `total_earnings` - Cumulative earnings in IDR (Default: 0)

---

## 🔐 Authentication Pages

### 1. **Register** (`/register`)
User registration with role selection.

**Features:**
- Role toggle: Brand (default) or Creator
- Form fields: Full Name, Email, Password (min 8 chars), WhatsApp Number
- Creates user in EZsite Auth + `users` table
- If Creator role: also creates entry in `creator_profiles` table
- Email verification required (checks spam/junk folder notice)
- Redirects to `/login` after email sent

**Flow:**
1. User fills registration form
2. Call `window.ezsite.apis.register()` for auth
3. Insert record to `users` table
4. If creator role, insert empty record to `creator_profiles`
5. Show success message with countdown
6. Redirect to login after 5 seconds

### 2. **Login** (`/login`)
User login with role-based routing.

**Features:**
- Email + Password authentication
- Password visibility toggle
- Forgot password link
- Social login buttons (Google, Facebook) - UI ready
- Role-based redirect after successful login

**Flow:**
1. User enters credentials
2. Call `window.ezsite.apis.login()`
3. Fetch user role from `users` table
4. Redirect based on role:
   - `creator` → `/creator/onboarding`
   - `brand` → `/dashboard`
   - `admin` → `/admin`

### 3. **OnAuthSuccess** (`/onauthsuccess`)
Email verification callback page.

**Features:**
- Success confirmation message
- 5-second countdown
- Auto-redirect to `/login`

### 4. **ResetPassword** (`/resetpassword`)
Two-step password reset flow.

**Features:**

**Step 1 - Request Reset:**
- User enters email
- Sends reset link via email
- Redirects to login after 3 seconds

**Step 2 - Reset Password (with token in URL):**
- User clicks email link with token
- Enters new password (min 8 chars)
- Confirms password
- Shows success message
- Redirects to login after 5 seconds

---

## 🛡️ Security Implementation

### ✅ Implemented:
- Client-side validation (email format, password length)
- Password visibility toggle (UX best practice)
- EZsite Auth handles password hashing
- User-friendly error messages
- Email verification required before login
- Secure password reset flow with tokens

### ⚠️ TODO (Follow GIGGO CONSTITUTION):
1. **Enable RLS (Row Level Security)** on database tables
2. **Add Zod validation** for all form inputs
3. **Implement ACID transactions** for multi-table operations
4. **Add audit logging** to `transaction_ledgers` table
5. **Implement session management** with proper timeout
6. **Add rate limiting** for auth endpoints

---

## 🎨 UI/UX Features

- **Dark Mode Cyberpunk Theme**: Matches landing page aesthetic
- **Gradient Accents**: Cyan-to-Blue gradient buttons and text
- **Smooth Animations**: Framer Motion for page transitions
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: User feedback via Sonner
- **Loading States**: Disabled buttons with loading text
- **Form Validation**: Real-time feedback on errors

---

## 🔄 Navigation Flow

```
Landing Page (/)
  ├─ "Masuk" button → /login
  └─ "Buat Campaign" button → /register

/register
  ├─ Success → Email verification notice → /login
  └─ "Already have account?" → /login

/login
  ├─ Success (Brand) → /dashboard
  ├─ Success (Creator) → /creator/onboarding
  ├─ Success (Admin) → /admin
  ├─ "Forgot password?" → /resetpassword
  └─ "Register now" → /register

/resetpassword
  ├─ Without token → Email request form → /login
  └─ With token → New password form → /login

/onauthsuccess
  └─ Email verified → /login (auto-redirect)
```

---

## 📋 Next Steps

1. **Implement Creator Onboarding Flow** (`/creator/onboarding`)
   - Portfolio upload
   - Social media handles
   - Bank account info for payouts

2. **Implement Brand Dashboard** (`/dashboard`)
   - Campaign management
   - Analytics
   - Creator discovery

3. **Add Protected Routes**
   - Middleware to check authentication
   - Role-based access control (RBAC)

4. **Integrate Stripe Payment**
   - Campaign deposits
   - Creator payouts
   - Transaction history

---

## 🚀 Testing

To test the auth flow:

1. Register new user at `/register`
2. Check email for activation link
3. Click activation link → redirects to `/onauthsuccess`
4. Login at `/login`
5. Verify role-based redirect works correctly

**Test Credentials Template:**
```
Brand User:
- Email: brand@test.com
- Password: testpass123
- Role: Brand

Creator User:
- Email: creator@test.com
- Password: testpass123
- Role: Creator
```

---

## 📝 Technical Notes

- **Auth Provider**: EZsite Built-in Authentication
- **Database**: EZsite Built-in Database (PostgreSQL)
- **Password Hashing**: Managed by EZsite (no manual hashing required)
- **Session Management**: Handled by EZsite APIs
- **TypeScript Definitions**: Added in `/src/types/ezsite.d.ts`

---

**Status**: ✅ Backend & Auth Setup Complete
**Next Phase**: Creator Onboarding + Brand Dashboard
