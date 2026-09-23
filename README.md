HCare

A patient profile and authentication web app built with React, TypeScript, and Firebase, following Feature-Sliced Design (FSD) architecture.

Features
Authentication — email/password registration and login via Firebase Auth, with a single toggleable auth screen (Login / Register).
Protected routes — authenticated-only pages (Profile, Users) redirect to /auth when signed out; the /auth page redirects signed-in users to /profile.
Patient profile — view and inline-edit personal sections stored in Firestore:
Contact Info (name, phone, email, address)
Personal Info (gender, birth date, patient ID, nationality, marital status, emergency contact)
Insurance Info (member ID, insurance provider)
Appointments (add and list upcoming/past appointments)
Contact Preferences (per-channel Allow/Deny toggles for Email, Mobile Phone, Mail)
Users list — browse all registered users in a table view.
Responsive UI — mobile-first layout with a collapsible navigation drawer, built with Tailwind CSS v4.
Form validation — schema-based validation with Zod on auth forms, with per-field error messages.

Tech Stack
Category	Technology
Build tool	Vite
Framework	React 19
Language	TypeScript
Routing	TanStack Router (file-based)
Server state	TanStack Query
Backend	Firebase (Authentication + Firestore)
Styling	Tailwind CSS v4
Validation	Zod
Icons	lucide-react
Font	Fontsource / Poppins
Architecture linting	Steiger (Feature-Sliced Design)
Key dependencies
json
{
  "@tanstack/react-query": "^5.x",
  "@tanstack/react-router": "^1.x",
  "@tailwindcss/vite": "^4.x",
  "tailwindcss": "^4.x",
  "firebase": "^12.x",
  "zod": "^3.x",
  "lucide-react": "^0.x",
  "@fontsource/poppins": "^5.x",
  "react": "^19.x",
  "react-dom": "^19.x"
}

Dev dependencies include @tanstack/router-plugin, @tanstack/router-devtools, @tanstack/react-query-devtools, vite, typescript, eslint, and @vitejs/plugin-react.

Project Architecture

The codebase follows Feature-Sliced Design:

src/
  routes/          # TanStack Router file-based routes (thin route definitions)
  entities/        # Business entities (e.g. user) — data models and read-only UI
  features/        # User scenarios (auth-login, auth-register, profile editing, etc.)
  widgets/          # Composite UI blocks (e.g. navbar)
  shared/          # Reusable UI kit, Firebase/query client setup, utilities

Each slice exposes a public API via an index.ts barrel file; cross-slice imports must go through it. Architecture rules are checked with:

bash
npx steiger ./src
Getting Started
Prerequisites
Node.js 18+
npm
A Firebase project with Authentication (Email/Password) and Firestore Database enabled

1. Clone and install
bash
git clone <repository-url>
cd hcare
npm install
2. Configure environment variables

Copy the example file and fill in your Firebase project credentials (Firebase Console → Project Settings → General → Your apps → SDK setup and configuration):

bash
cp .env.example .env
bash
# .env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

3. Configure Firestore

In the Firebase Console, enable Email/Password sign-in under Authentication → Sign-in method, then set the following Firestore Security Rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

4. Run the dev server
bash
npm run dev

The app will be available at http://localhost:5173.

5. Build for production
bash
npm run build
npm run preview   # preview the production build locally

Scripts
Command	Description
npm run dev	Start the Vite dev server
npm run build	Type-check and build for production
npm run preview	Preview the production build
npm run lint	Run ESLint
npx steiger ./src	Check FSD architecture rules

Deployment

Add your deployment link(s) here once available, e.g.:

Live demo: https://your-app.vercel.app
Hosting: Vercel / Netlify / Firebase Hosting
License

Add a license if applicable (e.g. MIT).