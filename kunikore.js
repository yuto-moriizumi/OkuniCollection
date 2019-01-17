"use strict";

const canvas = document.getElementById("canvas");
const descRule = ["国名", "首都", "説明"];
const desc = [
    ["日本国", "東京", "みんな大好き日本国です。"],
    ["アメリカ合衆国", "ワシントンD.C", "世界最強！アメリカ合衆国です。"], //02
    ["中華人民共和国", "北京", "日本のご近所さん、中華人民共和国です。"],
    ["ドイツ連邦共和国", "ベルリン", "勤労とビールの国、ドイツです。"],
    ["フランス共和国", "パリ", "近代共和国のモデル、フランスです。ドイツとは仲が悪いです。"],
    ["イギリス", "ロンドン", "正式には「グレートブリテン及び北アイルランド連合王国」といいます。 フランスとは14世紀以来のライバルです。"],
    ["インド共和国", "ニューデリー", "中国に次ぐアジアの人口大国です。 かつてはイギリスの植民地でした。"],
    ["ブラジル連邦共和国", "ブラジリア", "南米の大国です。 かつてはポルトガルの植民地でした。 国土の多くは密林です。"],
    ["イタリア共和国", "ローマ", "南ヨーロッパ、地中海に伸びる国です。 70年ほど前までは王政でした。 かつてのローマ帝国の中心でした。"],
    ["カナダ共和国", "オタワ", "アメリカの北にある、かなり広い国です。 とても寒く、イヌイットもいます。 かつてはイギリスやフランスの植民地でした。 そのため、英語の他にもフランス語が話されています。 最近大麻が解禁されました。"],
    ["ロシア連邦", "モスクワ", "世界で最も広い寒い国です。 連邦制を採用しており、ロシアの中にたくさんの共和国が存在します。 歴史的な経緯から、100以上の沢山の民族・言語が存在します。 かつてのソヴィエト連邦の中核です。"],
    ["オーストラリア連邦", "キャンベラ", "オセアニアのオーストラリア大陸を占める国家です。 天然資源が豊富です。 かつてはイギリスの植民地でした。"],
    ["スペイン王国", "マドリード", "西ヨーロッパのラテン系国家です。 かつては世界中に植民地をもつ超国家でした。 最近はいろいろと不調気味です。"],
    ["大韓民国", "ソウル特別市", "日本のお隣さんです。 朝鮮半島南部を支配しています。 北側の国とはイデオロギー的に対立していますが、最近は仲が良さげです。 かつては日本の植民地でした。"],
    ["メキシコ合衆国", "メキシコシティ", "アメリカの南にある国です。 アメリカ以外にも合衆国はあるんですよ！ アステカ帝国はここです。 かつてはスペインの植民地でした。"],
    ["トルコ共和国", "アンカラ", "ヨーロッパの東、アジアの西端、アナトリア半島のトルコ共和国です。 かつてはオスマン帝国といい、とても強大な国でした。 この国はオスマンから”独立”して成立しました。 建国の英雄ムスタファ・ケマル・アタテュルクに万歳！"],
    ["インドネシア共和国", "ジャカルタ", "東南アジアにある世界最大のイスラム教国家です。 多様な民族と言語が混在しています。 首都はジャカルタ、かつてはオランダの植民地でした。"],
    ["オランダ", "アムステルダム", "正式にはネーデルラントと言います。 スペインから独立した後は、世界中に植民地を展開しました。 ヨーロッパの中では、早くから日本との交流も持っていました。"],
    ["サウジアラビア王国", "リヤド", "オイルマネーで潤うイケイケの君主国家です。 国名はサウジのアラビア、つまり、サウード家のアラビアという意味です。"],
    ["スイス連邦", "ベルン", "ヨーロッパに光り輝く永世中立国です。 外交や金融上の重要な拠点となっています。 かつて神聖ローマ帝国を構成していた諸州が連帯して出来たのが始まりです。 ドイツ、イタリア、フランス、ロマンシュなどの様々な文化が集まっています。"],
    ["ポーランド共和国", "ワルシャワ", "歴史ある東欧の国です。3つ目の共和制です。 かつてはかのオスマン帝国をもしのぐ大国でした。 しかし、近代では分割併合される不遇の目にあっていました。"],
    ["スウェーデン王国", "ストックホルム", "かつての列強の1角です。昔はノルマン人の拠点でした。 第二次世界大戦中は鉄鋼業で有名でした。 ノルウェーやデンマークと言語的に近い関係にあります。"],
    ["イラン・イスラム共和国", "テヘラン", "中東の地域大国です。 イスラム共和制という独自の政体を敷いています。 複雑な中東情勢に頻繁にかかわってくるので覚えておきましょう。 サウジアラビアのライバルです。"],
    ["中華民国", "台北市", "台湾だと思いましたか？ 実は台湾は中華民国を構成する地域の一つでしかありません。 かつて清朝が崩壊した後に成立した共和制の国家です。 中華人民共和国とは、韓国と北朝鮮のような関係です。"],
];
const menu = new createjs.Stage("canvas");
const zukan = new createjs.Stage("canvas");
const gacha = new createjs.Stage("canvas");
const quiz = new createjs.Stage("canvas");
const ranking = new createjs.Stage("canvas");
const kakudai = new createjs.Stage("canvas");
changeStage(menu);

