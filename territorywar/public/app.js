var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Events = Matter.Events,
    Detector = Matter.Detector,
    Vector = Matter.Vector;

var engine = Engine.create({
    gravity: {
        x: 0,
        y: 0
    }
});

engine.positionIterations = 20
engine.velocityIterations = 20
Engine.update(engine, 1)

var render = Render.create({
    element: document.getElementById("canvasContainer"),
    engine: engine,
    canvas: document.getElementById("canvas"),
    options: {
        width:1080,
        height:1284,
        wireframes:false,
        background: '#000000'
    }
});

let baseSpeed = 0.5;
let maxSpeed = 15;
let ballSize = 50;

let team1Color = '#2465D3';
let team1Bg = '#2E6DDC';
let team2Color = '#DD2020';
let team2Bg = '#E33B3B';
let team4Color = '#5ADD40';
let team4Bg = '#69E052';
let team5Color = '#B72CDD';
let team5Bg = '#BD3EE0';

let borderColor = "#999999";

let lastGift = 0;

var words = [
"ability",
"able",
"about",
"above",
"accept",
"according",
"account",
"across",
"act",
"action",
"activity",
"actually",
"add",
"address",
"admit",
"adult",
"affect",
"after",
"again",
"against",
"age",
"agency",
"agent",
"ago",
"agree",
"agreement",
"ahead",
"air",
"all",
"allow",
"almost",
"alone",
"along",
"already",
"also",
"although",
"always",
"American",
"among",
"amount",
"analysis",
"and",
"animal",
"another",
"answer",
"any",
"anyone",
"anything",
"appear",
"apply",
"approach",
"area",
"argue",
"arm",
"around",
"arrive",
"art",
"article",
"artist",
"as",
"ask",
"assume",
"at",
"attack",
"attention",
"attorney",
"audience",
"author",
"authority",
"available",
"avoid",
"away",
"baby",
"back",
"bad",
"bag",
"ball",
"bank",
"bar",
"base",
"be",
"beat",
"beautiful",
"because",
"become",
"bed",
"before",
"begin",
"behavior",
"behind",
"believe",
"benefit",
"best",
"better",
"between",
"beyond",
"big",
"bill",
"billion",
"bit",
"black",
"blood",
"blue",
"board",
"body",
"book",
"born",
"both",
"box",
"boy",
"break",
"bring",
"brother",
"budget",
"build",
"building",
"business",
"but",
"buy",
"by",
"call",
"camera",
"campaign",
"can",
"cancer",
"candidate",
"capital",
"car",
"card",
"care",
"career",
"carry",
"case",
"catch",
"cause",
"cell",
"center",
"central",
"century",
"certain",
"certainly",
"chair",
"challenge",
"chance",
"change",
"character",
"charge",
"check",
"child",
"choice",
"choose",
"church",
"citizen",
"city",
"civil",
"claim",
"class",
"clear",
"clearly",
"close",
"coach",
"cold",
"collection",
"college",
"color",
"come",
"commercial",
"common",
"community",
"company",
"compare",
"computer",
"concern",
"condition",
"conference",
"Congress",
"consider",
"consumer",
"contain",
"continue",
"control",
"cost",
"could",
"country",
"couple",
"course",
"court",
"cover",
"create",
"crime",
"cultural",
"culture",
"cup",
"current",
"customer",
"cut",
"dark",
"data",
"daughter",
"day",
"dead",
"deal",
"death",
"debate",
"decade",
"decide",
"decision",
"deep",
"defense",
"degree",
"Democrat",
"democratic",
"describe",
"design",
"despite",
"detail",
"determine",
"develop",
"development",
"die",
"difference",
"different",
"difficult",
"dinner",
"direction",
"director",
"discover",
"discuss",
"discussion",
"disease",
"do",
"doctor",
"dog",
"door",
"down",
"draw",
"dream",
"drive",
"drop",
"drug",
"during",
"each",
"early",
"east",
"easy",
"eat",
"economic",
"economy",
"edge",
"education",
"effect",
"effort",
"eight",
"either",
"election",
"else",
"employee",
"end",
"energy",
"enjoy",
"enough",
"enter",
"entire",
"environment",
"especially",
"establish",
"even",
"evening",
"event",
"ever",
"every",
"everybody",
"everyone",
"everything",
"evidence",
"exactly",
"example",
"executive",
"exist",
"expect",
"experience",
"expert",
"explain",
"eye",
"face",
"fact",
"factor",
"fail",
"fall",
"family",
"far",
"fast",
"father",
"fear",
"federal",
"feel",
"feeling",
"few",
"field",
"fight",
"figure",
"fill",
"film",
"final",
"finally",
"financial",
"find",
"fine",
"finger",
"finish",
"fire",
"firm",
"first",
"fish",
"five",
"floor",
"fly",
"focus",
"follow",
"food",
"foot",
"for",
"force",
"foreign",
"forget",
"form",
"former",
"forward",
"four",
"free",
"friend",
"from",
"front",
"full",
"fund",
"future",
"game",
"garden",
"gas",
"general",
"generation",
"get",
"girl",
"give",
"glass",
"go",
"goal",
"good",
"government",
"great",
"green",
"ground",
"group",
"grow",
"growth",
"guess",
"gun",
"guy",
"hair",
"half",
"hand",
"hang",
"happen",
"happy",
"hard",
"have",
"he",
"head",
"health",
"hear",
"heart",
"heat",
"heavy",
"help",
"her",
"here",
"herself",
"high",
"him",
"himself",
"his",
"history",
"hit",
"hold",
"home",
"hope",
"hospital",
"hot",
"hotel",
"hour",
"house",
"how",
"however",
"huge",
"human",
"hundred",
"husband",
"I",
"idea",
"identify",
"if",
"image",
"imagine",
"impact",
"important",
"improve",
"in",
"include",
"including",
"increase",
"indeed",
"indicate",
"individual",
"industry",
"information",
"inside",
"instead",
"institution",
"interest",
"interesting",
"interview",
"into",
"investment",
"involve",
"issue",
"it",
"item",
"its",
"itself",
"job",
"join",
"just",
"keep",
"key",
"kid",
"kill",
"kind",
"kitchen",
"know",
"knowledge",
"land",
"language",
"large",
"last",
"late",
"later",
"laugh",
"law",
"lawyer",
"lay",
"lead",
"leader",
"learn",
"least",
"leave",
"left",
"leg",
"legal",
"less",
"let",
"letter",
"level",
"lie",
"life",
"light",
"like",
"likely",
"line",
"list",
"listen",
"little",
"live",
"local",
"long",
"look",
"lose",
"loss",
"lot",
"love",
"low",
"machine",
"magazine",
"main",
"maintain",
"major",
"majority",
"make",
"man",
"manage",
"management",
"manager",
"many",
"market",
"marriage",
"material",
"matter",
"may",
"maybe",
"me",
"mean",
"measure",
"media",
"medical",
"meet",
"meeting",
"member",
"memory",
"mention",
"message",
"method",
"middle",
"might",
"military",
"million",
"mind",
"minute",
"miss",
"mission",
"model",
"modern",
"moment",
"money",
"month",
"more",
"morning",
"most",
"mother",
"mouth",
"move",
"movement",
"movie",
"Mr",
"Mrs",
"much",
"music",
"must",
"my",
"myself",
"name",
"nation",
"national",
"natural",
"nature",
"near",
"nearly",
"necessary",
"need",
"network",
"never",
"new",
"news",
"newspaper",
"next",
"nice",
"night",
"no",
"none",
"nor",
"north",
"not",
"note",
"nothing",
"notice",
"now",
"n't",
"number",
"occur",
"of",
"off",
"offer",
"office",
"officer",
"official",
"often",
"oh",
"oil",
"ok",
"old",
"on",
"once",
"one",
"only",
"onto",
"open",
"operation",
"opportunity",
"option",
"or",
"order",
"other",
"others",
"our",
"out",
"outside",
"over",
"own",
"owner",
"page",
"pain",
"painting",
"paper",
"parent",
"part",
"participant",
"particular",
"partner",
"party",
"pass",
"past",
"patient",
"pattern",
"pay",
"peace",
"people",
"per",
"perform",
"performance",
"perhaps",
"period",
"person",
"personal",
"phone",
"physical",
"pick",
"picture",
"piece",
"place",
"plan",
"plant",
"play",
"player",
"PM",
"point",
"police",
"policy",
"political",
"politics",
"poor",
"popular",
"population",
"position",
"positive",
"possible",
"power",
"practice",
"prepare",
"present",
"president",
"pressure",
"pretty",
"prevent",
"price",
"private",
"probably",
"problem",
"process",
"produce",
"product",
"production",
"professor",
"program",
"project",
"property",
"protect",
"prove",
"provide",
"public",
"pull",
"purpose",
"push",
"put",
"quality",
"question",
"quickly",
"quite",
"race",
"radio",
"raise",
"range",
"rate",
"rather",
"reach",
"read",
"ready",
"real",
"reality",
"realize",
"really",
"reason",
"receive",
"recent",
"recently",
"recognize",
"record",
"red",
"reduce",
"reflect",
"region",
"relate",
"religious",
"remain",
"remember",
"remove",
"report",
"represent",
"Republican",
"require",
"research",
"resource",
"respond",
"response",
"rest",
"result",
"return",
"reveal",
"rich",
"right",
"rise",
"risk",
"road",
"rock",
"role",
"room",
"rule",
"run",
"safe",
"same",
"save",
"say",
"scene",
"school",
"science",
"scientist",
"score",
"sea",
"season",
"seat",
"second",
"section",
"security",
"see",
"seek",
"seem",
"sell",
"send",
"senior",
"sense",
"series",
"serious",
"serve",
"service",
"set",
"seven",
"several",
"sex",
"sexual",
"shake",
"share",
"she",
"shoot",
"short",
"shot",
"should",
"shoulder",
"show",
"side",
"sign",
"significant",
"similar",
"simple",
"simply",
"since",
"sing",
"single",
"sister",
"sit",
"site",
"situation",
"six",
"size",
"skill",
"skin",
"small",
"smile",
"so",
"social",
"society",
"soldier",
"some",
"somebody",
"someone",
"something",
"sometimes",
"son",
"song",
"soon",
"sort",
"sound",
"source",
"south",
"southern",
"space",
"speak",
"special",
"specific",
"speech",
"spend",
"sport",
"spring",
"staff",
"stage",
"stand",
"standard",
"star",
"start",
"state",
"statement",
"station",
"stay",
"step",
"still",
"stock",
"stop",
"store",
"story",
"strategy",
"street",
"strong",
"structure",
"student",
"study",
"stuff",
"style",
"subject",
"success",
"successful",
"such",
"suddenly",
"suffer",
"suggest",
"summer",
"support",
"sure",
"surface",
"system",
"table",
"take",
"talk",
"task",
"tax",
"teach",
"teacher",
"team",
"technology",
"television",
"tell",
"ten",
"tend",
"term",
"test",
"than",
"thank",
"that",
"the",
"their",
"them",
"themselves",
"then",
"theory",
"there",
"these",
"they",
"thing",
"think",
"third",
"this",
"those",
"though",
"thought",
"thousand",
"threat",
"three",
"through",
"throughout",
"throw",
"thus",
"time",
"to",
"today",
"together",
"tonight",
"too",
"top",
"total",
"tough",
"toward",
"town",
"trade",
"traditional",
"training",
"travel",
"treat",
"treatment",
"tree",
"trial",
"trip",
"trouble",
"true",
"truth",
"try",
"turn",
"TV",
"two",
"type",
"under",
"understand",
"unit",
"until",
"up",
"upon",
"us",
"use",
"usually",
"value",
"various",
"very",
"victim",
"view",
"violence",
"visit",
"voice",
"vote",
"wait",
"walk",
"wall",
"want",
"war",
"watch",
"water",
"way",
"we",
"weapon",
"wear",
"week",
"weight",
"well",
"west",
"western",
"what",
"whatever",
"when",
"where",
"whether",
"which",
"while",
"white",
"who",
"whole",
"whom",
"whose",
"why",
"wide",
"wife",
"will",
"win",
"wind",
"window",
"wish",
"with",
"within",
"without",
"woman",
"wonder",
"word",
"work",
"worker",
"world",
"worry",
"would",
"write",
"writer",
"wrong",
"yard",
"yeah",
"year",
"yes",
"yet",
"you",
"young",
"your",
"yourself"];

