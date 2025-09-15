# Authentication Flow FEATURES NEEDED

## 1. User Management

-   User registration: create new users with hashed passwords. [x]
-   Unique identity: email/username must be unique. [x]
-   Profile management: allow updating fullname, avatar, etc.
-   Soft delete / Deactivation: don't hard delete accounts unless required.

## 2. Password Security

-   Use bcrypt/argon2 for hashing (never store plaintext). [x]
-   Enforce password strenth rules.
-   Store password reset tokens (short-lived + single-use).
-   Support password change flow with re-authentication.

## 3. Session & Token Management

-   JWT or session cookies (signed, short-lived).
-   Refresh tokens stored securely in DB/Redis.
-   Token rotation to prevent reuse if stolen.
-   Blacklist/Revocation for invalid tokens.

## 4. Social Authentication (OAuth)

-   Support Google, GitHub, etc. via backend (never frontend-only).
-   Map provider accounts to existing users (avoid duplicates).
-   Store provider IDs securely, not just email.

## 5. Email & Verification

-   Email verification flow with secure token links. [x]
-   Block login until verified (depending on app).
-   Resend verification email with rate limiting.

## 6. Authorization & Roles

-   Role-based access token (RBAC): admin, user, etc.
-   Optionall attributed-based (ABAC) for fined-grained policies.
-   Centralize authorization middleware in backend.

## 7. Security Features

-   Rate limiting & IP throttling for login/register endpoints.
-   Account lcokout after X failed attempts (prevent brute force).
-   CSRF protection (if using cookies).
-   CORS setup for frontend-backend separation.
-   Logging & auditing: record login attempts, suspicious acitivity.

## 8. Session Management

-   Logout endpoint (invalidate tokens or sessions).
-   Multi-device sessions: allow/deny concurrent logins.
-   Session expiration policies (short-lived access tokens, refresh rotation).

## 9. Forgot Password / Recovery

-   Secure reset token (short-lived, one-time).
-   Send link via email (never expose user existence).
-   Invalidate previous reest links once used.

## 10. Advanced Features (for scaling apps)

-   MFA (Multi-Factor Authentication) via TOTP/SMS/email.
-   Device fingerprinting for extra security.
-   API gateway integration for token validation in microservices.
-   Webhooks/events (e.g., notify on login new device)
