// 「抽選・予約情報」欄（商品記事・商品ページ・店舗別ページ）：受付中・開始前の抽選を最新の時刻で描き直す。
// 欄の中身は build_articles.py がビルド時に HTML へ書き込んである（検索エンジン向け）。
// 「受付終了した抽選」は過去分（tools/lottery_archive.json）から作ってあるので、ここでは触らない。
(() => {
  const { PRODUCTS, lotteriesFor, storeOf, sortLotteries, statusOf, card } = window.CM;
  const sec = document.querySelector("#lottery[data-product], #lottery[data-store]");
  if (!sec) return;
  let pick;
  if (sec.dataset.product) {
    const p = PRODUCTS.find((x) => x.slug === sec.dataset.product);
    if (!p) return;
    pick = () => lotteriesFor(p);
  } else {
    pick = () => (window.LOTTERIES || []).filter((l) => (storeOf(l) || {}).slug === sec.dataset.store);
  }

  function render() {
    const now = Date.now();
    const active = sortLotteries(pick(), now).filter((l) => statusOf(l, now) !== "closed");
    const open = active.filter((l) => statusOf(l, now) === "open").length;
    sec.querySelector(".pl-list").innerHTML = active.length
      ? active.map((l) => card(l, now)).join("")
      : `<li class="empty">現在、受付中・開始前の抽選はありません。新しい抽選は毎日お昼にチェックして追加しています。</li>`;
    document.querySelectorAll("[data-lottery-count]").forEach((el) => {
      el.textContent = open ? `受付中 ${open}件` : active.length ? `開始前 ${active.length}件` : "受付中の抽選なし";
    });
  }
  // 商品ページ・商品記事の「☆ この商品をウォッチ」
  const { productKey, watchToggle, syncWatchButtons } = window.CM;
  const wb = sec.querySelector(".watch-btn[data-watch]");
  if (wb && sec.dataset.product) {
    const p = PRODUCTS.find((x) => x.slug === sec.dataset.product);
    if (p && productKey(p) === wb.dataset.watch) {
      wb.addEventListener("click", () => { watchToggle(p); syncWatchButtons(); });
      syncWatchButtons();
    }
  }
  render();
  setInterval(render, 60000);
})();