let totalPoints = 50*60;
let bluep = 0;
let greenp = 0;
let redp = 0;
let purplep = 0;

var grounds = new Array();
var backgrounds = new Array();
var players = new Array();
var team1 = new Array();
var team2 = new Array();
var team4 = new Array();
var team5 = new Array();

var teams = [ { id: 1, tag: "Blue", lives: false, sabotaged: false },
              { id: 2, tag: "Red", lives: false, sabotaged: false },
              { id: 4, tag: "Green", lives: false, sabotaged: false },
              { id: 5, tag: "Purple", lives: false, sabotaged: false }
            ];

let width = 1020;
let height = 1224;
let borderSize = 2;
let blockWidth = width/(50)-borderSize;

let blockColor = "#CCCCCC";
let blockBorderColor = "#666666";

let gameSeconds = 10;//game time in m

function initializeWorld() {
    resetWorld();
    addGrounds();
    addBackgrounds();
}

function resetWorld() {
    Composite.clear(engine.world);
    document.getElementById("team1Castle").style.display = "block";
    document.getElementById("team2Castle").style.display = "block";
    document.getElementById("team4Castle").style.display = "block";
    document.getElementById("team5Castle").style.display = "block";
    grounds = [];
    backgrounds = [];
    players = [];
    team1 = [];
    team2 = [];
    team4 = [];
    team5 = [];
    bluep = 0;
    greenp = 0;
    redp = 0;
    purplep = 0;
    document.getElementById("countdown").innerHTML = `${gameSeconds}:00`;
}

