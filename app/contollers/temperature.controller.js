/**
 * Created by DucNguyenMinh on 25/05/16.
 */

var temp_controller = {};
var temperatureService = require('../services/temperature.service');

temp_controller.getCurrentTemp = function (req, res, next) {
    temperatureService.getCurrentTemp(function (err, currentTemp) {
        if(err) {
            throw err;
        }

        res.status(200).json(currentTemp);

    })
};

module.exports = temp_controller;