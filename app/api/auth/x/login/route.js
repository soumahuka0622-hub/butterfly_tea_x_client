import { NextResponse } from 'next/server';
import { sha256Base64Url, getRequiredEnv, buildSignedState, randomBase64Url } from '@/lib/x-auth';

export async function GET() {
  try {
    const { clientId, clientSecret, redirectUri } = getRequiredEnv();

    const codeVerifier = randomBase64Url(48);
    const codeChallenge = sha256Base64Url(codeVerifier);
    const state = buildSignedState(codeVerifier, clientSecret);

    const auth = new URL('https://x.com/i/oauth2/authorize');
    auth.searchParams.set('response_type', 'code');
    auth.searchParams.set('client_id', clientId);
    auth.searchParams.set('redirect_uri', redirectUri);
    auth.searchParams.set('scope', 'tweet.read users.read tweet.write offline.access');
    auth.searchParams.set('state', state);
    auth.searchParams.set('code_challenge', codeChallenge);
    auth.searchParams.set('code_challenge_method', 'S256');

    return NextResponse.redirect(auth.toString());
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
