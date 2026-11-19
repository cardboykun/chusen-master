// 共通の部品：日付の表示、抽選の状態判定、抽選カードの描画、商品との対応づけ。
(() => {
  const TZ = "Asia/Tokyo";
  // サイトのトップのURL（このファイルの場所から求める。記事・店舗ページなど、どの階層から読んでも同じ）
  const BASE = new URL("../", document.currentScript ? document.currentScript.src : location.href).href;
  // build_articles.py が作る data/pages.js：店舗別ページ・商品ページの一覧
  const PAGES = window.PAGES || { stores: [], products: [] };
  const storeOf = (l) => PAGES.stores.find((s) => s.match.some((m) => l.store.includes(m)));
  const storeHref = (l) => { const s = storeOf(l); return s ? `${BASE}stores/${s.slug}.html` : null; };
  const METHOD = { web: "Web", app: "アプリ", store: "店頭", x: "X", invite: "招待制" };
  const FORM = { box_shrink: "BOX（シュリンク付き）", box_noshrink: "BOX（シュリンクなし）", box_noperi: "BOX（ペリペリなし）", pack: "パック", set: "デッキ・セット商品" };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dayKey = (d) => new Intl.DateTimeFormat("sv-SE", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  const fmt = (iso) => {
    if (!iso) return null;
    const p = Object.fromEntries(new Intl.DateTimeFormat("ja-JP", { timeZone: TZ, month: "numeric", day: "numeric", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
    return `${p.month}/${p.day}(${p.weekday}) ${p.hour}:${p.minute}`;
  };
  const fmtDate = (ymd) => { if (!ymd) return null; const [y, m, d] = ymd.split("-").map(Number); return `${y}年${m}月${d}日`; };
  const statusOf = (l, now = Date.now()) => {
    if (l.tentative && !l.start) return "upcoming";
    if (l.start && new Date(l.start) > now) return "upcoming";
    if (l.end && new Date(l.end) < now) return "closed";
    return "open";
  };
  const left = (iso, now = Date.now()) => {
    if (!iso) return "";
    const ms = new Date(iso) - now;
    if (ms <= 0) return "受付終了";
    const h = Math.floor(ms / 3600000);
    if (h < 1) return `あと${Math.max(1, Math.floor(ms / 60000))}分`;
    if (h < 24) return `あと${h}時間`;
    return `あと${Math.floor(h / 24)}日`;
  };
  const condMatch = {
    none: (c) => Array.isArray(c) && c.length === 0,
    member: (c) => Array.isArray(c) && c.every((x) => x === "会員登録"),
    nohistory: (c) => Array.isArray(c) && !c.includes("購入実績"),
  };

  function sortLotteries(list, now = Date.now()) {
    const t = (iso, fb) => (iso ? new Date(iso).getTime() : fb);
    const rank = { open: 0, upcoming: 1, closed: 2 };
    return list.sort((a, b) => {
      const sa = statusOf(a, now), sb = statusOf(b, now);
      if (sa !== sb) return rank[sa] - rank[sb];
      if (sa === "open") return t(a.end, Infinity) - t(b.end, Infinity);
      if (sa === "upcoming") return t(a.start, Infinity) - t(b.start, Infinity);
      return t(b.end, 0) - t(a.end, 0);
    });
  }

  function card(l, now = Date.now(), opts = {}) {
    const st = statusOf(l, now);
    const stLabel = { open: "受付中", upcoming: l.tentative ? "予定" : "開始前", closed: "受付終了" }[st];
    const urgent = st === "open" && l.end && new Date(l.end) - now < 24 * 3600000;
    const dl = st === "upcoming"
      ? `<span class="label">受付開始</span><span class="date">${l.start ? fmt(l.start) : "日程未定"}</span>`
      : `<span class="label">締切</span><span class="date">${l.end ? fmt(l.end) : "未公表"}</span>${st === "open" && l.end ? `<span class="left">${left(l.end, now)}</span>` : ""}`;
    const period = l.start || l.end ? `<span class="badge">${l.start ? fmt(l.start) : "?"} 〜 ${l.end ? fmt(l.end) : "未公表"}</span>` : "";
    const c = l.conditions;
    const condBadge = c == null ? `<span class="badge muted">抽選条件：不明</span>`
      : c.length === 0 ? `<span class="badge cond-none">条件なし</span>`
      : `<span class="badge cond">条件：${c.map(esc).join("・")}</span>`;
    const forms = (l.forms || []).filter((f) => FORM[f]);
    const formBadge = forms.length ? forms.map((f) => `<span class="badge form">${FORM[f]}</span>`).join("") : `<span class="badge muted">販売形態：不明</span>`;
    return `<li class="card ${st === "closed" ? "is-closed" : ""} ${urgent ? "is-urgent" : ""}">
      <div class="card-main">
        <div class="card-top">${opts.isNew ? `<span class="badge new">NEW</span>` : ""}<span class="badge ${st}">${stLabel}</span><span class="badge method">${METHOD[l.method] || esc(l.method)}</span>${l.verified === false ? `<span class="badge unverified" title="応募前に必ずお店の公式情報をご確認ください。">公式未確認</span>` : ""}</div>
        <h3>${storeHref(l) ? `<a href="${storeHref(l)}">${esc(l.store)}</a>` : esc(l.store)}</h3>
        <p class="products">${l.products.map(esc).join(" / ")}</p>
        <p class="req">${esc(l.requirement)}</p>${l.verified === false ? `<p class="unverified-note">※応募前に必ずお店の公式情報をご確認ください。</p>` : ""}
        <div class="meta">${condBadge}${formBadge}${period}</div>
      </div>
      <div class="deadline">${dl}</div>
      <div class="card-foot">${l.url ? `<a class="go" href="${esc(l.url)}" target="_blank" rel="noopener nofollow">${l.verified === false ? "お店のページを見る →" : "公式の応募ページ・告知を見る →"}</a>` : ""}${st !== "closed" ? myButton(l.id) : ""}</div>
    </li>`;
  }

  // 商品（PRODUCTS）と抽選の対応
  const PRODUCTS = window.PRODUCTS || [];
  const productOf = (name) => PRODUCTS.find((p) => p.keys.includes(name));
  const lotteriesFor = (p, data = window.LOTTERIES || []) => data.filter((l) => l.products.some((n) => p.keys.includes(n)));
  const productHref = (p) => p.article ? `${BASE}articles/${p.article}.html`
    : p.slug && PAGES.products.includes(p.slug) ? `${BASE}products/${p.slug}.html`
    : `${BASE}lotteries.html?product=${encodeURIComponent(p.keys[0])}`;

  // 商品ウォッチ：ウォッチした商品と「前回見た抽選」をこのブラウザの中だけに記録する（サーバーには送らない）
  const WATCH_KEY = "cm-watch-v1";
  const productKey = (p) => p.slug || `name:${p.keys[0]}`;
  const watchLoad = () => { try { return JSON.parse(localStorage.getItem(WATCH_KEY)) || {}; } catch (e) { return {}; } };
  const watchSave = (w) => { try { localStorage.setItem(WATCH_KEY, JSON.stringify(w)); } catch (e) { /* 保存できない環境では何もしない */ } };
  const activeIds = (p, now = Date.now()) => lotteriesFor(p).filter((l) => statusOf(l, now) !== "closed").map((l) => l.id);
  function watchToggle(p) {
    const w = watchLoad(), k = productKey(p);
    if (w[k]) delete w[k];
    else w[k] = { name: p.name, seen: activeIds(p) }; // ウォッチした時点の抽選は「新着」にしない
    watchSave(w);
    return !!w[k];
  }
  function syncWatchButtons(root = document) {
    const w = watchLoad();
    root.querySelectorAll("[data-watch]").forEach((b) => {
      const on = !!w[b.dataset.watch];
      b.setAttribute("aria-pressed", String(on));
      if (b.classList.contains("watch")) b.textContent = on ? "★" : "☆";
      else b.textContent = on ? "★ ウォッチ中" : "☆ この商品をウォッチ";
    });
  }

  // マイ抽選：応募の予定・結果を、このブラウザの中だけに記録する（サーバーには送らない）
  // 抽選データは締切の7日後に消えるので、店名・商品名・日程なども一緒に保存しておく
  const MY_KEY = "cm-my-v1";
  const MY_STATUS = { plan: "応募予定", applied: "結果待ち", won: "当選", lost: "落選" };
  const myLoad = () => { try { const d = JSON.parse(localStorage.getItem(MY_KEY)); return d && d.items ? d : { items: {} }; } catch (e) { return { items: {} }; } };
  const mySave = (d) => { try { localStorage.setItem(MY_KEY, JSON.stringify(d)); return true; } catch (e) { return false; } };
  const myButton = (id) => {
    const it = myLoad().items[id];
    return `<button type="button" class="my-btn" data-my="${esc(id)}" aria-pressed="${it ? "true" : "false"}">${it ? `✓ マイ抽選（${MY_STATUS[it.status]}）` : "＋ マイ抽選に追加"}</button>`;
  };
  const snapshot = (l) => {
    const s = storeOf(l);
    return { id: l.id, store: l.store, products: l.products, method: l.method, start: l.start || null, end: l.end || null, url: l.url || null, storeSlug: s ? s.slug : null };
  };
  const track = (name, params) => { try { if (window.gtag) window.gtag("event", name, params || {}); } catch (e) { /* 計測できなくても動く */ } };
  function myAdd(l) {
    const d = myLoad(), now = new Date().toISOString();
    d.items[l.id] = Object.assign(snapshot(l), { status: "plan", memo: "", added: now, updated: now });
    mySave(d);
  }
  function myRemove(id) { const d = myLoad(); const old = d.items[id]; delete d.items[id]; mySave(d); return old; }
  function syncMyButtons(root = document) {
    const items = myLoad().items;
    root.querySelectorAll("button[data-my]").forEach((b) => {
      const it = items[b.dataset.my];
      b.setAttribute("aria-pressed", it ? "true" : "false");
      b.textContent = it ? `✓ マイ抽選（${MY_STATUS[it.status]}）` : "＋ マイ抽選に追加";
    });
  }
  let toastTimer;
  function toast(html) {
    let el = document.getElementById("cm-toast");
    if (!el) { el = document.createElement("div"); el.id = "cm-toast"; el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.innerHTML = html; el.hidden = false; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.classList.remove("show"); }, 5000);
    return el;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-my]");
    if (!b) return;
    const id = b.dataset.my, it = myLoad().items[id];
    if (it) {
      if (it.status !== "plan" && !confirm(`マイ抽選から外しますか？（${MY_STATUS[it.status]}の記録も消えます）`)) return;
      const old = myRemove(id);
      syncMyButtons();
      const t = toast(`マイ抽選から外しました <button type="button" class="toast-undo">元に戻す</button>`);
      t.querySelector(".toast-undo").onclick = () => { const d = myLoad(); d.items[id] = old; mySave(d); syncMyButtons(); t.classList.remove("show"); };
      track("my_list", { action: "remove" });
    } else {
      const l = (window.LOTTERIES || []).find((x) => x.id === id);
      if (!l) return;
      myAdd(l);
      syncMyButtons();
      toast(`マイ抽選に追加しました <a href="${BASE}my.html">マイ抽選を見る →</a>`);
      track("my_list", { action: "add" });
    }
    document.dispatchEvent(new CustomEvent("cm:my-change"));
  });
  // ビルド時に書き込まれたカード（記事・店舗ページなど）のボタンも、このブラウザの記録に合わせる
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => syncMyButtons());
  else syncMyButtons();

  window.CM = { TZ, METHOD, FORM, esc, dayKey, fmt, fmtDate, statusOf, left, condMatch, sortLotteries, card, PRODUCTS, productOf, lotteriesFor, productHref, storeOf, BASE, productKey, watchLoad, watchSave, watchToggle, syncWatchButtons, activeIds, MY_STATUS, myLoad, mySave, myRemove, syncMyButtons, toast, track };
})();
