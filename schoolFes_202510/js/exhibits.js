// CSS2DRendererの中で"three"から読み込みをしようとするため､importmapでの定義が必要

import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";
let THREE, GLTFLoader, OrbitControls, BufferGeometryUtils, CSS2DRenderer, CSS2DObject;

const getIsThreePerfection = () => (THREE && GLTFLoader && OrbitControls && BufferGeometryUtils && CSS2DRenderer && CSS2DObject) ? true : false;

const exhibitsBottomBar = d.querySelector(".exhibits .sortList");
const exhibitsArea = d.querySelector(".exhibits .list");

const bottomBar_contents = d.createElement("div");
const sortList_topContents = d.createElement("div");
const sortList_topBar = d.createElement("div");
const sortList_tabs = d.createElement("div");

exhibitsBottomBar.addEventListener("wheel", e => {
    e.preventDefault();
    e.stopPropagation();
}, { passive: false });

const maps_words = {
    Subjects: {
        Japanese: "日本語",
        Math: "数学",
        English: "英語",
        Science: "理科",
        SocialStudies: "社会",
        Music: "音楽",
        Life: "人間生活",
        Art: "美術",
        PhysicalEdu: "体育",
        Information: "情報",
        Woodworking: "木工",
    },
    Grades: {
        J: "中学",
        H: "高校",
    },
    Subject: "科",
    Room: "室",
    Ridge: "棟",
    Laboratory: "研究",
    Preparation: "準備",
    Conjs: {
        NextTo: "の隣",
        Inside: "の中",
        Infront: "の前",
        Behind: "の裏",
        Near: "の近く",
    },
    Directions: {
        N: "北",
        S: "南",
        E: "東",
        W: "西",
    },
};

const getClassName = (school, input_grade, input_class) => (
    `${school == "H" || input_class > 3 ? maps_words.Grades.H : maps_words.Grades.J} ${input_grade}年${input_class}組`
);

const arrowHTMLStr = `<svg xmlns="http://www.w3.org/2000/svg"><g><path d="M228.451,230.092L228.451,850.906L849.265,850.906"></path></g></svg>`;

const maps_names = {
    Bus: "バス",
    Entrance: "玄関",
    FrontEntrance: "昇降口",
    Woodworking: `${maps_words.Subjects.Woodworking}${maps_words.Room}`,
    Dining: "食堂",
    Dormitory: "寮",
    Secretariat: "事務局",
    Gym: `${maps_words.Subjects.PhysicalEdu}館`,
    Art: `${maps_words.Subjects.Art}${maps_words.Ridge}`,
    Corridor: "廊下",
    Stairs: "階段",
    Biotope: "ビオトープ",
    Skateboard: "スケボー場",
    Multipurpose: "多目的ホール",
    Science_A: `${maps_words.Subjects.Science}${maps_words.Room}A`,
    Science_B: `${maps_words.Subjects.Science}${maps_words.Room}B`,
    Science_C: `${maps_words.Subjects.Science}${maps_words.Room}C`,
    Science_D: `${maps_words.Subjects.Science}${maps_words.Room}D`,
    Science_Preparation: `${maps_words.Subjects.Science}${maps_words.Preparation}${maps_words.Room}`,
    Science_Laboratory: `${maps_words.Subjects.Science}${maps_words.Laboratory}${maps_words.Room}`,
    SocialStudies_Laboratory: `${maps_words.Subjects.SocialStudies}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    English_Laboratory: `${maps_words.Subjects.English}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Music_Small: `小${maps_words.Subjects.Music}${maps_words.Room}`,
    Music_Large: `大${maps_words.Subjects.Music}${maps_words.Room}`,
    Music_Laboratory: `${maps_words.Subjects.Music}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Music_2: `第2${maps_words.Subjects.Music}${maps_words.Room}`,
    Music_3: `第3${maps_words.Subjects.Music}${maps_words.Room}`,
    Cooking: `調理${maps_words.Room}`,
    Computers: `${maps_words.Subjects.Information}教${maps_words.Room}`,
    Math_Laboratory: `${maps_words.Subjects.Math}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Life_Laboratory: `${maps_words.Subjects.Life}${maps_words.Subject}${maps_words.Laboratory}${maps_words.Room}`,
    Warehouse: "倉庫",
    Darkroom: "暗室",
    Seminar: `ゼミ${maps_words.Room}`,
};

