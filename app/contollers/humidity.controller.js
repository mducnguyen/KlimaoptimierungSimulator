/**
 * Created by DucNguyenMinh on 26/05/16.
 */

var humi_controller = {};
var humidityService = require('../services/humidity.service');

humi_controller.getCurrentHumidity = function (req, res, next) {
    humidityService.getCurrentHumidity(function (err, currentHumi) {
        if(err) {
            throw err;
        }

        res.status(200).json(currentHumi);

    })
};

module.exports = humi_controller;