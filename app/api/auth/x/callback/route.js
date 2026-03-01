import { NextResponse } from 'next/server';
import { getRequiredEnv, getCodeVerifierFromSignedState } from '@/lib/x-auth';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const oauthError = url.searchParams.get('error');

    if (oauthError) {
      return NextResponse.json(
        {
          ok: false,
          step: 'authorize',
          error: oauthError,
          error_description: url.searchParams.get('error_description') ?? null,
        },
        { status: 400 }
      );
    }

    if (!code || !state) {
      return NextResponse.json({ ok: false, error: 'Missing code/state' }, { status: 400 });
    }

    const { clientId, clientSecret, redirectUri } = getRequiredEnv();
    const verifier = getCodeVerifierFromSignedState(state, clientSecret);
    if (!verifier) {
      return NextResponse.json(
        { ok: false, error: 'Invalid state or expired login session' },
        { status: 400 }
      );
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: verifier,
    });

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenResp = await fetch('https://api.x.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basic}`,
      },
      body,
      cache: 'no-store',
    });

    const tokenJson = await tokenResp.json();

    if (!tokenResp.ok) {
      return NextResponse.json(
        { ok: false, step: 'token', status: tokenResp.status, details: tokenJson },
        { status: 400 }
      );
    }

    const meResp = await fetch('https://api.x.com/2/users/me', {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      cache: 'no-store',
    });
    const meJson = await meResp.json();

    if (!meResp.ok) {
      return NextResponse.json(
        { ok: false, step: 'users/me', status: meResp.status, details: meJson },
        { status: 400 }
      );
    }

    const response = NextResponse.redirect(new URL('/', request.url));

    response.cookies.set('x_access_token', tokenJson.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Number(tokenJson.expires_in || 7200),
    });
    response.cookies.set('x_refresh_token', tokenJson.refresh_token ?? '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
