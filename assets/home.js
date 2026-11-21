// トップページ：受付状況の数字、今日締切、商品タイル。
(() => {
  const { PRODUCTS, lotteriesFor, productHref, statusOf, sortLotteries, card, dayKey, fmt, fmtDate, left, esc, productKey, watchLoad, watchSave, watchToggle, syncWatchButtons } = window.CM;
  const DATA = window.LOTTERIES || [];
  const $ = (s) => document.querySelector(s);

  // 登録済みの商品に当てはまらない商品名は、自動でタイルを作る
  function allProducts(now) {
    const known = new Set(PRODUCTS.flatMap((p) => p.keys));
    const extra = [];
    DATA.filter((l) => statusOf(l, now) !== "closed").forEach((l) => l.products.forEach((n) => {
      if (!known.has(n) && !n.includes("各種")) { known.add(n); extra.push({ slug: null, name: n, kind: "商品", release: null, price: null, keys: [n], article: null, colors: ["#334155", "#94a3b8"] }); }
    }));
    return [...PRODUCTS, ...extra];
  }

  function tile(p, now) {
    const ls = lotteriesFor(p, DATA);
    const open = ls.filter((l) => statusOf(l, now) === "open");
    const upcoming = ls.filter((l) => statusOf(l, now) === "upcoming");
    const soonest = open.filter((l) => l.end).sort((a, b) => new Date(a.end) - new Date(b.end))[0];
    const href = productHref(p);
    const count = open.length ? `<span class="pt-count is-open">受付中 ${open.length}件</span>`
      : upcoming.length ? `<span class="pt-count is-upcoming">開始前 ${upcoming.length}件</span>`
      : `<span class="pt-count">受付中の抽選なし</span>`;
    const next = soonest ? `<span class="pt-next">最短締切 ${fmt(soonest.end)}（${left(soonest.end, now)}）</span>` : "";
    return {
      active: open.length + upcoming.length,
      html: `<li><a class="ptile" href="${href}" style="--c1:${p.colors[0]};--c2:${p.colors[1]}">
        <span class="pt-crimp" aria-hidden="true"></span>
        <span class="pt-kind">${esc(p.kind)}</span>
        <strong class="pt-name">${esc(p.name)}</strong>
        <span class="pt-meta">${p.release ? `${fmtDate(p.release)}発売` : ""}${p.price ? `<br>${esc(p.price)}` : ""}</span>
        <span class="pt-foot">${count}${next}</span>
        <span class="pt-crimp is-bottom" aria-hidden="true"></span>
      </a><button type="button" class="watch" data-watch="${esc(productKey(p))}" aria-pressed="false" aria-label="${esc(p.name)}をウォッチ" title="ウォッチ">☆</button></li>`,
    };
  }

  function render() {
    const now = Date.now();
    const open = DATA.filter((l) => statusOf(l, now) === "open");
    const today = open.filter((l) => l.end && dayKey(new Date(l.end)) === dayKey(new Date(now))).sort((a, b) => new Date(a.end) - new Date(b.end));
    const upcoming = DATA.filter((l) => statusOf(l, now) === "upcoming");
    $("#stat-open").textContent = open.length;
    $("#stat-today").textContent = today.length;
    $("#stat-upcoming").textContent = upcoming.length;

    $("#today").hidden = !today.length;
    $("#today-list").innerHTML = today.map((l) => `<li>${l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener nofollow">` : `<a href="lotteries.html">`}${esc(l.store)}</a><span>${fmt(l.end).split(" ")[1]} まで</span><b>${left(l.end, now)}</b></li>`).join("");

    const tiles = allProducts(now).map((p) => tile(p, now));
    tiles.sort((a, b) => (b.active > 0) - (a.active > 0));
    $("#product-grid").innerHTML = tiles.map((t) => t.html).join("");
    syncWatchButtons();
    renderWatch(now);
    renderMy(now);
  }

  // マイ抽選の状況（記録があるときだけ出す）
  function renderMy(now) {
    const el = $("#my-home");
    if (!el) return;
    const items = Object.values(window.CM.myLoad().items);
    if (!items.length) { el.hidden = true; return; }
    const plan = items.filter((it) => it.status === "plan");
    const soon = plan.filter((it) => statusOf(it, now) === "open" && it.end && new Date(it.end) - now < 24 * 3600000).length;
    const waiting = items.filter((it) => it.status === "applied").length;
    el.innerHTML = `<p style="margin:0"><strong>マイ抽選</strong>　応募予定 ${plan.length}件${soon ? `（<span class="is-hot">24時間以内に締切 ${soon}件</span>）` : ""}・結果待ち ${waiting}件</p><a href="my.html">マイ抽選を開く →</a>`;
    el.hidden = false;
  }
  document.addEventListener("cm:my-change", () => renderMy(Date.now()));

  // ウォッチ中の商品の抽選。前回このページを見たときに無かった抽選に NEW を付ける
  let fresh = null; // このページを開いている間は、開いた時点の NEW をそのまま表示する
  function renderWatch(now) {
    const w = watchLoad();
    const keys = Object.keys(w);
    const sec = $("#watch");
    if (!sec) return;
    if (!keys.length) { sec.hidden = true; return; }
    const prods = allProducts(now).filter((p) => w[productKey(p)]);
    const list = sortLotteries([...new Map(prods.flatMap((p) => lotteriesFor(p, DATA)).map((l) => [l.id, l])).values()]
      .filter((l) => statusOf(l, now) !== "closed"), now);
    if (!fresh) {
      fresh = new Set();
      prods.forEach((p) => {
        const k = productKey(p), seen = new Set(w[k].seen || []);
        const ids = lotteriesFor(p, DATA).filter((l) => statusOf(l, now) !== "closed").map((l) => l.id);
        ids.forEach((id) => { if (!seen.has(id)) fresh.add(id); });
        w[k].seen = ids; // 次に開いたときは、今回の分は NEW にしない
      });
      watchSave(w);
    }
    const names = prods.map((p) => p.name).join("・");
    const n = list.filter((l) => fresh.has(l.id)).length;
    $("#watch-note").textContent = `${names}${n ? `｜前回から新しい抽選が${n}件` : ""}`;
    $("#watch-list").innerHTML = list.length ? list.map((l) => card(l, now, { isNew: fresh.has(l.id) })).join("")
      : `<li class="empty">ウォッチ中の商品に、受付中・開始前の抽選はありません。</li>`;
    sec.hidden = false;
  }

  $("#product-grid").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-watch]");
    if (!b) return;
    e.preventDefault();
    const p = allProducts(Date.now()).find((x) => productKey(x) === b.dataset.watch);
    if (!p) return;
    watchToggle(p);
    render();
  });

  const up = (window.PAGES && window.PAGES.built) || window.SITE_UPDATED; // サイトを作り直した時刻
  if (up) { const el = $("#updated"); el.textContent = `${dayKey(new Date(up)).replace(/-/g, "/")} ${fmt(up).split(" ")[1]}`; el.dateTime = up; }
  render();
  setInterval(render, 60000);
})();
