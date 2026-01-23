CrackCodeCat – CAT Prep Platform
=================================

Overview
--------
A Next.js App Router site for CAT exam prep that turns marketing traffic into paid course enrollments. It ships OTP-based signup, JWT login, Instamojo payments with coupons, and admin tooling for courses and enrollments.

Stack
-----
- Next.js 15 (App Router), React 19, Mantine UI + Tailwind utilities
- MongoDB via Mongoose models and cached connection helper
- JWT auth (email + password) with client-side cookie decoding
- Instamojo payments (access token cache, coupon-aware pricing, webhook + verify flows)
- Nodemailer for OTP and lead notifications

Key Features
------------
- Marketing funnel: hero/unified carousel, mentor and achiever sections, FAQ, course catalog, demo booking CTA.
- Auth: email OTP for signup, hashed-password sign-in, lightweight client decoding of the `user` cookie.
- Payments: Instamojo request creation with coupons, webhook signature verification, and enrollment on success; verify endpoint for client confirmation.
- Admin: course CRUD with tax fields and activation status; enrollment lookups; manager routes for users and demo leads.
- Lead capture: demo booking with duplicate blocking (by email/mobile) and email alerts to mentors.

Notable Endpoints
-----------------
- Auth: `POST /api/auth/send-otp`, `POST /api/auth/verify-otp` (signup), `POST /api/auth/signin` (JWT cookie).
- Courses: `GET /api/courses`, `GET /api/courses/[userId]` (user enrollments), admin CRUD at `POST|PUT|DELETE /api/manager/courses`.
- Payments: `POST /api/purchase/initiate` (creates Instamojo request, applies coupon), `POST /api/purchase/verify`, `POST /api/purchase/webhook` (MAC verification + enrollment).
- Coupons: `POST /api/coupons/verify` (validates and returns discount).
- Demo leads: `POST /api/demo` (books call, dedup), `GET /api/manager/users/demo` (list leads).

Data Models
-----------
- User: email, name, hashed password, role, course references.
- Course: name, description, price, CGST/SGST, status, timestamps.
- Payment: course/user refs, amount, currency, Instamojo IDs, status, coupon used, timestamps.
- Otp: email, otp, expiry.
- DemoStudent: name, email, mobile, timestamps.

Environment Variables
---------------------
- `MONGODB_URL` – MongoDB connection string.
- `JWT_SECRET`, `JWT_EXPIRE` – auth token signing and lifespan (e.g., 7d).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – Nodemailer transport for OTP and lead emails.
- `INSTAMOJO_CLIENT_ID`, `INSTAMOJO_CLIENT_SECRET` – Instamojo OAuth client credentials.
- `NEXT_PUBLIC_BASE_URL` – site origin used in payment redirect and webhook URLs.

Getting Started
---------------
1) Install dependencies: `npm install`
2) Create `.env.local` with the variables above.
3) Run dev server: `npm run dev`
4) Open the app at http://localhost:3000

Operational Notes
-----------------
- Instamojo token is cached in-memory; ensure long-lived server process in production.
- Webhook validates MAC with `INSTAMOJO_CLIENT_SECRET`; keep it secret and use HTTPS.
- JWT cookie is not httpOnly for client decoding; adjust if you need stricter security.
- Duplicate demo bookings are blocked by email/mobile; payments guard against missing course/user IDs.
