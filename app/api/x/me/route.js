import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('x_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ ok: false, error: 'Not logged in' }, { status: 401 });
  }

  const meResp = await fetch('https://api.x.com/2/users/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  const meJson = await meResp.json();

  if (!meResp.ok) {
    return NextResponse.json(
      { ok: false, step: 'users/me', status: meResp.status, details: meJson },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, user: meJson });
}
