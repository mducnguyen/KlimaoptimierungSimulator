/**
 * Created by DucNguyenMinh on 26/05/16.
 */


var sensorDaten = require('../repositories/sensor-data.repository');

var humidityService = {};

humidityService.getCurrentHumidity = function (callback) {

    sensorDaten.find({selector:{timestamp:{$gt:0}},sort:[{timestamp:"desc"}],limit:1}, function (err, result) {

        var humi = result.docs[0].humidity.replace(',','.');

        var currentHumidity = {
            timestamp : result.docs[0].timestamp,
            currentHumidity  :parseFloat(humi)
        };

        callback (err, currentHumidity);
    });
};

module.exports = humidityService;