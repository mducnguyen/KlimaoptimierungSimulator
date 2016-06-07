/**
 * Created by DucNguyenMinh on 25/05/16.
 */

var configs = require('../../configs/config');
var username = configs.database.development.username;
var password = configs.database.development.password;
var dbname = configs.database.development.databases.sensordaten;
var Cloudant = require('cloudant');

var cloudant = Cloudant({account:username,password:password},function (err, result) {
    if (err) throw err;
});

var sensordata = cloudant.db.use(dbname);

module.exports = sensordata;