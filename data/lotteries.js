// 抽選データ。自動更新はこのファイルの配列だけを書き換える。
// method: web | app | store | x | invite
// start/end: JST の ISO 8601（不明なら null）
// verified: お店の公式ページで日程を確認済みなら true。false は「公式未確認」と表示される
// conditions: 応募条件。[] = 条件なし、null = 不明。値は 会員登録 / アプリ / 購入実績 / 本人確認 / SNS / その他
// forms: 販売形態。[] = 不明。値は box_shrink / box_noshrink / box_noperi / pack / set
window.SITE_UPDATED = "2026-11-19T20:20:00+09:00";
window.LOTTERIES = [
  {
    "id": "suruga-yokohama-20261119",
    "store": "駿河屋 横浜店（X抽選）",
    "products": [
      "ハドウシーカー"
    ],
    "method": "x",
    "start": "2026-11-19T00:00:00+09:00",
    "end": "2026-11-25T23:59:00+09:00",
    "requirement": "@surugaya_toreka と @suruga_yokohama をフォロー＋告知ポストをリポスト。当選発表日にDMを開放していないと無効",
    "conditions": [
      "SNS"
    ],
    "forms": [],
    "url": "https://x.com/suruga_yokohama",
    "verified": true
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
    "requirement": "ガンギ HOBBY SHOPの会員限定。公式X（@MS_GANGI）のフォローと指定ポストのリポストが必要。1人1BOXまで（5,500円＋送料）。結果は当選者にのみメール",
    "conditions": [
      "会員登録",
      "SNS"
    ],
    "forms": [],
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
    "requirement": "LINEミニアプリで、店舗ごとの申し込みページから来店する時間枠を選んで応募・1人20パックまで・応募は1人1回（複数の店舗・日程に申し込まない）・当選者だけに11/25 12時以降LINEで連絡・当選した時間枠（11/27〜28）に本人が来店して購入。申し込みページは各店舗のお知らせに載っています（リンク先はトウキョーDXの例）",
    "conditions": [
      "アプリ"
    ],
    "forms": ["pack"],
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
    "forms": ["box_shrink"],
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
    "requirement": "LivePocketと晴れる屋2 LINE会員（会員コード）が必要・応募は1人1店舗・購入時に本人確認書類",
    "conditions": [
      "会員登録",
      "本人確認"
    ],
    "forms": ["box_shrink"],
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
    "forms": ["box_noshrink"],
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
    "forms": [],
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
    "requirement": "竜のしっぽモバイル会員サイトから応募・当選者のみメール連絡（例：姫路店の告知）",
    "conditions": [
      "会員登録"
    ],
    "forms": ["box_noshrink", "box_noperi"],
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
    "requirement": "駿河屋マイページ登録・公式Xのフォローと指定ポストのリポスト",
    "conditions": [
      "会員登録",
      "SNS"
    ],
    "forms": [],
    "url": "https://www.suruga-ya.jp/blog/?q=pokeka_chusen261105.html",
    "verified": true
  },
  {
    "id": "clabo-20261103",
    "store": "カードラボ マルイ海老名店",
    "products": [
      "ハドウシーカー"
    ],
    "method": "x",
    "start": "2026-11-03T00:00:00+09:00",
    "end": "2026-11-19T23:59:00+09:00",
    "requirement": "店舗のXをフォローして対象ポストをリポスト・当選はDM連絡・購入時に本人確認",
    "conditions": [
      "SNS",
      "本人確認"
    ],
    "forms": [],
    "url": "https://www.c-labo.jp/blog/623647/",
    "verified": true
  },
  {
    "id": "hobbyoff-20261116",
    "store": "ホビーオフ 甲府国母店",
    "products": [
      "ハドウシーカー"
    ],
    "method": "store",
    "start": "2026-11-16T11:00:00+09:00",
    "end": null,
    "requirement": "店頭のQRコードから応募・締切は11/22（日）の閉店時間",
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
    "end": null,
    "requirement": "2025/11/1〜2026/11/16 に1円以上の商品を注文・受取済み。過去の当選者は対象外",
    "conditions": [
      "会員登録",
      "購入実績"
    ],
    "forms": ["set"],
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
    "forms": ["box_shrink"],
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
    "forms": [],
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
    "requirement": "LIFETUNES MALL（小学館ID）にログインして応募フォームから・当選発表は12/9以降・当選者は通販で購入",
    "conditions": [
      "会員登録"
    ],
    "forms": [],
    "url": "https://lifetunes-mall.jp/shop/form/form.aspx?questionnaire=c3060_pokemoncard100_lot",
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
    "forms": ["box_shrink"],
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
    "forms": ["box_shrink"],
    "url": "https://www.amazon.co.jp/dp/B0H4PQ6LR5",
    "verified": true
  }
];