function addGrounds() {
    grounds.push(Bodies.rectangle(540, 0, 1080, 60, { 
        isStatic: true ,
        render: {
            /*sprite: {
                texture: "img/castleTextureLarge.png"
            },*/
            fillStyle: "#16161a"
        }
    }
    ));
    grounds.push(Bodies.rectangle(540, 1280, 1080, 60, { 
        isStatic: true ,
        render: {
            /*sprite: {
                texture: "img/castleTextureLarge.png"
            },*/
            fillStyle: "#16161a"
        }
    }
    ));
    grounds.push(Bodies.rectangle(0, 640, 60, 1280, { 
        isStatic: true ,
        render: {
            /*sprite: {
                texture: "img/castleTextureLarge.png"
            },*/
            fillStyle: "#16161a"
        }
    }
    ));
    grounds.push(Bodies.rectangle(1080, 640, 60, 1280, { 
        isStatic: true ,
        render: {
            /*sprite: {
                texture: "img/castleTextureLarge.png"
            },*/
            fillStyle: "#16161a"
        }
    }
    ));
    Composite.add(engine.world, grounds);
}

function addBackgrounds() {
    let g = 0;
    let fs = blockColor;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 60; j++) {
            g = 0;
            fs = blockColor;
            /*
            if (i >= 10 && i <= 13 && j >=  10 && j <= 13) {
                g = -1;
                fs = team1Bg;
            } else if (i >=  10 && i <= 13 && j >= 46 && j <= 49) {
                g = -2;
                fs = team2Bg;
            } else if (i >=  23 && i <= 26 && j >=  28 && j <= 31) {
                g = -3;
                fs = team3Bg;
            } else if (i >=  36 && i <= 39 && j >=  10 && j <= 13) {
                g = -4;
                fs = team4Bg;
            } else if (i >=  36 && i <= 39 && j >=  46 && j <= 49) {
                g = -5;
                fs = team5Bg;
            }*/
            backgrounds.push(Bodies.rectangle(
                31+(blockWidth/2)+i*(blockWidth)+i*borderSize,
                31+(blockWidth/2)+j*(blockWidth)+j*borderSize, 
                blockWidth, 
                blockWidth, { 
                    isStatic: true, 
                    collisionFilter: {
                        group: g
                    }, 
                    render: {
                        fillStyle: fs,
                        strokeStyle: blockBorderColor,
                        lineWidth: borderSize
                }
            }));
        }
    }
    Composite.add(engine.world, backgrounds);
}

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);

function joinButton() {
    join(document.getElementById("testUser").value, parseInt(document.getElementById("testTeam").value), "img/1.png");
}

function join(username, t, pic,n) {
    if (gameRunning) {
        if (userPlaying(username) === false && isTeamAlive(t)) {
          
            players.push({ name: username,userName: n, cost : 0 , speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: pic, shareBalls: 0, appliedFollowBalls: false, isKing: false});
            spawn(username, baseSpeed, t, pic);
        }
    }
}

function joinRandom(username, pic,n) {
    if (gameRunning) {
        if (userPlaying(username) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) === false) {
                t = rng(1,5);
            }
           
            players.push({ name: username,userName: n,cost:0, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: pic, shareBalls: 0, appliedFollowBalls: false, isKing: false});
            spawn(username, baseSpeed, t, pic);
        }
    }
}

function userPlaying(username) {
    let alreadyPlaying = false;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == username) {
            alreadyPlaying = true;
            break;
        }
    }
    return alreadyPlaying;
}

function buttonMoreCircles() {
    for (let i = 0; i < 4; i++) {
        moreCircles(document.getElementById("testUser").value, "img/1.png");
    }
}

function moreCircles(username, pic,n) {
    if (gameRunning) {
        if (userPlaying(username) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) == false) {
                t = rng(1,5);
            }
           
            players.push({ name: username,userName: n,cost:0, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: pic, shareBalls: 0, appliedFollowBalls: false , isKing: false});
            spawn(username, baseSpeed, t, pic);
        }
        let u = getPlayer(username);
        if (u != null) {
            if (isTeamAlive(u.team)) {
                spawn(u.name, u.speed, u.team, pic);
            }
        }
    }
}

function getPlayer(username) {
    let u = null;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == username) {
            u = players[i];
            break;
        }
    }
    return u;
}

function applyLikeSpeed(username) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == username) {
            players[i].appliedLikeSpeed = true;
            break;
        }
    }
}

function applyShareBalls(username) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == username) {
            players[i].shareBalls += 0;
            break;
        }
    }
}

function applyFollowBalls(username) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == username) {
            players[i].appliedFollowBalls = true;
            break;
        }
    }
}

var sabotageTimeouts = [null, null, null, null, null];

function sabotageSelect(userTeam) {
    if (gameRunning) {
        sortedPointsList = pointsList.slice().sort((a,b) => b.points - a.points);
        if (sabotageTimeouts[sortedPointsList[0].id - 1] == null && isTeamAlive(sortedPointsList[0].id) && sortedPointsList[0].id != userTeam) {
            sabotage(sortedPointsList[0].id);
        } else if (sabotageTimeouts[sortedPointsList[1].id - 1] == null && isTeamAlive(sortedPointsList[1].id) && sortedPointsList[1].id != userTeam) {
            sabotage(sortedPointsList[1].id);
        } else if (sabotageTimeouts[sortedPointsList[2].id - 1] == null && isTeamAlive(sortedPointsList[2].id) && sortedPointsList[2].id != userTeam) {
            sabotage(sortedPointsList[2].id);
        } else if (sabotageTimeouts[sortedPointsList[3].id - 1] == null && isTeamAlive(sortedPointsList[3].id) && sortedPointsList[3].id != userTeam) {
            sabotage(sortedPointsList[3].id);
        } else if (sabotageTimeouts[sortedPointsList[4].id - 1] == null && isTeamAlive(sortedPointsList[4].id) && sortedPointsList[4].id != userTeam) {
            sabotage(sortedPointsList[4].id);
        } else if (isTeamAlive(sortedPointsList[0].id) && sortedPointsList[0].id != userTeam) {
            sabotage(sortedPointsList[0].id);
        } else if (isTeamAlive(sortedPointsList[1].id) && sortedPointsList[1].id != userTeam) {
            sabotage(sortedPointsList[1].id);
        } else if (isTeamAlive(sortedPointsList[2].id) && sortedPointsList[2].id != userTeam) {
            sabotage(sortedPointsList[2].id);
        } else if (isTeamAlive(sortedPointsList[3].id) && sortedPointsList[3].id != userTeam) {
            sabotage(sortedPointsList[3].id);
        } else if (isTeamAlive(sortedPointsList[4].id) && sortedPointsList[4].id != userTeam) {
            sabotage(sortedPointsList[4].id);
        }
    }
}

