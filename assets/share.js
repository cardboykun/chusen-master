// 画面右下の小さな「共有」ボタン（2026-11-21）。押すと画面の下に共有先の帯が出る。
// 共有するのはいま見ているページ（canonical の URL）とページの題名。外部のスクリプトは読み込まない（各サービスの共有用 URL を開くだけ）。
(() => {
  // 廃止した「ホーム画面に追加」の service worker が残っていたら取り除く
  if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});

  const en = document.documentElement.lang === "en";
  const T = en ? { share: "Share", copy: "Copy link", copied: "Link copied", more: "More", close: "Close" }
               : { share: "共有", copy: "リンクをコピー", copied: "リンクをコピーしました", more: "その他", close: "閉じる" };
  const url = () => (document.querySelector('link[rel="canonical"]') || {}).href || location.href.split("#")[0];
  const title = () => document.title.replace(/｜抽選マスターくん$/, "").replace(/\s*\|\s*Chusen Master$/, "");
  const enc = encodeURIComponent;
  const track = (method) => { try { window.gtag && gtag("event", "share", { method, content_type: "page", item_id: location.pathname }); } catch (e) { /* 計測できなくても動かす */ } };

  const SERVICES = [
    ["X", "x", () => `https://x.com/intent/post?text=${enc(title())}&url=${enc(url())}`],
    ["LINE", "line", () => `https://social-plugins.line.me/lineit/share?url=${enc(url())}`],
    ["Threads", "threads", () => `https://www.threads.net/intent/post?text=${enc(title() + "\n" + url())}`],
    ["Facebook", "facebook", () => `https://www.facebook.com/sharer/sharer.php?u=${enc(url())}`],
    ["はてブ", "hatena", () => `https://b.hatena.ne.jp/add?mode=confirm&url=${enc(url())}&title=${enc(title())}`],
  ];
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3"/></svg>';

  function copy() {
    const done = () => { toast(T.copied); track("copy"); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url()).then(done, fallback);
    else fallback();
    function fallback() {
      const ta = document.createElement("textarea");
      ta.value = url(); ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { prompt(T.copy, url()); }
      ta.remove();
    }
  }

  function toast(msg) {
    if (window.CM && CM.toast) return CM.toast(msg);
    const t = document.createElement("div");
    t.className = "shr-toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function mount() {
    if (document.querySelector(".shr-fab")) return;
    const fab = document.createElement("button");
    fab.type = "button"; fab.className = "shr-fab"; fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-controls", "shr-bar");
    fab.innerHTML = `${ICON}<span>${T.share}</span>`;
    const bar = document.createElement("div");
    bar.id = "shr-bar"; bar.className = "shr-bar"; bar.hidden = true; bar.setAttribute("role", "group"); bar.setAttribute("aria-label", T.share);
    bar.innerHTML = SERVICES.map(([label, key]) => `<a href="#" data-k="${key}" target="_blank" rel="noopener">${label}</a>`).join("")
      + `<button type="button" data-k="copy">${T.copy}</button>`
      + (navigator.share && matchMedia("(pointer:coarse)").matches ? `<button type="button" data-k="native">${T.more}</button>` : "")
      + `<button type="button" class="shr-x" data-k="close" aria-label="${T.close}">×</button>`;
    document.body.append(bar, fab);

    const open = (v) => { bar.hidden = !v; fab.setAttribute("aria-expanded", String(v)); fab.classList.toggle("on", v); };
    fab.addEventListener("click", () => open(bar.hidden));
    bar.addEventListener("click", (e) => {
      const el = e.target.closest("[data-k]");
      if (!el) return;
      const k = el.dataset.k;
      if (k === "close") return open(false);
      if (k === "copy") { copy(); return open(false); }
      if (k === "native") { navigator.share({ title: title(), url: url() }).then(() => track("native"), () => {}); return open(false); }
      const s = SERVICES.find((x) => x[1] === k);
      el.href = s[2]();  // クリックした瞬間の URL で開く（新しいタブ）
      track(k);
      setTimeout(() => open(false), 0);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !bar.hidden) { open(false); fab.focus(); } });
    document.addEventListener("click", (e) => { if (!bar.hidden && !bar.contains(e.target) && !fab.contains(e.target)) open(false); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
