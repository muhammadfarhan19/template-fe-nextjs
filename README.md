# Next.js 14 Enterprise Frontend Template

A production-ready Next.js 14 frontend template pre-configured with industry-standard tools and best practices. Built to jumpstart enterprise-level web applications with robust architecture, authentication, and state management.

## 🚀 Features & Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Built on Radix UI & Tailwind)
- **Data Fetching / Server State**: [React Query v5](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/) (With Interceptors)
- **Global Client State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Authentication**: JWT-based Auth heavily integrated with Next.js Middleware and `js-cookie`
- **Role-Based Access Control (RBAC)**: Secure route protection based on user roles
- **Code Quality**: ESLint + Prettier pre-configured

---

## 📁 System Architecture & Directory Structure

```text
src/
├── app/                  # Next.js 14 App Router (Pages & Layouts)
│   ├── (auth)/           # Authentication route group (login, register)
│   ├── (dashboard)/      # Protected dashboard route group
│   ├── unauthorized/     # Fallback page for RBAC failures
│   ├── globals.css       # Global styles & Tailwind base directives
│   ├── layout.tsx        # Root layout with QueryClientProvider & ThemeProviders
│   └── page.tsx          # Landing page
├── components/           # Reusable UI Components
│   └── ui/               # shadcn/ui generic components (button, input, etc.)
├── hooks/                # Custom React Hooks
│   └── queries/          # React Query custom hooks for data fetching
├── lib/                  # Utilities & Core Lib Integrations
│   ├── axios.ts          # Axios instance configured with Auth interceptors
│   ├── query-client.ts   # React Query global configuration
│   └── utils.ts          # Utility functions (Tailwind merge `cn`, etc.)
├── services/             # API services layer defining all backend endpoints
├── store/                # Zustand global state management
│   └── auth.store.ts     # Client-side Auth state (user details, tokens)
├── types/                # Global TypeScript declarations and interfaces
│   └── api.types.ts      # Standardized API request/response types
├── validators/           # Zod Validation Schemas
│   └── auth.schema.ts    # Schemas for login, registration forms
└── middleware.ts         # Edge-based Route Protection and RBAC validation
```

---

## 🛠️ Getting Started

### 1. Installation

Clone this repository and install dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and copy the contents from `.env.example`:

```bash
cp .env.example .env
```

Ensure you have the required variables configured:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
# Used to store the token securely in cookies
COOKIE_NAME=access_token
```

### 3. Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔒 Authentication & Role-Based Access Control (RBAC)

This template provides a highly robust, JWT-based authentication system:

### 1. Next.js Edge Middleware (`src/middleware.ts`)
The `middleware.ts` runs on the Edge runtime and securely checks every request:
- **Token Verification:** Extracts the JWT from `js-cookie` and checks its expiration (`exp`).
- **Route Protection:** If an unauthenticated user attempts to visit protected routes, they are instantly redirected to `/login?callbackUrl=...`.
- **Public Route Redirection:** If an *authenticated* user visits `/login` or `/register`, they are automatically redirected to the dashboard.
- **RBAC Enforcement:** Enforces role-based access to specific routes (e.g., `/admin` requires the `ADMIN` role).

#### How to configure Routes in Middleware:
Open `src/middleware.ts` to manage your routing permissions:

```typescript
// 1. Add routes that DO NOT require authentication (e.g., login, register)
export const publicRoutes = ['/login', '/register'];

// 2. Add routes that REQUIRE authentication (e.g., dashboard, settings)
export const protectedRoutes = ['/dashboard', '/admin', '/profile', '/settings'];

// 3. (Optional) Add Role-Based Access Control (RBAC) Requirements
// Map specific route prefixes to an array of allowed roles
export const routeRoleMap: Record<string, string[]> = {
  '/admin': ['ADMIN'],                   // Only ADMIN can access /admin
  '/settings/billing': ['ADMIN', 'MANAGER'] // ADMIN and MANAGER can access billing
};
```

**RBAC Behavior:**
If a user is logged in but attempts to access a route defined in `routeRoleMap` without the required role, they will be automatically redirected to the `/unauthorized` fallback page.

### 2. Axios Interceptors (`src/lib/axios.ts`)
The customized Axios instance seamlessly manages your API requests:
- **Request Interceptor:** Automatically retrieves the `access_token` from cookies and injects it into the `Authorization: Bearer <token>` header of every outgoing API request.
- **Response Interceptor:** Gracefully catches `401 Unauthorized` responses (e.g., when the token expires on the backend), automatically clearing the client state utilizing Zustand and redirecting the user to `/login`.

### 3. Client State (`src/store/auth.store.ts`)
Zustand provides a lightweight mechanism to store the current user's data on the client. It handles the logging in, logging out, and hydrating the user profile upon app initialization.

---

## 🌐 API Layer & Data Fetching

### React Query + Axios Workflow
This setup strictly separates data fetching concerns to maintain clean code:

1. **Services (`src/services/`):** Define purely functional asynchronous methods utilizing the Axios instance.
   ```typescript
   export const getUserProfile = async () => {
     const response = await api.get('/auth/profile');
     return response.data;
   };
   ```
2. **Hooks (`src/hooks/`):** Wrap the service methods inside React Query hooks (`useQuery`, `useMutation`).
   ```typescript
   export const useProfile = () => {
     return useQuery({
       queryKey: ['profile'],
       queryFn: getUserProfile,
     });
   };
   ```
3. **Components (`src/app/`):** UI components purely consume the custom hooks. They handle loading and error states intuitively.

---

## 🎨 UI Components & Styling

This template relies on **shadcn/ui** for accessible, customizable, and unstyled base components built on Radix UI and Tailwind CSS.
Shadcn/ui does not install components as dependencies. You own the code.

To add new components, use the shadcn CLI:

```bash
npx shadcn-ui@latest add [component-name]
```
Example:
```bash
npx shadcn-ui@latest add dialog
```

---

## 📝 Forms & Validation

Form state is managed cleanly using **React Hook Form**, integrated tightly with **Zod** for schema-based input validation.

1. **Define Schema (`src/validators/`):** Set up strict typing and error messages.
   ```typescript
   export const loginSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z.string().min(6, "Password must be at least 6 characters"),
   });
   ```
2. **Implement Form:** Use React Hook Form with `@hookform/resolvers/zod` along with UI components.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Generates an optimized production build.
- `npm run start`: Runs the built production server.
- `npm run lint`: Runs strict ESLint rule checks.
- `npm run format`: Formats code automatically using Prettier.
- `npm run format:check`: Validates that files conform to Prettier rules.

---

## 🤝 Contributing & Development Rules

When creating new features, follow these established patterns:
1. **Types:** Always define strict TypeScript interfaces in `src/types/`. Do not use `any`.
2. **Services:** All external HTTP calls must go through the Axios instance in `src/services/`.
3. **Server State:** Use `useQuery` or `useMutation` in the `src/hooks/` directory. Do not use `useEffect` for data fetching.
4. **Client State:** Only use Zustand (`src/store/`) for global client UI state that doesn't belong to the server.
5. **UI Structure:** Adhere to Server Components by default in the App Router. Use `"use client"` only at the leaf nodes or where interactivity (hooks, state) is strictly required.
