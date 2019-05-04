var url = require('url');
var request = require('request');

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

var getPicRecursive = function(res, req, results, curPos){
    if (curPos == idArr.length){
        res.end(JSON.stringify(results));
        return;
    }

    request({
        url: `https://api.jikan.moe/v3/anime/${(results[curPos]).id}/pictures`, 
        json: true
    }, function(err, resp, body){
        (results[curPos]).img = body.pictures ? (body.pictures[0]).large : null;
        getPicRecursive(res, req, results, curPos + 1);
    });
}

var updateLove = function(req, res){
    let params = url.parse(req.url, true).query;
    console.log(`params are ${JSON.stringify(params)}`);

    let sql = `UPDATE UserOnGenre SET mag = mag * ${params.ratio} WHERE user_id=${params.user_id} AND genre="${params.genre}"`;
    console.log(`sql: ${sql}`);
    con.query(sql, function(err, results, fields){
        if(err){
            res.end(JSON.stringify({'err':err}));
            throw err;
        } else{
            res.end(JSON.stringify(results))
        }
    });
};

module.exports.updateLove = updateLove;