# Butterfly Tea X Client Prototype

A minimal Next.js prototype to connect an X account with OAuth 2.0 (PKCE) and verify user identity without showing a timeline.

## What this app does
- OAuth 2.0 login with X (`/api/auth/x/login`)
- Callback + token exchange (`/api/auth/x/callback`)
- Verify current user (`/api/x/me`)

## What this app intentionally does not do
- Home timeline fetch
- For-you/following feed UI
- Posting to X (`/api/x/post` is disabled)

## Requirements
- Node.js 20+
- X Developer app with OAuth 2.0 enabled (Web App)
- Callback URL set to: `http://localhost:3000/api/auth/x/callback`

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill `.env.local`:
   ```env
   X_CLIENT_ID=...
   X_CLIENT_SECRET=...
   X_REDIRECT_URI=http://localhost:3000/api/auth/x/callback
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`

## Notes
- Access token is stored in an HTTP-only cookie for this local prototype.
- Logging out is currently done by clearing browser cookies for `localhost`.
- Do not commit `.env.local`.

## Legacy files
The previous static prototype files remain in the repo:
- `index.html`
- `app.js`
- `styles.css`
