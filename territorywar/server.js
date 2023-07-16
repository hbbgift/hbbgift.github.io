require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { TikTokConnectionWrapper, getGlobalConnectionCount } = require('./connectionWrapper');
const { clientBlocked } = require('./limiter');
const cors = require('cors')

const app = express();
app.use(cors());
const httpServer = createServer(app);

// Enable cross origin resource sharing
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

let sessionDiamonds = 0;

io.on('connection', (socket) => {
    let tiktokConnectionWrapper;

    console.info('New connection from origin', socket.handshake.headers['origin'] || socket.handshake.headers['referer']);

    socket.on('setUniqueId', (uniqueId, options) => {

        // Prohibit the client from specifying these options (for security reasons)
        if (typeof options === 'object' && options) {
            delete options.requestOptions;
            delete options.websocketOptions;
        } else {
            options = {};
        }

        // Session ID in .env file is optional
        if (process.env.SESSIONID) {
            options.sessionId = process.env.SESSIONID;
            console.info('Using SessionId');
        }

        // Check if rate limit exceeded
        if (process.env.ENABLE_RATE_LIMIT && clientBlocked(io, socket)) {
            socket.emit('tiktokDisconnected', 'You have opened too many connections or made too many connection requests. Please reduce the number of connections/requests or host your own server instance. The connections are limited to avoid that the server IP gets blocked by TokTok.');
            return;
        }

        // Connect to the given username (uniqueId)
        try {
            tiktokConnectionWrapper = new TikTokConnectionWrapper(uniqueId, options, true);
            tiktokConnectionWrapper.connect();
        } catch (err) {
            socket.emit('tiktokDisconnected', err.toString());
            return;
        }

        // Redirect wrapper control events once
        tiktokConnectionWrapper.once('connected', state => socket.emit('tiktokConnected', state));
        tiktokConnectionWrapper.once('disconnected', reason => socket.emit('tiktokDisconnected', reason));

        // Notify client when stream ends
        tiktokConnectionWrapper.connection.on('streamEnd', () => socket.emit('streamEnd'));

        // Redirect message events
        //tiktokConnectionWrapper.connection.on('roomUser', msg => socket.emit('roomUser', msg));
        //tiktokConnectionWrapper.connection.on('member', msg => socket.emit('member', msg));
        tiktokConnectionWrapper.connection.on('chat', data => {
          //console.log(`${data.uniqueId} : ${data.userId} writes: ${data.comment}`);
          if (data.comment.includes("1")) {
            socket.emit("join1", {uid: data.userId, pic: data.profilePictureUrl ,user: data.uniqueId});
          } else if (data.comment.includes("2")) {
            socket.emit("join2", {uid: data.userId, pic: data.profilePictureUrl ,user: data.uniqueId});
          } else if (data.comment.includes("3")) {
            socket.emit("join4", {uid: data.userId, pic: data.profilePictureUrl ,user: data.uniqueId});
          }  else if (data.comment.includes("4")) {
            socket.emit("join5", {uid: data.userId, pic: data.profilePictureUrl ,user: data.uniqueId});
          } else {
            socket.emit("joinRng", {user: data.uniqueId, uid: data.userId, pic: data.profilePictureUrl, msg: data.comment});//object obcet 
          }
        })
        tiktokConnectionWrapper.connection.on('gift', data => {
            
          if (data.giftType === 1 && !data.repeatEnd) {
            // Streak in progress => show only temporary
        } else {
            // Streak ended or non-streakable gift => process the gift with final repeat_count
            sessionDiamonds += data.diamondCount*data.repeatCount;
            socket.emit("gift", { giftId: data.giftId,cost: data.diamondCount, repeatCount: data.repeatCount, diamondCount: data.diamondCount, user: data.uniqueId, uid: data.userId, pic: data.profilePictureUrl});
        }
        })
        //tiktokConnectionWrapper.connection.on('social', msg => socket.emit('social', msg));
        tiktokConnectionWrapper.connection.on('like', data => {
            if (data.likeCount >= 10) {
                socket.emit("like", { likeCount: data.likeCount, uid: data.userId, pic: data.profilePictureUrl,user: data.uniqueId});
            }
        })
        //tiktokConnectionWrapper.connection.on('questionNew', msg => socket.emit('questionNew', msg));
        //tiktokConnectionWrapper.connection.on('linkMicBattle', msg => socket.emit('linkMicBattle', msg));
        //tiktokConnectionWrapper.connection.on('linkMicArmies', msg => socket.emit('linkMicArmies', msg));
        //tiktokConnectionWrapper.connection.on('liveIntro', msg => socket.emit('liveIntro', msg));
        //tiktokConnectionWrapper.connection.on('emote', msg => socket.emit('emote', msg));
        //tiktokConnectionWrapper.connection.on('envelope', msg => socket.emit('envelope', msg));
        //tiktokConnectionWrapper.connection.on('subscribe', msg => socket.emit('subscribe', msg));
        /*tiktokConnectionWrapper.connection.on('share', (data) => {
            console.log(data.uniqueId, "shared the stream!");
            socket.emit("share", { uid: data.userId, pic: data.profilePictureUrl});
        })*/
        tiktokConnectionWrapper.connection.on('follow', (data) => {
            socket.emit("follow", { uid: data.userId, pic: data.profilePictureUrl,user:data.uniqueId});
        })
    });

    socket.on('disconnect', () => {
        if (tiktokConnectionWrapper) {
            tiktokConnectionWrapper.disconnect();
        }
    });
});

// Emit global connection statistics
setInterval(() => {
    io.emit('statistic', { globalConnectionCount: getGlobalConnectionCount() });
}, 5000)

// Serve frontend files
app.use(express.static('public'));

// Start http listener
const port = process.env.PORT || 3000;
httpServer.listen(port);
console.info(`Server running! Please visit http://localhost:${port}/?tiktok=weteta4165 Remember to click on the web screen to enable the AUDIO`);