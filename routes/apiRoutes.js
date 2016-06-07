/**
 * Created by DucNguyenMinh on 25/05/16.
 */

var express= require('express');
var router = express.Router();
var tempController = require('../app/contollers/temperature.controller');
var brightness = require('../app/contollers/brightness.controller');
var humidity = require('../app/contollers/humidity.controller');

router.options('/*', function (req, res, next) {
    res.send(200);
});

router.get('/temperature', tempController.getCurrentTemp);
router.get('/humidity', humidity.getCurrentHumidity);
router.get('/brightness', brightness.getCurrentBrightness);

module.exports = router;
