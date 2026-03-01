import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: 'このアプリでは投稿機能を無効化しています。',
      code: 'POST_DISABLED',
    },
    { status: 403 }
  );
}
