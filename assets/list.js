// 抽選一覧ページ：すべての抽選を絞り込みながら表示する。
(() => {
  const { METHOD, condMatch, statusOf, sortLotteries, card, dayKey, fmt } = window.CM;
  const DATA = (window.LOTTERIES || []).slice();
  const $ = (s) => document.querySelector(s);
  const state = { status: "open", methods: new Set(Object.keys(METHOD)), q: "", product: "", cond: "", form: "" };

  function render() {
    const now = Date.now();
    const q = state.q.trim().toLowerCase();
    const list = sortLotteries(DATA.filter((l) => {
      if (state.status !== "all" && statusOf(l, now) !== state.status) return false;
      if (!state.methods.has(l.method)) return false;
      if (state.product && !l.products.includes(state.product)) return false;
      if (state.cond && !condMatch[state.cond](l.conditions)) return false;
      if (state.form && !(l.forms || []).includes(state.form)) return false;
      if (q && !(l.store + " " + l.products.join(" ") + " " + l.requirement).toLowerCase().includes(q)) return false;
      return true;
    }), now);
    const hint = state.form || state.cond ? "<br>抽選条件・販売形態は、公式の告知や当サイトの調べで分かったものだけを表示しています。「不明」の抽選は絞り込みに含まれません。" : "";
    $("#list").innerHTML = list.length ? list.map((l) => card(l, now)).join("") : `<li class="empty">条件に合う抽選はありません。${hint}</li>`;
    $("#count").textContent = `${list.length}件`;
  }

  // 商品プルダウン：終了していない抽選に出てくる商品を件数順に
  const productCount = {};
  DATA.filter((l) => statusOf(l) !== "closed").forEach((l) => l.products.forEach((p) => { productCount[p] = (productCount[p] || 0) + 1; }));
  Object.entries(productCount).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
    .forEach(([p, n]) => { const o = document.createElement("option"); o.value = p; o.textContent = `${p}（${n}件）`; $("#product").append(o); });

  document.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".seg button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    state.status = b.dataset.status; render();
  }));
  document.querySelectorAll(".chips input").forEach((c) => c.addEventListener("change", () => { c.checked ? state.methods.add(c.value) : state.methods.delete(c.value); render(); }));
  $("#q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  [["#product", "product"], ["#cond", "cond"], ["#form", "form"]].forEach(([id, key]) => $(id).addEventListener("change", (e) => { state[key] = e.target.value; render(); }));
  $("#reset").addEventListener("click", () => {
    Object.assign(state, { q: "", product: "", cond: "", form: "" });
    ["#q", "#product", "#cond", "#form"].forEach((id) => { $(id).value = ""; });
    document.querySelectorAll(".chips input").forEach((c) => { c.checked = true; state.methods.add(c.value); });
    render();
  });

  const params = new URLSearchParams(location.search);
  if (params.get("q")) { state.q = params.get("q"); $("#q").value = state.q; }
  if (params.get("product") && productCount[params.get("product")]) { state.product = params.get("product"); $("#product").value = state.product; }
  if (params.get("form") && $(`#form option[value="${params.get("form")}"]`)) { state.form = params.get("form"); $("#form").value = state.form; }
  const up = (window.PAGES && window.PAGES.built) || window.SITE_UPDATED; // サイトを作り直した時刻
  if (up) $("#updated").textContent = `${dayKey(new Date(up)).replace(/-/g, "/")} ${fmt(up).split(" ")[1]}`;
  render();
  setInterval(render, 60000);
})();