function sabotage(t) {
    if (gameRunning) {
        setTeamSabotaged(t, true);
        switch (t) {
            case 1:
                team1.forEach(b => {
                    Body.scale(b.body, 0.80, 0.80);
                    b.body.render.sprite.xScale = 0.80;
                    b.body.render.sprite.yScale = 0.80;
                });
                break;
            case 2:
                team2.forEach(b => {
                    if (getPlayer(b.name).isKing) {
                        Body.scale(b.body, 1, 1);
                        b.body.render.sprite.xScale = 1;
                        b.body.render.sprite.yScale = 1;
                    } else {
                        Body.scale(b.body, 0.80, 0.80);
                        b.body.render.sprite.xScale = 0.80;
                        b.body.render.sprite.yScale = 0.80;
                    }
                });
                break;
            case 4:
                team4.forEach(b => {
                    if (getPlayer(b.name).isKing) {
                        Body.scale(b.body, 1, 1);
                        b.body.render.sprite.xScale = 1;
                        b.body.render.sprite.yScale = 1;
                    } else {
                        Body.scale(b.body, 0.80, 0.80);
                        b.body.render.sprite.xScale = 0.80;
                        b.body.render.sprite.yScale = 0.80;
                    }
                });
                break;
            case 5:
                team5.forEach(b => {
                    if (getPlayer(b.name).isKing) {
                        Body.scale(b.body, 1, 1);
                        b.body.render.sprite.xScale = 1;
                        b.body.render.sprite.yScale = 1;
                    } else {
                        Body.scale(b.body, 0.80, 0.80);
                        b.body.render.sprite.xScale = 0.80;
                        b.body.render.sprite.yScale = 0.80;
                    }
                });
                break;
            default:
                team1.forEach(b => {
                    if (getPlayer(b.name).isKing) {
                        Body.scale(b.body, 1, 1);
                        b.body.render.sprite.xScale = 1;
                        b.body.render.sprite.yScale = 1;
                    } else {
                        Body.scale(b.body, 0.80, 0.80);
                        b.body.render.sprite.xScale = 0.80;
                        b.body.render.sprite.yScale = 0.80;
                    }
                });
                break;
        }
        if (sabotageTimeouts[t-1] != null) {
            clearTimeout(sabotageTimeouts[t-1]);
        }
        sabotageTimeouts[t-1] = setTimeout(() => {
            setTeamSabotaged(t, false);
            switch (t) {
                case 1:
                    team1.forEach(b => {
                        if (getPlayer(b.name).isKing) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        } else {
                            Body.scale(b.body, 1, 1);
                            b.body.render.sprite.xScale = 1;
                            b.body.render.sprite.yScale = 1;
                        }
                    });
                    break;
                case 2:
                    team2.forEach(b => {
                        if (getPlayer(b.name).isKing) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        } else {
                            Body.scale(b.body, 1, 1);
                            b.body.render.sprite.xScale = 1;
                            b.body.render.sprite.yScale = 1;
                        }
                    });
                    break;
                case 4:
                    team4.forEach(b => {
                        if (getPlayer(b.name).isKing) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        } else {
                            Body.scale(b.body, 1, 1);
                            b.body.render.sprite.xScale = 1;
                            b.body.render.sprite.yScale = 1;
                        }
                    });
                    break;
                case 5:
                    team5.forEach(b => {
                        if (getPlayer(b.name).isKing) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        } else {
                            Body.scale(b.body, 1, 1);
                            b.body.render.sprite.xScale = 1;
                            b.body.render.sprite.yScale = 1;
                        }
                    });
                    break;
                default:
                    team1.forEach(b => {
                        if (getPlayer(b.name).isKing) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        } else {
                            Body.scale(b.body, 1, 1);
                            b.body.render.sprite.xScale = 1;
                            b.body.render.sprite.yScale = 1;
                        }
                    });
                    break;
            }
            sabotageTimeouts[t-1] = null;
        }, 10000);
    }
}

function buttonMoreSpeed() {
    moreSpeed(document.getElementById("testUser").value, 1, "img/1.png");
}

function moreSpeed(username, smultiplier, pic,n) {
    if (gameRunning) {
        if (userPlaying(username) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) == false) {
                t = rng(1,5);
            }
            
            players.push({ name: username,userName: n,cost:0, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: pic, shareBalls: 0, appliedFollowBalls: false, isKing: false });
            spawn(username, baseSpeed, t, pic);
        }
        let u = setPlayerSpeed(username, smultiplier, pic);
        if (u != null) {
            updateCircleSpeed(u.name, u.speed, u.team);
        }
    }
}



function speedForTeam(gifterUser, smultiplier) {
    let gu = getPlayer(gifterUser);
    for (let i = 0; i < players.length; i++) {
        if (players[i].team == gu.team) {
            let u = setPlayerSpeed(players[i].name, smultiplier, players[i].pic);
            if (u != null) {
                updateCircleSpeed(u.name, u.speed, u.team);
            }
        }
    }
}

let addedSpeed = 0.2;

function setPlayerSpeed(username, smultiplier, pic) {
    let u = null;
    let restantSpeed = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == username) {
            if (isTeamAlive(players[i].team)) {
                players[i].speed += addedSpeed * smultiplier;
                if (players[i].speed > maxSpeed) {
                    restantSpeed = players[i].speed - maxSpeed;
                    players[i].speed = maxSpeed;
                }
                u = players[i];
                for (let j = 0; j < restantSpeed/2; j++) {
                    spawn(u.name, u.speed, u.team, pic);
                }
                break;
            }
        }
    }
    return u;
}

function updateCircleSpeed(n, s, t) {
    switch (t) {
        case 1:
            for (let i = 0; i < team1.length; i++) {
                if (team1[i].name == n) {
                    team1[i].force = s;
                }
            }
            break;
        case 2:
            for (let i = 0; i < team2.length; i++) {
                if (team2[i].name == n) {
                    team2[i].force = s;
                }
            }
            break;
        case 4:
            for (let i = 0; i < team4.length; i++) {
                if (team4[i].name == n) {
                    team4[i].force = s;
                }
            }
            break;
        case 5:
            for (let i = 0; i < team5.length; i++) {
                if (team5[i].name == n) {
                    team5[i].force = s;
                }
            }
            break;
        default:
            break;
    }
}

function isTeamAlive(t) {
    let alive = false;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == t) {
            alive = teams[i].lives;
            break;
        }
    }
    return alive;
}

function isTeamSabotaged(t) {
    let sabotaged = false;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == t) {
            sabotaged = teams[i].sabotaged;
            break;
        }
    }
    return sabotaged;
}

function spawn(u, s, t, pic) {
    let color;
    let x;
    let y;
    switch (t) {
        case 1:
            x = 275;
            y = 275;
            color = team1Color
            break;
        case 2:
            x = 275;
            y = 990;
            color = team2Color
            break;
        case 4:
            x = 810;
            y = 275;
            color = team4Color
            break;
        case 5:
            x = 810;
            y = 990;
            color = team5Color
            break;
        default:
            x = 275;
            y = 275;
            color = team1Color
            break;
    }
    addCircle(pic, color, ballSize, x, y, u, t, s);
}

