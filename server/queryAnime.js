var url = require('url');

var con = require('./db.js').con;

var condGen = function(params){
    let keywords = params.keywords ? params.keywords.split(' , ') : null;
    let keywordsCond = keywords ? keywords.map(
        (word) => `id in (SELECT anime_id FROM TitleWord WHERE word='${word}')`
    ).join(' and ') : '';
    return keywordsCond;
}

var queryAnime = function(req, res){
    let params = url.parse(req.url, true).query;
    console.log(`params are ${JSON.stringify(params)}`);

    let sql = `SELECT * FROM Anime WHERE ${condGen(params)}`;
    console.log(`sql: ${sql}`);
    con.query(sql, function(err, results, fields){
        if(err) throw err;
        res.end(JSON.stringify(results));
    });
};

module.exports.queryAnime = queryAnime;