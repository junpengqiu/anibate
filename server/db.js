#!/root/.nvm/versions/node/v10.15.3/bin/node
var mysql = require('mysql');

var con = mysql.createConnection(
    { 
        host:"localhost", 
        user:"harry", 
        password:"testD123!", 
        database:"Anibate"
    }
);

module.exports.con = con;