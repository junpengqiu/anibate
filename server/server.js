#!/root/.nvm/versions/node/v10.15.3/bin/node
var http = require('http');
var url = require('url');

// var con = require('./db.js').con;
var queryAnime = require('./queryAnime.js').queryAnime;
var queryUser = require('./queryUser.js').queryUser;
var querySide = require('./querySide.js').querySide;
var queryComment = require('./queryComment.js').queryComment;
var insertUser = require('./insertUser.js').insertUser;
var insertSide = require('./insertSide.js').insertSide;
var insertComment = require('./insertComment.js').insertComment;
var updateSide = require('./updateSide.js').updateSide;
var updateComment = require('./updateComment.js').updateComment;
var deleteComment = require('./deleteComment.js').deleteComment;

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
    }else if(pathname === '/insert/side'){
        insertSide(req, res);
    }else if(pathname === '/insert/comment'){
        insertComment(req, res);
    }else if(pathname === '/update/side'){
        updateSide(req, res);
    }else if(pathname === '/update/comment'){
        updateComment(req, res);
    }else if(pathname === '/delete/comment'){
        deleteComment(req, res);
    }else if(pathname === '/login'){
        queryUser(req, res);
    }else if(pathname === '/signup'){
        insertUser(req, res);
    }
    else{
        res.end(JSON.stringify({err:'unknow pathname'}));
    }
}).listen(PORT);