// 商品の一覧（トップの「商品から探す」に並ぶ）。
// keys: 抽選データ(lotteries.js)の products に出てくる商品名。どれかが一致した抽選をこの商品の抽選として表示する。
// article: 記事のスラッグ（articles/<slug>.html）。null なら抽選一覧の絞り込みページへリンクする。
// colors: タイルの配色（自作のグラデーション。公式の画像は使わない）
// ここに無い商品名が抽選データに出てきた場合も、トップに自動でタイルが作られる。
window.PRODUCTS = [
  { slug: "hadou-seeker", name: "ハドウシーカー", kind: "拡張パック", release: "2026-11-27", price: "1パック200円",
    keys: ["ハドウシーカー"], article: "hadou-seeker", colors: ["#1e3a8a", "#0ea5e9"] },
  { slug: "30th-celebration", name: "30th CELEBRATION", kind: "拡張パック", release: "2026-09-16", price: "1パック360円",
    keys: ["30th CELEBRATION BOX", "30th CELEBRATION カードセット"], article: null, colors: ["#7c2d12", "#f59e0b"] },
  { slug: "30th-premium-deck-espeon-umbreon", name: "プレミアムデッキセット エーフィ・ブラッキー", kind: "30th デッキ", release: "2026-09-16", price: "6,200円",
    keys: ["30th CELEBRATION プレミアムデッキセット エーフィ・ブラッキー"], article: null, colors: ["#312e81", "#c026d3"] },
  { slug: "30th-futuristic-box", name: "FUTURISTIC BOX", kind: "30th 記念BOX", release: "2026-09-16", price: "27,500円",
    keys: ["30th CELEBRATION FUTURISTIC BOX"], article: null, colors: ["#0f172a", "#22d3ee"] },
  { slug: "special-deck-set-mega", name: "スペシャルデッキセットMEGA", kind: "デッキセット", release: "2026-11-13", price: "5,500円",
    keys: ["スペシャルデッキセットMEGA"], article: null, colors: ["#4c1d95", "#f97316"] },
  { slug: "storm-emeralda", name: "ストームエメラルダ", kind: "拡張パック", release: "2026-07-31", price: "1パック200円",
    keys: ["ストームエメラルダ"], article: null, colors: ["#064e3b", "#10b981"] },
  { slug: "starter-set-ex-2026", name: "スターターセットex", kind: "デッキ", release: "2026-07-31", price: null,
    keys: ["スターターセットex"], article: null, colors: ["#9f1239", "#fb7185"] },
  { slug: "start-deck-100-battle-collection", name: "スタートデッキ100 バトルコレクション", kind: "デッキ", release: "2025-12-19", price: null,
    keys: ["スタートデッキ100 バトルコレクション"], article: null, colors: ["#7f1d1d", "#ef4444"] },
  { slug: "card-illust-figure-30th", name: "カードイラストフィギュアコレクション 30th", kind: "フィギュア", release: "2026-11-27", price: "1,800円",
    keys: ["カードイラストフィギュアコレクション 30th CELEBRATION"], article: "card-illust-figure-30th", colors: ["#134e4a", "#facc15"] },
  { slug: "mega-brave", name: "メガブレイブ", kind: "拡張パック", release: null, price: null,
    keys: ["メガブレイブ"], article: null, colors: ["#1f2937", "#eab308"] },
  { slug: "mega-symphonia", name: "メガシンフォニア", kind: "拡張パック", release: null, price: null,
    keys: ["メガシンフォニア"], article: null, colors: ["#1e1b4b", "#818cf8"] },
  { slug: "munikis-zero", name: "ムニキスゼロ", kind: "拡張パック", release: null, price: null,
    keys: ["ムニキスゼロ"], article: null, colors: ["#3b0764", "#a3e635"] }
];
