'use client';

import { useState } from 'react';

export default function HomePage() {
  const [output, setOutput] = useState('Ready');
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
      <section className="card">
        <h1>Butterfly Tea X Client</h1>
        <p>タイムラインを表示しない、X連携専用ツールです。</p>
        <small>投稿機能はOFFにしています。ログインとユーザー確認のみ利用できます。</small>
        <div className="row">
          <a className="link-btn" href="/api/auth/x/login">
            Xでログイン
          </a>
          <button onClick={checkMe} disabled={loading}>
            ユーザー確認
          </button>
          <button onClick={logout} disabled={loading}>
            ログアウト
          </button>
        </div>
      </section>

      <section className="card">
        <h2>レスポンス</h2>
        <pre>{output}</pre>
      </section>
    </main>
  );
}