const storage = localStorage;
let point = storage.getItem("point");
if (point === null) {
    point = 5; //初期ポイント
    storage.setItem("point", point);
}
let name = storage.getItem("name");
if (name === null) {
    while (true) {
        name = window.prompt("プレイヤー名を入力してください", "名無し");
        if (name === null) {
            alert("名前を入力してください");
            continue;
        }
        const rankingCsv = getCsv("ranking.csv?=" + Math.random());
        let isUsed = false;
        for (const iterator of rankingCsv) {
            isUsed = (iterator[0] === name); //先頭行が入力された名前と一致するか
        }
        if (!isUsed) break; //使用されていないならループを抜ける
        alert("その名前は既に使用されています。");
    }
    storage.setItem("name", name);
}
const GACHA_COST = 3;

//メインメニューのセットアップ
//背景画像
const menuImg = new createjs.Bitmap("sekaichizu.jpg");
menuImg.scale = 1.6;
menu.addChild(menuImg);

const nameText = new createjs.Text("ようこそ！" + name + "さん", "24px Arial", "black");
nameText.x = 150;
nameText.y = 50;
menu.addChild(nameText);

//ボタン生成
createCircleButton(menu, "aqua", " 母国", 50, 50);
createCircleButton(menu, "red", "図鑑", 200, 250).addEventListener("click", () => {
    changeStage(zukan);
    let offset = 0;
    generateZukan();

    function generateZukan() {
        zukan.removeAllChildren();
        createCircleButton(zukan, "red", " 図鑑", 50, 50).addEventListener("click", changeStage(menu));
        createCircleButton(zukan, "orange", "次へ", 750, 50, 50).addEventListener("click", () => {
            if (offset + 8 < desc.length) {
                offset += 8;
                generateZukan();
            }
        });;
        createCircleButton(zukan, "yellowgreen", "前へ", 650, 50, 50).addEventListener("click", () => {
            if (offset > 0) {
                offset -= 8;
                generateZukan();
            }
        });;

        for (let i = 0; i + offset < desc.length && i < 8; i++) {
            const container = new createjs.Container();
            zukan.addChild(container);
            if (storage.getItem(i + offset) === "own") {
                const zukanImg = new createjs.Bitmap("imgs/" + (i + offset) + ".png"); //持っている場合のみ画像を表示
                zukanImg.scale = 0.5;
                zukanImg.y = 15;
                container.addChild(zukanImg);
            }
            const zukanText = new createjs.Text("No." + (i + offset), "16px Arial", "black");
            container.addChild(zukanText);
            container.x = i % 4 * 170 + 100;
            container.y = Math.floor(i / 4) * 130 + 150;
            container.addEventListener("click", () => {
                zukan.enableDOMEvents(false);
                kakudai.enableDOMEvents(true);
                kakudai.addChild(new createjs.Bitmap("imgs/" + (i + offset) + ".png"));
                const title = new createjs.Text(desc[i + offset][descRule.indexOf("国名")], "32px Arial", "black");
                title.x = 350;
                title.y = 50;
                kakudai.addChild(title);
                const text = new createjs.Text(desc[i + offset][descRule.indexOf("説明")], "16px Arial", "black");
                text.x = 350;
                text.y = 100;
                text.lineWidth = 1;
                text.maxWidth = canvas.width - text.x;
                kakudai.addChild(text);
                createCircleButton(kakudai, "green", "戻る", 100, 320).addEventListener("click", () => {
                    kakudai.enableDOMEvents(false);
                    setTimeout(() => { zukan.update() }, 100);
                    zukan.enableDOMEvents(true);
                });;
                kakudai.update();
            });
        }
        setTimeout(() => { zukan.update() }, 100);
    }
});
createCircleButton(menu, "green", "ガチャ", 400, 250).addEventListener("click", () => {
    let isLocked = false; //まだ見つけていない国があるか
    for (let i = 0; i < desc.length; i++) {
        if (storage.getItem(i) !== "own") isLocked = true;
    }
    if (!isLocked) {
        createDialog(menu, "全ての国を見つけました");
    } else if (point < GACHA_COST) {
        createDialog(menu, "ﾎﾟｲﾝﾖが足りません");
    } else {
        point -= GACHA_COST; //GACHA_COSTポインヨ減らす
        storage.setItem("point", point);
        changeStage(gacha);
        gacha.removeAllChildren(); //ガチャ画面をクリア

        let n = 0;
        do {
            n = Math.floor(Math.random() * desc.length);
        } while (storage.getItem(n) === "own");
        storage.setItem(n, "own");
        const img = new createjs.Bitmap("imgs/" + n + ".png");
        img.scale = 0;
        img.regX = 160;
        img.regY = 106;
        img.x = canvas.width / 2;
        img.y = canvas.height / 2;
        gacha.addChild(img);
        const timer = setInterval(() => {
            if (img.scale > 1.4) {
                clearInterval(timer);
                createDialog(gacha, desc[n][descRule.indexOf("国名")] + "を入手");
                createCircleButton(gacha, "green", "ガチャ", 50, 50).addEventListener("click", () => { //戻るボタンを追加
                    menu.removeChild(pointCircle);
                    pointCircle = createCircleButton(menu, "orange", "ﾎﾟｲﾝﾖ：" + point, 500, 50, 50);
                    changeStage(menu);
                });;
                gacha.update();
            } else {
                img.scale += 0.1;
                gacha.update();
            };
        }, 100);
    }
});;
createCircleButton(menu, "blue", "クイズ", 600, 250).addEventListener("click", () => {
    menu.enableDOMEvents(false);
    let combo = 0;
    generateQuiz();

    function generateQuiz() {
        quiz.enableDOMEvents(true);
        quiz.removeAllChildren();
        createCircleButton(quiz, "blue", "   クイズ", 50, 50).addEventListener("click", () => {
            clearInterval(timer);
            quiz.enableDOMEvents(false);
            menu.enableDOMEvents(true);
            menu.removeChild(pointCircle);
            pointCircle = createCircleButton(menu, "orange", "ﾎﾟｲﾝﾖ：" + point, 500, 50, 50);
            menu.update();
        });;
        createCircleButton(quiz, "green", "COMBO:" + combo, 700, 50, 50);
        let id = new Array();
        while (id.length < 4) {
            const n = Math.floor(Math.random() * desc.length); //乱数を生成
            if (!id.includes(n)) id.push(n);
        }
        let answer = Math.floor(Math.random() * 4); //正解を決める
        const ansImg = new createjs.Bitmap("imgs/" + id[answer] + ".png");
        ansImg.regX = 160;
        ansImg.x = canvas.width / 2;
        ansImg.y = 50;
        quiz.addChild(ansImg);
        let timer = setInterval(() => { quiz.update(); }, 50);
        for (let i = 0; i < 4; i++) {
            const button = createButton(quiz, desc[id[i]][descRule.indexOf("国名")], i % 2 * 275 + 250, Math.floor(i / 2) * 75 + 300);
            if (desc[id[i]][descRule.indexOf("国名")] === desc[id[answer]][descRule.indexOf("国名")]) {
                button.addEventListener("click", () => {
                    quiz.enableDOMEvents(false);
                    createDialog(quiz, "正解！");
                    point++;
                    storage.setItem("point", point);
                    combo++;
                    clearInterval(timer);
                    setTimeout(() => { generateQuiz(); }, 500);
                });
            } else {
                button.addEventListener("click", () => {
                    quiz.enableDOMEvents(false);
                    createDialog(quiz, "ブッブー！");
                    combo = 0;
                    clearInterval(timer);
                    setTimeout(() => { generateQuiz(); }, 500);
                });
            };
        }
    }
});

