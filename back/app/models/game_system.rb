class GameSystem < ActiveHash::Base
  self.data = [
    { :id => 1, :name => "クラヤミクライン" },
    { :id => 2, :name => "アマデウス" },
    { :id => 3, :name => "ウィッチクエスト" },
    { :id => 4, :name => "神聖課金RPGディヴァインチャージャー" },
    { :id => 5, :name => "ダークデイズドライブ" },
    { :id => 6, :name => "Kutulu" },
    { :id => 7, :name => "ゴリラTRPG" },
    { :id => 8, :name => "ワープス" },
    { :id => 9, :name => "아마데우스" },
    { :id => 10, :name => "ゴブリンスレイヤーTRPG" },
    { :id => 11, :name => "ルーインブレイカーズ" },
    { :id => 12, :name => "剑 世界2.0" },
    { :id => 13, :name => "セラフィザイン" },
    { :id => 14, :name => "イサー・ウェン＝アー" },
    { :id => 15, :name => "迷宮キングダム" },
    { :id => 16, :name => "ゲイシャ・ガール・ウィズ・カタナ" },
    { :id => 17, :name => "ジェームズ・ボンド007" },
    { :id => 18, :name => "シノビガミ" },
    { :id => 19, :name => "エリュシオン" },
    { :id => 20, :name => "ガンドッグゼロ" },
    { :id => 21, :name => "グランクレストRPG" },
    { :id => 22, :name => "比叡山炎上" },
    { :id => 23, :name => "迷宮キングダム 基本ルールブック" },
    { :id => 24, :name => "エースキラージーン" },
    { :id => 25, :name => "ブラッド・クルセイド" },
    { :id => 26, :name => "マモノスクランブル" },
    { :id => 27, :name => "フルフェイス" },
    { :id => 28, :name => "あおはるばーんっ" },
    { :id => 29, :name => "在りて遍くオルガレイン" },
    { :id => 30, :name => "インセイン" },
    { :id => 31, :name => "NJSLYRBATTLE" },
    { :id => 32, :name => "ブラドリウム" },
    { :id => 33, :name => "サイバーパンクRED" },
    { :id => 34, :name => "千幻抄" },
    { :id => 35, :name => "モノトーンミュージアムRPG" },
    { :id => 36, :name => "ヤンキー＆ヨグ＝ソトース" },
    { :id => 37, :name => "DiceBot" },
    { :id => 38, :name => "紫縞のリヴラドール" },
    { :id => 39, :name => "トーキョーN◎VA" },
    { :id => 40, :name => "ウォーハンマーRPG第4版" },
    { :id => 41, :name => "パルプ・クトゥルフ" },
    { :id => 42, :name => "アルシャード" },
    { :id => 43, :name => "アースドーン4版" },
    { :id => 44, :name => "ナイトウィザード The 3rd Edition" },
    { :id => 45, :name => "砂塵戦機アーガス2ndEdition" },
    { :id => 46, :name => "더블크로스2nd,3rd" },
    { :id => 47, :name => "パラノイア" },
    { :id => 48, :name => "信長の黒い城" },
    { :id => 49, :name => "카미가카리" },
    { :id => 50, :name => "トワイライトガンスモーク" },
    { :id => 51, :name => "Fate Core System" },
    { :id => 52, :name => "天下繚乱" },
    { :id => 53, :name => "神椿市建設中。NARRATIVE" },
    { :id => 54, :name => "カムズ" },
    { :id => 55, :name => "ナイトウィザード The 2nd Edition" },
    { :id => 56, :name => "ソード・ワールド2.0" },
    { :id => 57, :name => "스트라토 샤우트" },
    { :id => 58, :name => "克蘇 魯神話第7版" },
    { :id => 59, :name => "トリニティセブンRPG" },
    { :id => 60, :name => "リミナル" },
    { :id => 61, :name => "エンドブレイカー！" },
    { :id => 62, :name => "ダイス・オブ・ザ・デッド" },
    { :id => 63, :name => "ダークブレイズ" },
    { :id => 64, :name => "ダンジョンズ＆ドラゴンズ第5版" },
    { :id => 65, :name => "アルトレイズ" },
    { :id => 66, :name => "ロールマスター" },
    { :id => 67, :name => "アースドーン3版" },
    { :id => 68, :name => "絶対隷奴" },
    { :id => 69, :name => "トーグ" },
    { :id => 70, :name => "ストラトシャウト" },
    { :id => 71, :name => "ガンドッグ" },
    { :id => 72, :name => "コロッサルハンター" },
    { :id => 73, :name => "リューチューバーとちいさな奇跡" },
    { :id => 74, :name => "フルメタル・パニック！RPG" },
    { :id => 75, :name => "サタスペ" },
    { :id => 76, :name => "銀剣のステラナイツ" },
    { :id => 77, :name => "ブラッドムーン" },
    { :id => 78, :name => "ゆうやけこやけ" },
    { :id => 79, :name => "크툴루" },
    { :id => 80, :name => "メタルヘッドエクストリーム" },
    { :id => 81, :name => "ADVANCED FIGHTING FANTASY 2nd Edition" },
    { :id => 82, :name => "Chill 3rd Edition" },
    { :id => 83, :name => "としあきの聖杯戦争TRPG" },
    { :id => 84, :name => "ネクロニカ" },
    { :id => 85, :name => "エムブリオマシンRPG" },
    { :id => 86, :name => "詩片のアルセット" },
    { :id => 87, :name => "エンゼルギア 天使大戦TRPG The 2nd Editon" },
    { :id => 88, :name => "ワールド・オブ・ダークネス" },
    { :id => 89, :name => "砂塵戦機アーガス" },
    { :id => 90, :name => "鵺鏡" },
    { :id => 91, :name => "ウタカゼ" },
    { :id => 92, :name => "ロストレコード" },
    { :id => 93, :name => "ロストロイヤル" },
    { :id => 94, :name => "ガープスフィルトウィズ" },
    { :id => 95, :name => "バケノカワ" },
    { :id => 96, :name => "ゲヘナ・アナスタシス" },
    { :id => 97, :name => "六門世界RPG セカンドエディション" },
    { :id => 98, :name => "光砕のリヴァルチャー" },
    { :id => 99, :name => "メタルヘッド" },
    { :id => 100, :name => "獸ノ森" },
    { :id => 101, :name => "実況ゴーストライヴ" },
    { :id => 102, :name => "真・女神転生TRPG 覚醒篇" },
    { :id => 103, :name => "クトゥルフ神話TRPG" },
    { :id => 104, :name => "ダークソウルTRPG" },
    { :id => 105, :name => "ハーンマスター" },
    { :id => 106, :name => "ダンジョンズ＆ドラゴンズ" },
    { :id => 107, :name => "天才軍師になろう" },
    { :id => 108, :name => "nRR" },
    { :id => 109, :name => "シャドウラン 4th Edition" },
    { :id => 110, :name => "剑 世界2.5" },
    { :id => 111, :name => "碧空のストレイヴ" },
    { :id => 112, :name => "英雄の尺度" },
    { :id => 113, :name => "ガラコと破界の塔" },
    { :id => 114, :name => "克蘇魯神話" },
    { :id => 115, :name => "ファンタズム・アドベンチャー" },
    { :id => 116, :name => "黒絢のアヴァンドナー" },
    { :id => 117, :name => "둘이서 수사" },
    { :id => 118, :name => "BBNTRPG" },
    { :id => 119, :name => "トンネルズ＆トロールズ" },
    { :id => 120, :name => "ワールドエンドフロントライン" },
    { :id => 121, :name => "デッドラインヒーローズRPG" },
    { :id => 122, :name => "剑世界" },
    { :id => 123, :name => "片道勇者TRPG" },
    { :id => 124, :name => "ビギニングアイドル" },
    { :id => 125, :name => "アースドーン" },
    { :id => 126, :name => "スクリームハイスクール" },
    { :id => 127, :name => "フィアスコ" },
    { :id => 128, :name => "メタリックガーディアンRPG" },
    { :id => 129, :name => "アサルトエンジン" },
    { :id => 130, :name => "不知火" },
    { :id => 131, :name => "チェレステ色のパラディーゾ" },
    { :id => 132, :name => "りゅうたま" },
    { :id => 133, :name => "克苏鲁的呼唤第六版" },
    { :id => 134, :name => "ソード・ワールドRPG" },
    { :id => 135, :name => "Record of Steam" },
    { :id => 136, :name => "カルカミ" },
    { :id => 137, :name => "크툴루의 부름 7판" },
    { :id => 138, :name => "エクリプス・フェイズ" },
    { :id => 139, :name => "ワースブレイド" },
    { :id => 140, :name => "ドラクルージュ" },
    { :id => 141, :name => "トーグ エタニティ" },
    { :id => 142, :name => "世界樹の迷宮SRS" },
    { :id => 143, :name => "無限のファンタジア" },
    { :id => 144, :name => "ピーカーブー" },
    { :id => 145, :name => "スチームパンカーズ" },
    { :id => 146, :name => "Werewolf: The Apocalypse 5th Edition" },
    { :id => 147, :name => "歯車の塔の探空士（冒険企画局）" },
    { :id => 148, :name => "アルスマギカ" },
    { :id => 149, :name => "드라크루주" },
    { :id => 150, :name => "ブラインド・ミトスRPG" },
    { :id => 151, :name => "ダブルクロス2nd,3rd" },
    { :id => 152, :name => "YearZeroEngine" },
    { :id => 153, :name => "Hunter: The Reckoning 5th Edition" },
    { :id => 154, :name => "ウォーハンマー" },
    { :id => 155, :name => "シャドウラン" },
    { :id => 156, :name => "真空学園" },
    { :id => 157, :name => "神我狩" },
    { :id => 158, :name => "アリアンロッドRPG" },
    { :id => 159, :name => "初音ミクTRPG ココロダンジョン" },
    { :id => 160, :name => "ペルソナTRPG-O" },
    { :id => 161, :name => "ルーンクエスト" },
    { :id => 162, :name => "ログ・ホライズンTRPG" },
    { :id => 163, :name => "剣の街の異邦人TRPG" },
    { :id => 164, :name => "叛逆レゾンデートル" },
    { :id => 165, :name => "歯車の塔の探空士（六畳間幻想空間）" },
    { :id => 166, :name => "ネバークラウドTRPG" },
    { :id => 167, :name => "トーグ1.5版" },
    { :id => 168, :name => "オラクルエンジン" },
    { :id => 169, :name => "瞳逸らさぬイリスベイン" },
    { :id => 170, :name => "蒼天のヴィラシエル" },
    { :id => 171, :name => "ルーンクエスト：ロールプレイング・イン・グローランサ" },
    { :id => 172, :name => "인세인" },
    { :id => 173, :name => "クトゥルフテック" },
    { :id => 174, :name => "エルリック！" },
    { :id => 175, :name => "Chill" },
    { :id => 176, :name => "Pathfinder" },
    { :id => 177, :name => "壊れた世界のポストマン" },
    { :id => 178, :name => "ハンターズ・ムーン" },
    { :id => 179, :name => "Shared†Fantasia" },
    { :id => 180, :name => "ステラーライフTRPG" },
    { :id => 181, :name => "フタリソウサ" },
    { :id => 182, :name => "ペンドラゴン" },
    { :id => 183, :name => "데타토코 사가" },
    { :id => 184, :name => "でたとこサーガ" },
    { :id => 185, :name => "ガンドッグ・リヴァイズド" },
    { :id => 186, :name => "ブレイド・オブ・アルカナ" },
    { :id => 187, :name => "ニンジャスレイヤーTRPG" },
    { :id => 188, :name => "デモンパラサイト" },
    { :id => 189, :name => "フィルトウィズ" },
    { :id => 190, :name => "비기닝 아이돌" },
    { :id => 191, :name => "バッドライフ" },
    { :id => 192, :name => "キルデスビジネス" },
    { :id => 193, :name => "Vampire: The Masquerade 5th Edition" },
    { :id => 194, :name => "迷宮デイズ" },
    { :id => 195, :name => "朱の孤塔のエアゲトラム" },
    { :id => 196, :name => "スタンダードRPGシステム" },
    { :id => 197, :name => "Ventangle" },
    { :id => 198, :name => "シャドウラン 5th Edition" },
    { :id => 199, :name => "バトルテック" },
    { :id => 200, :name => "ガンダム・センチネルRPG" },
    { :id => 201, :name => "新クトゥルフ神話TRPG" },
    { :id => 202, :name => "東京ゴーストリサーチ" },
    { :id => 203, :name => "終末紀行RPG" },
    { :id => 204, :name => "カオスフレア" },
    { :id => 205, :name => "セブン＝フォートレス メビウス" },
    { :id => 206, :name => "デモンスパイク" },
    { :id => 207, :name => "央華封神RPG 第三版" },
    { :id => 208, :name => "カードランカー" },
    { :id => 209, :name => "ガープス" },
    { :id => 210, :name => "バルナ・クロニカ" },
    { :id => 211, :name => "墜落世界" },
    { :id => 212, :name => "アニマアニムス" },
    { :id => 213, :name => "パラノイア リブーテッド" },
    { :id => 214, :name => "特命転攻生" },
    { :id => 215, :name => "コード：レイヤード" },
    { :id => 216, :name => "모노톤 뮤지엄" },
    { :id => 217, :name => "コンヴィクター・ドライブ" },
    { :id => 218, :name => "アニマラス" },
    { :id => 219, :name => "パラサイトブラッドRPG" },
    { :id => 220, :name => "ロードス島戦記RPG" },
    { :id => 221, :name => "ビギニングアイドル（2022年改訂版）" },
    { :id => 222, :name => "ガーデンオーダー" },
    { :id => 223, :name => "ソード・ワールド2.5" },
    { :id => 224, :name => "艦これRPG" },
    { :id => 225, :name => "蓬莱学園の冒険!!" },
    { :id => 226, :name => "晃天のイルージオ" },
    { :id => 227, :name => "ナイトメアハンター=ディープ" },
    { :id => 228, :name => "マギカロギア" },
    { :id => 229, :name => "ビーストバインド トリニティ" },
    { :id => 230, :name => "サンサーラ・バラッド" },
    { :id => 231, :name => "네크로니카" }
  ]
end