// その他の抽選・販売情報ページ：ジャンルと受付状況で絞り込みながら表示する。
(() => {
  const { esc, fmt, statusOf, left, dayKey } = window.CM;
  const DATA = (window.OTHERS || []).slice();
  const $ = (s) => document.querySelector(s);
  const state = { status: "active", genre: "" };
  const NEW_DAYS = 3;

  function sortItems(list, now) {
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

  function card(o, now) {
    const st = statusOf(o, now);
    const stLabel = { open: "受付中", upcoming: "開始前", closed: "終了" }[st];
    const urgent = st === "open" && o.end && new Date(o.end) - now < 24 * 3600000;
    const isNew = o.posted && (now - new Date(o.posted + "T00:00:00+09:00")) < NEW_DAYS * 86400000;
    const dl = st === "upcoming"
      ? `<span class="label">受付開始</span><span class="date">${o.start ? fmt(o.start) : "日程未定"}</span>`
      : `<span class="label">${esc(o.endLabel || "締切")}</span><span class="date">${o.end ? esc(o.endText || fmt(o.end)) : "なし"}</span>${st === "open" && o.end ? `<span class="left">${left(o.end, now)}</span>` : ""}`;
    const period = o.schedule ? esc(o.schedule)
      : (o.start || o.end) ? `${o.start ? fmt(o.start) + " " : ""}〜 ${o.end ? fmt(o.end) : "なし"}` : "";
    const rows = [["期間", period], ...(o.details || []).map(([k, v]) => [esc(k), esc(v)])].filter(([, v]) => v);
    const posted = o.posted ? o.posted.replace(/-/g, "/") : "";
    return `<li class="card other-card ${st === "closed" ? "is-closed" : ""} ${urgent ? "is-urgent" : ""}">
      <div class="card-main">
        <div class="card-top"><span class="badge ${st}">${stLabel}</span><span class="badge method">${esc(o.type)}</span><span class="badge genre">${esc(o.genre)}</span>${isNew ? `<span class="badge new">NEW</span>` : ""}</div>
        <h3>${esc(o.title)}</h3>
        <p class="products">${esc(o.shop)}${o.place ? `<span class="place">｜${esc(o.place)}</span>` : ""}</p>
        <dl class="other-details">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
        ${o.note ? `<p class="req">${esc(o.note)}</p>` : ""}
        <p class="posted">掲載：<time datetime="${esc(o.posted)}">${esc(posted)}</time></p>
      </div>
      <div class="deadline">${dl}</div>
      <a class="go" href="${esc(o.url)}" target="_blank" rel="noopener nofollow">公式の告知・応募ページを見る →</a>
    </li>`;
  }

  function render() {
    const now = Date.now();
    const list = sortItems(DATA.filter((o) => {
      const st = statusOf(o, now);
      if (state.status === "active" && st === "closed") return false;
      if (state.status === "closed" && st !== "closed") return false;
      if (state.genre && o.genre !== state.genre) return false;
      return true;
    }), now);
    $("#list").innerHTML = list.length ? list.map((o) => card(o, now)).join("") : `<li class="empty">条件に合う情報はありません。</li>`;
    $("#count").textContent = `${list.length}件`;
  }

  // ジャンルのボタン：データに出てくるジャンルから自動で作る
  const genres = [...new Set(DATA.map((o) => o.genre).filter(Boolean))];
  const box = $("#genres");
  [["", "すべて"], ...genres.map((g) => [g, g])].forEach(([v, label]) => {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.genre = v; b.textContent = label;
    b.setAttribute("aria-pressed", String(v === ""));
    b.addEventListener("click", () => {
      box.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      state.genre = v; render();
    });
    box.append(b);
  });

  document.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".seg button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    state.status = b.dataset.status; render();
  }));

  const up = window.OTHERS_UPDATED;
  if (up) $("#updated").textContent = `${dayKey(new Date(up)).replace(/-/g, "/")} ${fmt(up).split(" ")[1]}`;
  render();
  setInterval(render, 60000);
})();