function addCircle(url, color, size, spawnx, spawny, username, team, f) {
    if (gameRunning === true) {
        let canvas = document.createElement('canvas');
        canvas.width=size;
        canvas.height=size;
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.crossOrigin="Anonymous";
        img.setAttribute('crossOrigin', '');
        img.src = url || "img/1.png";
        img.onload = () => {
            let borderSize = 4;
            ctx.drawImage(img, borderSize, borderSize, (size-borderSize*2), (size-borderSize*2));
            ctx.globalCompositeOperation='destination-in';
            ctx.beginPath();
            ctx.arc((size)/2,(size)/2,(size-borderSize)/2,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            ctx.globalCompositeOperation='source-over';
            ctx.strokeStyle = color
            ctx.lineWidth = borderSize;
            ctx.stroke();
            let circle1 = Bodies.circle(spawnx, spawny, size/2, {
                frictionAir: 0,
                friction: 0,
                frictionStatic: 0,
                restitution: 1,
                inertia: Infinity,
                collisionFilter: {
                    group: -team
                },
                render: {
                    sprite: {
                        texture: canvas.toDataURL('image/png')
                    }
                }
            });
            switch (team) {
                case 1:
                    team1.push({body: circle1, running: false, name: username, force: f});
                    break;
                case 2:
                    team2.push({body: circle1, running: false, name: username,  force: f});
                    break;
                case 4:
                    team4.push({body: circle1, running: false, name: username,  force: f});
                    break;
                case 5:
                    team5.push({body: circle1, running: false, name: username,  force: f});
                    break;
                default:
                    team1.push({body: circle1, running: false, name: username,  force: f});
                    break;
            }
            let p = getPlayer(username);
            if (p.isKing) {
                Body.scale(circle1, 1.4, 1.4);
                circle1.render.sprite.xScale = 1.4;
                circle1.render.sprite.yScale = 1.4;
            }
            if(isTeamSabotaged(team)) {
                Body.scale(circle1, 0.8, 0.8);
                circle1.render.sprite.xScale = 0.8;
                circle1.render.sprite.yScale = 0.8;
            }
            if (p.isKing && isTeamSabotaged(team)) {
                Body.scale(circle1, 1, 1);
                circle1.render.sprite.xScale = 1;
                circle1.render.sprite.yScale = 1;
            }
            updateCircleSpeed(p.name, p.speed, p.team);
            Composite.add(engine.world, circle1);
            Body.applyForce( circle1 , {x: circle1.position.x, y: circle1.position.y}, randomStartForce(0.05));
        }
    }
}

Matter.Resolver._restingThresh = 0.001;

var gameRunning = false;
var guessRunning = false;

let updatepInterval;
let updatepRunning = false;

let checkLastGiftInterval;
let checkLastGiftRunning = false;

let cd = 30 * 1000;

function start() {
    if (gameRunning === false) {
        teams.forEach(team => {
            team.lives = true;
            team.sabotaged = false;
        });
        gameRunning = true;
        if (updatepRunning) {
            clearInterval(updatepInterval);
        }
        updatepRunning = true;
        updatepInterval = setInterval(() => {
            updatep();
        }, 250);
        lastGift = new Date();
        if (checkLastGiftRunning) {
            clearInterval(checkLastGiftRunning)
        }
        checkLastGiftInterval = setInterval(() => {
            let ndate = new Date();
            if (Math.abs(lastGift - ndate) >= cd && gameRunning === true && guessRunning === false) {
                guessRunning = true;
                guessStart();
            }
        }, 20000);
        countdown(gameSeconds);
    }
}

var word = "";
var helperInterval;
var helperRunning = false;
var charCount;

function guessStart() {
    document.getElementById("guessContainer").innerHTML = "";
    document.getElementById("guessContainer").style.opacity = "1";
    document.getElementById("guessText").style.opacity = "1";
    word = words[rng(0, words.length-1)];
    for (let i = 0; i < word.length; i++) {
        let l = document.createElement("div");
        l.id = "gletter" + i;
        l.classList.add("guessLetter");
        document.getElementById("guessContainer").appendChild(l);
    }
    charCount = 1;
    var chn;
    var chw = word.charAt(0);
    document.getElementById("gletter" + 0).innerHTML = chw.toUpperCase();
    while (word.length != 0 && Math.floor(word.length / 2) > charCount) {
        chn = rng(0, word.length-1);
        chw = word.charAt(chn);
        if (rng(0,1) === 1) {
            if (document.getElementById("gletter" + chn).innerHTML === "") {
                document.getElementById("gletter" + chn).innerHTML = chw.toUpperCase();
                charCount++;
            }
        }
    }
    setTimeout(() => {
        helperInterval = setInterval(() => {
            if (word.length-1 > charCount) {
                for (let i = 0; i < word.length; i++) {
                    if (document.getElementById("gletter" + i).innerHTML === "") {
                        document.getElementById("gletter" + i).innerHTML = word.charAt(i).toUpperCase();
                        charCount++;
                        break;
                    }
                }
            }
        }, cd);
        helperRunning = true;
    }, cd);
}

var audio = new Audio('correct.mp3');

function tryGuess(username, uid, pic, msg) {
    if (guessRunning === true) {
        if (msg.toLowerCase() === word.toLowerCase()) {
            for (let i = 0; i < word.length; i++) {
                if (document.getElementById("gletter" + i).innerHTML === "") {
                    document.getElementById("gletter" + i).innerHTML = word.charAt(i).toUpperCase();
                }
            }
            //edit
            document.getElementById("guessContainer").style.backgroundColor = "#5ADD40";
            document.getElementById("guessPic").src = pic;
            document.getElementById("guessUser").innerHTML = username;
            document.getElementById("guessPic").style.opacity = "1";
            document.getElementById("guessUser").style.opacity = "1";
            document.getElementById("guessNice").style.opacity = "1";
            audio.play();
            for (let i = 0; i < 10; i++) {
                moreCircles(uid, pic);
            }
            moreSpeed(uid, 5, pic);
            lastGift = new Date();
            setTimeout(() => {
                guessEnd();
            }, 2000);
            setTimeout(() => {
                document.getElementById("guessPic").style.opacity = "0";
                document.getElementById("guessUser").style.opacity = "0";
                document.getElementById("guessNice").style.opacity = "0";
            }, cd / 10 + 5000);
        }
    }
}

function guessEnd() {
    guessRunning = false;
    if (helperRunning === true) {
        clearInterval(helperInterval);
    }
    //edit
    document.getElementById("guessContainer").style.opacity = "0";
    document.getElementById("guessText").style.opacity = "0";
    document.getElementById("guessContainer").style.backgroundColor = "#0000004b";
}
Events.on(engine, 'beforeUpdate', function(event) {
    team1.forEach(c => {
        Body.setAngle( c.body, 0);
        if (isTeamSabotaged(1)) {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force*0.60))
        } else {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force))
        }
    });
    team2.forEach(c => {
        Body.setAngle( c.body, 0);
        if (isTeamSabotaged(2)) {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force*0.60))
        } else {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force))
        }
    });
    team4.forEach(c => {
        Body.setAngle( c.body, 0);
        if (isTeamSabotaged(4)) {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force*0.60))
        } else {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force))
        }
    });
    team5.forEach(c => {
        Body.setAngle( c.body, 0);
        if (isTeamSabotaged(5)) {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force*0.60))
        } else {
            Body.setVelocity(c.body, Vector.mult(Vector.normalise(c.body.velocity), c.force))
        }
    });
});

