import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    message: 'ログアウトしました',
  });

  response.cookies.set('x_access_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  response.cookies.set('x_refresh_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
