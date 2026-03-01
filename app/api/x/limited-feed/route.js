import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const MAX_USERS = 8;
const MAX_PER_USER = 5;
const DEFAULT_PER_USER = 2;

function normalizeUsers(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((v) => v.trim().replace(/^@+/, ''))
    .filter(Boolean)
    .slice(0, MAX_USERS);
}

export async function GET(request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('x_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { ok: false, error: '未ログインです。先に「Xでログイン」を実行してください。' },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const users = normalizeUsers(url.searchParams.get('users'));
  const perUserRaw = Number(url.searchParams.get('perUser') || DEFAULT_PER_USER);
  const perUser = Math.min(MAX_PER_USER, Math.max(1, Number.isFinite(perUserRaw) ? perUserRaw : DEFAULT_PER_USER));

  if (!users.length) {
    return NextResponse.json(
      { ok: false, error: 'users を指定してください（例: users=SoumaTea,xdev）' },
      { status: 400 }
    );
  }

  try {
    const results = await Promise.all(
      users.map(async (username) => {
        const userResp = await fetch(
          `https://api.x.com/2/users/by/username/${encodeURIComponent(username)}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: 'no-store',
          }
        );
        const userJson = await userResp.json();

        if (!userResp.ok || !userJson?.data?.id) {
          return {
            username,
            ok: false,
            error: 'ユーザー取得に失敗しました',
            details: userJson,
          };
        }

        const userId = userJson.data.id;
        const tweetsResp = await fetch(
          `https://api.x.com/2/users/${userId}/tweets?exclude=retweets,replies&max_results=${perUser}&tweet.fields=created_at`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: 'no-store',
          }
        );
        const tweetsJson = await tweetsResp.json();

        if (!tweetsResp.ok) {
          return {
            username,
            ok: false,
            error: '投稿取得に失敗しました',
            details: tweetsJson,
          };
        }

        return {
          username,
          ok: true,
          user: userJson.data,
          tweets: Array.isArray(tweetsJson.data) ? tweetsJson.data : [],
        };
      })
    );

    return NextResponse.json({
      ok: true,
      mode: 'limited-feed',
      constraints: {
        maxUsers: MAX_USERS,
        maxPerUser: MAX_PER_USER,
        requestedPerUser: perUser,
      },
      results,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: `サーバーエラー: ${String(error)}` }, { status: 500 });
  }
}
