const lyricsAreaEl = mainContent.querySelector(".lyricsArea");

const lyricsData = {
    Sekainihitotsudakenohana: {
        title: "世界に一つだけの花",
        artist: "SMAP",
        subText: "昼夜祭で歌う曲",
        lyric: `花屋の店先に並んだ
いろんな花を見ていた
ひとそれぞれ好みはあるけど
どれもみんなきれいだね

この中で誰が一番だなんて
争うこともしないで
バケツの中誇らしげに
しゃんと胸を張っている

それなのに僕ら人間は
どうしてこうも比べたがる
一人一人違うのにその中で
一番になりたがる

そうさ 僕らは
世界に一つだけの花
一人一人違う種を持つ
その花を咲かせることだけに
一生懸命になればいい

困ったように笑いながら
ずっと迷ってる人がいる
頑張って咲いた花はどれも
きれいだから仕方ないね
やっと店から出てきた
その人が抱えていた
色とりどりの花束と
うれしそうな横顔

名前も知らなかったけれど
あの日僕に笑顔をくれた
誰も気づかないような場所で
咲いてた花のように

そうさ 僕らは
世界に一つだけの花
一人一人違う種を持つ
その花を咲かせることだけに
一生懸命になればいい

小さい花や大きな花
一つとして同じものはないから
NO.1にならなくてもいい
もともと特別なOnly one`,
    },
    Aozora: {
        title: "青空",
        subText: "後夜祭で歌う曲",
        lyric: `ブラウン管の向う側
カッコつけた騎兵隊が
インディアンを撃ち倒した
ピカピカに光った銃で
出来れば僕のゆううつを
撃ち倒してくれれば よかったのに

神様にワイロを贈り
天国へのパスポートをねだるなんて
本気なのか? 誠実さのかけらもなく
笑っている奴がいるよ
隠しているその手を 見せてみろよ

生まれた所や 皮膚や目の色で
いったいこの僕の
何がわかると いうのだろう
運転手さん そのバスに
僕も乗っけて くれないか
行き先なら どこでもいい
こんなはずじゃ なかっただろ?
歴史が僕を 問いつめる
まぶしいほど 青い空の真下で

生まれた所や 皮膚や目の色で
いったいこの僕の
何がわかると いうのだろう
運転手さん そのバスに
僕も乗っけて くれないか
行き先なら どこでもいい
こんなはずじゃ なかっただろ?
歴史が僕を 問いつめる
まぶしいほど 青い空の真下で

青い空の真下で
青い空の真下で
青い空の 青い空の`,
    },
    Fiesta: {
        title: "フィエスタ",
        subText: "後夜祭で歌う曲",
        lyric: `すべてを果たして すべてを燃やして
灰さえも残らぬ ものたちに祈ろう

形のないもの 悲しみ 喜び
生まれて死ぬもの その傷に捧げよう

いつの日も想いは 輝き続ける
いつの日も空に 君の歌が響く
闇のなかに火をともせ
天使達よ 血を流せ

死者の愛を抱きしめて
この祭りの夜を明かそう
嘆きの遺跡を 巡り続けて
墓場に忘れられた 暦を見つける

古ぼけた知恵を 心に託して
たそがれに無限の 灯火を燃やそう

いつの日も想いは 輝き続ける
いつの日も空に 君の歌が響く
闇のなかに火をともせ
天使達よ 血を流せ

死者の愛を抱きしめて
この祭りの夜を明かそう

夕陽よ 故郷を 緩やかに照らせ
花びらよ 彼方の 友達に届け

形のないもの 涙と微笑
生まれて死ぬもの その傷の証しよ

いつの日も想いは 輝き続ける
いつの日も空に 君の歌が響く

夕陽よ 故郷を 緩やかに照らせ
花びらよ 彼方の 友達に届け

夕陽よ 故郷を 緩やかに照らせ
花びらよ 彼方の 友達に届け

夕陽よ 故郷を 緩やかに照らせ
花びらよ 彼方の 友達に届け

夕陽よ 故郷を 緩やかに照らせ
花びらよ 彼方の 友達に届け`,
    },
};

const lyricsFragment = d.createDocumentFragment();

Object.values(lyricsData).forEach(lyricsItem => {
    const songSetEl = d.createElement("div");
    songSetEl.className = "songSet button";

    const titleEl = d.createElement("div");
    const subTextEl = d.createElement("div");
    const lyricsEl = d.createElement("div");

    titleEl.textContent = `${lyricsItem.artist ? lyricsItem.artist + " / " : ""}${lyricsItem.title || ""}`;
    titleEl.className = "title";

    subTextEl.textContent = lyricsItem.subText || "";
    subTextEl.className = "subText";

    lyricsEl.innerHTML = lyricsItem.lyric.replaceAll(/\n/g, "<br>");
    lyricsEl.className = "lyric";

    songSetEl.appendChild(subTextEl);
    songSetEl.appendChild(titleEl);
    songSetEl.appendChild(lyricsEl);

    lyricsFragment.appendChild(songSetEl);
});

lyricsAreaEl.appendChild(lyricsFragment);