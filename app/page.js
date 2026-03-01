'use client';

import { useState } from 'react';

export default function HomePage() {
  const [output, setOutput] = useState('Ready');
  const [targetUsers, setTargetUsers] = useState('SoumaTea');
  const [perUser, setPerUser] = useState(2);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  function toJaError(payload) {
    if (!payload) return payload;
    if (payload.ok) return payload;

    if (payload.error === 'Not logged in') {
      return { ...payload, error: '未ログインです。先に「Xでログイン」を実行してください。' };
    }
    if (payload.code === 'POST_DISABLED') {
      return { ...payload, error: 'このアプリでは投稿機能を無効化しています。' };
    }

    return payload;
  }

  async function checkMe() {
    setLoading(true);
    try {
      const resp = await fetch('/api/x/me', { cache: 'no-store' });
      const json = await resp.json();
      setOutput(JSON.stringify(toJaError(json), null, 2));
    } catch (error) {
      setOutput(
        JSON.stringify({ ok: false, error: `通信エラー: ${String(error)}` }, null, 2)
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadLimitedFeed() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        users: targetUsers,
        perUser: String(perUser),
      });
      const resp = await fetch(`/api/x/limited-feed?${params.toString()}`, { cache: 'no-store' });
      const json = await resp.json();
      setOutput(JSON.stringify(toJaError(json), null, 2));

      if (json.ok && Array.isArray(json.results)) {
        const items = json.results.flatMap((result) => {
          if (!result.ok || !Array.isArray(result.tweets)) return [];
          return result.tweets.map((t) => ({
            id: t.id,
            username: result.username,
            name: result.user?.name || result.username,
            text: t.text,
            created_at: t.created_at,
          }));
        });
        items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setFeed(items);
      } else {
        setFeed([]);
      }
    } catch (error) {
      setOutput(
        JSON.stringify({ ok: false, error: `取得通信エラー: ${String(error)}` }, null, 2)
      );
      setFeed([]);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      const resp = await fetch('/api/auth/logout', { method: 'POST' });
      const json = await resp.json();
      setOutput(JSON.stringify(json, null, 2));
    } catch (error) {
      setOutput(
        JSON.stringify({ ok: false, error: `ログアウト通信エラー: ${String(error)}` }, null, 2)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="card hero">
        <span className="chip">NO TIMELINE MODE</span>
        <h1>Butterfly Tea X Client</h1>
        <p>タイムラインを見ずに使うための、X連携専用ツールです。</p>
        <small>投稿機能はOFFです。ログインとアカウント確認のみ利用できます。</small>
        <div className="row">
          <a className="link-btn primary" href="/api/auth/x/login">
            Xでログイン
          </a>
          <button className="ghost" onClick={checkMe} disabled={loading}>
            ユーザー確認
          </button>
          <button className="ghost" onClick={logout} disabled={loading}>
            ログアウト
          </button>
        </div>
      </section>

      <section className="card">
        <h2>使い方</h2>
        <ol className="steps">
          <li>「Xでログイン」から認可を開始する</li>
          <li>戻ったら「ユーザー確認」を押す</li>
          <li>指定ユーザーの投稿だけ「制限付き閲覧」で確認する</li>
          <li>利用終了時に「ログアウト」する</li>
        </ol>
      </section>

      <section className="card">
        <h2>制限付き閲覧</h2>
        <p>指定したユーザーの最新投稿だけを取得します。ホームタイムラインは使いません。</p>
        <div className="form-grid">
          <label>
            対象ユーザー（カンマ区切り）
            <input
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              placeholder="SoumaTea,xdev"
            />
          </label>
          <label>
            1ユーザーあたり件数（1-5）
            <input
              type="number"
              min={1}
              max={5}
              value={perUser}
              onChange={(e) => setPerUser(Number(e.target.value || 2))}
            />
          </label>
        </div>
        <div className="row">
          <button className="primary" onClick={loadLimitedFeed} disabled={loading || !targetUsers.trim()}>
            制限付きで取得
          </button>
        </div>
      </section>

      <section className="card">
        <h2>取得結果</h2>
        {!feed.length ? (
          <p>まだ取得していません。</p>
        ) : (
          <ul className="feed-list">
            {feed.map((item) => (
              <li key={`${item.username}-${item.id}`} className="feed-item">
                <div className="feed-meta">
                  <strong>{item.name}</strong> @{item.username}
                  {item.created_at ? (
                    <span>{new Date(item.created_at).toLocaleString('ja-JP')}</span>
                  ) : null}
                </div>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>レスポンス</h2>
        <pre>{output}</pre>
      </section>
    </main>
  );
}
