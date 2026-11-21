// 「ホーム画面に追加」ボタン（2026-11-21）。全ページのフッターと、トップの案内カードに出す。
// - Android の Chrome・Edge・パソコンの Chrome/Edge など：ブラウザの「インストール」画面をそのまま開く
// - iPhone・iPad・Samsung Internet・Firefox・アプリ内ブラウザ（LINE・X など）：その端末に合わせた手順を出す
// - すでにホーム画面から開いているときは何も出さない
(() => {
  const ua = navigator.userAgent;
  const standalone = matchMedia("(display-mode: standalone)").matches || matchMedia("(display-mode: minimal-ui)").matches || navigator.standalone === true;
  if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  if (standalone || document.documentElement.lang !== "ja") return; // 英語のページにはボタンを出さない

  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const mobile = isIOS || isAndroid;
  const inApp = [[/\bLine\//i, "LINE"], [/FBAN|FBAV|FB_IAB/, "Facebook"], [/Instagram/, "Instagram"], [/Twitter|TwitterAndroid/i, "X"],
    [/YJApp/, "Yahoo! JAPAN"], [/MicroMessenger/, "WeChat"], [/GSA\//, "Google アプリ"], [/TikTok|BytedanceWebview|musical_ly/i, "TikTok"]]
    .find(([re]) => re.test(ua));
  let deferred = null;
  const track = (step) => { try { window.gtag && gtag("event", "pwa_install", { step, env: env() }); } catch (e) { /* 計測できなくても動かす */ } };

  function env() {
    if (inApp) return "inapp_" + inApp[1];
    if (isIOS) return /CriOS/.test(ua) ? "ios_chrome" : /FxiOS/.test(ua) ? "ios_firefox" : /EdgiOS/.test(ua) ? "ios_edge" : "ios_safari";
    if (isAndroid) return /SamsungBrowser/.test(ua) ? "android_samsung" : /Firefox/.test(ua) ? "android_firefox" : /EdgA/.test(ua) ? "android_edge" : "android_chrome";
    if (/Edg\//.test(ua)) return "pc_edge";
    if (/Firefox/.test(ua)) return "pc_firefox";
    if (/Chrome|Chromium/.test(ua)) return "pc_chrome";
    if (/Safari/.test(ua) && /Mac/.test(ua)) return "mac_safari";
    return "other";
  }

  const SHARE = '<svg class="pwa-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5v10h14V11h-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const DOTS = '<b class="pwa-key">⋮</b>';

  function guide() {
    const e = env();
    if (inApp) {
      const line = e === "inapp_LINE";
      return {
        title: `${inApp[1]} の中のブラウザでは追加できません`,
        steps: [
          line ? "下の「ブラウザで開く」を押す" : "画面の右上（または右下）の「…」や共有ボタンを押す",
          line ? "開いた Safari・Chrome で、もう一度「ホーム画面に追加」を押す" : `「${isIOS ? "Safari" : "ブラウザ"}で開く」を選ぶ`,
          ...(line ? [] : ["開いたページで、もう一度「ホーム画面に追加」を押す"]),
        ],
        action: line ? { label: "ブラウザで開く", href: location.href.split("#")[0] + (location.search ? "&" : "?") + "openExternalBrowser=1" } : null,
      };
    }
    const done = "ホーム画面に「抽選マスター」のアイコンができます。次からはアイコンを押すだけで開けます。";
    switch (e) {
      case "ios_safari": return { title: "iPhone・iPad（Safari）", note: done, steps: [
        `画面の下（iPad は右上）の共有ボタン ${SHARE} を押す（見当たらないときは「…」を押してから「共有」）`,
        "メニューを下にスクロールして「ホーム画面に追加」を選ぶ",
        "右上の「追加」を押す"] };
      case "ios_chrome": return { title: "iPhone・iPad（Chrome）", note: done + "（iOS 16.4 以降）", steps: [
        `アドレスバーの右にある共有ボタン ${SHARE} を押す`, "「ホーム画面に追加」を選ぶ（無いときは「その他」の中）", "右上の「追加」を押す"] };
      case "ios_firefox": case "ios_edge": return { title: "iPhone・iPad", note: done + "（iOS 16.4 以降）", steps: [
        "画面下のメニュー（≡ または …）を押す", `「共有」${SHARE} を選ぶ`, "「ホーム画面に追加」→ 右上の「追加」を押す"] };
      case "android_samsung": return { title: "Android（Samsung Internet）", note: done, steps: [
        "画面右下のメニュー（≡）を押す", "「現在のページを追加」を選ぶ", "「ホーム画面」を選んで「追加」を押す"] };
      case "android_firefox": return { title: "Android（Firefox）", note: done, steps: [
        `画面のメニュー（${DOTS}）を押す`, "「インストール」または「ホーム画面に追加」を選ぶ", "「追加」を押す"] };
      case "android_chrome": case "android_edge": return { title: "Android", note: done, steps: [
        `画面右上（Edge は下）のメニュー（${DOTS} または …）を押す`, "「ホーム画面に追加」または「アプリをインストール」を選ぶ", "「インストール」（または「追加」）を押す"] };
      case "pc_chrome": return { title: "パソコン（Chrome）", note: "デスクトップやスタートメニューから、アプリのように開けます。", steps: [
        "アドレスバーの右端にあるインストールのアイコン（画面に↓）を押す", `見当たらないときは、右上のメニュー（${DOTS}）→「キャスト、保存、共有」→「ページをアプリとしてインストール」`, "「インストール」を押す"] };
      case "pc_edge": return { title: "パソコン（Edge）", note: "デスクトップやスタートメニューから、アプリのように開けます。", steps: [
        "アドレスバーの右端にある「アプリを利用できます」のアイコンを押す", "見当たらないときは、右上のメニュー（…）→「アプリ」→「このサイトをアプリとしてインストール」", "「インストール」を押す"] };
      case "mac_safari": return { title: "Mac（Safari）", note: "Dock から、アプリのように開けます（macOS Sonoma 以降）。", steps: [
        "画面上のメニューバーの「ファイル」を押す", "「Dockに追加」を選ぶ", "「追加」を押す"] };
      case "pc_firefox": return { title: "パソコン（Firefox）", note: "Firefox はアプリとしての追加に対応していないため、ブックマークがおすすめです。", steps: [
        "Ctrl + D（Mac は ⌘ + D）を押す", "「保存」を押してブックマークに追加"] };
      default: return { title: "ホーム画面に追加", note: done, steps: [
        "ブラウザのメニュー（共有ボタンや ⋮）を開く", "「ホーム画面に追加」または「インストール」を選ぶ"] };
    }
  }

  function openGuide() {
    const g = guide();
    let m = document.getElementById("pwa-modal");
    if (m) m.remove();
    m = document.createElement("div");
    m.id = "pwa-modal";
    m.className = "pwa-modal";
    m.innerHTML = `<div class="pwa-sheet" role="dialog" aria-modal="true" aria-labelledby="pwa-t">
      <button type="button" class="pwa-close" aria-label="閉じる">×</button>
      <div class="pwa-head"><img src="/images/app/icon-192.png" alt="" width="52" height="52"><div><p class="pwa-k">ホーム画面に追加</p><h2 id="pwa-t">${g.title}</h2></div></div>
      <ol class="pwa-steps">${g.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      ${g.action ? `<a class="pwa-go" href="${g.action.href.replace(/["<>]/g, encodeURIComponent)}">${g.action.label}</a>` : ""}
      ${g.note ? `<p class="pwa-note">${g.note}</p>` : ""}
    </div>`;
    document.body.appendChild(m);
    const close = () => { m.remove(); document.removeEventListener("keydown", esc); };
    const esc = (ev) => { if (ev.key === "Escape") close(); };
    m.addEventListener("click", (ev) => { if (ev.target === m || ev.target.closest(".pwa-close")) close(); });
    document.addEventListener("keydown", esc);
    m.querySelector(".pwa-close").focus();
    track("guide");
  }

  async function onClick() {
    if (deferred) {
      const p = deferred;
      deferred = null;
      track("prompt");
      p.prompt();
      try { const r = await p.userChoice; track(r.outcome === "accepted" ? "accepted" : "dismissed"); } catch (e) { /* なにもしない */ }
      return;
    }
    openGuide();
  }

  const label = mobile || inApp ? "ホーム画面に追加" : "アプリとして追加";
  function mount() {
    const foot = document.querySelector(".site-footer .wrap");
    if (foot && !foot.querySelector(".pwa-foot")) {
      const d = document.createElement("div");
      d.className = "pwa-foot";
      d.innerHTML = `<button type="button" class="pwa-btn"><img src="/images/app/favicon-48.png" alt="" width="22" height="22">${label}</button><span>次からアイコンを押すだけで、すぐ抽選をチェックできます</span>`;
      foot.prepend(d);
    }
    const quick = document.querySelector(".block.quick");
    if (quick && !quick.querySelector(".pwa-card")) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "quick-card pwa-card";
      b.innerHTML = `<span class="qc-icon" aria-hidden="true">＋</span><strong>${label}</strong><span>アプリのように1タップで開けます。登録・ダウンロード不要</span>`;
      quick.appendChild(b);
    }
    document.querySelectorAll(".pwa-btn, .pwa-card").forEach((b) => { b.onclick = onClick; });
  }

  addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferred = e; });
  addEventListener("appinstalled", () => {
    deferred = null;
    document.querySelectorAll(".pwa-foot, .pwa-card").forEach((x) => x.remove());
    document.getElementById("pwa-modal")?.remove();
    track("installed");
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
