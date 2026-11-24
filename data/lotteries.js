// 抽選データ。自動更新はこのファイルの配列だけを書き換える。
// method: web | app | store | x | invite
// start/end: JST の ISO 8601（不明なら null）
// verified: お店の公式ページで日程を確認済みなら true。false は「公式未確認」と表示される
// conditions: 応募条件。[] = 条件なし、null = 不明。値は 会員登録 / アプリ / 購入実績 / 本人確認 / SNS / その他
// result: 当選発表日（任意）。日付だけなら "2026-11-27"、時刻もわかれば "2026-11-27T18:00:00+09:00"。不明なら書かない
// result_how: 結果の確認方法（任意）。例「当選者だけにメールで連絡」。不明なら書かない
// forms: 販売形態。[] = 不明。値は box_shrink / box_noshrink / box_noperi / pack / set
window.SITE_UPDATED = "2026-11-24T13:00:00+09:00";
window.LOTTERIES = [
  {
    "id": "itoyokado-20261127",
    "store": "イトーヨーカドー・アリオ（一部店舗・店頭QR）",
    "products": [
      "ニンジャスピナー",
      "ムニキスゼロ"
    ],
    "method": "store",
    "start": "2026-11-27T00:00:00+09:00",
    "end": "2026-11-29T23:59:00+09:00",
    "requirement": "一部の店舗で行う抽選。店頭に貼られたQRコードを読み込み、LivePocketから応募する。対象店舗・受付時間・購入できる数は各店の掲示で確認してください",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "hobbystation-hadou-20261124",
    "store": "ホビーステーション 各店",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-24T12:00:00+09:00",
    "end": "2026-11-26T23:59:00+09:00",
    "result": "2026-12-03",
    "requirement": "LivePocketで応募する再販の抽選（1BOX 6,000円、1人2BOXまで）。対象28店舗から1店舗だけ選んで応募し、12/7〜12/13に応募した店舗の店頭で受け取り（郵送なし）。本人確認はマイナンバーカードのみで、LivePocketの氏名と一致が必要。シュリンクは外して販売",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_noshrink"
    ],
    "url": "https://livepocket.jp/e/d275s",
    "verified": true
  },
  {
    "id": "hobbystation-munikis-20261124",
    "store": "ホビーステーション 各店",
    "products": [
      "ムニキスゼロ"
    ],
    "method": "web",
    "start": "2026-11-24T12:00:00+09:00",
    "end": "2026-11-26T23:59:00+09:00",
    "result": "2026-12-04",
    "requirement": "LivePocketで応募する再販の抽選（1BOX 5,400円、1人2BOXまで）。対象28店舗から1店舗だけ選んで応募し、12/7〜12/13に応募した店舗の店頭で受け取り（郵送なし）。本人確認はマイナンバーカードのみで、LivePocketの氏名と一致が必要。シュリンクは外して販売。当選発表は12/4〜12/5の予定",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_noshrink"
    ],
    "url": "https://livepocket.jp/e/x1x8-",
    "verified": true
  },
  {
    "id": "bookoff-stores-20261127",
    "store": "ブックオフ 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "x",
    "start": null,
    "end": "2026-11-26T23:59:00+09:00",
    "requirement": "秋葉原駅前・池袋サンシャイン60通り・JR蒲田駅東口・武蔵小金井・東千葉祐光・大宮ラクーン・荒川沖・四日市日永・イオン桑名・那覇与儀ほか約55店で、店ごとに抽選を受付中。店の公式Xのフォロー・リポストで応募する店が多く、店頭やアプリで受け付ける店もある。締切は店ごとに違い、早い店は11/24 14時ごろ、遅い店は11/26。応募方法・条件は各店の告知で確認してください",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "batoloco-stores-20261127",
    "store": "バトロコ 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": null,
    "end": "2026-11-26T17:00:00+09:00",
    "requirement": "渋谷センター街・池袋・柏駅前・沼津駅前・盛岡大通・札幌大通・仙台駅東口・新潟万代・金沢駅前ほか約25店（バトロコミニ・satelliteを含む）で、店ごとに抽選を受付中。会員向けのWeb応募で購入時に本人確認がある店が多く、店の公式Xのリポストや店頭で受け付ける店もある。締切は店ごとに違い、早い店は11/24 20時、遅い店は11/26 17時。応募方法・条件は各店の告知で確認してください",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "surugaya-stores-20261127",
    "store": "駿河屋 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "x",
    "start": null,
    "end": "2026-11-25T23:59:00+09:00",
    "requirement": "横浜・秋葉原本館・千葉中央・大宮マルイ・高崎OPA・小山・札幌ノルベサ・博多マルイ・小倉あるあるCity・大垣ほか約16店（駿河屋の看板の提携店を含む）で、店ごとに抽選を受付中。店と駿河屋トレカの公式Xのフォロー・リポストで応募する店が多い（横浜店は当選発表日にDMを開けておく必要あり）。締切は店ごとに違い、早い店は11/24 23:59、多くは11/25 23:59。応募方法・条件は各店の告知で確認してください（通販の抽選は終了）",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "mint-stores-20261127",
    "store": "MINT（ミント） 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "x",
    "start": null,
    "end": "2026-11-26T12:00:00+09:00",
    "requirement": "新宿・MINT GAMES 池袋・吉祥寺・渋谷・名古屋・仙台・沖縄の7店で、店ごとに抽選を受付中。店の公式Xで応募する店と、Webで応募する店がある。締切は店ごとに違い、早い店は11/24 20時、遅い店は11/26 12時。応募方法・条件は各店の告知で確認してください",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "asobiva-stores-20261127",
    "store": "あそビバ 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": null,
    "end": "2026-11-25T23:59:00+09:00",
    "requirement": "イオンモール岐阜各務原店・イオンモール草津店の2店で、店ごとに抽選を受付中（どちらも11/25締切）。応募方法・条件は各店の告知で確認してください",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false,
    "branches": [
      {
        "name": "イオンモール岐阜各務原店",
        "end": "2026-11-25T23:59:00+09:00",
        "url": null
      },
      {
        "name": "イオンモール草津店",
        "end": "2026-11-25T23:59:00+09:00",
        "url": null
      }
    ]
  },
  {
    "id": "wondergoo-stores-20261127",
    "store": "WonderGOO 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "app",
    "start": null,
    "end": "2026-11-25T23:59:00+09:00",
    "requirement": "全店での抽選（11/16締切）の対象外だった瑞江店・下瀬谷店で、店ごとに抽選を受付中。締切は下瀬谷店が11/24 23時、瑞江店が11/25 23:59。応募方法・条件は各店の告知で確認してください",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false,
    "branches": [
      {
        "name": "下瀬谷店",
        "end": "2026-11-24T23:00:00+09:00",
        "url": null
      },
      {
        "name": "瑞江店",
        "end": "2026-11-25T23:59:00+09:00",
        "url": null
      }
    ]
  },
  {
    "id": "clabo-stores-20261127",
    "store": "カードラボ 各店（店ごとの抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": null,
    "end": "2026-11-24T23:59:00+09:00",
    "requirement": "秋葉原ラジオ会館本店・販売買取センターNAMBAで、店ごとに抽選を受付中（どちらも11/24 23:59締切）。マルイ海老名店などの抽選は終了。応募方法・条件は各店の告知で確認してください",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false,
    "branches": [
      {
        "name": "販売買取センターNAMBA",
        "end": "2026-11-24T23:59:00+09:00",
        "how": "X（フォロー＋リポスト）・1BOX・シュリンクなし",
        "url": "https://www.c-labo.jp/shop/namba2nd/blog/625078/"
      },
      {
        "name": "秋葉原ラジオ会館本店",
        "end": "2026-11-24T23:59:00+09:00",
        "url": null
      }
    ]
  },
  {
    "id": "yamada-20261123",
    "store": "ヤマダデンキ（ヤマダデジタル会員アプリ）",
    "products": [
      "30th CELEBRATION カードセット"
    ],
    "method": "app",
    "start": null,
    "end": "2026-11-25T23:59:00+09:00",
    "result": "2026-12-09T12:00:00+09:00",
    "requirement": "ヤマダデジタル会員アプリから応募する抽選（一部の店舗だけ）。9種まとめての販売。当選発表は12/9 12時ごろ、購入は12/12〜12/18の予定。応募できる店舗・条件はアプリ内の案内で確認してください",
    "conditions": [
      "アプリ"
    ],
    "forms": [
      "set"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "joshin-app-20261123",
    "store": "Joshin キッズランド（店頭・アプリのクーポン）",
    "products": [
      "ストームエメラルダ"
    ],
    "method": "store",
    "start": "2026-11-23T00:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "requirement": "抽選ではなく、ジョーシンアプリのクーポン（キッズランドの欄）に出る購入券で店頭で買える販売（11/23の1日だけ）。1人10パックまで・売り切れ次第終了・扱いのない店舗もあり。詳しくはアプリ内のお店の案内で確認してください",
    "conditions": [
      "アプリ",
      "会員登録"
    ],
    "forms": [
      "pack"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "joshin-store-20261124",
    "store": "Joshin（店頭・アプリ必須）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "store",
    "start": "2026-11-24T00:00:00+09:00",
    "end": "2026-11-26T19:00:00+09:00",
    "result": "2026-11-27",
    "requirement": "ジョーシンの店頭で応募する抽選で、ジョーシンアプリが必要（11/24 10時〜11/26 19時）。応募した店舗が受け取りの店舗になる。当選発表は11/27から、購入は11/27〜11/29の予定。対象店舗・受付時間はお店の案内で確認してください",
    "conditions": [
      "アプリ",
      "会員登録"
    ],
    "forms": [
      "box_noshrink"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "biccamera-okayama-20261122",
    "store": "ビックカメラ 岡山駅前店",
    "products": [
      "30th CELEBRATION BOX"
    ],
    "method": "store",
    "start": "2026-11-22T00:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "result": "2026-12-04",
    "requirement": "岡山駅前店の店頭抽選（11/22〜11/23）。ポイントカード会員が対象で、マイナンバーカードが必要。1人1BOX（20パック）まで。当選発表は12/4、購入は12/5〜12/6の予定。受付時間はお店の案内で確認してください",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "pack"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "biccamera-kanagawa-20261123",
    "store": "ビックカメラ 各店（藤沢・相模大野駅・新横浜・ラゾーナ川崎）",
    "products": [
      "30th CELEBRATION カードセット"
    ],
    "method": "store",
    "start": "2026-11-23T00:00:00+09:00",
    "end": "2026-11-24T20:00:00+09:00",
    "result": "2026-11-28T13:00:00+09:00",
    "requirement": "藤沢店・相模大野駅店・新横浜店・ラゾーナ川崎店の店頭抽選（11/23〜11/24。受付時間は店舗ごとに違う）。ビックカメラSuicaカード会員が対象で、マイナンバーカードが必要。1人1点・1店舗1回。当選発表は11/28 13時から、購入は11/29〜11/30の予定。詳しくはお店の案内で確認してください",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "set"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "toycomp-20261120",
    "store": "トイコンプ",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": null,
    "end": "2026-11-23T23:59:00+09:00",
    "result": "2026-11-24",
    "requirement": "トイコンプの会員サイトから応募。当選発表は11/24の予定、購入は11/27〜11/29",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": "https://toycomp.membercard.jp/",
    "verified": false
  },
  {
    "id": "seagull-20261121",
    "store": "シーガル（アプリ抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "app",
    "start": null,
    "end": "2026-11-23T20:00:00+09:00",
    "requirement": "シーガルのアプリから応募する抽選。応募できる店舗・応募条件・受け取り方法は、アプリ内のお店の案内で確認してください",
    "conditions": [
      "アプリ"
    ],
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "kiddyland-fujimi-20261121",
    "store": "キデイランド ららぽーと富士見店",
    "products": [
      "ストームエメラルダ",
      "30th CELEBRATION BOX",
      "スペシャルデッキセットMEGA",
      "スターターセットex"
    ],
    "method": "web",
    "start": "2026-11-21T10:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "result": "2026-11-27T18:00:00+09:00",
    "result_how": "LivePocketからメールで連絡",
    "requirement": "LivePocket（無料の会員登録）で商品ごとに1人1回応募。当選発表は11月27日18時ごろメールで、購入は11月28日〜30日に店頭レジで。受け取り時に本人確認書類が必要で、代理購入は不可。ストームエメラルダと30thは1BOX限定でシュリンクを外して販売。スペシャルデッキセットMEGA、スターターセットex（イーブイ／ゾロア＆ゾロアーク／ニャオハ＆マスカーニャ）は各1点まで",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_noshrink",
      "set"
    ],
    "url": "https://livepocket.jp/p/hpmzs",
    "verified": true
  },
  {
    "id": "pokecen-online-20261127",
    "store": "ポケモンセンターオンライン",
    "products": [
      "カードイラストフィギュアコレクション 30th CELEBRATION"
    ],
    "method": "web",
    "start": "2026-11-27T16:00:00+09:00",
    "end": "2026-11-30T16:59:00+09:00",
    "result": "2026-12-04T15:00:00+09:00",
    "requirement": "会員登録が必要。プレイヤーズクラブでマイナンバーカードの本人認証を済ませた人の枠が当選の大半（未認証の人は電話番号認証で別枠に応募可）。1人1回。当選発表は12月4日15時以降、購入は12月4日15時〜12月8日16時59分",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [],
    "url": "https://www.pokemoncenter-online.com/news/?id=20261120",
    "verified": true
  },
  {
    "id": "geo-20261130",
    "store": "ゲオ",
    "products": [
      "ハドウシーカー",
      "30th CELEBRATION カードセット"
    ],
    "method": "web",
    "start": "2026-11-30T11:00:00+09:00",
    "end": "2026-12-03T17:59:00+09:00",
    "requirement": "ゲオ抽選販売専用サイトからGEO IDでログインして応募。レンタル機能付きPontaカードとゲオアプリの連携が必要で、購入時に本人確認書類の提示あり。1人1点1回まで。ハドウシーカーはBOX回収・パックのみのお渡し、30th カードセットは9種まとめての販売",
    "conditions": [
      "会員登録",
      "アプリ",
      "本人確認"
    ],
    "forms": [
      "pack",
      "set"
    ],
    "url": "https://geo-online.co.jp/news/792",
    "verified": true
  },
  {
    "id": "shibuyatsutaya-20261120",
    "store": "SHIBUYA TSUTAYA（POKÉMON CARD LOUNGE）",
    "products": [
      "ストームエメラルダ"
    ],
    "method": "web",
    "start": "2026-11-20T10:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "result": "2026-12-01T18:00:00+09:00",
    "requirement": "CLOUD PASSから受取日と数量（1〜2BOX）を選んで応募。当選発表は12/1 18時以降、受け取りは12/8〜12/13に5階のカードラウンジで。顔写真付き本人確認書類が必要、支払いはキャッシュレスのみ",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://cloud-pass.jp/pr/d5111f868ba8f555add7ef4d8c943ffd19273ae3a622a02861f04cf1c0db1e55",
    "verified": true
  },
  {
    "id": "fullcomp-20261120",
    "store": "フルコンプ",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-20T10:30:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "result": "2026-11-24",
    "result_how": "当選者だけにLivePocketからメールで連絡（11/24〜11/25）",
    "requirement": "LivePocketで応募（無料の会員登録とプレイヤーズクラブのプレイヤーID入力が必要）。対象は八王子本店・新宿南口店・大阪日本橋店など9店舗から1店を選んで1人1回。1人1BOXまで。購入時はマイナンバーカードが必要で、当選した店舗で11/27〜11/29に受け取り。",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://livepocket.jp/e/xovyf",
    "verified": true
  },
  {
    "id": "trecapi-toyota-20261120",
    "store": "トレカキャピタル豊田本店",
    "products": [
      "オープン記念抽選（全35種）"
    ],
    "method": "web",
    "start": "2026-11-20T10:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "requirement": "オープン記念の抽選販売で、対象は全35種。エディオンの各種会員（クレジットカード・あんしん保証・ID・アプリ）限定で、携帯電話番号にSMSで届く受付コードを使って応募。1人1回・電話番号1つにつき1回。当選者だけに12/3にSMSで連絡、購入は12/4〜12/7に本人が来店（会員証と当選SMSを提示、身分証の確認あり）。ポケカのBOXはシュリンクを外して販売",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_noshrink"
    ],
    "url": "https://edion-cp.com/trecapiopen1204",
    "verified": true
  },
  {
    "id": "girafull-20261120",
    "store": "GIRAFULL 各店",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-20T12:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "requirement": "なんば・オタロード・京都・広島・名古屋大須の5店舗で、LivePocketの会員登録が必要。応募は1人1回まで、当選すると1BOX（6,000円）を11/27〜11/29に応募した店の店頭で購入。購入時に顔写真付きの身分証が必要。結果は11/24までに通知。",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [],
    "url": "https://livepocket.jp/p/puf0p",
    "verified": true
  },
  {
    "id": "itoyokado-20261120",
    "store": "イトーヨーカドー・アリオ（一部店舗・店頭QR）",
    "products": [
      "30th CELEBRATION BOX"
    ],
    "method": "store",
    "start": "2026-11-20T00:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "requirement": "対象店舗の店頭に掲示されたQRコードから応募（LivePocket）。結果はLivePocketで確認（店頭での問い合わせ不可）。販売は12/11〜12/13の予定。対象店舗・対象商品は各店の掲示で確認",
    "conditions": [
      "会員登録"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "hmv-20261120",
    "store": "HMV トレカショップ各店（店頭QR）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "store",
    "start": "2026-11-20T13:00:00+09:00",
    "end": "2026-11-22T20:59:00+09:00",
    "result": "2026-11-25",
    "requirement": "対象店舗の店頭に掲示されたQRコードから応募。当選発表は11/25の予定。対象店舗や購入の条件は各店の掲示で確認",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "gameark-takarajima-20261120",
    "store": "ゲームアーク・宝島 各店（モバイル会員限定）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-20T10:00:00+09:00",
    "end": "2026-11-24T23:59:00+09:00",
    "result": "2026-11-25",
    "requirement": "モバイル会員ページのメニュー「抽選申込み」から応募。当選発表は11/25、購入は11/27〜11/28",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "trecachampion-20261116",
    "store": "トレカチャンピオン 各店（X・DM抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "x",
    "start": "2026-11-16T00:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "result": "2026-11-25",
    "result_how": "当選者だけに各店のXのDMで連絡",
    "requirement": "店舗会員限定。各店の公式XにDMで会員番号・氏名・希望商品を送って応募。当選者のみ11/25に連絡、1人1BOX・店頭で現金払い",
    "conditions": [
      "会員登録",
      "SNS"
    ],
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "gangi-20261119",
    "store": "ガンギ HOBBY SHOP（通販）",
    "products": [
      "VSTARユニバース"
    ],
    "method": "web",
    "start": null,
    "end": "2026-11-25T23:59:00+09:00",
    "result_how": "締切後、当選者だけにメールで連絡",
    "requirement": "ガンギ HOBBY SHOPの会員限定。公式X（@MS_GANGI）のフォローと指定ポストのリポストが必要。1人1BOXまで（5,500円＋送料）。結果は当選者にのみメール",
    "conditions": [
      "会員登録",
      "SNS"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://www.gangi.co.jp/blog/drawsale-720",
    "verified": true
  },
  {
    "id": "pokecen-stores-20261119",
    "store": "ポケモンセンター各店（店頭・購入時間帯抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "app",
    "start": "2026-11-19T14:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "result": "2026-11-25T12:00:00+09:00",
    "result_how": "当選者だけにLINEミニアプリのお知らせで連絡",
    "requirement": "LINEミニアプリで、店舗ごとの申し込みページから来店する時間枠を選んで応募・1人20パックまで・応募は1人1回（複数の店舗・日程に申し込まない）・当選者だけに11/25 12時以降LINEで連絡・当選した時間枠（11/27〜28）に本人が来店して購入。申し込みページは各店舗のお知らせに載っています（リンク先はトウキョーDXの例）",
    "conditions": [
      "アプリ"
    ],
    "forms": [
      "pack"
    ],
    "url": "https://shop.pokemon.co.jp/ja/shop/pokemoncenter-tokyodx/news/202611/000718.html",
    "verified": true
  },
  {
    "id": "otakarasouko-20261119",
    "store": "お宝創庫グループ（おじゃま館・メディオ！・プレイズ含む一部店舗）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "app",
    "start": "2026-11-19T12:00:00+09:00",
    "end": "2026-11-22T23:45:00+09:00",
    "result": "2026-11-25",
    "result_how": "お宝創庫グループアプリ内で確認",
    "requirement": "お宝創庫グループアプリ会員・2025/11/18〜2026/11/18に店頭で会員証を出して買い物か買取の履歴が必要（通販は対象外）・1商品1応募・当選発表は11/25頃（アプリ内）・当選者は選んだ店舗で11/27〜29に購入",
    "conditions": [
      "会員登録",
      "アプリ",
      "購入実績"
    ],
    "forms": [],
    "url": "https://www.otakarasouko.com/information/109459977/",
    "verified": true
  },
  {
    "id": "trecaplaza55-20261123",
    "store": "トレカプラザ55通販",
    "products": [
      "30th CELEBRATION カードセット",
      "スターターセットex"
    ],
    "method": "web",
    "start": "2026-11-23T20:00:00+09:00",
    "end": "2026-11-30T23:59:00+09:00",
    "requirement": "再入荷・キャンセル分の抽選。通販店の会員登録（会員番号の入力）が必要・1人1回・カードセット9種とスターターセットex3種から選んで応募・当選者だけ12/1〜12/2にメール連絡・12/4 23:59までに支払い",
    "conditions": [
      "会員登録"
    ],
    "forms": [
      "set"
    ],
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSfMYEQnQHZIXlZXRSR5pLb7glqN5fz9uBp-pVcEjKiMC4VfHg/viewform",
    "verified": true
  },
  {
    "id": "trecaplaza55-20261118",
    "store": "トレカプラザ55通販",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-18T20:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "requirement": "店舗の会員登録が必要（Googleフォームで応募）",
    "conditions": [
      "会員登録"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSeNdQItGyUMs7dhwBfG_MXHz3ytkmwhOmev9BPbJHIjDAjnBQ/viewform",
    "verified": true
  },
  {
    "id": "hareruya2-20261118",
    "store": "晴れる屋2 各店",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-18T16:15:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "result": "2026-11-24",
    "requirement": "LivePocketと晴れる屋2 LINE会員（会員コード）が必要・応募は1人1店舗・購入時に本人確認書類",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://livepocket.jp/e/wfku9",
    "verified": true
  },
  {
    "id": "furuichi-20261117",
    "store": "古本市場（ふるいち）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-17T23:00:00+09:00",
    "end": "2026-11-22T23:00:00+09:00",
    "requirement": "ふるいちアプリ会員（ゲスト不可）・1人（1家族）1回・購入時に写真付き本人確認書類",
    "conditions": [
      "会員登録",
      "アプリ",
      "本人確認"
    ],
    "forms": [
      "box_noshrink"
    ],
    "url": "https://www.furu1.net/news/news_information/pkop20261127sl",
    "verified": true
  },
  {
    "id": "plant-20261117",
    "store": "PLANT（13店舗）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-17T00:00:00+09:00",
    "end": "2026-11-19T23:59:00+09:00",
    "result": "2026-11-23",
    "result_how": "当選者だけにメールで連絡（11/23〜11/25）",
    "requirement": "1商品1人1回・当選者は店頭で購入（本人来店・公的証明書で本人確認）・1人30パックまで",
    "conditions": [
      "本人確認"
    ],
    "forms": [
      "pack"
    ],
    "url": "https://www.plant-co.jp/campaign/detail/1634.html?campaignNo=1634",
    "verified": true
  },
  {
    "id": "shimamura-20261117",
    "store": "しまむら（しまむらパーク）",
    "products": [
      "ハドウシーカー",
      "30th CELEBRATION BOX",
      "30th CELEBRATION カードセット",
      "ストームエメラルダ",
      "スターターセットex",
      "スペシャルデッキセットMEGA"
    ],
    "method": "app",
    "start": "2026-11-17T13:00:00+09:00",
    "end": "2026-11-22T23:00:00+09:00",
    "requirement": "しまむらパークアプリから応募",
    "conditions": [
      "会員登録",
      "アプリ"
    ],
    "forms": [
      "box_shrink",
      "set"
    ],
    "url": "https://www.shop-shimamura.com/disp/itemlist/?pre_rsv_icon=1",
    "verified": true
  },
  {
    "id": "ryuunoshippo-20261115",
    "store": "竜のしっぽ 各店",
    "products": [
      "ハドウシーカー",
      "30th CELEBRATION カードセット"
    ],
    "method": "web",
    "start": "2026-11-15T22:00:00+09:00",
    "end": "2026-11-20T23:59:00+09:00",
    "result_how": "当選者だけにメールで連絡",
    "requirement": "竜のしっぽモバイル会員サイトから応募・当選者のみメール連絡（例：姫路店の告知）",
    "conditions": [
      "会員登録"
    ],
    "forms": [
      "box_noshrink",
      "box_noperi"
    ],
    "url": "https://x.com/ryuunoshippo_4/status/2121951602198093902",
    "verified": true
  },
  {
    "id": "tcg193-20261113",
    "store": "TCGショップ193 各店",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-13T15:00:00+09:00",
    "end": "2026-11-19T23:59:00+09:00",
    "requirement": "10/31までに店頭で入会済みの会員（193NETアカウントは対象外）・1人1BOX・シュリンク／外箱なし",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": "https://docs.google.com/forms/d/e/1FAIpQLScyVCz7XSzFQ8L4EWUXfMzbnjYKd2P3TCOXoAjrp3Wy0Md2ag/viewform",
    "verified": true
  },
  {
    "id": "surugaya-20261105",
    "store": "駿河屋",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-05T12:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "result": "2026-11-23",
    "result_how": "マイページとメールでお知らせ",
    "requirement": "駿河屋マイページ登録・公式Xのフォローと指定ポストのリポスト",
    "conditions": [
      "会員登録",
      "SNS"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://www.suruga-ya.jp/blog/?q=pokeka_chusen261105.html",
    "verified": true
  },
  {
    "id": "hobbyoff-20261116",
    "store": "ホビーオフ（一部店舗）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "store",
    "start": "2026-11-16T11:00:00+09:00",
    "end": "2026-11-22T19:30:00+09:00",
    "result": "2026-11-25T15:00:00+09:00",
    "requirement": "対象店舗の店頭のQRコードから応募・1人1回・当選発表は11/25 15時以降・当選者は11/27〜28に本人確認書類を持って来店（リンク先は甲府国母店の告知）",
    "conditions": null,
    "forms": [],
    "url": "https://x.com/Hbkokubotoreca/status/2122151320077676920",
    "verified": true
  },
  {
    "id": "7net-20261119",
    "store": "セブンネットショッピング",
    "products": [
      "30th CELEBRATION プレミアムデッキセット エーフィ・ブラッキー"
    ],
    "method": "web",
    "start": "2026-11-19T17:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "requirement": "2025/11/1〜2026/11/16 に1円以上の商品を注文・受取済み。過去の当選者は対象外・当選者のみ12/8 19時までにメール・支払いはセブン-イレブン店頭",
    "conditions": [
      "会員登録",
      "購入実績"
    ],
    "forms": [
      "set"
    ],
    "url": "https://x.com/7_netshopping/status/2122570434755633464",
    "verified": true
  },
  {
    "id": "pokecen-online-4th",
    "store": "ポケモンセンターオンライン（第4回追加抽選）",
    "products": [
      "30th CELEBRATION BOX",
      "30th CELEBRATION プレミアムデッキセット エーフィ・ブラッキー",
      "30th CELEBRATION FUTURISTIC BOX"
    ],
    "method": "web",
    "start": null,
    "end": null,
    "requirement": "12月頃に実施予定。日程は未発表",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://www.pokemoncenter-online.com/news/?id=20260929",
    "verified": true,
    "tentative": true
  },
  {
    "id": "dmmmyca-20261113",
    "store": "DMMマイカ",
    "products": [
      "スペシャルデッキセットMEGA"
    ],
    "method": "web",
    "start": "2026-11-13T12:00:00+09:00",
    "end": "2026-11-20T23:59:00+09:00",
    "requirement": "10/13〜11/12の購入5,000円ごとに1口・当選者のみメール連絡（締切時刻は応募ページで確認）",
    "conditions": [
      "会員登録",
      "購入実績"
    ],
    "forms": [],
    "url": "https://x.com/DMM_Myca/status/2121075592338755706",
    "verified": true
  },
  {
    "id": "nojima-20261115",
    "store": "ノジマオンライン（シークレット販売会）",
    "products": [
      "ポケモンカード各種"
    ],
    "method": "invite",
    "start": "2026-11-15T00:00:00+09:00",
    "end": null,
    "requirement": "ノジマオンライン会員ID（0から始まる16桁）でエントリー。購入履歴（目安：税込5,000円以上）などから選ばれた人に購入URLがメールで届く（抽選ではなく招待制）。締切は予告なく終了",
    "conditions": [
      "会員登録",
      "購入実績"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://docs.google.com/forms/d/e/1FAIpQLScmxaZTyfeXhYnHVW4L9ZuqAgTeLoycN0Nk2XSHDn_tXDrwPA/viewform",
    "verified": true
  },
  {
    "id": "lawson-20261127",
    "store": "ローソン（店頭・先着販売）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "store",
    "start": "2026-11-27T07:00:00+09:00",
    "end": null,
    "requirement": "抽選ではなく店頭での先着販売（なくなり次第終了）。1人1会計10パックまで・予約や取り置きなし・扱いのない店舗もあり",
    "conditions": [],
    "forms": [
      "pack"
    ],
    "url": "https://www.lawson.co.jp/lab/entertainment/art/20261117_toypokemon.html",
    "verified": true
  },
  {
    "id": "kojima-20261113",
    "store": "コジマ（アプリ）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "app",
    "start": "2026-11-13T21:00:00+09:00",
    "end": "2026-11-20T23:59:00+09:00",
    "requirement": "コジマアプリから応募・2025/11/1〜2026/11/20 にコジマで税込5,000円以上の購入・1人1BOX・当選者は登録店舗で購入",
    "conditions": [
      "会員登録",
      "アプリ",
      "購入実績"
    ],
    "forms": [],
    "url": "https://www.kojima.net/shop/app/kojima_appli.html",
    "verified": false
  },
  {
    "id": "corocoro-20261113",
    "store": "コロコロプレミア（小学館）",
    "products": [
      "スタートデッキ100 バトルコレクション"
    ],
    "method": "web",
    "start": "2026-11-13T00:00:00+09:00",
    "end": "2026-11-23T23:59:00+09:00",
    "result": "2026-12-09",
    "requirement": "LIFETUNES MALL（小学館ID）にログインして応募フォームから・当選発表は12/9以降・当選者は通販で購入",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": "https://lifetunes-mall.jp/shop/form/form.aspx?questionnaire=c3060_pokemoncard100_lot",
    "verified": false
  },
  {
    "id": "trecastation-20261123",
    "store": "トレカステーション（一部店舗）",
    "products": [
      "30th CELEBRATION カードセット"
    ],
    "method": "store",
    "start": null,
    "end": "2026-11-29T23:59:00+09:00",
    "result": "2026-12-01",
    "requirement": "一部の店舗で受付中の抽選（9種セット）・当選発表は12/1予定・当選した店舗で12/4〜6に購入。対象店舗と応募方法はお店でご確認ください",
    "conditions": null,
    "forms": [
      "set"
    ],
    "url": null,
    "verified": false
  },
  {
    "id": "trecastation-20261116",
    "store": "トレカステーション（一部店舗）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "store",
    "start": "2026-11-16T18:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "result": "2026-11-24",
    "requirement": "店頭に貼ってあるQRコードから応募・1人1個・当選発表は11/24予定・当選した店舗で11/27〜29に購入",
    "conditions": null,
    "forms": [],
    "url": null,
    "verified": false
  },
  {
    "id": "oretan-20261110",
    "store": "オレタン（岡山本店・福岡天神店・松山店）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "web",
    "start": "2026-11-10T20:00:00+09:00",
    "end": "2026-11-22T23:59:00+09:00",
    "requirement": "オレタンのモバイル会員（オレモバ）に登録して店舗ごとの抽選ページから応募・当選者は11/27〜29に店頭で購入",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": "https://oretan.membercard.jp/lottery",
    "verified": false
  },
  {
    "id": "joshin-20261117",
    "store": "Joshin webショップ（対象会員のみ）",
    "products": [
      "ハドウシーカー",
      "ストームエメラルダ",
      "MEGAドリームex"
    ],
    "method": "invite",
    "start": "2026-11-17T13:00:00+09:00",
    "end": "2026-11-19T09:59:00+09:00",
    "requirement": "11/3時点でVIP・プラチナ・ゴールドスマイル会員で、11/16 21:59時点でメルマガ配信を希望している人に応募URLがメールで届く。締切はメールで確認",
    "conditions": [
      "会員登録",
      "購入実績",
      "その他"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://joshinweb.jp/toy/c_chusen.html",
    "verified": false
  },
  {
    "id": "amazon-invite",
    "store": "Amazon（招待リクエスト）",
    "products": [
      "ハドウシーカー",
      "30th CELEBRATION BOX",
      "30th CELEBRATION プレミアムデッキセット エーフィ・ブラッキー",
      "スタートデッキ100 バトルコレクション",
      "MEGAドリームex"
    ],
    "method": "invite",
    "start": null,
    "end": null,
    "requirement": "各商品ページの「招待をリクエストする」から申し込み。選ばれた人に招待メールが届く（リクエストは12か月有効・締切なし）。リンク先はハドウシーカーの商品ページ",
    "conditions": [
      "会員登録"
    ],
    "forms": [
      "box_shrink"
    ],
    "url": "https://www.amazon.co.jp/dp/B0H4PQ6LR5",
    "verified": true
  }
];