let pointCircle = createCircleButton(menu, "orange", "ﾎﾟｲﾝﾖ:" + point, 500, 50, 50);
createCircleButton(menu, "black", "初期化", 50, 400, 25).addEventListener("click", () => {
    storage.clear();
    createDialog(menu, "初期化しました");
    setTimeout(() => { location.reload() }, 1000);
});

createCircleButton(menu, "purple", "ランキング", 600, 50, 50).addEventListener("click", () => {
    ranking.removeAllChildren();
    createCircleButton(ranking, "purple", "ランキング", 50, 50, 100).addEventListener("click", () => { changeStage(menu) });

    //ランキング情報を取得
    const csvData = getCsv("ranking.csv?=" + Math.random());
    for (let i = 0; i < csvData.length; i++) {
        const text = new createjs.Text(i + 1 + "位　" + csvData[i][0] + "：" + csvData[i][1], "16px Arial", "black");
        text.x = 200;
        text.y = 140 + i * 20;
        ranking.addChild(text);
    }

    //所持国数をカウント
    let score = 0;
    for (let i = 0; i < desc.length; i++) {
        if (storage.getItem(i) === "own") score++;
    }
    const scoreText = new createjs.Text("あなたの所持国数：" + score, "24px Arial", "black");
    scoreText.x = 200;
    scoreText.y = 100;
    ranking.addChild(scoreText);

    createCircleButton(ranking, "red", "登録", 200, 25, 50).addEventListener("click", () => {
        const registReq = new XMLHttpRequest();
        registReq.open("POST", "main.php", false);
        registReq.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        registReq.send("command=regist&name=" + encodeURIComponent(name) + "&score=" + score);
        registReq.onreadystatechange = () => {
            console.log(registReq.status);
        };
        alert("登録しました。");
    });
    changeStage(ranking);
})

