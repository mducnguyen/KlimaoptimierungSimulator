/**
 * Created by DucNguyenMinh on 26/05/16.
 */

var brightnesscontroller = {};
var brightnessService = require('../services/brightness.service');

brightnesscontroller.getCurrentBrightness = function (req, res, next) {
    brightnessService.getCurrentBrightness(function (err, currentBrightness) {
        if(err) {
            throw err;
        }

        res.status(200).json(currentBrightness);

    })
};

module.exports = brightnesscontroller;