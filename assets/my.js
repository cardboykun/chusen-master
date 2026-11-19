// マイ抽選のページ：応募予定・結果待ち・当選・落選を、このブラウザの中だけで管理する（サーバーには送らない）。
// X への共有は Web インテント（押すと文面入りの投稿画面が開く）。共有文には当サイトのページへのリンクを入れる。
(() => {
  const { MY_STATUS, myLoad, mySave, myRemove, statusOf, fmt, left, esc, METHOD, BASE, toast, track } = window.CM;
  const $ = (s) => document.querySelector(s);
  const PAGES = window.PAGES || { stores: [] };
  const ORDER = ["plan", "applied", "won", "lost"];
  const UTM = "utm_source=x&utm_medium=social&utm_campaign=my_share";
  let tab = null;

  // 抽選データにまだ載っている抽選は、日程などを最新に合わせる（締切の変更など）
  function refresh() {
    const d = myLoad();
    let changed = false;
    (window.LOTTERIES || []).forEach((l) => {
      const it = d.items[l.id];
      if (!it) return;
      ["store", "products", "method", "start", "end", "url"].forEach((k) => {
        const v = l[k] ?? null;
        if (JSON.stringify(it[k]) !== JSON.stringify(v)) { it[k] = v; changed = true; }
      });
    });
    if (changed) mySave(d);
    return d;
  }

  const storeUrl = (it) => it.storeSlug && PAGES.stores.some((s) => s.slug === it.storeSlug) ? `${BASE}stores/${it.storeSlug}.html` : null;
  const short = (products) => {
    const s = products.slice(0, 3).join("・") + (products.length > 3 ? "ほか" : "");
    return s.length > 60 ? s.slice(0, 58) + "…" : s;
  };
  const shopName = (it) => it.store.replace(/ 各店$/, "");
  const intent = (text) => "https://x.com/intent/post?text=" + encodeURIComponent(text);

  function shareText(it) {
    const url = `${storeUrl(it) || `${BASE}lotteries.html`}?${UTM}`;
    const p = short(it.products);
    switch (it.status) {
      case "plan": return `${shopName(it)}の抽選に応募予定！\n🎴${p}\n🗓締切 ${it.end ? fmt(it.end) : "未公表"}\n\n締切は「抽選マスターくん」のマイ抽選で管理中\n#ポケカ抽選 #抽選マスターくん\n${url}`;
      case "applied": return `${shopName(it)}の抽選に応募しました🙏\n🎴${p}\n\n結果待ち…！当たりますように\n#ポケカ抽選 #抽選マスターくん\n${url}`;
      case "won": return `🎉${shopName(it)}の抽選に当選しました！\n🎴${p}\n\n#ポケカ抽選 #抽選マスターくん\n${url}`;
      default: return `${shopName(it)}の抽選は落選でした…😢\n🎴${p}\n\n次こそ当てたい！\n#ポケカ抽選 #抽選マスターくん\n${url}`;
    }
  }

  function stats(items) {
    const n = (s) => items.filter((it) => it.status === s).length;
    const plan = n("plan"), applied = n("applied"), won = n("won"), lost = n("lost");
    const total = applied + won + lost, decided = won + lost;
    return { plan, applied, won, lost, total, rate: decided ? Math.round((won / decided) * 100) : null };
  }

  function statsShare(s) {
    return `私のポケカ抽選の記録\n📮応募 ${s.total}回\n🎉当選 ${s.won}回${s.rate != null ? `（当選率 ${s.rate}%）` : ""}\n⏳結果待ち ${s.applied}件・応募予定 ${s.plan}件\n\n「抽選マスターくん」のマイ抽選で記録中\n#ポケカ抽選 #抽選マスターくん\n${BASE}my.html?${UTM}`;
  }

  function sortFor(status, list) {
    const t = (iso, fb) => (iso ? new Date(iso).getTime() : fb);
    if (status === "plan") return list.sort((a, b) => t(a.end, Infinity) - t(b.end, Infinity));
    if (status === "applied") return list.sort((a, b) => t(a.end, 0) - t(b.end, 0));
    return list.sort((a, b) => t(b.updated, 0) - t(a.updated, 0));
  }

  function actions(it) {
    const b = (to, label, cls = "") => `<button type="button" class="my-act ${cls}" data-to="${to}">${label}</button>`;
    const main = {
      plan: b("applied", "✓ 応募した", "is-main"),
      applied: b("won", "🎉 当選", "is-won") + b("lost", "落選", "is-lost") + b("plan", "応募予定に戻す"),
      won: b("applied", "結果待ちに戻す"),
      lost: b("applied", "結果待ちに戻す"),
    }[it.status];
    return `${main}<button type="button" class="my-act is-remove" data-remove>外す</button>`;
  }

  function item(it, now) {
    const st = statusOf(it, now);
    const stLabel = { open: "受付中", upcoming: "開始前", closed: "受付終了" }[st];
    const urgent = it.status === "plan" && st === "open" && it.end && new Date(it.end) - now < 24 * 3600000;
    const missed = it.status === "plan" && st === "closed";
    const href = storeUrl(it);
    const dl = st === "upcoming"
      ? `<span class="label">受付開始</span><span class="date">${it.start ? fmt(it.start) : "日程未定"}</span>`
      : `<span class="label">締切</span><span class="date">${it.end ? fmt(it.end) : "未公表"}</span>${st === "open" && it.end ? `<span class="left">${left(it.end, now)}</span>` : ""}`;
    return `<li class="card my-item ${urgent ? "is-urgent" : ""} ${missed ? "is-closed" : ""}" data-id="${esc(it.id)}">
      <div class="card-main">
        <div class="card-top"><span class="badge my-st is-${it.status}">${MY_STATUS[it.status]}</span><span class="badge ${st}">${stLabel}</span><span class="badge method">${METHOD[it.method] || esc(it.method || "")}</span></div>
        <h3>${href ? `<a href="${href}">${esc(it.store)}</a>` : esc(it.store)}</h3>
        <p class="products">${(it.products || []).map(esc).join(" / ")}</p>
        ${missed ? `<p class="my-warn">締切を過ぎました。応募した場合は「応募した」を押してください。</p>` : ""}
      </div>
      <div class="deadline">${dl}</div>
      <div class="my-actions">${actions(it)}</div>
      <input class="my-memo" type="text" maxlength="120" value="${esc(it.memo || "")}" placeholder="メモ（例：当選したら11/30までに受け取り）" aria-label="メモ">
      <div class="card-foot">${it.url ? `<a class="go" href="${esc(it.url)}" target="_blank" rel="noopener nofollow">お店のページを見る →</a>` : ""}<a class="x-share" href="${intent(shareText(it))}" target="_blank" rel="noopener" data-share="${it.status}">𝕏 でシェア</a></div>
    </li>`;
  }

  function render() {
    const now = Date.now();
    const items = Object.values(refresh().items);
    $("#my-intro").hidden = items.length > 0;
    $("#my-main").hidden = items.length === 0;
    if (!items.length) return;
    const s = stats(items);
    if (!tab || !items.some((it) => it.status === tab)) {
      const want = location.hash.slice(1);
      tab = ORDER.includes(want) && items.some((it) => it.status === want) ? want
        : tab && ORDER.includes(tab) ? tab : ORDER.find((k) => items.some((it) => it.status === k)) || "plan";
    }
    const todayPlan = items.filter((it) => it.status === "plan" && statusOf(it, now) === "open" && it.end && new Date(it.end) - now < 24 * 3600000).length;
    $("#my-stats").innerHTML = `
      <div class="my-num"><b>${s.plan}</b><span>応募予定</span></div>
      <div class="my-num"><b>${s.total}</b><span>応募した</span></div>
      <div class="my-num is-won"><b>${s.won}</b><span>当選</span></div>
      <div class="my-num"><b>${s.rate != null ? `${s.rate}<small>%</small>` : "–"}</b><span>当選率</span></div>
      <p class="my-stats-foot">${todayPlan ? `<strong>24時間以内に締め切る応募予定が${todayPlan}件あります</strong>` : "当選率は「当選」と「落選」の数から計算しています"}
        <a class="x-share" href="${intent(statsShare(s))}" target="_blank" rel="noopener" data-share="stats">𝕏 で記録をシェア</a></p>`;
    document.querySelectorAll(".my-tabs button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.tab === tab));
      b.querySelector("span").textContent = s[b.dataset.tab];
    });
    const list = sortFor(tab, items.filter((it) => it.status === tab));
    $("#my-list").innerHTML = list.length ? list.map((it) => item(it, now)).join("")
      : `<li class="empty">${MY_STATUS[tab]}の抽選はありません。</li>`;
  }

  document.querySelector(".my-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-tab]");
    if (!b) return;
    tab = b.dataset.tab;
    history.replaceState(null, "", `#${tab}`);
    render();
  });

  $("#my-list").addEventListener("click", (e) => {
    const li = e.target.closest("li[data-id]");
    if (!li) return;
    const id = li.dataset.id;
    const share = e.target.closest("a[data-share]");
    if (share) { track("share", { method: "x", content_type: "my_" + share.dataset.share }); return; }
    const to = e.target.closest("button[data-to]");
    if (to) {
      const d = myLoad(), it = d.items[id];
      if (!it) return;
      it.status = to.dataset.to;
      it.updated = new Date().toISOString();
      mySave(d);
      track("my_list", { action: it.status });
      const msg = { applied: "「結果待ち」に移しました", won: "おめでとうございます！「当選」に記録しました", lost: "「落選」に記録しました。次こそ！", plan: "「応募予定」に戻しました" }[it.status];
      render();
      toast(`${msg} <a href="#${it.status}" class="toast-go" data-tab="${it.status}">見る</a>`);
      return;
    }
    if (e.target.closest("button[data-remove]")) {
      const it = myLoad().items[id];
      if (it && it.status !== "plan" && !confirm(`マイ抽選から外しますか？（${MY_STATUS[it.status]}の記録も消えます）`)) return;
      const old = myRemove(id);
      render();
      const t = toast(`マイ抽選から外しました <button type="button" class="toast-undo">元に戻す</button>`);
      t.querySelector(".toast-undo").onclick = () => { const d = myLoad(); d.items[id] = old; mySave(d); render(); t.classList.remove("show"); };
    }
  });

  $("#my-stats").addEventListener("click", (e) => { if (e.target.closest("a[data-share]")) track("share", { method: "x", content_type: "my_stats" }); });

  // トーストの「見る」で、そのタブに切り替える
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".toast-go");
    if (!a) return;
    e.preventDefault();
    tab = a.dataset.tab;
    history.replaceState(null, "", `#${tab}`);
    render();
    $("#my-main").scrollIntoView({ behavior: "smooth" });
  });

  // メモは入力をやめたら保存する
  $("#my-list").addEventListener("change", (e) => {
    if (!e.target.classList.contains("my-memo")) return;
    const id = e.target.closest("li[data-id]").dataset.id;
    const d = myLoad();
    if (!d.items[id]) return;
    d.items[id].memo = e.target.value.slice(0, 120);
    mySave(d);
    toast("メモを保存しました");
  });

  // 引き継ぎコード：記録を文字列にしてコピー → 別の端末で貼り付け
  const encode = (obj) => "CM1:" + btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  const decode = (s) => JSON.parse(decodeURIComponent(escape(atob(s.trim().replace(/^CM1:/, "")))));
  $("#my-export").addEventListener("click", async () => {
    const items = myLoad().items;
    if (!Object.keys(items).length) { toast("まだマイ抽選に記録がありません"); return; }
    const code = encode(items);
    try { await navigator.clipboard.writeText(code); toast("引き継ぎコードをコピーしました。別の端末のこのページに貼り付けてください"); }
    catch (e) { const ta = $("#my-import-text"); ta.value = code; ta.select(); toast("下の欄にコードを出しました。長押し（右クリック）でコピーしてください"); }
  });
  $("#my-import").addEventListener("click", () => {
    let items;
    try { items = decode($("#my-import-text").value); } catch (e) { items = null; }
    if (!items || typeof items !== "object") { toast("コードを読み込めませんでした。CM1: から最後まで、すべてコピーできているか確認してください"); return; }
    const d = myLoad();
    let n = 0;
    Object.values(items).forEach((it) => {
      if (!it || !it.id || !it.store || !Array.isArray(it.products) || !MY_STATUS[it.status]) return;
      const cur = d.items[it.id];
      if (!cur || new Date(it.updated || 0) > new Date(cur.updated || 0)) { d.items[it.id] = it; n++; }
    });
    mySave(d);
    $("#my-import-text").value = "";
    tab = null;
    render();
    toast(n ? `${n}件の記録を読み込みました` : "新しく読み込む記録はありませんでした");
  });

  render();
  setInterval(() => { if (!(document.activeElement && document.activeElement.classList.contains("my-memo"))) render(); }, 60000);
})();
