"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var temperature_optimize_service_1 = require("../services/temperature-optimize.service");
var brightness_optimize_service_1 = require("../services/brightness-optimize.service");
var humidity_optimize_service_1 = require("../services/humidity-optimize.service");
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */
var ControllersComponent = (function () {
    function ControllersComponent(_tempService, _brightnessService, _humityService) {
        var _this = this;
        this._tempService = _tempService;
        this._brightnessService = _brightnessService;
        this._humityService = _humityService;
        this.temperature = 20;
        this.brightness = 60;
        this.humidity = 75;
        setInterval(function () {
            _this._tempService.setTemp(_this.temperature);
        }, 1000);
        setInterval(function () {
            _this._brightnessService.setBrightness(_this.brightness);
        }, 1000);
        setInterval(function () {
            _this._humityService.setHumidity(_this.humidity);
        }, 1000);
    }
    ControllersComponent.prototype.addTemperature = function (amount) {
        this.temperature += amount;
    };
    ControllersComponent.prototype.addBrightness = function (amount) {
        this.brightness += amount;
        if (this.brightness < 0)
            this.brightness = 0;
    };
    ControllersComponent.prototype.addHumidity = function (amount) {
        this.humidity += amount;
        if (this.humidity < 0)
            this.humidity = 0;
    };
    ControllersComponent = __decorate([
        core_1.Component({
            selector: 'controllers',
            templateUrl: 'app/templates/controllers.component.html'
        }), 
        __metadata('design:paramtypes', [temperature_optimize_service_1.TemperatureOptimizeService, brightness_optimize_service_1.BrightnessOptimizeService, humidity_optimize_service_1.HumidityOptimizeService])
    ], ControllersComponent);
    return ControllersComponent;
}());
exports.ControllersComponent = ControllersComponent;
//# sourceMappingURL=controllers.component.js.map