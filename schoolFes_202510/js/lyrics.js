const lyricsAreaEl = mainContent.querySelector(".lyricsArea");

const lyricsData = {
    Sekainihitotsudakenohana: {
        title: "世界に一つだけの花",
        artist: "SMAP",
        subText: "昼夜祭で歌う曲",
        lyric: ``,
        link: "https://www.uta-net.com/song/15894/",
    },
    Aozora: {
        title: "青空",
        subText: "後夜祭で歌う曲",
        lyric: ``,
        link: "https://www.uta-net.com/song/179/",
    },
    Fiesta: {
        title: "フィエスタ",
        subText: "後夜祭で歌う曲",
        lyric: ``,
        link: "https://www.uta-net.com/song/43012/",
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

    lyricsEl.innerHTML = lyricsItem.lyric.replaceAll(/\n/g, "<br>") || (
        `<a src="${lyricsItem.link}"></a>`
    );
    lyricsEl.className = "lyric";

    songSetEl.appendChild(subTextEl);
    songSetEl.appendChild(titleEl);
    songSetEl.appendChild(lyricsEl);

    lyricsFragment.appendChild(songSetEl);
});

lyricsAreaEl.appendChild(lyricsFragment);
