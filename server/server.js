#!/root/.nvm/versions/node/v10.15.3/bin/node
var http = require('http');
var url = require('url');

// var con = require('./db.js').con;
var queryAnime = require('./queryAnime.js').queryAnime;

// server config
const PORT = 9000;

// server starts
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Content-Type', 'application/json');
    // var q = url.parse(req.url, true).query;
    console.log('redirecting req and res');
    queryAnime(req,res);
    // res.end(JSON.stringify({err:null,msg:'shuai'}));
}).listen(PORT);