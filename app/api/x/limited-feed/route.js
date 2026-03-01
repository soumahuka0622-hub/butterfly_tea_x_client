import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      code: 'LIMITED_FEED_DISABLED',
      error:
        'このビルドでは制限付き閲覧APIを無効化しています。手動チェック用リンクを利用してください。',
    },
    { status: 403 }
  );
}
