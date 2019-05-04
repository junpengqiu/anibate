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

var insertComment = function(req, res){
    let params = url.parse(req.url, true).query;
    console.log(`params are ${JSON.stringify(params)}`);
    // url.parse convert params.content to decoded
    params.content = encodeURIComponent(params.content);
    let sql = `INSERT INTO Comment 
    SELECT ${params.anime_id}, ${params.user_id}, ${Date.now() - 1557008968808}, '${params.content}', side 
    FROM Side WHERE anime_id=${params.anime_id} and user_id=${params.user_id}`;
    console.log(`sql: ${sql}`);

    con.query(sql, function(err, results, fields){
        if(err) {
            res.end(JSON.stringify({'err':err}));
            throw err;
        }else{
            res.end(JSON.stringify({}));
        }
    });
};

module.exports.insertComment = insertComment;