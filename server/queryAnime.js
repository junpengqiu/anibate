var url = require('url');

var con = require('./db.js').con;

var joinAndIfExisit = function(condArr){
    console.log(condArr);
    let toRet = '';
    let firstIns = true;
    for (cond in condArr){
        // console.log(condArr[cond]);
        cond = condArr[cond];
        if(!cond)
            continue;
        if (firstIns){
            toRet += cond;
            firstIns = false;
        }else{
            toRet += ` and ${cond}`;
        }
    }
    return toRet;
}

var condGen = function(params){
    let keywords = params.keywords ? params.keywords.split(',') : null;
    let keywordsCond = keywords ? keywords.map(
        (word) => `id in (SELECT anime_id FROM TitleWord WHERE word='${word}')`
    ).join(' and ') : null;

    console.log(keywordsCond);

    let typeCond  = params.type ? `type='${params.type}'` : null;

    let genres = params.genres ? params.genres.split(',') : null;
    let genresCond = genres ? genres.map(
        (genre)=> `'${genre}' in (SELECT name FROM Genre WHERE id=anime_id)`
    ).join(' and ') : null;

    return joinAndIfExisit([keywordsCond, typeCond, genresCond]);
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