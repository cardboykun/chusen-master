// 「ホーム画面に追加」（アプリとしてインストール）に必要な最小限の service worker。
// ページは保存しない（いつも最新を取りに行く）。電波が無いときだけ「オフラインです」の画面を出す。
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

const OFFLINE = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>オフライン｜抽選マスターくん</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d1330;color:#e9ecf7;
font-family:system-ui,"Hiragino Sans","Noto Sans JP",sans-serif;text-align:center;padding:24px}b{display:block;font-size:1.3rem;margin-bottom:8px}
button{margin-top:18px;font:inherit;font-weight:700;border:0;border-radius:999px;padding:10px 22px;background:#f0394a;color:#fff}</style></head>
<body><div><b>インターネットにつながっていません</b>電波の良いところで、もう一度開いてください。<br><button onclick="location.reload()">もう一度読み込む</button></div></body></html>`;

self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return; // 画像・広告などには手を出さない
  e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } })));
});