//描写 
setTimeout(() => { menu.update(); }, 100);

function changeStage(stage) {
    menu.enableDOMEvents(false);
    zukan.enableDOMEvents(false);
    gacha.enableDOMEvents(false);
    quiz.enableDOMEvents(false);
    ranking.enableDOMEvents(false);
    kakudai.enableDOMEvents(false);
    stage.enableDOMEvents(true);
    stage.update();
}

//円形ボタンを作成
function createCircleButton(stage, color = "red", str = "テキスト", x = 100, y = 100, size = 100) {
    const container = new createjs.Container();
    container.x = x;
    container.y = y;
    stage.addChild(container);
    //円を生成
    const circle = new createjs.Shape();
    circle.graphics.beginFill(color);
    circle.graphics.drawCircle(0, 0, size);
    container.addChild(circle);
    //テキスト
    const text = new createjs.Text(str, size / 100 * 64 + "px Arial", "white");
    text.textAlign = "center";
    text.textBaseline = "middle";
    text.maxWidth = size * 2;
    container.addChild(text);
    return container;
}

//ダイアログを生成
function createDialog(stage, str = "テキスト") {
    const container = new createjs.Container();
    container.x = 400;
    container.y = 225;
    stage.addChild(container);
    //四角を生成
    const rect = new createjs.Shape();
    rect.graphics.beginFill("white");
    rect.graphics.drawRect(-100, -50, 200, 100);
    container.addChild(rect);
    //テキスト
    const text = new createjs.Text(str, "16px Arial", "black");
    text.textAlign = "center";
    text.textBaseline = "middle";
    container.addChild(text);
    //四角を生成
    const okRect = new createjs.Shape();
    okRect.graphics.beginFill("gray");
    okRect.graphics.drawRect(-15, 20, 30, 20);
    okRect.addEventListener("click", () => {
        stage.removeChild(container);
        stage.update();
    });
    container.addChild(okRect);
    //OKテキスト
    const okText = new createjs.Text("OK", "16px Arial", "black");
    okText.textAlign = "center";
    okText.y = 25;
    container.addChild(okText);
    stage.update();
    return container;
}

//回答ボタンを作成
function createButton(stage, str = "テキスト", x = 100, y = 100) {
    const container = new createjs.Container();
    container.x = x;
    container.y = y;
    stage.addChild(container);
    //四角を生成
    const rect = new createjs.Shape();
    rect.graphics.beginFill("blue");
    rect.graphics.drawRect(-125, -25, 250, 50);
    container.addChild(rect);
    //テキスト
    const text = new createjs.Text(str, "24px Arial", "white");
    text.textAlign = "center";
    text.textBaseline = "middle";
    container.addChild(text);
    return container;
}

function getCsv(path = "hoge.csv") {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", path, false);
    ajax.send(null);
    const lines = ajax.responseText.split(String.fromCharCode(10));
    let csvData = new Array();
    for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(",");
        if (cells.length != 1) {
            csvData.push(cells);
        }
    }
    return csvData;
}