let backendUrl = undefined;
let connection = new TikTokIOConnection(backendUrl);

$(document).ready(() => {
    connect();
})

function connect() {
    let urlParams = new URLSearchParams(window.location.search);
    let uniqueId = urlParams.get('tiktok')
    if (uniqueId !== '') {

        console.log('Connecting...');

        connection.connect(uniqueId, {
            enableExtendedGiftInfo: true
        }).then(state => {

            document.getElementById("connectButton").style.backgroundColor = "green";
            document.getElementById("connectButton").innerHTML = `CONNECTED to roomId ${state.roomId}`;
            document.getElementById("connectButton").disabled = true;
            start();

        }).catch(errorMessage => {
            console.log(errorMessage);
        })

    } else {
        alert('no username entered');
    }
}

connection.on('join1', function(data) {

    join(data.uid, 1, data.pic, data.user);
});
connection.on('join2', function(data) {

    join(data.uid, 2, data.pic, data.user);
});

connection.on('join4', function(data) {

    join(data.uid, 4, data.pic, data.user);
});
connection.on('join5', function(data) {

    join(data.uid, 5, data.pic, data.user);
});
connection.on('joinRng', function(data) {

    joinRandom(data.uid, data.pic, data.user);
    if (guessRunning === true) {
        tryGuess(data.user, data.uid, data.pic, data.msg);
    }
});

connection.on('gift', function(data) {
    if (data.giftId == '5655') {
        getplayerscoins(data.user ,data.uid, data.cost)
        moreSpeed(data.uid, 1*data.repeatCount, data.pic, data.user);
        speedForTeam(data.uid, 1*data.repeatCount*0.1, data.user);
    } else if (data.giftId == '5760') {
        getplayerscoins(data.user,data.uid , data.cost)
        for (let i = 0; i < 1*data.repeatCount; i++) {
            moreCircles(data.uid, data.pic, data.user);
        }
        speedForTeam(data.uid, 1*data.repeatCount*0.1, data.user);
    } else if (data.giftId == '5487') {
        
        getplayerscoins(data.user,data.uid , data.cost)
        moreSpeed(data.uid, 5*data.repeatCount, data.pic, data.user);
        speedForTeam(data.uid, 5*data.repeatCount*0.1, data.user);
    } else if (data.giftId == '37') {
        
        getplayerscoins(data.user,data.uid , data.cost)
        for (let i = 0; i < 5*data.repeatCount; i++) {
            moreCircles(data.uid, data.pic, data.user);
        }
        
    } else if (data.giftId == '5585') {
        
        getplayerscoins(data.user,data.uid , data.cost)
        moreSpeed(data.uid, 100, data.pic, data.user);
        speedForTeam(data.uid, 100*data.repeatCount*0.1, data.user);
    } else if (data.giftId == '5660') {
       
        getplayerscoins(data.user,data.uid , data.cost)
        for (let i = 0; i < 100; i++) {
            moreCircles(data.uid, data.pic, data.user);
        }
        
    } else if (data.giftId == '6070') {
       
        getplayerscoins(data.user,data.uid , data.cost)
        for (let i = 0; i < 30; i++) {
            moreCircles(data.uid, data.pic, data.user);
        }
        
    } else if (data.giftId == '5509') { // surprise Swan
        
        getplayerscoins(data.user,data.uid , data.cost)
        moreSpeed(data.uid, 699, data.pic, data.user);
        for (let i = 0; i < 25; i++) {
            moreCircles(data.uid, data.pic, data.user);
        }
        speedForTeam(data.uid, 699*data.repeatCount*0.1, data.user);
        king(data.uid, data.pic, data.user);
    } else if (data.giftId == '5879') {
        for (let i = 0; i < 30; i++) {
            moreCircles(data.uid, data.pic);
        }
        
    } else 
    if (data.diamondCount*data.repeatCount > 9) {
        lastGift = new Date();
    }
});
connection.on('like', function(data) {
    if (gameRunning) {
        if (userPlaying(data.uid) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) === false) {
                t = rng(1,5);
            }
            players.push({ name: data.uid,userName:data.user,cost:0, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: data.pic, shareBalls: 0, appliedFollowBalls: false, isKing: false });
            spawn(data.uid, baseSpeed, t, data.pic, data.user);
        }
        let u = getPlayer(data.uid, data.user);
        if (u != null) {
            if (u.appliedLikeSpeed === false) {
                applyLikeSpeed(data.uid, data.user);
                moreSpeed(data.uid, 1, data.pic, data.user);
                moreCircles(data.uid, data.pic, data.user);
            }
        }
    }
});
/*connection.on('share', function(data) {
    if (gameRunning) {
        if (userPlaying(data.uid) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) === false) {
                t = rng(1,5);
            }
            players.push({ name: data.uid, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: data.pic, shareBalls: 0, appliedFollowBalls: false, isKing: false });
            spawn(data.uid, baseSpeed, t, data.pic);
        }
        let u = getPlayer(data.uid);
        if (u != null) {
            if (u.shareBalls < 3) {
                applyShareBalls(data.uid);
                moreCircles(data.uid, data.pic);
            }
        }
    }
});*/
connection.on('follow', function(data) {
    if (gameRunning) {
        if (userPlaying(data.uid) === false) {
            let t = rng(1,5);
            while (isTeamAlive(t) === false) {
                t = rng(1,5);
            }
            players.push({ name: data.uid,userName:data.user,cost:0, speed: baseSpeed, team: t, appliedLikeSpeed: false, pic: data.pic, shareBalls: 0, appliedFollowBalls: false, isKing: false });
            spawn(data.uid, baseSpeed, t, data.pic, data.user);
        }
        let u = getPlayer(data.uid);
        if (u != null) {
            if (u.appliedFollowBalls === false) {
                applyFollowBalls(data.uid, data.user);
                moreCircles(data.uid, data.pic, data.user);
            }
        }
    }
});

connection.on('streamEnd', () => {
    document.getElementById("connectButton").style.backgroundColor = "grey";
    document.getElementById("connectButton").innerHTML = `Stream ended`;
})