Events.on(engine, 'collisionStart', function(event) {
    if (gameRunning) {
        event.pairs.forEach((collision) => {
            if (collision.bodyA.label == 'Rectangle Body' && isGround(collision.bodyA.id) === false) {
                if (collision.bodyA.collisionFilter.group != collision.bodyB.collisionFilter.group) {
                    if (collision.bodyA.collisionFilter.group == -1) {
                        bluep--;
                    } else if (collision.bodyA.collisionFilter.group == -2) {
                        redp--;
                    } else if (collision.bodyA.collisionFilter.group == -4) {
                        greenp--;
                    }  else if (collision.bodyA.collisionFilter.group == -5) {
                        purplep--;
                    }
                    if (collision.bodyB.label == 'Circle Body' && (collision.bodyB.collisionFilter.group == -2 ||
                        collision.bodyB.collisionFilter.group == -3 ||
                        collision.bodyB.collisionFilter.group == -4 ||
                        collision.bodyB.collisionFilter.group == -5)) {
                        if (collision.bodyA.position.x >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize &&
                            collision.bodyA.position.x <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize && 
                            collision.bodyA.position.y >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize && 
                            collision.bodyA.position.y <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize) {
                                killTeam(1, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    if (collision.bodyB.label == 'Circle Body' && (collision.bodyB.collisionFilter.group == -1 ||
                        collision.bodyB.collisionFilter.group == -3 ||
                        collision.bodyB.collisionFilter.group == -4 ||
                        collision.bodyB.collisionFilter.group == -5)) {
                        if (collision.bodyA.position.x >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize &&
                            collision.bodyA.position.x <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize && 
                            collision.bodyA.position.y >= 31+(blockWidth/2)+46*(blockWidth)+46*borderSize && 
                            collision.bodyA.position.y <= 31+(blockWidth/2)+46*(blockWidth)+49*borderSize) {
                                killTeam(2, -collision.bodyB.collisionFilter.group);
                       
                    
                  
                        }
                    }
                    if (collision.bodyB.label == 'Circle Body' && (collision.bodyB.collisionFilter.group == -1 ||
                        collision.bodyB.collisionFilter.group == -2 ||
                        collision.bodyB.collisionFilter.group == -3 ||
                        collision.bodyB.collisionFilter.group == -5)) {
                        if (collision.bodyA.position.x >= 31+(blockWidth/2)+36*(blockWidth)+36*borderSize &&
                            collision.bodyA.position.x <= 31+(blockWidth/2)+39*(blockWidth)+39*borderSize && 
                            collision.bodyA.position.y >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize && 
                            collision.bodyA.position.y <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize) {
                                killTeam(4, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    if (collision.bodyB.label == 'Circle Body' && (collision.bodyB.collisionFilter.group == -1 ||
                        collision.bodyB.collisionFilter.group == -2 ||
                        collision.bodyB.collisionFilter.group == -3 ||
                        collision.bodyB.collisionFilter.group == -4)) {
                        if (collision.bodyA.position.x >= 31+(blockWidth/2)+36*(blockWidth)+36*borderSize &&
                            collision.bodyA.position.x <= 31+(blockWidth/2)+39*(blockWidth)+39*borderSize && 
                            collision.bodyA.position.y >= 31+(blockWidth/2)+46*(blockWidth)+46*borderSize && 
                            collision.bodyA.position.y <= 31+(blockWidth/2)+49*(blockWidth)+49*borderSize) {
                                killTeam(5, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    collision.bodyA.collisionFilter.group = collision.bodyB.collisionFilter.group;
                    if (collision.bodyA.collisionFilter.group == -1) {
                        bluep++;
                        collision.bodyA.render.fillStyle = team1Bg;
                    } else if (collision.bodyA.collisionFilter.group == -2) {
                        redp++;
                        collision.bodyA.render.fillStyle = team2Bg;
                    }else if (collision.bodyA.collisionFilter.group == -4) {
                        greenp++;
                        collision.bodyA.render.fillStyle = team4Bg;
                    } else if (collision.bodyA.collisionFilter.group == -5) {
                        purplep++;
                        collision.bodyA.render.fillStyle = team5Bg;
                    }
                }
            } else if (collision.bodyB.label == 'Rectangle Body' && isGround(collision.bodyB.id) === false) {
                if (collision.bodyB.collisionFilter.group != collision.bodyA.collisionFilter.group) {
                    if (collision.bodyB.collisionFilter.group == -1) {
                        bluep--;
                    } else if (collision.bodyB.collisionFilter.group == -2) {
                        redp--;
                    } else if (collision.bodyB.collisionFilter.group == -4) {
                        greenp--;
                    }  else if (collision.bodyB.collisionFilter.group == -5) {
                        purplep--;
                    }
                    if (collision.bodyA.label == 'Circle Body' && (collision.bodyA.collisionFilter.group == -2 ||
                        collision.bodyA.collisionFilter.group == -3 ||
                        collision.bodyA.collisionFilter.group == -4 ||
                        collision.bodyA.collisionFilter.group == -5)) {
                        if (collision.bodyB.position.x >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize &&
                            collision.bodyB.position.x <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize && 
                            collision.bodyB.position.y >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize && 
                            collision.bodyB.position.y <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize) {
                                killTeam(1, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    if (collision.bodyA.label == 'Circle Body' && (collision.bodyA.collisionFilter.group == -1 ||
                        collision.bodyA.collisionFilter.group == -3 ||
                        collision.bodyA.collisionFilter.group == -4 ||
                        collision.bodyA.collisionFilter.group == -5)) {
                        if (collision.bodyB.position.x >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize &&
                            collision.bodyB.position.x <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize && 
                            collision.bodyB.position.y >= 31+(blockWidth/2)+46*(blockWidth)+46*borderSize && 
                            collision.bodyB.position.y <= 31+(blockWidth/2)+46*(blockWidth)+49*borderSize) {
                                killTeam(2, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    if (collision.bodyA.label == 'Circle Body' && (collision.bodyA.collisionFilter.group == -1 ||
                        collision.bodyA.collisionFilter.group == -2 ||
                        collision.bodyA.collisionFilter.group == -4 ||
                        collision.bodyA.collisionFilter.group == -5)) {
                        if (collision.bodyB.position.x >= 31+(blockWidth/2)+23*(blockWidth)+23*borderSize &&
                            collision.bodyB.position.x <= 31+(blockWidth/2)+26*(blockWidth)+26*borderSize && 
                            collision.bodyB.position.y >= 31+(blockWidth/2)+28*(blockWidth)+28*borderSize && 
                            collision.bodyB.position.y <= 31+(blockWidth/2)+31*(blockWidth)+31*borderSize) {
                                killTeam(3, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    if (collision.bodyA.label == 'Circle Body' && (collision.bodyA.collisionFilter.group == -1 ||
                        collision.bodyA.collisionFilter.group == -2 ||
                        collision.bodyA.collisionFilter.group == -3 ||
                        collision.bodyA.collisionFilter.group == -5)) {
                        if (collision.bodyB.position.x >= 31+(blockWidth/2)+36*(blockWidth)+36*borderSize &&
                            collision.bodyB.position.x <= 31+(blockWidth/2)+39*(blockWidth)+39*borderSize && 
                            collision.bodyB.position.y >= 31+(blockWidth/2)+10*(blockWidth)+10*borderSize && 
                            collision.bodyB.position.y <= 31+(blockWidth/2)+13*(blockWidth)+13*borderSize) {
                                killTeam(4, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    if (collision.bodyA.label == 'Circle Body' && (collision.bodyA.collisionFilter.group == -1 ||
                        collision.bodyA.collisionFilter.group == -2 ||
                        collision.bodyA.collisionFilter.group == -3 ||
                        collision.bodyA.collisionFilter.group == -4)) {
                        if (collision.bodyB.position.x >= 31+(blockWidth/2)+36*(blockWidth)+36*borderSize &&
                            collision.bodyB.position.x <= 31+(blockWidth/2)+39*(blockWidth)+39*borderSize && 
                            collision.bodyB.position.y >= 31+(blockWidth/2)+46*(blockWidth)+46*borderSize && 
                            collision.bodyB.position.y <= 31+(blockWidth/2)+49*(blockWidth)+49*borderSize) {
                                killTeam(5, -collision.bodyB.collisionFilter.group);
                        }
                    }
                    collision.bodyB.collisionFilter.group = collision.bodyA.collisionFilter.group;
                    if (collision.bodyB.collisionFilter.group == -1) {
                        bluep++;
                        collision.bodyB.render.fillStyle = team1Bg;
                    } else if (collision.bodyB.collisionFilter.group == -2) {
                        redp++;
                        collision.bodyB.render.fillStyle = team2Bg;
                    }else if (collision.bodyB.collisionFilter.group == -4) {
                        greenp++;
                        collision.bodyB.render.fillStyle = team4Bg;
                    } else if (collision.bodyB.collisionFilter.group == -5) {
                        purplep++;
                        collision.bodyB.render.fillStyle = team5Bg;
                    }
                }
            }
        });
    }
});

function killTeam(t, k) {
    switch (t) {
        case 1:
            setTeamLives(1, false);
            team1.forEach(c => {
                Composite.remove(engine.world, c.body);
            });
            team1 = [];
            document.getElementById("team1Castle").style.display = "none";
            break;
        case 2:
            setTeamLives(2, false);
            team2.forEach(c => {
                Composite.remove(engine.world, c.body);
            });
            team2 = [];
            document.getElementById("team2Castle").style.display = "none";
            break;
        case 4:
            setTeamLives(4, false);
            team4.forEach(c => {
                Composite.remove(engine.world, c.body);
            });
            team4 = [];
            document.getElementById("team4Castle").style.display = "none";
            break;
        case 5:
            setTeamLives(5, false);
            team5.forEach(c => {
                Composite.remove(engine.world, c.body);
            });
            team5 = [];
            document.getElementById("team5Castle").style.display = "none";
            break;
        default:
            setTeamLives(1, false);
            team1.forEach(c => {
                Composite.remove(engine.world, c.body);
            });
            team1 = [];
            document.getElementById("team1Castle").style.display = "none";
            break;
    }
    if (countDeathTeams() == 3) {
        gameOver(k);
    }
}

function setTeamLives(t, value) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == t) {
            teams[i].lives = value; 
        }
    }
}

function setTeamSabotaged(t, value) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == t) {
            teams[i].sabotaged = value; 
        }
    }
}

function countDeathTeams() {
    let count = 0;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].lives == false) {
            count++;
        }
    }
    return count;
}

let winningP = 80;
let pointsList = [{ id: 1, tag: "Blue", points: 0 },
                    { id: 2, tag: "Red", points: 0 },
                    { id: 4, tag: "Green", points: 0 },
                    { id: 5, tag: "Purple", points: 0 }
];
let sortedPointsList = [];

function updatep () {
    if (gameRunning) {
        pointsList[0].points = (bluep/totalPoints*100).toFixed(2);
        pointsList[1].points = (redp/totalPoints*100).toFixed(2);
        pointsList[2].points = (greenp/totalPoints*100).toFixed(2);
        pointsList[3].points = (purplep/totalPoints*100).toFixed(2);
        let sum = 0;
        for (let i = 0; i < pointsList.length; i++) {
            document.getElementById(pointsList[i].tag.toLowerCase() + "pr").value = pointsList[i].points;
            document.getElementById(pointsList[i].tag.toLowerCase() + "prTag").innerHTML = pointsList[i].tag + ": " + pointsList[i].points + "%";
            document.getElementById(pointsList[i].tag.toLowerCase() + "Graphic").style.width = pointsList[i].points + "%";
            sum += parseFloat(pointsList[i].points);
        }
        document.getElementById("overlayGraphic").style.width = sum + "%";
        sortedPointsList = pointsList.slice().sort((a,b) => b.points - a.points);
        for (let i = 0; i < sortedPointsList.length; i++) {
            document.getElementById(sortedPointsList[i].tag.toLowerCase() + "prc").style.order = `${i}`;
        }
    }
}

function isGround(id) {
    let a = false;
    grounds.forEach(ground => {
        if (id == ground.id) {
            a = true;
        }
    });
    return a;
}


let x;
let timerRunning = false;

function countdown(minutes) {
  let t = new Date();
 t.setMinutes(t.getMinutes() + minutes);
  let countDownDate = t.getTime();
  timerRunning = true;
  x = setInterval(function() {

    let now = new Date().getTime();

    let distance = countDownDate - now;

    let minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

    minutesRemaining = minutesRemaining < 10 ? '0' + minutesRemaining : minutesRemaining;
    secondsRemaining = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;

    document.getElementById("countdown").innerHTML = minutesRemaining + ':' + secondsRemaining;

    if (distance < 55) {
      if (timerRunning) {
        clearInterval(x);
      }
      timerRunning = false;
      document.getElementById("countdown").innerHTML = "GAME OVER";
      gameOver(null);
    }
  }, 1000);
}



function getplayerscoins(name,id, cost){
    const userIndex = players.findIndex(user => user.name === id);
    if (userIndex !== -1) {
        players[userIndex].cost += cost;
    } 
}



function filterplayer(team) {
    const filteredPlayers = players.filter(player => player.team == team);
  
    const hasNonZeroCost = filteredPlayers.some(player => player.cost > 0);
  
    if (hasNonZeroCost) {
      const highestCostPlayer = filteredPlayers.reduce((prev, current) => {
        return (prev.cost > current.cost) ? prev : current;
      });
  
      return { userName: highestCostPlayer.userName, pic: highestCostPlayer.pic };
    }
  
    const hasKinkTrue = filteredPlayers.some(player => player.iskink == true);
  
    if (hasKinkTrue) {
      const playersWithKinkTrue = filteredPlayers.filter(player => player.iskink == true);
  
      const randomIndex = Math.floor(Math.random() * playersWithKinkTrue.length);
      return { userName: playersWithKinkTrue[randomIndex].userName, pic: playersWithKinkTrue[randomIndex].pic };
    }
  
    const randomPlayer = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
    if(filteredPlayers.length == 0) return { userName: "CBC", pic: "https://p19-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/7e5aed040c1195b73f83585c38f1b5ce~c5_100x100.jpeg?x-expires=1688349600&x-signature=PIVnc%2BQZg9xQ%2FDa%2FksCgq8Z94eU%3D" }
    return { userName: randomPlayer.userName, pic: randomPlayer.pic };
  }
  
    

function gameOver(k) {
   
    if (gameRunning) {
        gameRunning = false;
        if (guessRunning) {
            guessEnd();
        }
        document.getElementById("kingContainer").style.opacity = 0;
        for (let i = 0; i < sabotageTimeouts.length; i++) {
            if (sabotageTimeouts[i] != null) {
                clearInterval(sabotageTimeouts[i]);
                sabotageTimeouts[i] = null;
            }       
        }
        if (updatepRunning) {
            clearInterval(updatepInterval);
            updatepRunning = false;
        }
        if (checkLastGiftRunning) {
            clearInterval(checkLastGiftRunning)
        }
        if (k == null) {
            sortedPointsList = pointsList.slice().sort((a,b) => b.points - a.points);
            if (sortedPointsList[0].tag == "Blue") {
                const { userName, pic } = filterplayer("1");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "BLUE WINS";
                document.getElementById("winnerpic").src = "img/team1Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team1Bg;
            } else if (sortedPointsList[0].tag == "Red") {
                const { userName, pic } = filterplayer("2");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "RED WINS";
                document.getElementById("winnerpic").src = "img/team2Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team2Bg;
            }else if (sortedPointsList[0].tag == "Green") {
                const { userName, pic } = filterplayer("4");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "GREEN WINS";
                document.getElementById("winnerpic").src = "img/team4Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team4Bg;
            } else if(sortedPointsList[0].tag == "Purple"){
                const { userName, pic } = filterplayer("5");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "PURPLE WINS";
                document.getElementById("winnerpic").src = "img/team5Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team5Bg;
            }
        } else {
            if (k == 1) {
                const { userName, pic } = filterplayer("1");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "BLUE WINS";
                document.getElementById("winnerpic").src = "img/team1Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team1Bg;
            } else if (k == 2) {
                const { userName, pic } = filterplayer("2");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "RED WINS";
                document.getElementById("winnerpic").src = "img/team2Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team2Bg;
            }else if (k == 4) {
                const { userName, pic } = filterplayer("4");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "GREEN WINS";
                document.getElementById("winnerpic").src = "img/team4Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team4Bg;
            } else if (k == 5) {
                const { userName, pic } = filterplayer("5");
                document.getElementById("userName").innerHTML = userName;
                if (pic) {
                  document.getElementById("userpic").src = pic;
                }
                document.getElementById("gameOverWinnerText").innerHTML = "PURPLE WINS";
                document.getElementById("winnerpic").src = "img/team5Castle.png";
                document.getElementById("gameOverWinnerText").style.color = team5Bg;
            }
        }
        
        document.getElementById("gameOverPanel").style.visibility = "visible";
        document.getElementById("winnerpic").style.opacity = "1";
        document.getElementById("userName").style.opacity = "1";
        document.getElementById("userpic").style.opacity = "1";
        document.getElementById("gameOverPanel").style.opacity = "1";
        if (timerRunning = true) {
            clearInterval(x);
            timerRunning = false;
        }
        setTimeout(() => {
            document.getElementById("gameOverPanel").style.visibility = "hidden";
            document.getElementById("winnerpic").style.opacity = "0";
            document.getElementById("userName").style.opacity = "0";
            document.getElementById("userpic").style.opacity = "0";
            document.getElementById("gameOverPanel").style.opacity = "0";
            initializeWorld();
            start();
        }, 6000);
    }
}

function randomStartForce(f) {
    let r = rng(0, 3);
    let nf = rng(1, f*100);
    nf /= 100;
    switch (r) {
        case 0:
            return {x: nf, y: nf};
            break;
        case 1:
            return {x: -nf, y: nf};
            break;
        case 2:
            return {x: -nf, y: -nf};
            break;
        case 3:
            return {x: nf, y: -nf};
            break;
        default:
            return {x: nf, y: -nf};
            break;
    }
}

function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

initializeWorld();

function king(username, pic,n) {
    if (gameRunning) {
        if (userPlaying(username) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) == false) {
                t = rng(1,5);
            }
            
            players.push({ name: username ,userName: n,cost:0, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: pic, shareBalls: 0, appliedFollowBalls: false, isKing: false });
            spawn(username, baseSpeed, t, pic);
        }
        let u = getPlayer(username);
        u.isKing = true;
        if (u != null) {
            switch (u.team) {
                case 1:
                    team1.forEach(b => {
                        if (b.name == username) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        }
                    });
                    break;
                case 2:
                    team2.forEach(b => {
                        if (b.name == username) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        }
                    });
                    break;
                case 4:
                    team4.forEach(b => {
                        if (b.name == username) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        }
                    });
                    break;
                case 5:
                    team5.forEach(b => {
                        if (b.name == username) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        }
                    });
                    break;
                default:
                    team1.forEach(b => {
                        if (b.name == username) {
                            Body.scale(b.body, 1.4, 1.4);
                            b.body.render.sprite.xScale = 1.4;
                            b.body.render.sprite.yScale = 1.4;
                        }
                    });
                    break;
            }
            document.getElementById("crownUser").src = pic;
            document.getElementById("kingContainer").style.opacity = 1;
            setTimeout(() => {
                party.confetti(document.getElementById("crown"), {
                    count: party.variation.range(40, 60),
                    size: party.variation.skew(2, 0.2)
                });
            }, 1000);
            setTimeout(() => {
                party.confetti(document.getElementById("crown"), {
                    count: party.variation.range(40, 60),
                    size: party.variation.skew(2, 0.2)
                });
            }, 2000);
        }
    }
}







