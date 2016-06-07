/**
 * Created by DucNguyenMinh on 25/05/16.
 */

var sensorDaten = require('../repositories/sensor-data.repository');

var tempService = {};

tempService.getCurrentTemp = function (callback) {

    sensorDaten.find({selector:{timestamp:{$gt:0}},sort:[{timestamp:"desc"}],limit:1}, function (err, result) {

        var temp = result.docs[0].temp.replace(',','.');

        var currentTemp = {
            timestamp : result.docs[0].timestamp,
            currentTemp :parseFloat(temp)
        };

        callback (err, currentTemp);
    });
};

module.exports = tempService;