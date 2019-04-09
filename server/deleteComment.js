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

var deleteComment = function(req, res){
    let params = url.parse(req.url, true).query;
    console.log(`params are ${JSON.stringify(params)}`);
    // url.parse convert params.content to decoded
    params.content = encodeURIComponent(params.content);

    let sql = `DELETE FROM Comment WHERE anime_id=${params.anime_id} and user_id=${params.user_id} and timestamp=${params.timestamp}`;
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

module.exports.deleteComment = deleteComment;