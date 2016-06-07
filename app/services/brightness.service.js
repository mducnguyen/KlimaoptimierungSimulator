/**
 * Created by DucNguyenMinh on 26/05/16.
 */

var sensorDaten = require('../repositories/sensor-data.repository');

var brightnessService = {};

brightnessService.getCurrentBrightness = function (callback) {

    sensorDaten.find({selector:{timestamp:{$gt:0}},sort:[{timestamp:"desc"}],limit:1}, function (err, result) {

        var brightness = result.docs[0].light.replace(',','.');

        var currentBrightness = {
            timestamp : result.docs[0].timestamp,
            currentBrightness  :parseFloat(brightness)
        };

        callback (err, currentBrightness);
    });
};

module.exports = brightnessService;