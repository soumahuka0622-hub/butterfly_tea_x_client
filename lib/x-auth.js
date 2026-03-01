import crypto from 'node:crypto';

export const tokenStore = new Map();

export function randomBase64Url(size = 32) {
  return crypto
    .randomBytes(size)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function sha256Base64Url(text) {
  return crypto
    .createHash('sha256')
    .update(text)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function makeSessionId() {
  return randomBase64Url(24);
}

function hmacBase64Url(input, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(input)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function buildSignedState(codeVerifier, secret) {
  const payloadObject = {
    v: codeVerifier,
    ts: Date.now(),
    n: randomBase64Url(12),
  };
  const payload = Buffer.from(JSON.stringify(payloadObject))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
  const signature = hmacBase64Url(payload, secret);
  return `${payload}.${signature}`;
}

export function getCodeVerifierFromSignedState(state, secret) {
  if (!state || !state.includes('.')) return null;
  const [payload, signature] = state.split('.', 2);
  const expected = hmacBase64Url(payload, secret);

  if (signature !== expected) return null;

  let parsed;
  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(normalized, 'base64').toString('utf8');
    parsed = JSON.parse(json);
  } catch {
    return null;
  }

  if (!parsed?.v || !parsed?.ts) return null;
  if (Date.now() - Number(parsed.ts) > 10 * 60 * 1000) return null;
  return parsed.v;
}

export function getRequiredEnv() {
  const clientId = process.env.X_CLIENT_ID?.trim();
  const clientSecret = process.env.X_CLIENT_SECRET?.trim();
  const redirectUri = process.env.X_REDIRECT_URI?.trim();

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing env: X_CLIENT_ID, X_CLIENT_SECRET, X_REDIRECT_URI');
  }

  return { clientId, clientSecret, redirectUri };
}
