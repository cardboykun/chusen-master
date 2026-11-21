// 「ホーム画面に追加」の機能は 2026-11-21 に廃止した。
// その前に一度サイトを開いた人のブラウザに残っている service worker を、自分で取り除くためだけのファイル（消さないこと）。
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
  })());
});
