// 締切カレンダーページ：月のカレンダーと、選んだ日に締め切る抽選の一覧。
(() => {
  const { dayKey, card, sortLotteries } = window.CM;
  const DATA = window.LOTTERIES || [];
  const $ = (s) => document.querySelector(s);
  const todayKey = () => dayKey(new Date());
  let [calY, calM] = todayKey().split("-").map(Number);
  let selected = todayKey();

  function counts() {
    const c = {};
    DATA.forEach((l) => { if (l.end) { const k = dayKey(new Date(l.end)); c[k] = (c[k] || 0) + 1; } });
    return c;
  }

  function renderCal() {
    $("#cal-title").textContent = `${calY}年${calM}月`;
    const c = counts();
    const first = new Date(Date.UTC(calY, calM - 1, 1)).getUTCDay();
    const days = new Date(Date.UTC(calY, calM, 0)).getUTCDate();
    let html = ["日", "月", "火", "水", "木", "金", "土"].map((d) => `<div class="dow">${d}</div>`).join("");
    for (let i = 0; i < first; i++) html += `<div class="day blank"></div>`;
    for (let d = 1; d <= days; d++) {
      const k = `${calY}-${String(calM).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const n = c[k] || 0;
      const cls = ["day", n ? "has" : "", k === todayKey() ? "today" : "", k === selected ? "sel" : "", k < todayKey() ? "past" : ""].join(" ");
      html += `<button class="${cls}" data-day="${k}" aria-label="${calM}月${d}日 締切${n}件"><span class="d">${d}</span>${n ? `<span class="n">${n}件</span>` : ""}</button>`;
    }
    $("#cal").innerHTML = html;
  }

  function renderDay() {
    const now = Date.now();
    const list = sortLotteries(DATA.filter((l) => l.end && dayKey(new Date(l.end)) === selected), now);
    const [y, m, d] = selected.split("-").map(Number);
    $("#day-title").textContent = `${m}月${d}日に締め切る抽選`;
    $("#day-list").innerHTML = list.length ? list.map((l) => card(l, now)).join("") : `<li class="empty">この日に締め切る抽選はありません。</li>`;
  }

  $("#cal").addEventListener("click", (e) => {
    const b = e.target.closest("[data-day]");
    if (!b) return;
    selected = b.dataset.day; renderCal(); renderDay();
    $("#day-title").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#prev").addEventListener("click", () => { calM--; if (calM < 1) { calM = 12; calY--; } renderCal(); });
  $("#next").addEventListener("click", () => { calM++; if (calM > 12) { calM = 1; calY++; } renderCal(); });
  renderCal(); renderDay();
})();