const exhibits = {
    F1_J1_1: {
        name: "暗闇迷路",
        tag: [
            "byClass",
            "attractions",
            "J1",
        ],
        image: "medias/exhibits/J1_1.png",
    },
    F1_J1_2: {
        name: "脱出の森",
        tag: [
            "byClass",
            "attractions",
            "J1",
        ],
    },
    F1_J1_3: {
        name: "4DX",
        tag: [
            "byClass",
            "attractions",
            "J1",
        ],
    },
    F2_J2_1: {
        name: "3番出口",
        tag: [
            "byClass",
            "attractions",
            "J2",
        ],
    },
    F2_J2_2: {
        name: "小岩井サービスエリア",
        tag: [
            "byClass",
            "J2",
            "foods",
            "merchandise",
        ],
    },
    F2_J2_3: {
        name: "サスケチック",
        tag: [
            "byClass",
            "attractions",
            "J2",
        ],
    },
    F3_J3_1: {
        name: "煌めきの宇宙探査",
        tag: [
            "byClass",
            "attractions",
            "J3",
        ],
    },
    F3_J3_2: {
        name: "沈むなタイタニック号",
        tag: [
            "byClass",
            "attractions",
            "J3",
        ],
    },
    F3_J3_3: {
        name: "指名手配犯ごっこ",
        tag: [
            "byClass",
            "foods",
            "merchandise",
            "J3",
        ],
    },

    F1_H1_1: {
        name: "じも天堂",
        tag: [
            "byClass",
            "foods",
            "H1",
        ],
    },
    F1_H1_2: {
        name: "MISSION IMPOSSIBLE FIRST MISSION",
        tag: [
            "byClass",
            "attractions",
            "H1",
        ],
    },
    F1_H1_3: {
        name: "喫煙所(禁煙)",
        tag: [
            "byClass",
            "foods",
            "merchandise",
            "H1",
        ],
    },
    F1_H1_4: {
        name: "海ん家in Hawaii",
        activitys: {
            d1: ["10:50"],
            d2: ["10:30", "14:00"],
        },
        tag: [
            "byClass",
            "foods",
            "merchandise",
            "display",
            "H1",
        ],
    },
    F1_H1_5: {
        name: "月の消えた町",
        tag: [
            "byClass",
            "attractions",
            "H1",
        ],
    },
    F1_H1_6: {
        name: "自森坂の上のポニョ",
        tag: [
            "byClass",
            "attractions",
            "H1",
        ],
    },
    F1_H1_7: {
        name: "自森横丁",
        tag: [
            "byClass",
            "foods",
            "merchandise",
            "H1",
        ],
    },
    F2_H2_1: {
        name: "お化け屋敷",
        tag: [
            "byClass",
            "foods",
            "attractions",
            "H2",
        ],
    },
    F2_H2_2: {
        name: "出流原~因習村でお待ちしております。",
        tag: [
            "byClass",
            "foods",
            "merchandise",
            "display",
            "H2",
        ],
    },
    F2_H2_3: {
        // name: "ベイカリーマックス",
        name: "ベイカリーマックス~Coffeeたしなんじゃお★~",
        tag: [
            "byClass",
            "attractions",
            "H2",
        ],
    },
    F2_H2_4: {
        name: "SHLooN",
        tag: [
            "byClass",
            "attractions",
            "H2",
        ],
    },
    F2_H2_5: {
        name: "スペースローラーコースター",
        tag: [
            "byClass",
            "attractions",
            "H2",
        ],
    },
    F2_H2_6: {
        name: "トイマニ6",
        tag: [
            "byClass",
            "attractions",
            "H2",
        ],
    },
    F2_H2_7: {
        name: "夢を叶えて!たいやきくん",
        tag: [
            "byClass",
            "merchandise",
            "attractions",
            "H2",
        ],
    },
    F3_H3_1: {
        name: "神社",
        tag: [
            "byClass",
            "H3",
        ],
    },
    F3_H3_2: {
        name: "字森",
        tag: [
            "byClass",
            "display",
            "H3",
        ],
    },
    F3_H3_3: {
        name: "三組万博",
        tag: [
            "byClass",
            "display",
            "H3",
        ],
    },
    F1_H3_4: {
        name: "ウマ息子~プリティダービー",
        location: `${maps_names.Multipurpose}`,
        tag: [
            "byClass",
            "H3",
        ],
    },
    F3_H3_5: {
        name: "ねっとりねっと",
        tag: [
            "byClass",
            "attractions",
            "H3",
        ],
    },
    F3_H3_6: {
        name: "お化け屋敷",
        tag: [
            "byClass",
            "attractions",
            "H3",
        ],
    },
    F3_H3_7: {
        name: "ウォーリーを探せ",
        tag: [
            "byClass",
            "H3",
        ],
    },

    // ↓有志
    F1_PROBUX: {
        name: "PROBUX",
        location: `${maps_names.Science_B}`,
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_Omoshiro: {
        name: "とってもおもしろいこと",
        location: `${maps_names.Science_A}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: ["11:00"],
            d2: ["11:00"],
        },
        tag: [
            "byVolunteers",
            "display",
            "merchandise",
        ],
    },
    F1_MCBATTLE: {
        name: "MC BATTLE",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Infront}`,
        // focusMeshName: "F1_Entrance_Arch",
        activitys: {
            d2: ["15:00", "16:00"],
        },
        tag: [
            "byVolunteers",
            "announcement",
        ],
    },
    Keion: {
        name: "軽音ライブ",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: ["13:30", "15:50"],
        },
        tag: [
            "byVolunteers",
            "announcement",
            "day1",
        ],
    },
    F1_Shooting: {
        name: "射的",
        location: `${maps_names.Gym}${maps_words.Conjs.NextTo}`,
        activitys: {
            d1: ["10:40"],
            d2: ["10:20"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    PlaneWorkshop: {
        name: "飛行機ワークショップ",
        location: `${maps_names.Science_D}${maps_words.Conjs.Behind}`,
        activitys: {
            d1: ["10:30"],
            d2: ["10:20"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    Shoten: {
        name: "昇天商店",
        location: `${maps_names.Warehouse}`,
        activitys: {
            d2: [],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F2_Handmade: {
        name: "はじめの手作りshop",
        location: `${getClassName("H", 2, 3)}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Tekken_1: {
        name: "鉄研 5インチ･プラレール展示",
        location: `${maps_names.Science_Laboratory}${maps_words.Conjs.Behind}`,
        tag: [
            "byVolunteers",
            "display",
            "attractions",
        ],
    },
    F1_SnapNow: {
        name: "#snap now",
        location: `${maps_names.Gym}${maps_words.Conjs.Behind}､${maps_names.Woodworking}${maps_words.Conjs.NextTo}`,
        activitys: {
            d1: ["10:30"],
            d2: [],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F3_Yutosara: {
        name: "ゆうとさらの占い部屋",
        location: `${getClassName("H", 3, 6)}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: ["11:00"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Coffee: {
        name: "コーヒーカルチャークラブ",
        //表記ゆれ
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Behind}`,
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    DoyouDance: {
        name: "土曜ダンス",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: ["10:30", "10:35"],
        },
        tag: [
            "byVolunteers",
            "announcement",
        ],
    },
    AMAZE: {
        name: "ダンス部AMAZE",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: ["11:00", "11:10"],
        },
        tag: [
            "byVolunteers",
            "announcement",
        ],
    },
    F1_Nazotoki: {
        name: "自森謎解き",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Near}`,
        tag: [
            "byVolunteers",
            "attractions",
        ],
    },
    F1_BLUEPEYOUNG: {
        name: "BLUE PEYOUNG",
        location: `${maps_names.Science_D}`,
        tag: [
            "byVolunteers",
            "foods",
            "display",
        ],
    },
    F1_SkateDrink: {
        name: "スケートドリンク",
        location: `${maps_names.Gym}${maps_words.Conjs.Infront}､${maps_names.Skateboard}`,
        activitys: {
            d1: ["10:30", "15:50"],
            d2: [],
        },
        tag: [
            "byVolunteers",
            "foods",
            "attractions",
        ],
    },
    F3_Tokusatsu: {
        name: "特撮映画上映",
        location: `${maps_names.Music_Small}`,
        activitys: {
            d1: ["10:40"],
        },
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    Miyata: {
        name: "宮田の即売会",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: [null, "15:00"],
            d2: ["13:00"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Cat: {
        name: "猫部のお店",
        location: `${maps_names.Multipurpose}${maps_words.Conjs.Near}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Nepal: {
        name: "ネパール孤児院募金",
        location: `${maps_names.Art}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
        ],
    },
    F3_Hostclub: {
        name: "ホストクラブ｢blue★spring｣",
        location: `${maps_names.Seminar}`,
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_Cardboard: {
        name: "ダンボール武器庫",
        location: `${getClassName("H", 1, 3)}${maps_words.Conjs.NextTo}`,
        activitys: {
            d1: ["10:20"],
            d2: ["10:20"],
        },
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    F1_Botanya: {
        name: "ぼたんやさん",
        activitys: {
            d2: [],
        },
        location: `${maps_names.Gym}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Warasibe: {
        name: "わらしべ長者",
        location: `${maps_names.Multipurpose}${maps_words.Conjs.Near}`,
        activitys: {
            d1: ["10:30", "15:30"],
            d2: ["10:30", "14:30"],
        },
        tag: [
            "byVolunteers",
        ],
    },
    ChuMinKyo: {
        name: "中民郷学園祭公演",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Infront}`,
        activitys: {
            d2: ["10:00", "13:00"],
        },
        tag: [
            "byVolunteers",
            "announcement",
        ],
    },
    F1_PrivateSchool: {
        name: "私学助成",
        location: `${maps_names.FrontEntrance}`,
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    Paparazzi: {
        name: "paparazzi",
        location: `${maps_names.Darkroom}`,
        tag: [
            "byVolunteers",
        ],
    },
    F1_YouMayHena: {
        name: "you may hena",
        location: `${getClassName("J", 1, 1)}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Sawatonagi: {
        name: "さわとなぎの雑貨やさん",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Behind}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Mononoke: {
        name: "もののけ",
        location: `${getClassName("H", 1, 1)}${maps_words.Conjs.Infront}の${maps_names.Stairs}`,
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    F3_115: {
        name: "115",
        location: `${maps_names.Music_Laboratory}${maps_words.Conjs.Near}`,
        activitys: {
            d1: ["13:00", "15:40"],
            d2: ["13:00"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    Samba: {
        name: "サンバ",
        location: `${maps_names.FrontEntrance}`,
        activitys: {
            d2: ["14:30", "15:00"],
        },
        tag: [
            "byVolunteers",
            "announcement",
        ],
    },
    F1_Moon_Dormitory: {
        name: `ちゅきちゅき月${maps_names.Dormitory}`,
        location: `${getClassName("H", 1, 3)}${maps_words.Conjs.NextTo}`,
        activitys: {
            d1: [null, "15:00"],
            d2: [null, "14:00"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    North_Dormitory: {
        name: `${maps_words.Directions.N}${maps_names.Dormitory}Movie`,
        location: `${maps_names.Science_C}`,
        activitys: {
            d1: ["10:30"],
            d2: [],
        },
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    Star_Dormitory: {
        name: `星${maps_names.Dormitory}有志`,
        // location: `${maps_names.Science_A}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F1_Sustainable: {
        name: "サステナ委員会",
        location: `${maps_names.Entrance}`,
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    F1_Glass: {
        name: "ガラス細工部",
        location: `${getClassName("H", 1, 7)}${maps_words.Conjs.Infront}`,
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F2_IllustManga: {
        name: "イラストマンガ部",
        location: `${maps_names.Music_Large}${maps_words.Conjs.Near}`,
        activitys: {
            d1: ["11:00"],
            d2: ["11:00"],
        },
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    Aruaru: {
        name: "自森のあるある展",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Near}の${maps_names.Stairs}`,
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    F3_Button: {
        name: "Button",
        location: `${getClassName("H", 3, 3)}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
            "display",
        ],
    },
    Smash: {
        name: "スマブラしようぜ!",
        location: `${maps_names.Art}`,
        tag: [
            "byVolunteers",
        ],
    },
    F1_Okigae: {
        name: "お着替え 4コマ",
        location: `${getClassName("H", 1, 6)}${maps_words.Conjs.Infront}`,
        activitys: {
            d1: ["11:00"],
            d2: ["10:30"],
        },
        tag: [
            "byVolunteers",
        ],
    },
    F3_Steal: {
        name: "盗",
        location: `${getClassName("H", 3, 4)}`,
        tag: [
            "byVolunteers",
            "attractions",
        ],
    },
    F2_CoffeeWatashi: {
        name: "珈琲 道渡時",
        location: `${maps_names.Warehouse}`,
        activitys: {
            d1: [],
            d2: [null, "13:00"],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F2_StarRabbit: {
        name: "星うさぎの贈り物",
        location: `${maps_names.Music_Large}${maps_words.Conjs.Near}`,
        activitys: {
            d1: ["11:00"],
        },
        tag: [
            "byVolunteers",
            "merchandise",
        ],
    },
    F3_Wakuwaku: {
        name: "WAKUWAKU",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Near}の${maps_names.Stairs}`,
        activitys: {
            d1: [],
            d2: [null, "14:00"],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_East_Dormitory: {
        name: `${maps_words.Directions.E}${maps_names.Dormitory}`,
        location: `${maps_names.FrontEntrance}`,
        tag: [
            "byVolunteers",
        ],
    },
    F1_Tacos: {
        name: "ハイサイタコス",
        location: `${maps_names.Gym}${maps_words.Conjs.Behind}`,
        activitys: {
            d1: [],
            d2: ["11:00"],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_Malasada: {
        name: "Malasada",
        location: `${getClassName("J", 1, 1)}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
            "merchandise",
            "foods",
        ],
    },
    F1_Rukissa: {
        name: "るきっさ",
        location: `${getClassName("H", 1, 6)}${maps_words.Conjs.Infront}`,
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_FlyYum: {
        name: "Fly yum",
        location: `${maps_names.Gym}${maps_words.Conjs.Behind}､${maps_names.Woodworking}${maps_words.Conjs.NextTo}`,
        activitys: {
            d1: ["11:30"],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_BloomSweets: {
        name: "Bloom sweets",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Behind}`,
        activitys: {
            d2: [],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_cocoFofo: {
        name: "Cocô Fofo",
        location: `${maps_names.Art}${maps_words.Conjs.NextTo}`,
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F3_WitchYakisoba: {
        name: "魔女のなぞやきそば",
        location: `${getClassName("H", 3, 6)}${maps_words.Conjs.Infront}`,
        activitys: {
            d2: ["11:00", "14:30"],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_GanGanHao: {
        name: "ガンガンハオ",
        location: `${maps_names.Gym}${maps_words.Conjs.NextTo}`,
        activitys: {
            d1: [],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_Kebab: {
        name: "ケバ部",
        location: `${maps_names.Gym}${maps_words.Conjs.Infront}､${maps_names.Skateboard}`,
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F3_LittleTaroBar: {
        name: "リトルクローバー",
        location: `${getClassName("H", 3, 1)}${maps_words.Conjs.Infront}の${maps_names.Stairs}`,
        activitys: {
            d1: ["13:00"],
            d2: ["11:00"],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    F1_ChaiWari: {
        name: "Chai wari",
        location: `${maps_names.Science_B}${maps_words.Conjs.Infront}`,
        activitys: {
            d2: [],
        },
        tag: [
            "byVolunteers",
            "foods",
        ],
    },
    // Satekichihiro: {
    //     name: "さてきちひろ",
    //     tag: [
    //         "byVolunteers",
    //     ],
    // },
};

const tagGroups = {
    project: {
        isMultSel: false
    },
    genre: {
        isMultSel: true
    },
    activityDay: {
        isMultSel: true
    },
    grade: {
        isMultSel: false
    },
};
const tagOrder = {
    resetButton: {
        displayName: "すべて解除",
        themeColor: "gray",
        isButton: true
    },
    byClass: {
        displayName: "クラス企画",
        themeColor: "orange",
        group: tagGroups.project
    },
    byVolunteers: {
        displayName: "有志企画",
        themeColor: "tan",
        group: tagGroups.project
    },
    announcement: {
        displayName: "発表",
        themeColor: "orchid",
        group: tagGroups.genre
    },
    foods: {
        displayName: "飲食",
        themeColor: "crimson",
        group: tagGroups.genre
    },
    merchandise: {
        displayName: "物販",
        themeColor: "lightcoral",
        group: tagGroups.genre
    },
    attractions: {
        displayName: "アトラクション",
        themeColor: "skyblue",
        group: tagGroups.genre
    },
    display: {
        displayName: "展示",
        themeColor: "lightseagreen",
        group: tagGroups.genre
    },
    day1: {
        displayName: "1日目",
        themeColor: "gray",
        group: tagGroups.activityDay
    },
    day2: {
        displayName: "2日目",
        themeColor: "slategray",
        group: tagGroups.activityDay
    },
    // J1: {
    //     displayName: `${maps_words.Grades.J}1年`,
    //     themeColor: "gray",
    //     group: tagGroups.grade
    // },
    // J2: {
    //     displayName: `${maps_words.Grades.J}2年`,
    //     themeColor: "gray",
    //     group: tagGroups.grade
    // },
    // J3: {
    //     displayName: `${maps_words.Grades.J}3年`,
    //     themeColor: "gray",
    //     group: tagGroups.grade
    // },
    // H1: {
    //     displayName: `${maps_words.Grades.H}1年`,
    //     themeColor: "slategray",
    //     group: tagGroups.grade
    // },
    // H2: {
    //     displayName: `${maps_words.Grades.H}2年`,
    //     themeColor: "slategray",
    //     group: tagGroups.grade
    // },
    // H3: {
    //     displayName: `${maps_words.Grades.H}3年`,
    //     themeColor: "slategray",
    //     group: tagGroups.grade
    // },
};

const maps_pointIcon = "medias/images/mapPoint.svg";
const maps_locations = {
    currentLocationPoint: {
        name: "現在地",
        description: "おおよその現在地",
        isEdgeShow: true,
    },

    F1_Entrance_Arch: {
        name: maps_names.FrontEntrance,
        description: `正面${tagOrder.announcement.displayName}などは\n${maps_names.FrontEntrance}${maps_words.Conjs.Infront}で実施\n(雨天時は${maps_names.Gym}で実施)`,
        emphasis: true,
        isAlwaysShow: true,
        isEdgeShow: true,
    },
    Dining_Roof: {
        name: maps_names.Dining,
        offset: {
            y: .05,
        },
        description: `${maps_names.Dining}のメニュー`,
        onClick: () => {
            window.location.href = "./?page=5";
        },
        image: "./medias/pages/preparing.png",
        isAlwaysShow: true,
        isEdgeShow: true,
    },
    F3_H3_4: {
        originalValue: "F3_Steal",
    },

    F1_Art_WC: {
        location: {
            name: `${maps_names.Art}${maps_words.Conjs.Inside}`,
        }
    },
    F1_Dining_WC: {
        location: {
            name: `${maps_names.Dining}${maps_words.Conjs.Inside}`,
        }
    },
    F1_J_WC: {
        location: {
            name: `${getClassName("J", 1, 3)}${maps_words.Conjs.NextTo}`,
        }
    },
    F1_CurveRoom_WC: {
        location: {
            name: `${maps_names.Secretariat}${maps_words.Conjs.Infront}`,
        }
    },
    F2_J_WC: {
        location: {
            name: `${getClassName("J", 2, 3)}${maps_words.Conjs.NextTo}`,
        }
    },
    F3_J_WC: {
        location: {
            name: `${getClassName("J", 3, 3)}${maps_words.Conjs.NextTo}`,
        }
    },
    F1_H_WC: {
        location: {
            name: `${getClassName("H", 1, 4)}${maps_words.Conjs.Infront}`,
        }
    },
    F2_H_WC: {
        location: {
            name: `${getClassName("H", 2, 4)}${maps_words.Conjs.Infront}`,
        }
    },
    F3_H_WC: {
        location: {
            name: `${getClassName("H", 3, 4)}${maps_words.Conjs.Infront}`,
        }
    },
    F1_WC: {
        location: {
            name: `${maps_names.Science_Preparation}${maps_words.Conjs.NextTo}`,
        }
    },
    F2_WC: {
        location: {
            name: `${maps_names.Cooking}${maps_words.Conjs.NextTo}`,
        }
    },
    F3_WC: {
        location: {
            name: `${maps_names.Computers}${maps_words.Conjs.NextTo}`,
        }
    },
    F1_Gym: {
        name: `${maps_names.Gym}`,
        description: `雨天時の正面${tagOrder.announcement.displayName}で利用`,
    },
    F1_Gym_WC: {
        location: {
            name: `${maps_names.Gym}${maps_words.Conjs.Inside}`,
        }
    },
    F1_Gym_WC001: {
        location: {
            name: `${maps_names.Gym}${maps_words.Conjs.Inside}`,
        }
    },
    F1_Paparazzi: {
        originalValue: "Paparazzi",
        location: `${getClassName("H", 1, 3)}${maps_words.Conjs.NextTo}`,
    },
    F2_Paparazzi: {
        originalValue: "Paparazzi",
        location: `${getClassName("H", 2, 3)}${maps_words.Conjs.NextTo}`,
    },
    F3_Paparazzi: {
        originalValue: "Paparazzi",
        location: `${getClassName("H", 3, 3)}${maps_words.Conjs.NextTo}`,
    },
    F1_Darkroom:  {
        originalValue: "Paparazzi",
    },
    F1_Information_Center: {
        name: "medias/images/mapInformation.svg",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Inside}`,
        description: "インフォメーションセンター",
    },
    F1_Certificate: {
        name: "medias/images/mapCertificate.svg",
        location: `${maps_names.FrontEntrance}${maps_words.Conjs.Inside}`,
        description: "金券の販売所",
    },
    F1_Gym_Entrance: {
        name: maps_names.Gym,
    },
    F1_F2_Art: {
        name: maps_names.Art,
        offset: {
            y: .1,
        },
    },
    F1_J3_2: {
        originalValue: "F3_J3_2",
        location: `${maps_words.Grades.J}${maps_words.Ridge}${maps_words.Conjs.Infront}､${maps_names.Biotope}${maps_words.Conjs.Near}`,
    },

    F2_Art: {
        originalValue: "Smash",
    },
    F2_Warehouse: {
        originalValue: "F2_CoffeeWatashi"
    },
    F1_Multipurpose: {
        originalValue: "F1_H3_4",
    },
    F1_F2_F3_OutdoorStairs004: {
        originalValue: "Aruaru",
    },
    F1_Airplane: {
        originalValue: "PlaneWorkshop",
    },
    F1_Science_A: {
        originalValue: "Star_Dormitory",
    },
    F1_Science_B: {
        originalValue: "F1_PROBUX",
    },
    F1_Science_C: {
        originalValue: "North_Dormitory",
    },
    F1_Science_D: {
        originalValue: "F1_BLUEPEYOUNG",
    },
    F3_Music_3: {
        originalValue: "F1_Tekken_1",
        description: "プラレール展示",
    },
    F3_Warehouse: exhibits.Shoten,

    F3_Seminar: exhibits.F3_Hostclub,

    F2_Music_Small: exhibits.F3_Tokusatsu,

    BusStation_Base: {
        name: `${maps_names.Bus}停`,
        description: `${maps_names.Bus}ダイヤを見る`,
        image: "./medias/pages/bus.png",
        onClick: () => {
            window.location.href = "./?page=5";
        },
        offset: {
            y: .1,
        },
        isAlwaysShow: true,
        isEdgeShow: true,
    },

    F1_Rukissa001: {
        ...exhibits.F1_Rukissa,
        location: `${getClassName("H", 1, 4)}${maps_words.Conjs.NextTo}`,
    },
};

function exhibitsDataCompletion ({
    isOriginalValue = true,
    isLocation = true,
} = {}) {
    // 場所自動補完
    Object.values(maps_locations).forEach((locationItem, i) => {
        if (typeof locationItem === "string") {
            locationItem = {
                originalValue: locationItem
            };
        }
        if (isOriginalValue && locationItem?.originalValue) {
            const replaced = locationItem.originalValue.replace("exhibits.", "");
            locationItem = {
                ...exhibits[replaced],
                ...locationItem,
                originalValue: replaced,
            };
        }

        if (isLocation) {
            const locationName = maps_names[Object.keys(maps_locations)[i].replace(/F\d+_/g, "")];
            if (locationItem) {
                if (!locationItem?.location?.name && locationName) {
                    locationItem.location = {
                        name: `${locationName}`
                    };
                }
                if (typeof locationItem.location === "string") locationItem.location = {
                    name: locationItem?.location
                };
            }
        }

        maps_locations[Object.keys(maps_locations)[i]] = {
            ...locationItem,
        };
    });
}
exhibitsDataCompletion();

const getExhibits = (n) => ([ Object.keys(exhibits)[n], Object.values(exhibits)[n] ])

function openTile (targetTile, isToOpen = !targetTile.classList.contains("opened")) {
    const allTiles = exhibitsArea.querySelectorAll(".tile");

    targetTile.style.setProperty("--tileOpenHeight", (() => {
        let height = 0;
        Array.from(targetTile.children).forEach(child => {
            height += (
                child.scrollHeight
            );
        });
        return height;
    })() + "px");

    allTiles.forEach(element => {
        if (element !== targetTile) element.classList.remove("opened");
    });
    if (isToOpen) {
        targetTile.classList.add("opened");
    } else {
        targetTile.classList.remove("opened");
    }
}

function getBarOptionsHeight () {
    let barOptionsHeight = 0;
    exhibitsBottomBar.querySelectorAll(':scope > *:not(.content)').forEach(element => {
        barOptionsHeight += element.offsetHeight
    });
    return barOptionsHeight;
}

function barHeightUpdate (isToOpen = exhibitsBottomBar.classList.contains("opened")) {
    if (isToOpen) {
        const nowShow = exhibitsBottomBar.querySelector(".content > div.nowShow");
        const areaHeight = getBarOptionsHeight() + nowShow?.offsetHeight;

        exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${Math.min(areaHeight, window.innerHeight - 100)}px`);
        exhibitsBottomBar.classList.add("opened");
    } else {
        exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${getBarOptionsHeight()}px`);
        exhibitsBottomBar.classList.remove("opened");
    }
}

barHeightUpdate();

function tabClassUpdate (tabIndex) {
    const tabs = sortList_tabs.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.classList.remove("selected");
    });
    tabs[tabIndex].classList.add("selected");

    const contents = exhibitsBottomBar.querySelectorAll(".content > div");
    contents.forEach(content => {
        content.classList.remove("nowShow");
    });
    contents[tabIndex].classList.add("nowShow");
}

let loadScModel;

// Scroll運用を停止､確実にボタンによるスライドが生じるようにする
function barTabClick (tabIndex) {
    const leftPx = tabIndex * bottomBar_contents.scrollWidth;
    bottomBar_contents.scrollTo({
        top: 0,
        left: leftPx,
        behavior: "smooth"
    });
    setTimeout(() => {
        bottomBar_contents.scrollLeft = leftPx;
    }, 650);
    tabClassUpdate(tabIndex);
    barHeightUpdate(true);

    if (tabIndex === 1) loadScModel();
}

let isCdnCompleted = false;

function cdnCompleted () {
    if (isCdnCompleted) return;
    isCdnCompleted = true;
    console.log("cdnCompleted");
    /**
    * @param {THREE.Object3D} target
    * @param {THREE.OrthographicCamera} camera
    * @param {THREE.OrbitControls} controls
    * @param {number} margin
    */

    // カメラ
    const maps_renderer = THREE ? new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
    }) : null;
    const maps_aspect = window.innerWidth / window.innerHeight;
    const maps_cameraSize = 1.2; // 表示範囲の大きさ（好みで調整）
    const maps_camera = THREE ? new THREE.OrthographicCamera(
        -maps_cameraSize * maps_aspect,  // left
        maps_cameraSize * maps_aspect,   // right
        maps_cameraSize,            // top
        -maps_cameraSize,           // bottom
        1,
        200
    ) : null;

    // (() => {
    //     window.addEventListener("keydown", e => {
    //         // 強制的にコンテキスト破棄
    //         if (isDevMode && e.code === "KeyP" && maps_renderer && maps_renderer.getContext) {
    //             const gl = maps_renderer.getContext();
    //             const ext = gl.getExtension('WEBGL_lose_context');
    //             if (ext) {
    //                 ext.loseContext();
    //             }
    //         }
    //     });
    // })();
    
    const maps_labelRenderer = CSS2DRenderer ? new CSS2DRenderer() : null;
    const maps_labelsArea = maps_labelRenderer?.domElement || null;
    if (maps_labelsArea) {
        maps_labelsArea.style.position = "absolute";
        maps_labelsArea.style.pointerEvents = "none";
        maps_labelsArea.className = "labelsArea";
    }

    // OrbitControls 初期化
    const maps_controls = OrbitControls ? new OrbitControls(maps_camera, maps_renderer.domElement) : null;

    function cameraPan({
        x: targetX = targetOffset.x,
        z: targetZ = targetOffset.z,
        duration: duration = 1
    }) {
        // 現在のカメラとターゲットの差分ベクトル
        const offset = new THREE.Vector3().subVectors(maps_camera.position, maps_controls.target);

        function updateLabel () {
            maps_camera.position.copy(maps_controls.target).add(offset);
            maps_controls.update();
        }

        function instantMove () {
            maps_controls.target.set(targetX, maps_controls.target.y, targetZ);
            updateLabel();
        }

        if (duration === 0) {
            instantMove();
        } else {
            const startTarget = maps_controls.target.clone();
            const startCamera = maps_camera.position.clone();

            gsap.to(startTarget, {
                x: targetX,
                z: targetZ,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: () => {
                    maps_controls.target.set(startTarget.x, maps_controls.target.y, startTarget.z);
                    updateLabel();
                },
                onComplete: instantMove
            });
        }
    }

    const maps_labels = {};

    function maps_frameObject({
        target: target,
        camera: camera = maps_camera,
        controls: controls = maps_controls,
        duration: duration = 1,
        isToCenter: isToCenter = true,
        zoom: zoom = Math.max(2.1, maps_camera.zoom),
        offsetZ: offsetZ = -.15,
    }) {
        if (maps_labels[target?.name]?.element) console.log(
            getComputedStyle(maps_labels[target?.name]?.element).height.replace("px", "") * 1
        );
        if (!target?.geometry) return;

        // バウンディングボックスの取得
        target.geometry.computeBoundingBox();
        const bbox = target.geometry.boundingBox.clone();

        // ワールド座標系に変換
        bbox.applyMatrix4(target.matrixWorld);

        const center = new THREE.Vector3();
        bbox.getSize(center);
        bbox.getCenter(center);

        // ズームもスムーズに変更する場合
        gsap.to(camera, {
            zoom: zoom, // 目標ズーム値
            duration: duration,
            ease: "power2.inOut",
            onUpdate: () => camera.updateProjectionMatrix()
        });

        // OrbitControls の注視点もトランジション付きで更新
        if (controls) {
            // 既存の中心へのズーム・注視点移動処理
            if (controls.enableRotate) {
                gsap.to(controls.target, {
                    x: center.x,
                    y: center.y + offsetZ,
                    z: center.z,
                    duration: duration,
                    ease: "power2.inOut",
                    onUpdate: () => controls.update()
                });
            } else {
                // カメラの向きベクトルを取得
                const dir = new THREE.Vector3();
                maps_camera.getWorldDirection(dir); // dirはカメラが向いている方向の単位ベクトル

                // offsetZだけカメラの向きに沿って移動
                const newTarget = new THREE.Vector3(center.x, center.y, center.z).addScaledVector(dir, offsetZ * 1000000);

                cameraPan({
                    x: newTarget.x,
                    y: newTarget.y,
                    z: newTarget.z,
                    duration: duration
                });
            }
        }
    }

    let maps_modelParts = {};

    const mapsView = d.createElement("div");

    const maps_buttons_right = d.createElement("div");
    const maps_buttons_left = d.createElement("div");

    function maps_getFloors (name) {
        const allFlooButtons = maps_buttons_left.querySelectorAll("div.button");
        if (name) {
            const regex = /F(\d+)_/g; // gフラグで全マッチ取得
            const matches = [...name.matchAll(regex)];
            return matches.map(match => Number(match[1]));
        } else {
            const returnArr = [];
            allFlooButtons.forEach((buttonItem, i) => {
                if (!buttonItem.classList.contains("invalid")) returnArr.push(i + 1);
            });
            return returnArr;
        }
    }

    const maps_getIsAllFloorVaild = () => {
        const vaildFloor = maps_getFloors();
        return vaildFloor.every((v, i) => i + 1 === v) && vaildFloor.length > 1;
    };

    d.addEventListener("click", e => {
        if (exhibitsArea.contains(e.target)) {
            const tile = e.target.closest(".tile");
            if (tile) openTile(tile);
        }
        // if (!searchBarsEl.contains(e.target) && !exhibitsBottomBar.contains(e.target)) {
        //     searchAreaEl.classList.remove("opened");
        //     updateSort("");
        // }
    });

    function startObserve({ target, callback, once = true, threshold = 0 }) {
        if (!target) return;

        // 複数要素の場合も配列にする
        const elements = NodeList.prototype.isPrototypeOf(target) || Array.isArray(target)
            ? target
            : [target];

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (once) {
                observer.unobserve(entry.target);
                }
            }
            });
        }, { threshold });

        elements.forEach(el => observer.observe(el));
    }

    let isScModelLoadStarted = false;
    let isScModelLoaded = false;

    function pushLabel (targetName) {
        function push () {
            const vaildFloors = maps_getFloors();
            const targetMeshFloors = maps_getFloors(targetName);
            if (!maps_getIsAllFloorVaild()) {
                // const pushFloor = vaildFloors.find((v, i) => targetMeshFloors[i]);
                const pushFloor = vaildFloors.find(fItem => targetMeshFloors.includes(fItem)) || targetMeshFloors[0];
                if (!vaildFloors.includes(pushFloor)) pushFloorButton(pushFloor);
            }
            removeAllLabel();
            labelDetailOpen(targetName);
        }
        if (isScModelLoadStarted) {
            push();
        }
    }

    const tilesFragment = d.createDocumentFragment();
    for (let tileIdx = 0; tileIdx < Object.keys(exhibits).length; tileIdx += 1) {
        const tileEl = d.createElement("div");
        const namesEl = d.createElement("div");
        const activitysEl = d.createElement("div");
        const descriptionEl = d.createElement("div");
        const imagesEl = d.createElement("div");
        
        function getTagsEl ({
            newTags: newTags
        } = {}) {
            const tagsEl = d.createElement("div");
            const tagsContentEl = d.createElement("div");

            tagsEl.className = "tags";
            tagsContentEl.className = "tagsContent";

            if (newTags?.length > 0) newTags.forEach(tagInfo => {
                const tagEl = d.createElement("div");
                if (tagInfo.className) tagEl.className = tagInfo.className;
                if (tagInfo.textContent) tagEl.textContent = tagInfo.textContent;
                if (tagInfo.property) {
                    Object.keys(tagInfo.property).forEach(propKey => {
                        tagEl.style.setProperty(propKey, tagInfo.property[propKey]);
                    });
                }
                if (tagInfo.attribute) {
                    Object.keys(tagInfo.attribute).forEach(attrKey => {
                        tagEl.setAttribute(attrKey, tagInfo.attribute[attrKey]);
                    });
                }
                tagsContentEl.appendChild(tagEl);
            });

            tagsEl.appendChild(tagsContentEl);

            function tagsContentScroll() {
                const maxScroll = tagsContentEl.scrollWidth - tagsContentEl.clientWidth;
                const scrollRatio = maxScroll === 0 ? 0 : tagsContentEl.scrollLeft / maxScroll;
                tagsEl.style.setProperty("--scrollPx", maxScroll - tagsContentEl.scrollLeft + "px");
                tagsEl.style.setProperty("--scrollRatio", scrollRatio);
            }
            tagsContentScroll();
            tagsContentEl.addEventListener("scroll", tagsContentScroll);

            return tagsEl;
        }
        const tagsEl = getTagsEl({
            newTags: (() => {
                let displayTagNames = [];
                const usedTags = new Set();

                const returnValue = [];

                returnValue.push({
                    tags: {
                        textContent: "",
                        className: "",
                        property: {
                            "--themeColor": "",
                        },
                        attribute: {
                            tag: "",
                        },
                    },
                });

                Object.keys(tagOrder).forEach((tag) => {
                    if (!getExhibits(tileIdx)[1].tag?.includes(tag) || usedTags.has(tag)) return;
                    usedTags.add(tag);
                    displayTagNames.push([tag, tagOrder[tag].displayName, tagOrder[tag].themeColor]);
                });
                displayTagNames.forEach(item => {
                    returnValue.push({
                        textContent: item[1],
                        className: "tag",
                        property: {
                            "--themeColor": item[2],
                        },
                        attribute: {
                            tag: item,
                        },
                    });
                });
                const tagAttributes = [];
                displayTagNames.map(subArr => subArr[0]).forEach(item => {
                    tagAttributes.push(item);
                });
                tileEl.setAttribute("tag", tagAttributes.join(","));

                return returnValue;
            })(),
        });

        // getExhibits(tileIdx)[1].originalValue = getExhibits(tileIdx)[0];

        tileEl.setAttribute("exhibits", getExhibits(tileIdx)[0]);
        tileEl.className = "tile inVisible";

        getExhibits(tileIdx)[1].tileEl = tileEl;

        startObserve({
            target: tileEl,
            callback: () => {
                const tiles = Array.from(exhibitsArea.children);
                for (let i = 0; i < tiles.indexOf(tileEl) + 1; i += 1) {
                    if (tiles[i].classList.contains("inVisible")) {
                        tiles[i]?.classList.remove("inVisible");
                        tiles[i].style.setProperty("--locationTextWidthPx", tiles[i].querySelector(".location.button")?.offsetWidth || 0 + "px");
                        tiles[i].style.setProperty("--nameTextWidthPx", tiles[i].querySelector(".names .nameText")?.offsetWidth || 0 + "px");
                        tiles[i].style.setProperty("--activityWidthPx", tiles[i].querySelector(".activity")?.offsetWidth || 0 + "px");
                    }
                }
            },
            once: true,
        });

        if (!getExhibits(tileIdx)[1].location) {
            getExhibits(tileIdx)[1].location = {};
        } else if (typeof getExhibits(tileIdx)[1].location === "string") { // nameキーではなく文字があるなら
            getExhibits(tileIdx)[1].location = {
                name: getExhibits(tileIdx)[1].location
            };
        }
        const match = getExhibits(tileIdx)[0].match(/([JH])(\d+)_(\d+)/);
        if (
            !getExhibits(tileIdx)[1]?.location?.name &&
            getExhibits(tileIdx)[1].tag.includes("byClass") &&
            match
        ) {
            getExhibits(tileIdx)[1].location.name = (
                `${getClassName(
                    match[1],
                    match[2],
                    match[3],
                )}`
            );
        }

        const nameTextEl = d.createElement("span");
        nameTextEl.className = "nameText";
        nameTextEl.textContent = getExhibits(tileIdx)[1].name;
        namesEl.appendChild(nameTextEl);
        namesEl.classList.add("names");
        
        imagesEl.className = "images";
        const image = d.createElement("img");
        imagesEl.appendChild(image);
        if (getExhibits(tileIdx)[1].image) {
            image.src = getExhibits(tileIdx)[1].image;
            imagesEl.appendChild(image);
        }
        
        const locationsEl = d.createElement("div");
        const locationsScrollEl = d.createElement("div");
        locationsEl.className = "locationArea";
        locationsScrollEl.className = "locationScrollArea";

        function getNewLocationButton ({
            locationTextContents = "",
            pushToFocusMeshName = null,
        } = {}) {
            if (!locationTextContents) return;
            const locationEl = d.createElement("div");
            const locationText = d.createElement("span");
            locationText.className = "locationText";
            locationText.textContent = locationTextContents;
            locationEl.className = "location button";
            locationEl.setAttribute("locationTextContents", locationTextContents || "");
            locationEl.appendChild(locationText);
            (() => {
                const text = d.createElement("span");
                text.className = "text";
                text.textContent = "地図で見る";

                locationEl.innerHTML += arrowHTMLStr;
                locationEl.appendChild(text);
            })();
            locationEl.addEventListener("click", e => {
                if (!isScModelLoaded) return;
                e.stopPropagation();
                barTabClick(1);
                for (const [locationKey, locationItem] of Object.entries(maps_locations)) {
                    if (
                        pushToFocusMeshName || ((typeof getExhibits(tileIdx)[1].focusMeshName) === "string" && 
                        Object.keys(maps_modelParts)?.includes(getExhibits(tileIdx)[1]?.focusMeshName))
                    ) {
                        pushLabel(pushToFocusMeshName || getExhibits(tileIdx)[1].focusMeshName);
                        break;
                    } else if (
                        // ["name", "tag"].every(keyItem => 
                        //     getExhibits(tileIdx)[1]?.[keyItem] === locationItem?.[keyItem]
                        // )
                        locationItem?.originalValue === getExhibits(tileIdx)[0] &&
                        locationItem?.location?.name === locationTextContents
                    ) {
                        pushLabel(locationKey);
                        break;
                    }
                }
                
                // if (!Object.keys(maps_locations).includes(getExhibits(i)[0])) pushLabel("F1_Entrance_Arch");
            });
            // targetEl.appendChild(locationEl);
            return locationEl;
        }

        (() => {
            const appendEls = [];
            const newBaseEl = getNewLocationButton({
                locationTextContents: getExhibits(tileIdx)[1]?.location?.name || "",
            }); // 標準
            if (newBaseEl) {
                locationsScrollEl.appendChild(newBaseEl);
                appendEls.push(newBaseEl);
            }
            
            
            Object.entries(maps_locations).filter(([key, value]) =>
                value?.originalValue === getExhibits(tileIdx)[0]
            ).map(([key, value]) => ({ key, value })).forEach(({ key, value }) => {
                const newEl = getNewLocationButton({
                    pushToFocusMeshName: key,
                    locationTextContents: value?.location?.name || "",
                })
                if (!appendEls.map(el => el.outerHTML).join("").includes(newEl.outerHTML)) {
                    locationsScrollEl.appendChild(newEl);
                    appendEls.push(newEl);
                }
            });

            return;
            Object.values(maps_locations).forEach((locationItem, locationIdx) => {
                const meshNameStr = Object.keys(maps_locations)[locationIdx] || "";
                const locationTextStr = locationItem?.location?.name || "";
                if (
                    (locationItem?.originalValue === getExhibits(tileIdx)[0]) &&
                    (locationItem?.name === getExhibits(tileIdx)[1]?.name) &&
                    Array.from(locationsEl.children).every(child => child.getAttribute("locationTextContents") !== locationTextStr)
                ) {
                    getNewLocationButton({
                        targetEl: locationsEl,
                        pushToFocusMeshName: meshNameStr,
                        locationTextContents: locationTextStr,
                    });
                }
            });
        })();
        locationsEl.appendChild(locationsScrollEl);
        
        // if (getExhibits(i)[1] && (
        //     ["day1", "day2"].every(item => !getExhibits(i)[1].tag.includes(item))
        // )) { // 日数tag自動生成
        //     getExhibits(i)[1]?.tag.push("day1", "day2");
        // }
        // if (getExhibits(i)[1] && !getExhibits(i)[1]?.activity?.days) { // days自動生成
        //     if (!getExhibits(i)[1]?.activity) {
        //         getExhibits(i)[1].activity = {};
        //     }
        //     getExhibits(i)[1].activity.days = [1, 2];
        // }
        
        // activitys自体なし :
        //     すべてにおいてデフォルト(活動可能最大時間)を使用
        // 配列にnull :
        //     デフォルト(活動可能最大時間)を使用
        // activitysあり､2日分はなし :
        //     存在する日のデータのみ､それ以外は活動なし

        (() => {
            const getActivitysJson = () => getExhibits(tileIdx)[1]?.activitys;

            const defaultFrom = {
                d1: "10:20",
                d2: "10:00",
            };
            const defaultTo = {
                d1: "16:00",
                d2: "15:00",
            };

            if (getExhibits(tileIdx)[1]) {
                if (!getActivitysJson()) {
                    getExhibits(tileIdx)[1].activitys = {
                        d1: [],
                        d2: [],
                    };
                }
            }
            Object.values(getActivitysJson()).forEach((dayItem, jsonIndex) => {
                const dayKeyName = Object.keys(getActivitysJson())[jsonIndex];
                if (!dayItem[0]) dayItem[0] = defaultFrom[dayKeyName];
                if (!dayItem[1]) dayItem[1] = defaultTo[dayKeyName];

                const dayTagName = dayKeyName.replace("d", "day");
                if (tagOrder[dayTagName]) getExhibits(tileIdx)[1]?.tag.push(dayTagName);

                const getDaySpans = (timeItem) => timeItem.split(":").map(numSet => `<span class="numSet">${numSet.split("").map(num => `<span class="num">${num}</span>`).join("")}</span>`).join(":");

                const dateTextEl = d.createElement("div");
                const dateNum = dayKeyName.replace("d", "") * 1;
                dateTextEl.innerHTML = `${dateNum}日目 ${getDaySpans(dayItem[0])} ~${getDaySpans(dayItem[1])}<div class="activeText button"><div class="progress"></div><span></span></div>`;
                dateTextEl.className = "timeItem";
                dateTextEl.setAttribute("day", dateNum);
                dateTextEl.setAttribute("timeFrom", dayItem[0]);
                dateTextEl.setAttribute("timeTo", dayItem[1]);
                activitysEl.appendChild(dateTextEl);
            });
        })();
        activitysEl.className = "activity";

        descriptionEl.innerHTML = `<span>${getExhibits(tileIdx)[1]?.description || ""}</span>`;
        descriptionEl.classList.add("description");
        
        (() => {
            // 仮想DOM（DocumentFragment）を作成
            const fragment = d.createDocumentFragment();

            [
                namesEl,
                locationsEl,
                activitysEl,
                descriptionEl,
                imagesEl,
                tagsEl,
            ].forEach(appendEl => {
                fragment.appendChild(appendEl);
                // htmlStr += appendEl.outerHTML;
            });

            tileEl.appendChild(fragment);
            tilesFragment.appendChild(tileEl);
        })();        
    }

    exhibitsArea.appendChild(tilesFragment);
    exhibitsDataCompletion({
        isLocation: false,
    });

    function updateButtonText (targetEl, existingOptions = {}) {
        if (!targetEl) return;
        let options = existingOptions;
        if (typeof existingOptions === "string") {
            options = {
                text: existingOptions,
            };
        }
        const newText = options.text;
        const newTextArea = d.createElement("span");
        const existingSpan = targetEl.querySelector("span");
        if (
            existingSpan?.textContent !== newText ||
            existingSpan?.innerHTML !== newText
        ) {
            const animDuration = 300;
            targetEl.querySelectorAll("span").forEach(span => {
                span.style.animation = "none";
                span.offsetHeight;
                span.style.animation = `showText ${animDuration}ms ease-in-out both reverse`;
                setTimeout(() => {
                    span.remove();
                }, animDuration * 2);
            });
            newTextArea.innerHTML = newText.replaceAll("\n", "<br>");
            newTextArea.style.animation = `showText ${animDuration}ms ease-in-out both`;
            newTextArea.style.animationDelay = `${animDuration}ms`;
            newTextArea.style.position = "absolute";
            newTextArea.style.whiteSpace = "nowrap";
            targetEl.appendChild(newTextArea);
            targetEl.style.transition = `width ${animDuration * 2}ms ease-in-out, height ${animDuration * 2}ms ease-in-out,`;
            targetEl.style.position = "relative";
            targetEl.style.display = "flex";
            targetEl.style.justifyContent = "center";
            targetEl.style.alignItems = "center";
            if (
                options?.isScaleChange === true ||
                options?.isScaleChange === undefined
            ) requestAnimationFrame(() => {
                const width  = newTextArea.offsetWidth + (
                    typeof options?.addition?.width === "number" ?
                    (options?.addition?.width || 0) : 10
                );
                const height = newTextArea.offsetHeight;
                targetEl.style.setProperty("--openedWidth",  width  + "px");
                targetEl.style.setProperty("--openedHeight", height + "px");
                targetEl.style.width  = width + "px";
                targetEl.style.height = height + "px";
            });
        }
    }

    // 現在､企画が活動中かどうか
    const getTimeFromMin = (minutes) => ({
        h: Math.floor(minutes / 60),
        m: minutes % 60,
    });
    const getFmtedTime = (min) => (
        Object.values(getTimeFromMin(min)).map(
            (time, i) => (
                time ? ((
                    (i !== 0) ? (
                        "0".repeat(
                            2 - (time + "").length
                        )
                    ) : ""
                ) + time + ["時間", "分"][i]) : ""
            )
        ).join("")
    );
    // let devI = 60 * 8;
    function updateExhibitsActive () {
        // devI += 30;
        // const now = new Date(`2025-10-25 ${Object.values(getTimeFromMin(devI)).join(":")}`);
        // const now = new Date("2025-10-24 10:10");
        const now = new Date(isDevMode ? "2025-10-25 12:00" : null);
        const nowDates = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };

        function getDay (day) {
            const dayIdx = day - 24;
            return (dayIdx < 0) ? (
                day + 24
            ) : dayIdx;
        }

        Object.values(exhibits).forEach((exhibitItem) => {
            if (!exhibitItem.tileEl) return;
            exhibitItem.tileEl.querySelectorAll(".activity > .timeItem").forEach((timeItemEl, dayIdx, allTimeItems) => {
                const timeFromArr = timeItemEl.getAttribute("timeFrom").split(":").map(item => item * 1);
                const timeToArr   = timeItemEl.getAttribute("timeTo").split(":").map(item => item * 1);
                const activeTextEl = timeItemEl.querySelector(".activeText");
                const progressEl = activeTextEl.querySelector(".progress");
                const nowDateMin = nowDates.hours * 60 + nowDates.minutes;
                const isExhibitActive = (
                    getDay(nowDates.day) === (timeItemEl.getAttribute("day") * 1) && (
                        (
                            nowDateMin >= (timeFromArr[0] * 60 + timeFromArr[1])
                        ) && (
                            nowDateMin <  (timeToArr[0]   * 60 + timeToArr[1])
                        )
                    )
                );

                const fromMin = (timeFromArr[0] * 60 + timeFromArr[1]);
                const toMin   = (timeToArr[0]   * 60 + timeToArr[1]);
                const elapsedTime = nowDateMin - fromMin;

                let text = `${dayIdx + 1}日目 終了`;
                const differenceFromTheDay = nowDates.day - getDay(dayIdx + 1);
                if (differenceFromTheDay === 0) {
                    progressEl.style.setProperty("--progress", (
                        (1 - (toMin - fromMin - elapsedTime) / (toMin - fromMin)) * 100 + "%"
                    ));
                }
                if (isExhibitActive && differenceFromTheDay === 0) {
                    // 活動中
                    text = `活動中 あと${getFmtedTime(toMin - fromMin - elapsedTime)}で終了`
                    activeTextEl.classList.add("exhibitActive");
                } else {
                    if ((nowDateMin < toMin) && differenceFromTheDay === 0) {
                        // まもなく開始
                        text = `あと${getFmtedTime(Math.abs(elapsedTime))}で開始`;
                        activeTextEl.classList.add("beforeTheDay");
                    } else {
                        if (differenceFromTheDay < 0) {
                            // 日が違う (すでに終了)
                            text = "&nbsp;";
                            activeTextEl.classList.remove("beforeTheDay");
                        } else {
                            progressEl.style.setProperty("--progress", "100%");
                            activeTextEl.classList.add("beforeTheDay");
                        }
                        activeTextEl.classList.remove("exhibitActive");
                    }
                }
                updateButtonText(
                    activeTextEl, {
                        text: text,
                        addition: {
                            width: 5,
                            isScaleChange: false,
                        }
                    }
                );

                // const removeAnimation = "showText .5s ease-in-out reverse forwards";
                // if (activeTextEl && activeTextEl.style.animation !== removeAnimation) {
                //     activeTextEl.style.animation = "none";
                //     void activeTextEl.offsetWidth; // 強制再計算（再適用トリガー）
                //     activeTextEl.style.animation = removeAnimation;
                //     setTimeout(() => {
                //         activeTextEl.remove();
                //     }, 500);
                // }
            });
        });
    }

    updateExhibitsActive();
    setInterval(updateExhibitsActive, 1000);

    const getEscapeReg = (string) => string[0] ? string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : null;

    function getSortConditions () {
        let conditions = [];
        const checkedTags = exhibitsBottomBar.querySelectorAll(".tag.checkedBox:not([isButton])");
        checkedTags.forEach(element => {
            conditions.push(element.getAttribute("tag"));
        });
        return conditions;
    }

    const existingSearchValue = queryParameter({
        type: "get",
        key: "search",
    }) || "";

    function toKatakana(input, {normalizeHalfwidth = true} = {}) {
        let s = String(input);
        if (normalizeHalfwidth) s = s.normalize('NFKC'); // 半角カナを全角にする（必要なら false に）
        const H_START = 0x3041, H_END = 0x3096;
        const OFFSET = 0x60; // 96

        return Array.from(s).map(ch => {
            const cp = ch.codePointAt(0);
            if (cp >= H_START && cp <= H_END) {
                return String.fromCodePoint(cp + OFFSET);
            }
            // そのほかはそのまま（長音記号や記号、漢字、英数字など）
            return ch;
        }).join('');
    }

    function toHiragana(input, {normalizeHalfwidth = true} = {}) {
        let s = String(input);
        if (normalizeHalfwidth) s = s.normalize('NFKC'); // 半角カナを全角にする
        const K_START = 0x30A1, K_END = 0x30F6;
        const OFFSET = 0x60; // 96

        return Array.from(s).map(ch => {
            const cp = ch.codePointAt(0);
            if (cp >= K_START && cp <= K_END) {
            return String.fromCodePoint(cp - OFFSET);
            }
            return ch;
        }).join("");
    }

    // 検索
    function getExhibitsSearch (exhibit, searchWord = getSearchValue()) {
        let searchHits = [];
        const exhibitItem = exhibit;
        const targets = [
            exhibitItem?.name,
            exhibitItem?.description,
            exhibitItem?.location?.name,
        ];
        exhibitItem?.tag?.forEach(tag => {
            targets.push(tagOrder[tag]?.displayName);
        });
        searchHits = [];
        const spliteds = [];
        targets?.forEach((target, i) => {
            const splited = target?.split(
                new RegExp(
                    `(${getEscapeReg(searchWord)}|${getEscapeReg(toHiragana(searchWord))}|${getEscapeReg(toKatakana(searchWord))})`
                )
            );
            spliteds.push(splited);
            if (
                !searchWord ||
                searchWord === "" ||
                splited?.length > 1
            ) {
                searchHits.push([target, i]);
            }
        });
        return {
            hits: searchHits,
            spliteds: spliteds
        };
    }

    const searchAreaEl = d.querySelector(".main.content .searchArea")
    const searchBarsEl = d.querySelector(".main.content .searchBars")
    const searchInputsEl = d.querySelector(".main.content .searchInputs")
    const newSearchBarEl = d.createElement("input");

    function getIsSortConforming (exhibit, conditions = getSortConditions(), searchWord = getSearchValue()) {
        let isConforming = true;
        const searchHits = [];
        const searchRes = getExhibitsSearch(exhibit, searchWord);
        if (searchRes.hits.length > 0) {
            searchHits.push(searchRes.hits);
            for (const condition of conditions) {
                if (
                    !exhibit?.tag?.includes(condition)
                ) {
                    isConforming = false;
                    break;
                }
            };
        } else {
            isConforming = false;
        }
        return {
            isConforming: isConforming,
            searchHits: searchHits,
            spliteds: searchRes.spliteds,
        };
    }

    function updateSort ({
        searchWord = getSearchValue(),
    } = {}) {
        const conditions = getSortConditions();

        const allTiles = exhibitsArea.querySelectorAll(".tile");

        function setTileVisible (element, isVisible) {
            if (isVisible) {
                element.classList.remove("hidden");
                element.style.setProperty("--tileOpacity", 1);
            } else {
                element.classList.add("hidden");
                element.classList.remove("opened");
                element.style.setProperty("--tileOpacity", "var(--baseOpacity)");
            }
        }

        allTiles.forEach(element => {
            if (conditions[0] || searchWord) {
                setTileVisible(element, false);
            } else {
                setTileVisible(element, true);
            }
            element.classList.remove("topTileStyle");
            element.classList.remove("lowestTileStyle");
        });

        const activeAllTiles = [];

        const targetElements = [];
        const targetExhibits = [];
        const spliteds = [];
        const searchHits = [];
        exhibitsArea.querySelectorAll(":scope > div.tile").forEach(tileItem => {
            const exhibit = exhibits[tileItem.getAttribute("exhibits")];
            const conforming = getIsSortConforming(exhibit, conditions, searchWord);
            if (conforming.isConforming) {
                searchHits.push(conforming.searchHits);
                targetElements.push(tileItem);
                targetExhibits.push(exhibit);
                spliteds.push(conforming.spliteds);
            }
        });

        targetElements.forEach(element => {
            setTileVisible(element, true);
            activeAllTiles.push(element);
        });

        exhibitsArea.style.setProperty("--numOfTile", allTiles.length);
        exhibitsArea.style.setProperty("--numOfVisibleTile", activeAllTiles.length);

        // conditions.forEach(condition => {
        //     // Object.values(exhibits).forEach(exhibit => {
        //     //     getTargetTag(exhibit).classList.remove("visible");
        //     // });
        //     // Object.values(exhibits).filter(item => item?.tag.includes(condition)).forEach(exhibit => {
        //     //     getTargetTag(exhibit).classList.add("visible");
        //     // });

        //     console.log(
        //         Object.values(exhibits).filter(item => item?.tag.includes(condition)),
        //         exhibitsArea.querySelectorAll(`.tags [tag_${condition}]`),
        //     );

        //     exhibitsArea.querySelectorAll(".tags .tag").forEach(tagItem => {
        //         tagItem.classList.remove("inValid");
        //         const isConforming = tagItem.getAttribute("tag").split(",")[0] === condition
        //         if (isConforming) {
        //             tagItem.classList.add("inValid");
        //         }
        //     });
            
        //     // exhibitsArea.querySelectorAll(`.tags [tag_${condition}]`).forEach(element => {
        //     //     element.style.opacity = 1;
        //     // });
        // });

        exhibitsArea.querySelectorAll(".tags .tag").forEach(tagItem => {
            if (conditions.length === 0) {
                tagItem.classList.remove("inValid");
            } else {
                tagItem.classList.add("inValid");
                const tagId = tagItem.getAttribute("tag").split(",")[0];
                conditions.forEach(condition => {
                    const isConforming = tagId === condition;
                    if (isConforming) tagItem.classList.remove("inValid");
                });
            }
        });

        // 角丸系

        if (activeAllTiles[0]) {
            activeAllTiles[0].classList.add("topTileStyle");
        }
        if (activeAllTiles[activeAllTiles.length - 1]) {
            activeAllTiles[activeAllTiles.length - 1].classList.add("lowestTileStyle");
        }

        (() => {
            const sortDisplay = mainContent.querySelector(".sortDisplay");
            const conditionsArea = sortDisplay.querySelector(".conditions");
            const numOfHitsArea = sortDisplay.querySelector(".numOfHits");

            conditionsArea.innerHTML = "";
            [getSearchValue() || null, ...conditions].forEach((condition, i, arr) => {
                if (!condition) return;
                const newDisplayEl = d.createElement("div");
                newDisplayEl.className = "display";
                newDisplayEl.textContent = tagOrder[condition] ? tagOrder[condition]?.displayName : (() => {
                    newDisplayEl.style.color = "black";
                    if (condition) {
                        return `"${condition}" を含む`;
                    } else {
                        return "";
                    }
                })();
                // newDisplayEl.style.backgroundColor = tagOrder[condition]?.themeColor;
                newDisplayEl.style.setProperty("--themeColor", tagOrder[condition]?.themeColor);
                conditionsArea.appendChild(newDisplayEl);
                
                const newAndEl = d.createElement("div");
                newAndEl.className = "and";
                newAndEl.textContent = (arr.length >= 1) && (i !== arr.length - 1) && (newDisplayEl.textContent !== "") ? "かつ" : "";
                conditionsArea.appendChild(newAndEl);

            });

            numOfHitsArea.innerHTML = `<span>${targetExhibits.length}</span> / <span>${Object.keys(exhibits).length}</span> <span class="subText">件の該当した企画を表示中</span>`;
        })();

        return {
            elements: targetElements,
            exhibits: targetExhibits,
            searchHits: searchHits,
            spliteds: spliteds
        };
    }

    sortList_topContents.className = "topContents";

    (() => {
        bottomBar_contents.className = "content";
        sortList_topBar.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M228.451,230.092L228.451,850.906L849.265,850.906"/>
                        </g>
                        <g class="close">
                            <path d="M228.451,230.092L228.451,850.906L849.265,850.906"/>
                        </g>
                    </svg>`;
        sortList_topBar.className = "topBar";

        sortList_tabs.className = "tabs";

        [
            "絞り込み",
            "地図",
        ].forEach((item, tabIdx) => {
            const tab = d.createElement("div");

            tab.className = "tab";
            tab.innerHTML = item;

            tab.addEventListener("click", () => barTabClick(tabIdx));

            sortList_tabs.appendChild(tab);

            if (tabIdx === 0) setTimeout(() => {
                barTabClick(tabIdx);
            });
        });

        let isBarTouchNow = false;

        function scroll () {
            const getScrollRatio = () => {
                const scrollRatio = bottomBar_contents.scrollLeft / sortList_tabs.scrollWidth;
                return Number.isNaN(scrollRatio) ? 0 : scrollRatio;
            }
            const scrollRatio = getScrollRatio();
            const tabIndex = Math.round(scrollRatio);
            if (
                !isBarTouchNow &&
                scrollRatio % 1 === 0
            ) {
                barTabClick(tabIndex);
            }
            barHeightUpdate();
        }

        // bottomBar_contents.addEventListener("scroll", scroll);
        // scroll();

        bottomBar_contents.addEventListener("touchstart", () => {
            isBarTouchNow = true;
        });

        bottomBar_contents.addEventListener("touchend", () => {
            isBarTouchNow = false;
        });

        sortList_topContents.appendChild(sortList_topBar);
        sortList_topContents.appendChild(sortList_tabs);
        exhibitsBottomBar.appendChild(sortList_topContents);
        exhibitsBottomBar.appendChild(bottomBar_contents);
    })();

    const getLabelCorrEl = (locationName) => exhibits[locationName]?.tileEl || maps_locations[locationName]?.tileEl;

    function scrollToTile(value, offsetY = 0) {
        const targetTile = value instanceof Element ? (
            value
        ) : (
            getLabelCorrEl(value)
        );

        function scrollToAndThen(targetY, callback) {
            const executionTime = Date.now();
            const tolerance = 2; // 少し余裕を持たせる
            const checkScroll = () => {
                const currentY = window.scrollY;
                const maxY = d.body.scrollHeight - window.innerHeight;
                if (
                    Math.abs(currentY - Math.min(targetY, maxY)) <= tolerance ||
                    Date.now() - executionTime > 1000
                ) {
                    if (callback) callback();
                } else {
                    requestAnimationFrame(checkScroll);
                }
            };

            window.scrollTo({ top: targetY, behavior: "smooth" });
            checkScroll();
        }

        if (!targetTile) return null;

        const tileOpenDatas = [];
        const allTiles = exhibitsArea.querySelectorAll(":scope > .tile");

        allTiles.forEach(tileItem => {
            tileOpenDatas.push(tileItem.classList.contains("opened"));
            tileItem.style.transition = "none";
        });
        requestAnimationFrame(() => {
            allTiles.forEach(tileItem => {
                openTile(tileItem, false);
            });

            const rect = targetTile.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 170 + offsetY;

            allTiles.forEach((tileItem, i) => {
                if (tileOpenDatas[i]) tileItem.classList.add("opened");
            });
            requestAnimationFrame(() => {
                allTiles.forEach(tileItem => {
                    tileItem.style.transition = "";
                });
            });

            requestAnimationFrame(() => {
                scrollToAndThen(targetY);
                if (!targetTile.classList.contains("hidden") && targetTile) openTile(targetTile, true);
            });
        });

        return targetTile || null;
    }
    const truncateText = ({
        text: text,
        length: length = 10,
        left: left = false,
        str: str = ".."
    }) => (
        typeof text === "string" ? (
            text.length > length ? text.slice(left ? length : 0, left ? 0 : length) + str : text
        ) : ""
    );
    const getSearchValue = () => searchAreaEl.classList.contains("opened") ? newSearchBarEl.value : "";

    let maps_model; // モデルを外で保持
    let isShow2DMap = false;

    const getFmtedObjName = (name) => name.replace("F" + maps_getFloors(name) + "_", "").replace(name.match(/\d{3}$/), "");
    const getIsImageUrl = (text) => text?.includes("/") && (text?.includes(".svg") || text?.includes(".png"));

    function updateLabelOpacity() {
        Object.values(maps_labels).forEach(({ object, part }, index) => {
            const isAlwaysShow = maps_locations[part.name]?.isAlwaysShow || false;

            const meshOpacity = gsap.getProperty(Array.isArray(part.material) ? part.material[0] : part.material, "opacity");
            if (
                meshOpacity === 1 || isAlwaysShow
            ) {
                if (getIsSortConforming(maps_locations[part.name], getSortConditions(), getSearchValue()).isConforming) {
                    gsap.to(object.material, {
                        opacity: 1
                    });
                } else {
                    gsap.to(object.material, {
                        opacity: .5
                    });
                }
            } else {
                gsap.to(object.material, {
                    opacity: 0
                });
            }
        });
    }

    const pushFloorButton = (f) => maps_buttons_left.querySelectorAll("div.button")[f - 1]?.click();

    function labelDetailOpen (targetMeshName) {
        const location = maps_locations[targetMeshName];
        const baseObject = maps_modelParts[targetMeshName];
        const labelEl = d.createElement("div");
        const labelObject = new CSS2DObject(labelEl);
        labelEl.className = "mapsLabel";

        const labelFontSize = maps_labels[targetMeshName]?.object.userData.fontSize;
        labelEl.style.setProperty("--labelFontSize", labelFontSize + "px");

        function getNewElItem (text, className, pushed) {
            const isDetailPusheable = location.tag || location.onClick;
            if (text) {
                const el = d.createElement("div");
                if (getIsImageUrl(text)) {
                    const imgEl = d.createElement("img");
                    imgEl.src = text;
                    el.appendChild(imgEl);
                } else {
                    el.innerHTML = text;
                }
                el.className = className;

                if (pushed && isDetailPusheable) {
                    el.style.cursor = "pointer";
                    el.addEventListener("click", () => {
                        pushed();
                    });
                }
                return el;
            } else {
                return null;
            }
        }
        
        const informations = d.createElement("div");
        informations.className = "informations";

        const fmtedMeshName = getFmtedObjName(targetMeshName);
        function pushedLabel () {
            barHeightUpdate(false);
            if (maps_locations[targetMeshName]?.onClick) {
                maps_locations[targetMeshName].onClick();
            } else if (maps_locations[fmtedMeshName]?.onClick) {
                maps_locations[fmtedMeshName].onClick();
            } else {
                scrollToTile(maps_locations[targetMeshName].tileEl) || scrollToTile(targetMeshName) || scrollToTile(fmtedMeshName)
            }
        }

        const isLabelPusheable = (
            getLabelCorrEl(targetMeshName) || getLabelCorrEl(fmtedMeshName)
        );

        const floor = maps_getFloors(targetMeshName);
        const locationText = (() => {
            let text = (
                location.location?.name ? location.location?.name + " " : ""
            ) + (
                (floor.length > 0) ? `(${floor.join("､")}階)` : ""
            );
            const sliceIdx = text.length > 14 ? (
                Math.min(text.indexOf("("), text.indexOf("､") + 1) || Math.floor(text.length / 2)
            ) : null;
            if (typeof sliceIdx === "number") text = text.slice(0, sliceIdx) + "<br>" + text.slice(sliceIdx);
            return text;
        })();

        const generateEls = [
            (location.location?.name || floor.length > 0) ? getNewElItem(
                `${locationText} ${isLabelPusheable ? arrowHTMLStr : ""}` || null, "location"
            ) : null,
            location.description ? getNewElItem(location.description.replaceAll("\n", "<br>"), "detail") : null,
            getNewElItem(location?.image, "image"),
        ];
        if (location.description) location.description = location.description.replaceAll("\n", "");
        generateEls.forEach(el => {
            if (el) informations?.appendChild(el);
        });
        if (isLabelPusheable) {
            informations.addEventListener("click", pushedLabel);
        } else {
            informations.style.cursor = "default";
        }
        labelEl.appendChild(informations);
        
        const vector = new THREE.Vector3();
        if (baseObject.geometry) {
            baseObject.geometry.computeBoundingBox();
            baseObject.geometry.boundingBox.getCenter(vector);

            const offset = maps_locations[baseObject.name]?.offset;
            vector.x += offset?.x || 0;
            vector.y += offset?.y || 0;
            vector.z += offset?.z || 0;

            if (baseObject.userData?.originalTransform?.position) {
                // モデル回転を考慮
                const rotationMatrix = new THREE.Matrix4().makeRotationY(maps_model.rotation.y * -1);
                vector.applyMatrix4(rotationMatrix);   
                baseObject.localToWorld(vector);
            }
        }
        labelObject.position.copy(vector);
        baseObject.add(labelObject);

        labelEl.style.setProperty("--numOfEl", generateEls.length);

        (() => {
            let isImgLoaded = false;
            function onload () {
                const targetMesh = maps_modelParts[targetMeshName];
                isImgLoaded = true;
                maps_frameObject({
                    target: targetMesh,
                    offsetZ: Math.max(informations.offsetHeight * -.003, -.5),
                });
                updateLabelOpacity();
            }
            const img = generateEls.filter(item => item?.className.includes("image"))[0]?.querySelector("img");
            setTimeout(() => {
                if (img) {
                    img.onload = onload;
                    setTimeout(() => {
                        if (!isImgLoaded) {
                            img.onload = null;
                            onload();
                        }
                    }, 1000);
                } else {
                    onload();
                }
            }, 50);
        })();

    }
    function removeLabel(meshName) {
        const baseObject = maps_modelParts?.[meshName];
        if (baseObject) {
            const childs = [...baseObject.children];
            childs.forEach(child => {
                if (child.element) {
                    child.element.style.opacity = 0;
                    child.element.style.pointerEvents = "none";
                    setTimeout(() => {
                        // CSS2DObject の場合
                        child.element.remove();
                        // Three.js のオブジェクトからも削除
                        baseObject.remove(child);
                    }, 500);
                }
            });
        }
    }
    function removeAllLabel () {
        Object.keys(maps_modelParts).forEach(mesh => {
            removeLabel(mesh);
        });
    }

    (() => { // exhibitsBottomBar contents
        // listView
        const listView = d.createElement("div");
        listView.className = "tags listView";
        bottomBar_contents.appendChild(listView);

        const newSearchBarDisplayEl = d.createElement("div");
        newSearchBarDisplayEl.className = "searchBarDisplay";

        const sagestsEl = searchAreaEl.querySelector(".sagests");

        newSearchBarEl.className = "searchBar";
        newSearchBarEl.type = "text";
        newSearchBarEl.value = existingSearchValue;

        const getSearchWord = () => newSearchBarEl.value;
        const getFmtedHTML = (str) => str.replaceAll(" ", "&nbsp;");
        const getIsOpened = () => searchAreaEl.classList.contains("opened") ? true : false;
        const getIsFocus = () =>  searchAreaEl.classList.contains("focus") ? true : false;
        const getScrollWidth = (el) => el?.scrollWidth || 0;

        function setBarShift (custom) {
            const spans = newSearchBarDisplayEl.querySelectorAll(":scope > span");
            const barSelectionIndex = newSearchBarEl.selectionEnd - spans[1]?.textContent?.length || 0;
            const value = custom || 
            (getScrollWidth(spans[0]) + getScrollWidth(spans[1])) * -1 + ((
                Math.min(window.innerWidth, 700)
            ) * .5) + (
                spans[1] ? (Math.abs(barSelectionIndex) / spans[1].textContent.length) * spans[1].scrollWidth : 0
            );
            searchBarsEl.style.setProperty("--barShift", value + "px");
        }

        function searchBarScroll () {
            if (
                (newSearchBarEl.scrollWidth - newSearchBarEl.offsetWidth) <= 0
            ) {
                newSearchBarEl.scrollLeft = 0;
            }

            const offsetPx = newSearchBarEl.scrollLeft;
            newSearchBarDisplayEl.style.setProperty("--barScrollPx", (
                offsetPx * -1
            ) + "px");
            searchBarsEl.style.setProperty("--scrollLeft", searchBarsEl.scrollLeft + "px");
        }

        let queryParamTimeout;
        function searchInput () {
            const searchWord = getSearchWord();
            const sortResult = updateSort();
            
            // if (queryParamTimeout) {
            //     clearTimeout(queryParamTimeout);
            // }
            // queryParamTimeout = setTimeout(() => {
            //     function deleteParam () {
            //         queryParameter({
            //             type: "delete",
            //             key: "search"
            //         });
            //     }
            //     if (
            //         newSearchBarEl.value === ""
            //     ) {
            //         deleteParam();
            //     } else {
            //         deleteParam();
            //         queryParameter({
            //             type: "append",
            //             key: "search",
            //             value: newSearchBarEl.value
            //         });
            //     }
            // }, 150);

            sagestsEl.innerHTML = "";
            const isSagestVaild = searchWord && searchWord !== "" && searchWord.length !== 0;
            const sagestResults = [];
            let sagestsHeight = 0;
            sortResult.searchHits.forEach((hitItem, i) => {
                if (isSagestVaild) {
                    const sagestSplit = sortResult.spliteds[i][hitItem?.[0]?.[0][1]];
                    const sagestTexts = [
                        sagestSplit?.[0] || "",
                        sagestSplit?.[1] || "",
                        sagestSplit?.slice(2).join("") || ""
                    ];
                    sagestResults.push(sagestTexts);
                    const newSet = d.createElement("div");

                    const newSagest = d.createElement("div");
                    newSagest.innerHTML = `<span>${
                        truncateText({
                            text: getFmtedHTML(sagestTexts[0]),
                            length: 15,
                            left: true,
                        })
                    }</span>${
                        getFmtedHTML(sagestTexts[1])
                    }<span>${
                        getFmtedHTML(sagestTexts[2])
                    }</span>`;

                    const newExhibitName = d.createElement("div");
                    newExhibitName.textContent = sortResult.exhibits[i].name;
                    newExhibitName.className = "exhibitName";

                    sagestsEl.appendChild(newSet);
                    newSet.appendChild(newSagest);
                    newSet.appendChild(newExhibitName);

                    newSet.addEventListener("click", e => {
                        if (
                            newSagest.contains(e.target) ||
                            newExhibitName.contains(e.target)
                        ) {
                            searchBarsEl.classList.remove("opened");
                            const targetEl = sortResult.elements[i];
                            scrollToTile(targetEl);
                        }
                    });
                }
            });
            sagestsHeight = sagestsEl.clientHeight;
            mainContent.style.setProperty("--sagestsHeight", getIsOpened() && getIsFocus() ? sagestsHeight + "px" : 0);
            searchBarsEl.style.setProperty("--barShift", "0px");
            searchBarsEl.style.setProperty("--span0Width", "0px");
            if (isSagestVaild) {
                newSearchBarDisplayEl.innerHTML = "";
                if (searchWord && sagestResults.length !== 0 && getIsOpened()) {
                    newSearchBarDisplayEl.innerHTML = `<span>${
                        getFmtedHTML(sagestResults?.[0]?.[0])
                    }</span>${
                        getFmtedHTML(searchWord)
                    }<span>${
                        getFmtedHTML(sagestResults?.[0]?.[2])
                    }</span>`;
                }
                const spans = newSearchBarDisplayEl.querySelectorAll(":scope > span");
                searchBarsEl.style.setProperty("--span0Width", getScrollWidth(spans[0]) + "px");
                searchAreaEl.style.setProperty("--searchBarDisplayWidth", getScrollWidth(newSearchBarDisplayEl) + "px");
            } else {
                newSearchBarDisplayEl.innerHTML = "検索できます";
            }
            searchAreaEl.classList.add("focus");
            // newSearchBarEl.focus();
            searchBarScroll();
        }

        function setAllTilesTransition (isToTrue) {
            Object.values(exhibits).forEach(exhibit => {
                if (exhibit.tileEl) exhibit.tileEl.style.transition = isToTrue ? "" : "none";
            });
        }

        newSearchBarEl.addEventListener("focus", () => {
            searchInput();
            setAllTilesTransition(false);
        });
        newSearchBarEl.addEventListener("blur", () => {
            setTimeout(() => {
                setAllTilesTransition(true);
                searchAreaEl.classList.remove("focus");
            }, 400);
        });
        newSearchBarEl.addEventListener("scroll", searchBarScroll);

        searchInput();
        newSearchBarEl.addEventListener("input", () => {
            searchInput();
        });
        ["keydown", "keyup", "click", "select"].forEach(eventType => {
            newSearchBarEl.addEventListener(eventType, () => {
                searchBarScroll();
            });
        });

        searchBarsEl.querySelector("svg").addEventListener("click", () => {
            searchAreaEl.classList.toggle("opened");
            searchInput();
            searchInputsEl.scrollLeft = 0;
        });
        searchInputsEl.appendChild(newSearchBarEl);
        searchInputsEl.appendChild(newSearchBarDisplayEl);

        // tag絞り込み生成
        Object.keys(tagOrder).forEach((tag, tagIndex) => {
            const newTag = d.createElement("span");
            newTag.className = `tag${
                queryParameter({
                    type: "get",
                    key: "sort"
                }).includes(tag) ? " checkedBox" : ""
            }`;
            // newTag.className = "tag checkedBox";
            // newTag.style.backgroundColor = tagOrder[tag].themeColor;
            newTag.style.setProperty("--themeColor", tagOrder[tag].themeColor);
            newTag.textContent = tagOrder[tag].displayName;
            newTag.setAttribute("tag", tag);
            if (tagOrder[tag].group) {
                const groupKey = Object.keys(tagGroups).find(key => tagGroups[key] === tagOrder[tag].group);
                newTag.setAttribute("group", groupKey);
            }
            if (tagOrder[tag].group) newTag.setAttribute("isMultSel", tagOrder[tag].group.isMultSel);
            if (tagOrder[tag].isButton) newTag.setAttribute("isButton", "");

            function generateCheckBox () {
                const checkBox = d.createElement("div");
                checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="anim"><path d="M239.48,469.289 L416.256,646.066 L840.52,221.802"/></svg>`;
                checkBox.className = "checkBox";
                newTag.appendChild(checkBox);
                setPathViewBox();
            }
            listView.appendChild(newTag);

            if (tagOrder[tag].isButton) {
                newTag.classList.add("checkedBox");
            } else {
                generateCheckBox();
            }

            const get_isButton = () => tagOrder[tag].isButton;

            function updateResetButton (pushed = false) {
                const resetButton = exhibitsBottomBar.querySelector(".tags.listView .tag[tag='resetButton']");
                const tagElements = exhibitsBottomBar.querySelectorAll(".tags.listView .tag:not([isButton=''])");
                const tag_isCheckeds = [];
                tagElements.forEach(tag => {
                    tag_isCheckeds.push(tag.classList.contains("checkedBox"));
                });

                const isAllSelected = tag_isCheckeds.every(item => item === false);
                if (isAllSelected) { // すべてのタグが選ばれていない
                    resetButton.classList.remove("checkedBox");
                } else {
                    if (pushed) {
                        tagElements.forEach(tag => {
                            tag.classList.remove("checkedBox");
                        });
                    }
                    resetButton.classList.add("checkedBox");
                }
            }
            updateResetButton();

            function tagClicked () {
                if (get_isButton()) {
                    updateResetButton(true);
                } else {
                    newTag.classList.toggle("checkedBox");
                    if (newTag.getAttribute("isMultSel")) {
                        listView.querySelectorAll(`.tag[group='${newTag.getAttribute("group")}'][isMultSel='false']`).forEach(tag => {
                            if (tag !== newTag) {
                                tag.classList.remove("checkedBox");
                            }
                        });
                    }
                }
                queryParameter({
                    type: "delete",
                    key: "sort"
                });
                queryParameter({
                    type: "append",
                    key: "sort",
                    value: getSortConditions()
                });
                updateResetButton();
                updateSort();
            }

            newTag.addEventListener("click", tagClicked);
        });
        updateSort();

        // アクティブフロアを配列で取得
        const getActiveFloors = () => [...maps_buttons_left.querySelectorAll(".button")]
            .filter(btn => !btn.classList.contains("invalid"))
            .map(btn => btn.getAttribute("floor").replaceAll("f", "") * 1);

        (() => { // mapsView
            bottomBar_contents.appendChild(mapsView);
            const compassBar = d.createElement("div");
            const compass = d.createElement("div");
            const maps_buttons_top = d.createElement("div");

            maps_buttons_right.className = "buttons right";
            maps_buttons_left.className = "buttons left";
            maps_buttons_top.className = "buttons top";

            const top_button = d.createElement("div");
            top_button.className = "button";
            maps_buttons_top.appendChild(top_button);

            mapsView.className = "mapsView";
            compassBar.className = "compassBar";
            compass.className = "compass button";
            
            const compassImg = d.createElement("img");
            compassImg.src = "medias/images/compass.svg";
            compass.appendChild(compassImg);

            const scene = THREE ? new THREE.Scene() : null;
            if (scene) scene.background = null; // 背景色

            if (maps_renderer) {
                maps_renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                maps_renderer.shadowMap.enabled = false;

                // 描画領域を mapsView に追加
                mapsView.appendChild(maps_renderer.domElement);
            }

            // 照明
            const latitude = 35.86059681776511;
            const longitude = 139.26886482318102;
            const now = new Date();
            
            // 太陽の位置を取得
            const light = THREE ? new THREE.DirectionalLight(0xffffff, 1) : null;
            function matchSun () {
                const sunPos = SunCalc.getPosition(now, latitude, longitude);
                const distance = 1000; // 光源までの距離
                const altitude = sunPos.altitude; // 高度
                const azimuth = sunPos.azimuth;   // 方位角（北=0）

                // 球座標 → デカルト座標変換
                const x = distance * Math.cos(altitude) * Math.sin(azimuth);
                const y = Math.max(distance * Math.sin(altitude), 2);
                const z = distance * Math.cos(altitude) * Math.cos(azimuth);

                light.position.set(x, y, z);
                light.lookAt(0, 0, 0); // 原点を照らす

                const maxIntensity = 5;
                const minIntensity = 0;
                light.intensity = Math.max(minIntensity, Math.sin(sunPos.altitude) * maxIntensity);            
            }
            if (light) {
                light.castShadow = false;
                light.shadow.mapSize.width = 512;
                light.shadow.mapSize.height = 512;
                light.shadow.bias = -0.0001;
                /* 
                AeroStar:
                横 : 1
                縦 : 4.3172690763
                高 : 1.2329317269
                地 : 0.06626506024
                */
               matchSun();
               setInterval(matchSun, 1000 * 60);
               scene.add(light);
            }

            // 環境光
            if (scene) scene.add(new THREE.AmbientLight(0xffffff, 0.5));

            let cameraDistance = 10; // モデル中心からの距離
            let cameraHeight = 10;    // 高さ（Y座標）
            let camHorizontal = 0;     // 左右角度（度単位）
            let camVertical = 0;   // 垂直角度（度単位）

            if (maps_camera) {
                maps_camera.position.set(
                    cameraDistance,
                    cameraHeight,
                    cameraDistance
                );
                maps_camera.lookAt(0, 0, 0);
            }

            // 3Dモデル読み込み
            const loader = GLTFLoader ? new GLTFLoader() : null;
            const currentLocationPointMesh = THREE ? new THREE.Mesh(
                new THREE.BoxGeometry(
                    .01,
                    .01,
                    .01,
                )
            ) : null;

            loadScModel = (loaded) => {
                if (!loader || isScModelLoadStarted) return;
                isScModelLoadStarted = true;
                console.log("scModelLoadStarted");
                loader.load(
                    "medias/3ds/sc.glb",
                    (gltf) => {
                        console.log("scModelLoaded");
                        
                        isScModelLoaded = true;
                        maps_model = gltf.scene;

                        maps_model.position.set(0, 0, 0);
                        maps_model.rotation.y = THREE.MathUtils.degToRad(135);
                        scene.add(maps_model);

                        maps_model.add(currentLocationPointMesh);
                        currentLocationPointMesh.position.set(
                            0, 0, 0
                        );
                        currentLocationPointMesh.name = "currentLocationPoint";
                        currentLocationPointMesh.visible = false;
                        currentLocationPointMesh.material.opacity = 0;

                        // モデルが読み込まれたら OrbitControls の注視点をモデル中心に設定
                        function setCamFocus(x = 0, y = 0, z = 0) {
                            maps_controls.target.set(x, y, z);
                            maps_controls.update();
                        }

                        setCamFocus(0, 0, 0);

                        maps_controls.enableDamping = true; // 慣性スクロール
                        maps_controls.enableRotate = true;
                        maps_controls.enableZoom = true;
                        maps_controls.enablePan = true;
                        maps_controls.dampingFactor = 0.05;
                        maps_controls.screenSpacePanning = false;

                        const mergeObjs = [];
                        maps_model.traverse(child => {
                            // Skip adding objects with fully transparent materials or named "Transparent"
                            if (child.isMesh) {
                                // Check for "Transparent" material name or full opacity 0
                                let skip = false;
                                let materials = Array.isArray(child.material) ? child.material : [child.material];
                                for (const mat of materials) {
                                    if (
                                        (mat && mat.name === "Transparent") ||
                                        (mat && mat.transparent && mat.opacity === 0)
                                    ) {
                                        skip = true;
                                        break;
                                    }
                                }
                                if (skip) return; // Do not add to scene or maps_modelParts
                                maps_modelParts[child.name] = child;
                                child.castShadow = false;
                                child.receiveShadow = false;
                                child.frustumCulled = true; // Explicitly enable frustum culling
                            }
                            if (child.type === "Object3D") {
                                const meshes = [];
                                child.traverse((sub) => {
                                    // Only add meshes that are not fully transparent and not with "Transparent" material name
                                    if (sub.isMesh) {
                                        let skipMesh = false;
                                        let mats = Array.isArray(sub.material) ? sub.material : [sub.material];
                                        for (const mat of mats) {
                                            if (
                                                (mat && mat.name === "Transparent") ||
                                                (mat && mat.transparent && mat.opacity === 0)
                                            ) {
                                                skipMesh = true;
                                                break;
                                            }
                                        }
                                        if (!skipMesh) {
                                            sub.frustumCulled = true; // Enable frustum culling for each mesh
                                            meshes.push(sub);
                                        }
                                    }
                                });
                                if (meshes.length === 0) return;

                                // マージ前のワールド座標を保存
                                child.userData.originalTransform = {
                                    position: child.position.clone(),
                                    rotation: child.rotation.clone(),
                                    scale: child.scale.clone(),
                                    matrixWorld: child.matrixWorld.clone()
                                };

                                // ジオメトリ統合
                                const transformedGeometries = meshes
                                    .filter(mesh => {
                                        // Exclude meshes with "Transparent" material or fully transparent
                                        const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                                        if (
                                            material?.name === "Transparent" ||
                                            (material?.transparent && material?.opacity === 0)
                                        ) {
                                            return false;
                                        }
                                        return true;
                                    })
                                    .map(mesh => {
                                        let geom = mesh.geometry.clone();

                                        // 2. ワールド変換を適用
                                        const matrix = new THREE.Matrix4();
                                        matrix.multiplyMatrices(
                                            new THREE.Matrix4().compose(child.position, child.quaternion, child.scale),
                                            new THREE.Matrix4().compose(mesh.position, mesh.quaternion, mesh.scale)
                                        );
                                        geom.applyMatrix4(matrix);

                                        // 3. LOD用の簡略化ジオメトリ作成（例: デシメーションは簡易版）
                                        const lodGeom = geom.clone();
                                        const lod = new THREE.LOD();
                                        lod.addLevel(new THREE.Mesh(lodGeom, mesh.material.clone()), 0);

                                        return geom;
                                    });

                                let mergedGeometry = BufferGeometryUtils.mergeGeometries(transformedGeometries, true);
                                mergedGeometry = BufferGeometryUtils.mergeVertices(mergedGeometry, 0.0005);
                                if (!mergedGeometry) return;

                                const mergedMaterial = meshes.map(mesh => {
                                    const cloned = mesh.material.clone();
                                    cloned.opacity = mesh.material.opacity ?? 1;
                                    cloned.transparent = true;
                                    if (mesh.material.envMap) cloned.envMap = mesh.material.envMap;
                                    cloned.needsUpdate = true;
                                    return cloned;
                                });

                                // 法線再計算
                                mergedGeometry.computeVertexNormals();

                                const mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);

                                // 描画上はマージ前のワールド変換を適用
                                mergedGeometry.applyMatrix4(child.matrixWorld);

                                mergedMesh.position.set(0, 0, 0);
                                mergedMesh.rotation.set(0, 0, 0);
                                mergedMesh.scale.set(1, 1, 1);

                                mergedMesh.name = child.name;

                                // 元の位置情報を mergedMesh にもコピーしておく
                                const rotationMatrix = new THREE.Matrix4().makeRotationY(maps_model.rotation.y);
                                const originalPos = child.userData.originalTransform.position.clone();
                                const rotatedPos = originalPos.applyMatrix4(rotationMatrix);

                                mergedMesh.userData.originalTransform = {
                                    ...child.userData.originalTransform,
                                    position: rotatedPos
                                };

                                mergeObjs.push({ parent: child.parent, original: child, merged: mergedMesh });
                            }
                        });

                        // マージ後に置き換え
                        mergeObjs.forEach(item => {
                            item.parent.add(item.merged);
                            item.parent.remove(item.original);
                            maps_modelParts[item.original.name] = item.merged;
                        });

                        console.log("maps_modelParts : \n", maps_modelParts);

                        (() => {
                            function blinkBrinkerLight(objectName, blinkInterval = 500, targetMaterialName = "Car_BrinkerLight") {
                                const targetObj = maps_modelParts[objectName];
                                if (!targetObj) {
                                    console.warn("指定されたオブジェクトが存在しません:", objectName);
                                    return;
                                }

                                let isVisible = true;

                                setInterval(() => {
                                    targetObj.traverse((child) => {
                                        if (child.isMesh) {
                                            // 配列マテリアル対応
                                            const materials = Array.isArray(child.material) ? child.material : [child.material];
                                            materials.forEach((mat) => {
                                                if (mat.name === targetMaterialName) {
                                                    mat.emissive = new THREE.Color(isVisible ? 0x000000 : 0xffa500); // 点灯時はオレンジ
                                                    mat.emissiveIntensity = isVisible ? 0 : 1;
                                                    mat.needsUpdate = true;
                                                }
                                            });
                                        }
                                    });
                                    isVisible = !isVisible;
                                }, blinkInterval);
                            }
                            blinkBrinkerLight("Bus_Body_6");
                        })();

                        // エッジ線を追加（親レベルのメッシュのみ、子メッシュの内部構造は無視）
                        Object.values(maps_modelParts).forEach((mesh) => {
                            if (mesh.isMesh && mesh.parent && mesh.parent.type === "Group") {
                                const edges = new THREE.EdgesGeometry(mesh.geometry, 85); // 境界角度閾値
                                const line = new THREE.LineSegments(
                                    edges,
                                    new THREE.LineBasicMaterial({
                                        color: "lightgray",
                                        linewidth: 1,
                                        transparent: true,
                                        opacity: 1
                                    })
                                );
                                mesh.add(line);

                                // ★ エッジラインを userData に保存
                                mesh.userData.edgeLine = line;

                                // 必要に応じて面のオフセットも
                                mesh.material.polygonOffset = true;
                                mesh.material.polygonOffsetFactor = 1;
                                mesh.material.polygonOffsetUnits = 1;
                            }
                        });

                        mapsView.appendChild(maps_labelRenderer.domElement);

                        function setTagAttributes (tags, element) {
                            if (!Array.isArray(tags)) return;
                            const tagAttributes = [];
                            tags.forEach(tag => {
                                tagAttributes.push(tag);
                            });
                            element.setAttribute("tag", tagAttributes.join(","));
                        }

                        Object.keys(maps_modelParts).forEach((partName) => {
                            const part = maps_modelParts[partName];

                            if (!maps_locations[partName] && exhibits[partName]) { // もし該当するlocationがないならexhibitsの値を用いる
                                maps_locations[partName] = {
                                    ...exhibits[partName],
                                    originalValue: partName,
                                };
                            }

                            if (
                                partName.includes("_WC") &&
                                !maps_locations[partName]?.name
                            ) {
                                const locationName = maps_locations[partName]?.location.name;
                                maps_locations[partName] = {
                                    name: "medias/images/wc.svg",
                                    location: {
                                        name: locationName
                                    },
                                    description: maps_locations[partName]?.description || "トイレ",
                                };
                            }

                            if (!maps_locations[partName]) return;

                            const canvas = d.createElement("canvas");
                            const ctx = canvas.getContext("2d");
                            const scaleFactor = Math.max(Math.min(window.innerWidth / 1250, 2), .5);

                            const labelTextFontSize = scaleFactor * 220;

                            function drawLabelText (backgroundColor = "rgba(45, 45, 45, 0.8)") {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);

                                const text = truncateText({
                                    text: maps_locations[partName]?.name || "",
                                    length: 8,
                                    str: "...",
                                });
                                ctx.font = `${labelTextFontSize}px ${getComputedStyle(d.documentElement).getPropertyValue("--baseFonts") || "sans-serif"}`;
                                ctx.textAlign = "center";
                                ctx.textBaseline = "middle";

                                const textWidth = ctx.measureText(text).width;
                                const textBoxMargin = scaleFactor * 80;

                                // 背景（角丸）
                                ctx.fillStyle = backgroundColor;

                                function roundRect(ctx, x, y, width, height, radius) {
                                    if (typeof radius === "number") {
                                        radius = { tl: radius, tr: radius, br: radius, bl: radius };
                                    } else {
                                        const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
                                        for (let side in defaultRadius) {
                                            radius[side] = radius[side] || defaultRadius[side];
                                        }
                                    }
                                    ctx.beginPath();
                                    ctx.moveTo(x + radius.tl, y);
                                    ctx.lineTo(x + width - radius.tr, y);
                                    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
                                    ctx.lineTo(x + width, y + height - radius.br);
                                    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
                                    ctx.lineTo(x + radius.bl, y + height);
                                    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
                                    ctx.lineTo(x, y + radius.tl);
                                    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                roundRect(
                                    ctx,
                                    (canvas.width / 2 - textWidth / 2) - textBoxMargin,
                                    (canvas.height / 2 - labelTextFontSize / 2) - textBoxMargin * 1.25,
                                    textWidth + textBoxMargin * 2,
                                    labelTextFontSize + textBoxMargin * 2,
                                    textBoxMargin
                                );

                                // テキスト
                                ctx.fillStyle = "white";
                                ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                            }

                            function resizeLabelCanvas ({
                                width: newWidth,
                                height: newHeight,
                                sprite: sprite,
                                backgroundColor: backgroundColor
                            }) {
                                canvas.width = 512 * scaleFactor * newWidth;
                                canvas.height = 512 * scaleFactor * newHeight;
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                drawLabelText(backgroundColor); // ← 背景と文字を再描画
                                if (sprite && sprite.material.map instanceof THREE.CanvasTexture) {   
                                    sprite.material.map.needsUpdate = true;
                                }
                            }

                            // 背景を透明に初期化
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            let text = maps_locations[partName]?.name || maps_pointIcon;
                            const isImage = getIsImageUrl(text);

                            const fontSize = scaleFactor * 220;
                            let textHeight = fontSize;
                            let textWidth  = fontSize;

                            function addLabel ({
                                width: width,
                                height: height,
                                spriteToAdd: spriteToAdd,
                            }) {
                                const sprite = spriteToAdd || (() => {
                                    const texture = new THREE.CanvasTexture(canvas);
                                    texture.needsUpdate = true;
                                    const spriteMaterial = new THREE.SpriteMaterial({
                                        map: texture,
                                        transparent: true,
                                        depthTest: false
                                    });
                                    return new THREE.Sprite(spriteMaterial);
                                })();

                                const baseScale = .15;
                                let scaleRatio = [
                                    baseScale * width,
                                    baseScale * height,
                                ];
                                if (spriteToAdd) {
                                    const baseScale = .15;
                                    scaleRatio = [
                                        baseScale,
                                        baseScale,
                                    ];
                                }

                                resizeLabelCanvas({
                                    width: width || 1,
                                    height: height || 1,
                                    sprite: sprite,
                                    backgroundColor: part === currentLocationPointMesh ? "rgba(220, 45, 80, .8)" : undefined,
                                });

                                sprite.transparent = true;
                                sprite.renderOrder = 999;
                                const spriteScale = .2;
                                sprite.scale.set(
                                    spriteScale * scaleRatio[0],
                                    spriteScale * scaleRatio[1],
                                    spriteScale,
                                ); // adjust label size
                                // match position to geometry center like CSS2DObject
                                if (part.geometry) {
                                    const vector = new THREE.Vector3();
                                    part.geometry.computeBoundingBox();
                                    part.geometry.boundingBox.getCenter(vector);

                                    const offset = maps_locations[part.name]?.offset;
                                    vector.x += offset?.x || 0;
                                    vector.y += offset?.y || 0;
                                    vector.z += offset?.z || 0;

                                    part.localToWorld(vector);
                                    sprite.position.copy(vector);
                                }
                                sprite.name = partName + "_label";
                                sprite.userData = {
                                    name: part.name,
                                    scaleRatio: scaleRatio,
                                    fontSize: labelTextFontSize,
                                };
                                scene.add(sprite);
                                // Save reference for later control
                                maps_labels[partName] = {
                                    object: sprite,
                                    part: part
                                };
                            }

                            if (isImage) {
                                const img = new Image();
                                img.src = text;
                                img.onload = () => {
                                    const texture = new THREE.CanvasTexture(img);
                                    const spriteMaterial = new THREE.SpriteMaterial({
                                        map: texture,
                                        transparent: true,
                                        depthTest: false
                                    });
                                    const sprite = new THREE.Sprite(spriteMaterial);
                                    sprite.renderOrder = 999;
                                    const imageScale = .03;
                                    sprite.scale.set(imageScale, imageScale, imageScale); // サイズ調整
                                    if (part.geometry) {
                                        const center = new THREE.Vector3();
                                        part.geometry.computeBoundingBox();
                                        part.geometry.boundingBox.getCenter(center);
                                        part.localToWorld(center);
                                        sprite.position.copy(center);
                                    }
                                    addLabel({
                                        width: 1,
                                        height: 1,
                                        spriteToAdd: sprite,
                                    });
                                };
                            } else {
                                // それ以外は従来のテキスト描画
                                const text = maps_locations[partName]?.name || "";
                                // const text = truncateText({
                                //     text: maps_locations[partName]?.name || "",
                                //     length: 5,
                                // });

                                // テキストスタイル
                                ctx.font = `${fontSize}px ${getComputedStyle(d.documentElement).getPropertyValue("--baseFonts") || "sans-serif"}`;
                                ctx.textAlign = "center";
                                ctx.textBaseline = "middle";

                                // テキスト幅を測定
                                textWidth = ctx.measureText(text).width;

                                addLabel({
                                    width: Math.max(
                                        (textWidth / textHeight) * .6,
                                        2
                                    ),
                                    height: 1,
                                });
                            }
                        });

                        maps_renderer.domElement.addEventListener("webglcontextrestored", () => {
                            location.reload();

                            // Object.keys(maps_labels).forEach((partName) => {
                            //     const { object, part } = maps_labels[partName];
                            //     const location = maps_locations[partName];

                            //     // CanvasTextureを使うテキストラベルのみ再描画
                            //     if (object.material.map instanceof THREE.CanvasTexture && !getIsImageUrl(location?.name)) {
                            //         const canvas = object.material.map.image;
                            //         if (canvas && canvas.getContext) {
                            //             const ctx = canvas.getContext("2d");
                            //             if (ctx && typeof drawLabelText === "function") {
                            //                 drawLabelText.call({ ctx, canvas, partName }); // 再描画
                            //                 object.material.map.needsUpdate = true;
                            //             }
                            //         }
                            //     }
                            // });
                            // maps_renderer.compile(scene, maps_camera);

                            // Object.values(maps_labels).forEach(({ object }) => {
                            //     if (object.material.map instanceof THREE.CanvasTexture) {
                            //         object.material.map.needsUpdate = true;
                            //     }
                            // });
                            // maps_renderer.compile(scene, maps_camera);
                        });


                        const raycaster = new THREE.Raycaster();
                        const mouse = new THREE.Vector2();
                        function onMouseClick (x, y) {
                            // レンダラーのキャンバス領域に対する相対座標を使う
                            const rect = maps_renderer.domElement.getBoundingClientRect();

                            const canvasX = x - rect.left;
                            const canvasY = y - rect.top;

                            mouse.x = (canvasX / rect.width) * 2 - 1;
                            mouse.y = - (canvasY / rect.height) * 2 + 1;

                            // カメラの行列を最新化してからセット
                            maps_camera.updateMatrixWorld();
                            raycaster.setFromCamera(mouse, maps_camera);

                            const clickableLabels = Object.values(maps_labels)
                                .map(obj => obj.object)
                                .filter(Boolean);

                            const intersects = raycaster.intersectObjects(clickableLabels, true);

                            removeAllLabel();
                            if (intersects.length > 0) { // ラベル展開､push
                                let clicked = (() => {
                                    for (const intersect of intersects) {
                                        const clicked = intersect.object;
                                        const location = maps_locations[clicked.userData.name];
                                        const isPusheable = (
                                            clicked.material.opacity !== 0 &&
                                            (location?.description || location?.location?.name)
                                        );
                                        if (isPusheable) return clicked;
                                    }
                                })();
                                while (clicked && clicked.type !== "Sprite" && clicked.parent) {
                                    clicked = clicked.parent;
                                }
                                if (clicked) labelDetailOpen(clicked.userData.name);
                            }
                        }

                        (() => {
                            let lastHandleEventAt;
                            let startPos = [];
                            let isPinchNow = false;
                            function touchstart (x, y) {
                                startPos = [x, y];
                            }
                            function touchend (x, y) {
                                const touchThreshold = 25;
                                if (
                                    ((Date.now() - lastHandleEventAt) > 500 || !lastHandleEventAt) &&
                                    (
                                        Math.abs(startPos[0] - x) < touchThreshold &&
                                        Math.abs(startPos[1] - y) < touchThreshold
                                    ) && !isPinchNow
                                ) {
                                    onMouseClick(x, y);
                                    lastHandleEventAt = Date.now();
                                }
                            }
                            maps_renderer.domElement.addEventListener("touchstart", e => {
                                const touch = e?.touches[0];
                                if (e?.touches.length > 1) isPinchNow = true;
                                if (touch) touchstart(touch.clientX, touch.clientY);
                            });
                            maps_renderer.domElement.addEventListener("touchend", e => {
                                const touch = e?.touches[0];
                                if (touch) touchend(touch.clientX, touch.clientY);
                                isPinchNow = false;
                            });
                            maps_renderer.domElement.addEventListener("mousedown", e => {
                                touchstart(e.clientX, e.clientY);
                            });
                            maps_renderer.domElement.addEventListener("mouseup", e => {
                                touchend(e.clientX, e.clientY);
                            });
                        })();

                        const truncate = (num, digit = 3) => Math.floor(num * digit) / digit;

                        const areaTopMargin = getComputedStyle(exhibitsBottomBar).marginTop.replace("px", "") * 1;

                        const getFmtedPx = (px) => px.replace("px", "");

                        function updateLabelScale (el) {
                            const element = el;
                                const labelChildWidths = [];
                                let labelHeight = 0;
                                let labelWidth  = 0;
                                const title = element.querySelector(".title");
                                if (element.classList.contains("opened")) {
                                    const childrens = Array.from(element.children).filter(child => !child.classList.contains("arrow"));
                                    childrens.forEach(child => {
                                        labelChildWidths.push(child.offsetWidth);
                                        const style = window.getComputedStyle(element);
                                        labelHeight = Math.max(
                                            child.offsetTop +
                                            child.getBoundingClientRect().height +
                                            parseFloat(style.marginBottom),
                                            parseFloat(style.marginTop),
                                            labelHeight
                                        );
                                    });
                                    labelWidth = Math.max(...labelChildWidths);
                                } else {
                                    if (title) {
                                        labelWidth  = title.getBoundingClientRect().width;
                                        labelHeight = title.getBoundingClientRect().height;
                                    }
                                }

                                const labelWidthProperty = "--width";
                                const labelHeightProperty = "--height";

                                function setLabelScale () {
                                    if (getComputedStyle(element).getPropertyValue(labelWidthProperty) !== labelWidth + "px") {
                                        element.style.setProperty(labelWidthProperty,  labelWidth + "px");
                                    }
                                    if (getComputedStyle(element).getPropertyValue(labelHeightProperty) !== labelHeight + "px") {
                                        element.style.setProperty(labelHeightProperty, labelHeight + "px");
                                    }
                                    
                                    if (element?.getBoundingClientRect().width < title?.getBoundingClientRect().width) {
                                        element.classList.add("over");
                                    } else {
                                        element.classList.remove("over");
                                    }
                                }
                                setLabelScale();
                                return [labelWidth, labelHeight];
                        }

                        function renderScene() {
                            maps_renderer.render(scene, maps_camera);
                            maps_labelRenderer.render(scene, maps_camera);
                        }
                        // 描画ループ
                        let lastAnimUpdateAt;
                        function animate () {
                            requestAnimationFrame(animate);
                            if (
                                ((Date.now() - lastAnimUpdateAt > labelAnimUpdateThresholdMs) || !lastAnimUpdateAt) && !d.hidden
                            ) {
                                renderScene();
                                maps_controls.update();
                                lastAnimUpdateAt = Date.now();
                            }
                        }
                        animate();

                        updateLabelOpacity();

                        let deviceorientationHandler;

                        function removeDirectionMatch () {
                            window.removeEventListener("deviceorientation", deviceorientationHandler);
                        }
                        mapsView.addEventListener("touchstart", removeDirectionMatch);
                        mapsView.addEventListener("mousedown", removeDirectionMatch);

                        const panLimit = 5;

                        (() => { // 無効化済み
                            // Y=0 の水平面にグリッドを作成
                            const squareSize = panLimit * 2;
                            const half = squareSize / 2;
                            const divisions = 64; // 内部の分割数（好みで変更

                            const gridMaterial = new THREE.LineBasicMaterial({
                                color: "lightgray",
                                opacity: 0.1
                            });

                            // 外周の正方形
                            const outerVertices = new Float32Array([
                                -half, 0.01, -half,
                                half, 0.01, -half,
                                half, 0.01,  half,
                                -half, 0.01,  half,
                                -half, 0.01, -half
                            ]);
                            const outerGeometry = new THREE.BufferGeometry();
                            outerGeometry.setAttribute("position", new THREE.BufferAttribute(outerVertices, 3));
                            scene.add(new THREE.Line(outerGeometry, gridMaterial));

                            // 内部グリッド線（水平・垂直）
                            const gridHeight = 0; // グリッド線の高さ（Y座標）

                            for (let i = 1; i < divisions; i++) {
                                const t = -half + (squareSize / divisions) * i;

                                // 水平線 (Z方向に平行)
                                const hVertices = new Float32Array([
                                    -half, gridHeight, t,
                                    half, gridHeight, t
                                ]);
                                const hGeometry = new THREE.BufferGeometry();
                                hGeometry.setAttribute("position", new THREE.BufferAttribute(hVertices, 3));
                                scene.add(new THREE.Line(hGeometry, gridMaterial));

                                // 垂直線 (X方向に平行)
                                const vVertices = new Float32Array([
                                    t, gridHeight, -half,
                                    t, gridHeight,  half
                                ]);
                                const vGeometry = new THREE.BufferGeometry();
                                vGeometry.setAttribute("position", new THREE.BufferAttribute(vVertices, 3));
                                scene.add(new THREE.Line(vGeometry, gridMaterial));
                            }
                        });

                        let lastLabelUpdate = 0;

                        let lastCamZoom;

                        let lastIsShow2DMap;
                        // パン操作時にモデルから離れすぎないように制限
                        maps_controls.addEventListener("change", () => {
                            if (
                                Array.from(sortList_tabs.children).findIndex(child => child.classList.contains("selected")) !== 1 ||
                                !exhibitsBottomBar.classList.contains("opened")
                            ) return;
                            const now = Date.now();

                            maps_camera.zoom = THREE.MathUtils.clamp(maps_camera.zoom, .2, 5);
                            maps_camera.updateProjectionMatrix();

                            (() => {
                                const targetOffset = maps_controls.target.clone();
                                const distance = targetOffset.length();
                                maps_controls.panSpeed = Math.max(
                                    Math.min(panLimit - distance, 1),
                                    0.25
                                );

                                // 円形の制限: 距離が panLimit を超えた場合のみスケーリング
                                if (distance > panLimit) {
                                    const scale = panLimit / distance;
                                    cameraPan({
                                        x: targetOffset.x * scale,
                                        z: targetOffset.z * scale,
                                        duration: 0
                                    });
                                }
                            })();

                            // カメラの前方向ベクトルを取得
                            const cameraDirection = new THREE.Vector3();
                            maps_camera.getWorldDirection(cameraDirection);

                            const radToDeg = 180 / Math.PI;

                            // 横方向の角度（北=+Z, 東=+X と仮定）
                            camHorizontal = Math.atan2(cameraDirection.x, cameraDirection.z) * radToDeg + 180;

                            // 縦方向の角度（水平=0, 上=+90, 下=-90）
                            camVertical = Math.asin(cameraDirection.y) * -radToDeg;

                            // コンパスを回転
                            const compassRotate = `rotate(${camHorizontal}deg)`;
                            if (compassImg.style.transform !== compassRotate) compassImg.style.transform = compassRotate;

                            const camPos = maps_camera.position;
                            mapsView.style.setProperty("--camPosX", camPos.x);
                            mapsView.style.setProperty("--camPosZ", camPos.z);
                            mapsView.style.setProperty("--camZoom", maps_camera.zoom);

                            if (
                                (now - lastLabelUpdate > labelAnimUpdateThresholdMs * 10) ||
                                lastCamZoom !== maps_camera.zoom
                            ) {
                                lastLabelUpdate = now;
                                updateLabelOpacity();

                                const button_dimension_text = isShow2DMap ? "3D" : "2D";
                                if (lastIsShow2DMap !== isShow2DMap) updateButtonText(button_dimension, button_dimension_text);

                                lastIsShow2DMap = isShow2DMap;
                            }
                            lastCamZoom = maps_camera.zoom;
                        });
                        if (loaded) loaded();
                    },
                    (xhr) => {
                        const loadPercentage = xhr.loaded / xhr.total * 100
                        // if (loadPercentage === 100) console.log("3DModel", loadPercentage + "% loaded");
                    },
                    (error) => {
                        console.error("モデル読み込みエラー", error);
                    }
                );
            };
            setTimeout(loadScModel, 1475);

            const labelAnimUpdateThresholdMs = 15;

            let barTopMargin;

            function windowResize() {
                barTopMargin = (
                    parseFloat(getComputedStyle(mapsView).getPropertyValue("--topBarsHeight")) +
                    parseFloat(getComputedStyle(mapsView).getPropertyValue("--tabsHeight"))
                );

                const aspect = mapsView.clientWidth / mapsView.clientHeight;

                if (maps_camera) {
                    maps_camera.left   = -maps_cameraSize * aspect;
                    maps_camera.right  = maps_cameraSize * aspect;
                    maps_camera.top    = maps_cameraSize + barTopMargin / mapsView.clientHeight * maps_cameraSize * 2; // topMarginをカメラの高さに換算
                    maps_camera.bottom = -maps_cameraSize;
                    maps_camera.updateProjectionMatrix();
                }

                if (maps_renderer) {
                    maps_renderer.domElement.style.top = `${barTopMargin * -1}px`;
                    maps_renderer.setSize(mapsView.clientWidth, mapsView.clientHeight + barTopMargin);
                }
                if (maps_labelRenderer) maps_labelRenderer.setSize(mapsView.clientWidth, mapsView.clientHeight + barTopMargin);
                if (maps_labelsArea) maps_labelsArea.style.top = 0;

                barHeightUpdate();
            }

            windowResize();
            window.addEventListener("resize", windowResize);

            function setEdgeStyle(mesh, {
                color = "lightgray",
                opacity = 1,
                duration = 0.5
            } = {}) {
                if (mesh.userData.edgeLine) {
                    const edgeMat = mesh.userData.edgeLine.material;
                    mesh.userData.edgeLine.visible = opacity !== 0;
                    gsap.to(edgeMat.color, {
                        r: new THREE.Color(color).r,
                        g: new THREE.Color(color).g,
                        b: new THREE.Color(color).b,
                        duration: duration,
                        ease: "power2.inOut",
                    });
                    gsap.to(edgeMat, {
                        opacity: opacity,
                        duration: duration,
                        ease: "power2.inOut",
                    });
                }
            }

            function controlMethodUpdate(options = {}) {
                const {
                    touches = {
                        ONE: THREE?.TOUCH?.ROTATE,
                        TWO: THREE?.TOUCH?.DOLLY_PAN
                    },
                    mouseButtons = {
                        LEFT: THREE?.MOUSE?.ROTATE,
                        MIDDLE: THREE?.MOUSE?.PAN,
                        RIGHT: THREE?.MOUSE?.NONE
                    }
                } = options;

                if (maps_controls) {
                    maps_controls.touches = touches;
                    maps_controls.mouseButtons = mouseButtons;
                }
            }

            controlMethodUpdate();

            function setCamAngleLimit(min = 0, max = 85) {
                maps_controls.minPolarAngle = THREE.MathUtils.degToRad(min);
                maps_controls.maxPolarAngle = THREE.MathUtils.degToRad(max);
                if (isShow2DMap) {
                    maps_controls.minAzimuthAngle = 0;
                } else {
                    maps_controls.minAzimuthAngle = -Infinity;
                    maps_controls.maxAzimuthAngle = Infinity;
                }
            }
            if (maps_controls) {
                maps_controls.minDistance = 2;
                maps_controls.maxDistance = 10;
                setCamAngleLimit();
            }

            function updateCameraAngle({
                horizontal = 0,
                vertical = 45,
                duration = 1,
                onComplete: finish
            } = {}) {
                // 回転禁止＆慣性無効化
                let prevDamping;
                setTimeout(() => {
                    maps_controls.enableRotate = false;
                    prevDamping = maps_controls.enableDamping;
                    maps_controls.enableDamping = false;
                }, duration);

                const start = { h: camHorizontal, v: camVertical };
                const target = {
                    h: horizontal !== undefined ? horizontal : camHorizontal,
                    v: vertical !== undefined ? vertical : camVertical
                };

                function updateAngle() {
                    camHorizontal = start.h;
                    camVertical = start.v;

                    const distance = maps_camera.position.distanceTo(maps_controls.target);
                    const spherical = new THREE.Spherical(
                        distance,
                        THREE.MathUtils.degToRad(90 - camVertical),
                        THREE.MathUtils.degToRad(camHorizontal)
                    );
                    const offset = new THREE.Vector3().setFromSpherical(spherical);

                    maps_camera.position.copy(maps_controls.target.clone().add(offset));
                    maps_controls.update();
                }

                function onComplete() {
                    // 回転と慣性を元に戻す
                    maps_controls.enableRotate = !isShow2DMap;
                    maps_controls.enableDamping = prevDamping;
                    if (finish) finish();
                    maps_controls.update();
                }

                if (duration === 0 || !gsap || typeof gsap === "undefined") {
                    start.h = target.h;
                    start.v = target.v;
                    updateAngle();
                    onComplete();
                    return;
                }

                let deltaH = ((target.h - start.h + 180) % 360) - 180;
                gsap.to(start, {
                    h: start.h + deltaH,
                    v: target.v,
                    duration: duration,
                    ease: "power2.inOut",
                    onUpdate: updateAngle,
                    onComplete: onComplete
                });
            }

            const button_dimension = d.createElement("div");
            button_dimension.className = "dimension button";

            const button_currentPos = d.createElement("div");
            button_currentPos.className = "button";

            const floors = {
                f3: {
                    name: "3"
                },
                f2: {
                    name: "2"
                },
                f1: {
                    name: "1"
                },
            };

            Object.values(floors).slice().reverse().forEach((floor, index) => {
                const button = d.createElement("div");
                
                button.innerHTML = `${floor.name}<span>階</span>`;
                button.setAttribute("floor", Object.keys(floors)[Object.keys(floors).length - index - 1]);
                button.className = "button";

                const bottomStereotypedText = "階を表示中";

                button.addEventListener("click", () => {
                    removeAllLabel();
                    const allButtons = maps_buttons_left.querySelectorAll(".button");

                    const isOnlyValid = !button.classList.contains("invalid") &&
                        [...allButtons].every(b => b === button || b.classList.contains("invalid"));

                    if (isOnlyValid && !isShow2DMap) { // 2Dマップ表示中は全解除しない
                        allButtons.forEach(el => {
                            el.classList.remove("invalid");
                        });
                    } else {
                        allButtons.forEach(el => {
                            el.classList.remove("invalid");
                            if (el !== button) {
                                el.classList.add("invalid");
                            }
                        });
                    }

                    Object.values(maps_modelParts).forEach(part => {
                        const isPartActive = (
                            maps_getFloors(part.name)[0] ?
                            maps_getFloors(part.name).some(floorNum => getActiveFloors().includes(floorNum)) :
                            !( (!isOnlyValid || isShow2DMap) && (
                                part.name.includes("Roof") ||
                                part.name.includes("Curve")
                            ))
                        );

                        if (Array.isArray(part.material)) {
                            part.material = part.material.map(mat => mat.clone());
                            part.material.forEach(mat => {
                                mat.transparent = true;
                                mat.depthWrite = isPartActive;
                            });
                        } else {
                            part.material = part.material.clone();
                            part.material.transparent = true;
                            part.material.depthWrite = isPartActive;
                        }

                        if (part.visible) {
                            gsap.to(part.material, {
                                duration: 0.5,
                                opacity: isPartActive ? 1 : .05,
                                ease: "power2.inOut"
                            });
                            setEdgeStyle(part, {
                                opacity: isPartActive ? 1 : 0
                            });
                        }
                    });

                    // updateBottomText(activeFloors.length === 1 ? activeFloors[0] : null);
                    updateButtonText(top_button, getActiveFloors().length === 1 ? `${getActiveFloors()[0]}${bottomStereotypedText}` : `すべての${bottomStereotypedText}`);
                });
                updateButtonText(top_button, `すべての${bottomStereotypedText}`);

                maps_buttons_left.appendChild(button);
            });

            const getCamHorizontalSnap = (horizontal) => Math.round(Math.round(horizontal / 45) * 45);

            let isMovingCam = false;

            (() => {
                button_dimension.addEventListener("click", () => {
                    if (isMovingCam) return;
                    isShow2DMap = !isShow2DMap;
                    isMovingCam = true;
                    if (isShow2DMap) {
                        button_dimension.classList.add("pushed");
                        updateCameraAngle({
                            horizontal: getCamHorizontalSnap(camHorizontal),
                            vertical: 89.5,
                            onComplete: () => {
                                setCamAngleLimit(0, 0);
                                mapsView.style.pointerEvents = "auto";
                                isMovingCam = false;
                            }
                        });
                        controlMethodUpdate({
                            touches: {
                                ONE: THREE.TOUCH.PAN,
                                TWO: THREE.TOUCH.DOLLY_PAN
                            },
                            mouseButtons: {
                                LEFT: THREE.MOUSE.PAN,
                                MIDDLE: THREE.MOUSE.PAN,
                                RIGHT: THREE.MOUSE.NONE
                            }
                        });
                    } else {
                        button_dimension.classList.remove("pushed");
                        setCamAngleLimit()
                        updateCameraAngle({
                            horizontal: camHorizontal,
                            onComplete: () => {
                                setCamAngleLimit();
                                isMovingCam = false;
                            }
                        });
                        controlMethodUpdate();
                    }
                    if (maps_getIsAllFloorVaild()) pushFloorButton(1);
                });

                updateButtonText(button_currentPos, "現在地");
                let geoWatchId;
                const isGeolocationVaild = "geolocation" in navigator;
                function defaulText () {
                    button_currentPos.classList.remove("opened");
                    updateButtonText(button_currentPos, "現在地");
                }
                function alertText (type = 0) {
                    let text;
                    switch (type) {
                        case 0:
                            text = "位置情報が許可された\n場合に利用できます";
                            break;
                        case 1:
                            text = "学園内にいる場合に\n利用できます";
                            break;
                    }
                    button_currentPos.classList.add("opened");
                    updateButtonText(button_currentPos, text);
                    setTimeout(() => {
                        if (button_currentPos.classList.contains("opened")) defaulText();
                    }, 3000);
                }
                function cansel () {
                    button_currentPos.classList.remove("pushed");
                    currentLocationPointMesh.material.opacity = 0;
                    navigator.geolocation.clearWatch(geoWatchId);
                }
                if (isGeolocationVaild) {
                    button_currentPos.addEventListener("click", () => {
                        button_currentPos.classList.toggle("pushed");
                        if (button_currentPos.classList.contains("pushed")) {
                            const baseLocation = [ // 0, 0, 0に対応する場所
                                35.860550, 139.269142
                            ];

                            function isPointInArea(point, quad = [
                                [35.860508, 139.267363],
                                [35.862815, 139.270346],
                                [35.861254, 139.272300],
                                [35.859430, 139.268763],
                            ]) {
                            // 三角形内判定（バリセンター法）
                                function pointInTriangle(p, a, b, c) {
                                    const det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
                                    const l1 = ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / det;
                                    const l2 = ((c[0] - a[0]) * (p[1] - a[1]) - (c[1] - a[1]) * (p[0] - a[0])) / -det;
                                    const l3 = 1 - l1 - l2;
                                    return l1 >= 0 && l2 >= 0 && l3 >= 0;
                                }
                                // 四角形を2つの三角形に分けて判定
                                return pointInTriangle(point, quad[0], quad[1], quad[2]) || pointInTriangle(point, quad[0], quad[2], quad[3]);
                            }

                            function rotatePointDeg(x, y, angleDeg, cx = 0, cy = 0) {
                                const rad = angleDeg * Math.PI / 180;
                                const c = Math.cos(rad);
                                const s = Math.sin(rad);

                                // 中心を原点に平行移動して回転、戻す
                                const tx = x - cx;
                                const ty = y - cy;
                                const xr = tx * c - ty * s + cx;
                                const yr = tx * s + ty * c + cy;
                                return [xr, yr];
                            }

                            function latlonToXYZ(baseLat, baseLon) {
                                {
                                    const rotated = rotatePointDeg(
                                        baseLocation[0] - baseLat,
                                        baseLocation[1] - baseLon,
                                        44
                                    );
                                    const formated = [
                                        rotated[0] * -10000,
                                        rotated[1] * -10000,
                                    ];

                                    let latRatio = .18;
                                    if (formated[1] > 0) latRatio = .13;
                                    if (formated[1] < -6.5) latRatio = .16;
                                                                
                                    let lonRatio = .07;
                                    if (formated[0] > 2.2) lonRatio = .14;
                                    if (formated[0] < -2.2) lonRatio = .2;

                                    console.log(
                                        formated[0] + " * " + lonRatio + "\n",
                                        formated[1] + " * " + latRatio,
                                    );
                                    
                                    const lat = formated[1] * latRatio;
                                    const lon = formated[0] * lonRatio;

                                    return {
                                        x: lon,
                                        y: 0,
                                        z: lat,
                                    };
                                }

                                {
                                    return;
                                    const mapping = [
                                        [[0, 0, 0],  [35.860563, 139.269066]],
                                        [[1, 0, 0],  [35.860885, 139.268676]],
                                        [[-1, 0, 0], [35.860223, 139.269531]],
                                        [[0, 0, 1],  [35.860821, 139.269523]],
                                        [[0, 0, -1], [35.860181, 139.268701]],
                                    ];

                                    const avgLat = mapping.reduce((sum, m) => sum + m[1][0], 0) / mapping.length;
                                    const avgLon = mapping.reduce((sum, m) => sum + m[1][1], 0) / mapping.length;

                                    const avgX = mapping.reduce((sum, m) => sum + m[0][0], 0) / mapping.length;
                                    const avgZ = mapping.reduce((sum, m) => sum + m[0][2], 0) / mapping.length;

                                    // Δ値を配列化
                                    const deltas = mapping.map(([xyz, latlon]) => ({
                                        dx: xyz[0] - avgX,
                                        dz: xyz[2] - avgZ,
                                        dLat: (latlon[0] - avgLat),
                                        dLon: (latlon[1] - avgLon),
                                    }));

                                    // 緯度と経度の変化に対する3D上のスケールを推定（単純な線形近似）
                                    const latToZ = deltas.reduce((sum, d) => sum + d.dz / d.dLat, 0) / deltas.length;
                                    const lonToX = deltas.reduce((sum, d) => sum + d.dx / d.dLon, 0) / deltas.length;

                                    // 入力緯度経度 → Δ換算
                                    const dLat = baseLat - avgLat;
                                    const dLon = baseLon - avgLon;

                                    // 座標を算出
                                    const x = avgX + dLon * lonToX;
                                    const y = 0;
                                    const z = avgZ + dLat * latToZ;

                                    return { x, y, z };
                                }
                            }

                            function updateMeshPos ( mesh, x, y, z ) {
                                const offset = maps_locations[mesh.name]?.offset;
                                mesh.position.set(
                                    x,
                                    y,
                                    z,
                                );
                                mesh.updateMatrixWorld();
                                const labelObj = maps_labels[mesh.name].object;
                                labelObj.position.copy(mesh.getWorldPosition(new THREE.Vector3()));
                                labelObj.position.x += offset?.x || 0;
                                labelObj.position.y += offset?.y || 0;
                                labelObj.position.z += offset?.z || 0;
                            }

                            if (false) { // debug = true
                                const pos = latlonToXYZ(
                                    35.860700, 139.268795
                                );
                                updateMeshPos(
                                    currentLocationPointMesh,
                                    pos.x,
                                    pos.y,
                                    pos.z,
                                    // 0,
                                    // 0,
                                    // 0,
                                );
                                currentLocationPointMesh.material.opacity = 1;
                            } else {
                                geoWatchId = navigator.geolocation.watchPosition(
                                    (position) => {
                                        const debug = [
                                            35.860847, 139.269506
                                        ];
                                        // const latitude  = debug[0];
                                        // const longitude = debug[1];
                                        const latitude  = position.coords.latitude;
                                        const longitude = position.coords.longitude;

                                        if (latitude && longitude) {
                                            if (isPointInArea([
                                                latitude, longitude
                                            ])) {
                                                const pos = latlonToXYZ(latitude, longitude);
                                                console.log(
                                                    "latlon : ", latitude + ", " + longitude,
                                                    "pos : ", pos
                                                );
                                                updateMeshPos(
                                                    currentLocationPointMesh,
                                                    pos.x,
                                                    pos.y,
                                                    pos.z,
                                                );
                                                currentLocationPointMesh.material.opacity = 1;
                                                defaulText();
                                            } else {
                                                cansel();
                                                alertText(1);
                                            }
                                        } else {
                                            cansel();
                                            alertText(0);
                                        }
                                    }, (error) => {
                                        cansel();
                                        alertText(0);
                                        console.log("Error getting location:", error);
                                    }, {
                                        enableHighAccuracy: true,
                                        timeout: 5000,
                                        maximumAge: 0
                                    }
                                );
                            }
                        } else {
                            cansel();
                        }

                        /* 
                            [[0, 0, 0] , [35.860563, 139.269066]],
                            [[1, 0, 0] , [35.860885, 139.268676]],
                            [[-1, 0, 0], [35.860223, 139.269531]],
                            [[0, 0, 1] , [35.860821, 139.269523]],
                            [[0, 0, -1], [35.860181, 139.268701]],
                            [[1, 0, 1], [35.861312, 139.268994]],
                            [[1, 0, -1], [35.860616, 139.268268]],
                            [[-1, 0, 1], [35.860484, 139.269955]],
                            [[-1, 0, -1], [35.859870, 139.269138]],
                            [[.5, 0, 0], [35.860700, 139.268877]],
                            [[-.5, 0, 0], [35.860403, 139.269322]],
                            [[0, 0, .5], [35.860716, 139.269328]],
                            [[0, 0, -.5], [35.860381, 139.268893]],
                        
                            ___

                            0, 0,  0 : 35.860550, 139.269142
                            1, 0,  0 : 35.860467, 139.269696
                        -1, 0,  0 : 35.860490, 139.268412

                            0, 0,  1 : 35.860096, 139.269190
                            0, 0, -1 : 35.860991, 139.269053

                            ___

                            0, 0,  0 :  0,         0
                            1, 0,  0 : -0.000083,  0.000554
                        -1, 0,  0 : -0.00006,  -0.00073

                            0, 0,  1 : -0.000454,  0.000048
                            0, 0, -1 :  0.000441, -0.000641

                        敷地内 :
                            35.860508, 139.267363
                            35.862815, 139.270346
                            35.861254, 139.272300
                            35.859430, 139.268763
                        */
                    });
                } else {
                    button_currentPos.classList.add("invalid");
                }

                // 不正確なため停止中 ↓
                // maps_buttons_right.appendChild(button_currentPos);
                maps_buttons_right.appendChild(button_dimension);
                maps_buttons_top.appendChild(compass);
            })();

            // mapsView.appendChild(compassBar);
            if (getIsThreePerfection()) {
                mapsView.appendChild(maps_buttons_left);
                mapsView.appendChild(maps_buttons_right);
                mapsView.appendChild(maps_buttons_top);
            } else {
                mapsView.innerHTML = "<p>申し訳ございません｡</p><span>地図の読み込みに失敗しました｡再読み込みを試行してください｡(何度もこのメッセージが表示される場合､ご利用の端末では利用できない可能性があります｡)</span>";
                mapsView.style.pointerEvents = "none";
            }
        })();
    })();

    (() => {
        let touchStartPos = [0, 0];
        let currentPos = [];
        let difference = [0, 0];

        exhibitsBottomBar.style.transition = "opacity .4s ease-in-out";
        let sortListTransition = exhibitsBottomBar.style.transition;
        const getMarginBottomPx = () => (
            window.getComputedStyle(exhibitsBottomBar).height.replace("px", "") * 1
        );
        let touchStart_height = getMarginBottomPx();
        
        sortList_topBar.querySelector("svg path").style.strokeDashoffset = "var(--pathLength)";
        setTimeout(() => {
            sortList_topBar.querySelector("svg path").style.strokeDashoffset = "";
        }, 50);

        let isHolded = false;

        exhibitsBottomBar.addEventListener("touchstart", (e) => {
            exhibitsBottomBar.classList.add("nowBeingHeld");
            exhibitsBottomBar.style.transition = "none";
            difference = [0, 0];
            const touch = e.touches[0];
            touchStartPos = [touch.clientX, touch.clientY];
            touchStart_height = getMarginBottomPx();
            exhibitsBottomBar.classList.remove("reduced");
        });

        exhibitsBottomBar.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            currentPos = [touch.clientX, touch.clientY];
            const holdStartThreshold = 50;
            if (
                Math.abs(touchStartPos[1] - currentPos[1]) > holdStartThreshold &&
                Math.abs(touchStartPos[0] - currentPos[0]) < holdStartThreshold &&
                ([sortList_topBar, ...sortList_tabs.querySelectorAll(".tab")].includes(e.target) || !!exhibitsBottomBar.querySelector(".content > div.nowShow:not(.mapsView)"))
            ) isHolded = true;

            difference = [touchStartPos[0] - currentPos[0], touchStartPos[1] - currentPos[1]];
            const bottomBarHeight = touchStart_height + difference[1] + (difference[1] < 0 ? holdStartThreshold : -holdStartThreshold);
            if (isHolded) {
                exhibitsBottomBar.style.setProperty("--bottomBarHeight", `${bottomBarHeight}px`);
            }
        });

        barHeightUpdate(false);

        let lastTouchendTime = Date.now();

        function barTransitionUpdate () {
            exhibitsBottomBar.style.transition = `${sortListTransition === "" || sortListTransition === "none" ? "" : `${sortListTransition}, `}height .4s ease-out, width .4s ease-out, padding .5s ease-in-out`;
        }
        barTransitionUpdate();

        function touchend (e) {
            exhibitsBottomBar.classList.remove("nowBeingHeld");
            if (Date.now() - lastTouchendTime < (
                Math.min( Math.max(50, Math.max(1000 - window.innerWidth, 0) * .1), 200 )
            )) return;
            barTransitionUpdate();
            const isNowOpen = exhibitsBottomBar.classList.contains("opened");
            if (Math.abs(difference[1]) !== 0 || e?.target === sortList_topBar) {
                if (e?.target === sortList_topBar && Math.abs(difference[1]) === 0) { // topBarTap
                    e.preventDefault();
                    e.stopPropagation();
                    barHeightUpdate(!isNowOpen);
                } else if (isHolded) { // swipe
                    const threshold = 100;
                    barHeightUpdate(isNowOpen ? difference[1] * -1 < threshold : difference[1] > threshold);
                }
            }
            isHolded = false;
            lastTouchendTime = Date.now();
        }
        exhibitsBottomBar.addEventListener("mouseup",  e => {
            difference = [0, 0];
            touchStart_height = getMarginBottomPx();
            touchend(e);
        });
        exhibitsBottomBar.addEventListener("touchend", e => touchend(e));
    })();


    let lastScrollTime = Date.now();
    let lastScrollPx;

    window.addEventListener("scroll", () => { // sortListAreaHeight
        if (d.documentElement.scrollHeight < window.innerHeight + window.scrollY + 100) {
            exhibitsBottomBar.style.opacity = 0;
            exhibitsBottomBar.style.pointerEvents = "none";
        } else {
            exhibitsBottomBar.style.opacity = 1;
            exhibitsBottomBar.style.pointerEvents = "auto";
        }

        // if (Math.abs(lastScrollPx - window.scrollY) > 200) marginBottomUpdate(false);
        if (Date.now() - lastScrollTime > 20) lastScrollPx = window.scrollY;
        lastScrollTime = Date.now();
    });

    (() => {
        const element = exhibitsBottomBar.querySelector(".tags.listView");
        function process () {
            exhibitsBottomBar.classList.remove("reduced");
        }
        element.addEventListener("click", process);
    })();

    console.log("exhibits : ", exhibits);
    console.log("maps_locations : ", maps_locations);
    function jsonTestDev () {

        const dataStr = `飲食,PROBUX,ながはしまお,いわただいじゅ,理科B,10:20,~,16:00,,10:00,~,15:00,プロテイン
展示・物販,とってもおもしろいこと,さかいももも,西牟田,理科中庭,11:00,~,16:00,,11:00,~,15:00,"•ステージ制 作•写真展示•Zine 服の販売"
発表,MC BATTLE,せきぐちいたる,確認中,,,~,,,15:00,~,16:00,正面玄関でラップ
発表,軽音ライブ,たかだなおき,平松はるか,,13:30,~,15:50,,,~,,正面発表
物販,射的,ささきちひろ,樋口,体育館横,10:40,~,16:00,,10:20,~,15:00,射的お菓子販売
物販,飛行機ワークショップ,首籐大輔,かわかみふみや,人力飛行機小屋,10:30,~,16:00,,10:20,~,15:00,ワークショップ
物販,昇天商店,やのはるか,宇都宮,横倉庫,,~,,,10:00,~,15:00,過疎コンビニ風物販•絵
物販,はじめの手作りshop,あおきはじめ,いけのやかな,壁画前,10:20,~,16:00,,10:00,~,15:00,はじめの手作り売る
アトラクション・展示,鉄研 5インチ,はやしかなと,みやわき,理科中庭､  第二音楽室,10:20,~,16:00,,10:00,~,15:00,鉄道走らせる､プラレールの展示
物販,#snap now,おおたなつめ,宮下,体育館前,10:30,~,16:00,,10:00,~,15:00,証明写真チェキ売る
物販,ゆうとさらの占い,かわさきゆう,長沢,壁画前,11:00,~,16:00,,,~,,占い
飲食,コーヒーカルチャ,うちだはる,近藤ひらく,理科室中庭,10:20,~,16:00,,10:00,~,15:00,コーヒーとDJ
発表,土曜ダンス,おおたけさくら,宮内まゆみ,,10:30,~,10:35,,,~,,正面発表
発表,ダンス部AMAZE,おおたけさくら,宮内まゆみ,,11:00,~,11:10,,,~,,正面発表
アトラクション,自森謎解き,まつもとゆうき,まつもとだいち,正面玄関,10:20,~,16:00,,10:00,~,15:00,全校舎を使い謎解きをさせる
飲食・展示,BLUE PEYOUNG,なかやまたいすけ,はらちひろ,理科Ｄ,10:20,~,16:00,,10:00,~,15:00,ペヤングドリンク販売
飲食・アトラクション,スケートドリンク,なかのりおん,長沢,スケボー場,10:30,~,15:50,,10:00,~,15:00,ドリンク販売•スケボー体験
展示,特撮映画上映,H1 バルデリアレックス,むぎ,小音,10:40,~,16:00,,,~,,自作映画上映
物販,宮田の即売会,宮田りゅうせい,りま,正面玄関,10:20,~,15:00,,13:00,~,15:00,絵を売る
物販,猫部のお店,たてのそら,吉岡ひでみ,多目的前廊下,10:20,~,16:00,,10:00,~,15:00,猫の物の販売
その他,ネパール募金,かなざわつむぎ,樋口,美術棟横,10:20,~,16:00,,10:00,~,15:00,ネパール孤児院募金
飲食,ホストクラブ,てつま,平松はるか,確認中,10:20,~,16:00,,10:00,~,15:00,ホスト
展示,ダンボール武器庫,ツッキーれおん,むぎ,壁画前,10:20,~,16:00,,10:20,~,15:00,展示
物販,ぼたんやさん,はぎわらさとみ,玉木しの,体育館前,,~,,,10:00,~,15:00,ボタンを売る
その他,わらしべ長者,マコーミックあまね,木下かい,多目的前廊下,10:30,~,15:30,,10:30,~,14:30,物々交換させるいわゆるわらしべ長者を目指す
発表,中民郷学園祭公演,まつもとしお,むらやまみどり,,,~,,,10:00,~,13:00,正面発表
展示,私学助成,しまおかこたろう,藤原,正面玄関,10:20,~,16:00,,10:00,~,15:00,私学助成に関する展示•署名
その他,paparazzi,なっつ,福島,暗室,10:20,~,16:00,,10:00,~,15:00,写真撮る
物販,you may hena,しまざきよう,岩下さら,体育館前,10:20,~,16:00,,10:00,~,15:00,ヘナ•プラ板
物販,さわとなぎの雑貨,いわかわなぎ,吉岡ひでみ,美術棟横,10:20,~,16:00,,10:00,~,15:00,可愛い雑貨売る
展示,もののけ,くぼみおう,かわかみふみや,階段下,10:20,~,16:00,,10:00,~,15:00,展示•ダンス
物販,115,こいぬまつぬぎ,奥村,音研前廊下,13:00,~,15:40,,13:00,~,15:00,雑貨
発表,サンバ,おかのかんた,林,,,~,,,14:30,~,15:00,正面発表
物販,ちゅきちゅき月寮,H2 國方にこ,福島,壁画前,10:20,~,15:00,,10:00,~,14:00,雑誌ブロマイド販売
展示,北寮Movie,ほしやまこじろう,ゆうだい,理科c,10:30,~,16:00,,10:00,~,15:00,映画上映
物販,星寮有志,いわたななみ,にわさん,理科a,10:20,~,16:00,,10:00,~,15:00,雑誌､ big love
展示,サステナ委員会,かないこはる,健一,事務局前,10:20,~,16:00,,10:00,~,15:00,天ぷら娜節電などの展示回収•アンケート
物販,ガラス細工部,ちはな,はらちひろ,階段下,10:20,~,16:00,,10:00,~,15:00,ガラス売る
展示,イラストマンガ部,なかむらゆみこ,高橋まき,大音前廊下,11:00,~,16:00,,11:00,~,15:00,イラストマンガ部の展示物販
展示,自森のあるある展,もりみずき,原裕子,階段,10:20,~,16:00,,10:00,~,15:00,展示
展示,Button,ありばひなこ,平松はるか,壁画前,10:20,~,16:00,,10:00,~,15:00,展示•絵ボタンを置く
その他,スマブラしようぜ!,あさかわたすく,いけのやかな,美術棟,10:20,~,16:00,,10:00,~,15:00,スマブラする
その他,お着替え 4コマ,いまいゆな,ふじわら,壁画前,11:00,~,16:00,,10:30,~,15:00,プリクラ兼古着屋
アトラクション,盗,もりしゅんたろう,沼,,10:20,~,16:00,,10:00,~,15:00,音を立てずに物を撮れたら景品プレゼント
飲食,珈琲渡時,むらやまげんこう,肥沼健一,横倉庫,10:20,~,16:00,,10:00,~,13:00,コーヒー
物販,星うさぎの贈り物,なかむらるあん,林,高一中庭,11:00,~,16:00,,,~,,雑貨を売る   ヘアピンイヤリングなど
飲食,WAKUWAKU,えいざん,鈴木さん,階段前,10:20,~,16:00,,10:00,~,14:00,瓶コーラを売る•似顔絵
その他,東寮,さくらだはるき,薮内,正面,10:20,~,16:00,,10:00,~,15:00,どうあげ
飲食,タコス,たいち,渡辺,木工室横,10:20,~,16:00,,11:00,~,15:00,タコス
飲食・物販,Malasada,しの,沖山,体育館前,10:20,~,16:00,,10:00,~,15:00,マラサダ､  ミサンガの販売
飲食,るきっさ,,沼,壁画前,10:20,~,16:00,,10:00,~,15:00,喫茶店兼カジノ
飲食,Fly yum,たなかめい,玉木,木工室横,11:30,~,16:00,,,~,,フライドオレ オ､  クッキーを売る
飲食,Bloom sweets,さいとうなつは,後藤,理科室中庭,,~,,,10:00,~,15:00,マフィンドーナツ売る
飲食,coco fofo,たがことみ,師岡,体育館前,10:20,~,16:00,,10:00,~,15:00,ドリトスチップスの加工品を売る
飲食,魔女のなぞやきそば,おおたけさくら,藤原,壁画前,,~,,,11:00,~,14:30,焼きそば売る
飲食,ガンガンハオ,えりはるり,むらやまみどり,体育館前,10:20,~,16:00,,,~,,台湾のうまそうなもの売る
飲食,ケバ部,あずまけいと,はらちひろ,スケボー場,10:20,~,16:00,,10:00,~,15:00,ケバブ
飲食,リトルクローバー,むらやまこと,畑佐,階段,13:00,~,16:00,,11:00,~,15:00,クッキーや編み物の販売
飲食,Chai wari,おぐらりん,岡田,理科中庭,,~,,,10:00,~,15:00,チャイ焼き芋売る
アトラクション,暗闇迷路,ふくむらすみれはやかわきょう,渡部,,10:20,~,16:00,,10:00,~,15:00,真っ暗闇の迷路
アトラクション,脱出の森,もりもとゆの,志賀,,10:20,~,16:00,,10:00,~,15:00,お化け屋敷兼脱出ゲーム
アトラクション,4DX,さいとう,健一,,10:20,~,16:00,,10:00,~,15:00,"自主制作映画を見せる4DX"
アトラクション,3番出口,かわさきそうた,康,,10:20,~,16:00,,10:00,~,15:00,間違い探し
物販・飲食,小岩井サービスエリア,いとうねいろ,まゆみ,,10:20,~,16:00,,10:00,~,15:00,教室をＳＡに見立てて駐車場､お店ゲームコーナーを作る
アトラクション,サスケッチ,しもべっぷたいち,かわかみふみや,,10:20,~,16:00,,10:00,~,15:00,サスケアスレチックを作る
アトラクション,煌めきの宇宙探査,かねいわか,服部,,10:20,~,16:00,,10:00,~,15:00,プラネタリウムの中でトロッコを走らせる
アトラクション,沈むなタイタニック号,うちだのの,沖山,中学中庭,10:20,~,16:00,,10:00,~,15:00,中庭に4人乗りバイキングを作る｡  クラスにはパン屋とカジノも作る
飲食・物販・その他,指名手配犯ごっこ,わたなべりゅうのすけ,畑佐,,10:20,~,16:00,,10:00,~,15:00,学校内に散らばる指名手配班を探す
飲食,じも天堂,まきそら,林,,10:20,~,16:00,,10:00,~,15:00,駄菓子屋
アトラクション,MISSION IMPOSSIBLE FIRST MISSION,やまぐちりお,福島,,10:20,~,16:00,,10:00,~,15:00,ミッションインポッシブルのオマージュ
飲食・物販,喫煙所(禁煙),矢生,てつひさ,,10:20,~,16:00,,10:00,~,15:00,休憩所   キャストもいて物を買ってもらう
飲食・物販・展示,海ん家in Hawaii,さいとうこころ,西牟田,,10:50,~,16:00,,10:30,~,14:00,海と飲食店作る
アトラクション,月の消えた町,やましたゆうき,こんどうひらく,,10:20,~,16:00,,10:00,~,15:00,教室を暗くして目以外の五感で出口へ向かう
アトラクション,自森坂の上のポニョ,ほんださわ,よしおか,,10:20,~,16:00,,10:00,~,15:00,アトラクション
飲食・物販,自森横丁,たぐちあおの,しょうじょう,,10:20,~,16:00,,10:00,~,15:00,"室内屋台､  駄菓子屋   万引きをしても良い？？？"
飲食・アトラクション,お化け屋敷,ひうらじょうたろう,みやしたまゆこ,,10:20,~,16:00,,10:00,~,15:00,調節驚かさないお化け屋敷
物販・飲食・展示,出流原,しみずこはな,おくむら,,10:20,~,16:00,,10:00,~,15:00,"射的や駄菓子屋と妖怪と村人が巻き込まれ､  ､  ？イベントの発生"
アトラクション,ベイカリーマックス,のむらにこ,内田かずき,,10:20,~,16:00,,10:00,~,15:00,コーヒーカップに人を乗せてトークする
アトラクション,SHLooN,なかやまたいすけ,まつもとだいち,,10:20,~,16:00,,10:00,~,15:00,ウエスタン風のバー｡  ビリヤード
アトラクション,スペースローラーコースター,ちばこたろう,りま,,10:20,~,16:00,,10:00,~,15:00,ジェットコースター｡  とろっ こ｡  木で作る
アトラクション,トイマニ6,きたはらかえ,いしいまさと,,10:20,~,16:00,,10:00,~,15:00,トイストーリーのトロッコに乗ってマトにボールを当てるアトラクション｡
物販・アトラクション,夢を叶えて！たいやきくん,いまいゆな,宇都宮,,10:20,~,16:00,,10:00,~,15:00,"トロッコに乗る｡  釣りをしてたい焼きをゲットできる｡  およげ!たいやきくんになれる｡"
その他,神社,いとうすみ,しょうどくん,,10:20,~,16:00,,10:00,~,15:00,フォトスッポットと休憩スペースを作る｡
展示,字森,かなざわつむぎ,いわしたさら,,10:20,~,16:00,,10:00,~,15:00,習字の展示と体験スペース｡
展示,三組万博,わたなべたいち,ごとうみき,,10:20,~,16:00,,10:00,~,15:00,てんじ｡
その他,ウマ息子~プリティダービー,おかのかんた,長沢,,10:20,~,16:00,,10:00,~,15:00,馬が死ぬ気でレース｡  言ってしまえば競馬｡
アトラクション,ネットリネット,ういあまな,師岡,ビオトープ前の草木生い茂りのところへ｡  教室も使う｡,10:20,~,16:00,,10:00,~,15:00,木と木の間にネットを貼る｡
アトラクション,お化け屋敷,たけだゆうすけ,ゆうだい,,10:20,~,16:00,,10:00,~,15:00,お化け屋敷
その他,ウォーリーを探せ,,はらゆうこ,,10:20,~,16:00,,10:00,~,15:00,お客さんに七組ウォーリーを探してもらう｡`;


        const datas = dataStr.split("\n");
        datas.forEach((dataItem, i) => {
            const items = dataItem.split(",");
            const dataJson = {
                name: items[1],
                activitys: {
                    d1: [items[5], items[7]],
                    d2: [items[9], items[11]],
                },
                tag: items[0].split("・").map(tagNameItem => (
                    Object.keys(tagOrder)[Object.values(tagOrder).findIndex(tagItem => tagNameItem === tagItem.displayName)] || ""
                )),
            };

            const targetExhibit = Object.values(exhibits).find(exhibitItem => exhibitItem.name === dataJson.name);
            if (targetExhibit) console.log(
                targetExhibit.tag.join("\n"),
                "\n_\n" + dataJson.tag.join("\n"),
            );
            // console.log(
            //     dataJson.tag.filter(item => !targetExhibit?.tag.includes(item))
            // );
        });

    }
    // if (isDevMode) setTimeout(() => {
    //     jsonTestDev();
    // }, 100);
    /* 
const timeoutMs = 3000;
d.querySelectorAll("body > div.main.content > div.exhibits > div.list > div.tile > div.location.button").forEach((el, i) => {
    setTimeout(() => {
        el.click();
        setTimeout(() => {
            d.querySelector("body > div.main.content > div.exhibits > div.tile.sortList.exhibitsBottomBar div.labelsArea > div > div").click();
        }, timeoutMs / 2);
    }, i * timeoutMs);
});
    */
}

(async () => { // import (fallback付き)
    try {
        // 通常のCDN
        // throw new Error("TestErr");
        THREE = await import("https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js");
        GLTFLoader = (await import("https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/GLTFLoader.js")).GLTFLoader;
        OrbitControls = (await import("https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/OrbitControls.js")).OrbitControls;
        BufferGeometryUtils = await import("https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/utils/BufferGeometryUtils.js");
        ({ CSS2DRenderer, CSS2DObject } = await import("https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/renderers/CSS2DRenderer.js"));
    } catch (e) {
        console.warn("CDN読み込みに失敗しました。", e);
        cdnCompleted();
    }
    console.log("THREE完了");
    cdnCompleted();
    // ここからTHREE系を使用したコードを実行
})();
