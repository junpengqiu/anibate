#!/root/.nvm/versions/node/v10.15.3/bin/node
var http = require('http');
var url = require('url');

// var con = require('./db.js').con;
var queryAnime = require('./queryAnime.js').queryAnime;
var queryUser = require('./queryUser.js').queryUser;
var querySide = require('./querySide.js').querySide;
var queryComment = require('./queryComment.js').queryComment;
var queryLove = require('./queryLove.js').queryLove;
var insertUser = require('./insertUser.js').insertUser;
var insertSide = require('./insertSide.js').insertSide;
var insertComment = require('./insertComment.js').insertComment;
var updateSide = require('./updateSide.js').updateSide;
var updateComment = require('./updateComment.js').updateComment;
var updateLove = require('./updateLove.js').updateLove;
var updateLock = require('./updateLock.js').updateLock;
var deleteComment = require('./deleteComment.js').deleteComment;
var calcRecommend = require('./calcRecommend.js').calcRecommend;

// server config
const PORT = 9000;

// server starts
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Content-Type', 'application/json');
    // var q = url.parse(req.url, true).query;
    console.log('redirecting req and res');

    let pathname = url.parse(req.url, true).pathname;
    if(pathname === '/query/anime'){
        queryAnime(req, res);
    }else if(pathname === '/query/side'){
        querySide(req, res);
    }else if(pathname === '/query/comment'){
        queryComment(req, res);
    }else if(pathname === '/query/love'){
        queryLove(req, res);
    }else if(pathname === '/insert/side'){
        insertSide(req, res);
    }else if(pathname === '/insert/comment'){
        insertComment(req, res);
    }else if(pathname === '/update/side'){
        updateSide(req, res);
    }else if(pathname === '/update/comment'){
        updateComment(req, res);
    }else if(pathname === '/update/love'){
        updateLove(req, res);
    }else if(pathname === '/update/lock'){
        updateLock(req, res);
    }else if(pathname === '/delete/comment'){
        deleteComment(req, res);
    }else if(pathname === '/login'){
        queryUser(req, res);
    }else if(pathname === '/signup'){
        insertUser(req, res);
    }else if(pathname === '/calc/recommend'){
        calcRecommend(req, res);
    }else{
        res.end(JSON.stringify({err:'unknow pathname'}));
    }
}).listen(PORT);