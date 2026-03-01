import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: 'Posting is disabled in this build.',
      code: 'POST_DISABLED',
    },
    { status: 403 }
  );
}
