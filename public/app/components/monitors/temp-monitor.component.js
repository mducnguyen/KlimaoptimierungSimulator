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
var temperature_service_1 = require("../services/temperature.service");
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */
var TempMonitorComponent = (function () {
    function TempMonitorComponent(temperatureOptimizeService) {
        var _this = this;
        this.temperatureOptimizeService = temperatureOptimizeService;
        this.message = "Data is being collected...";
        this.temperatureOptimizeService.getOptimization().subscribe(function (current) {
            _this.currentTemp = current.currentTemp;
            _this.status = current.status;
            _this.difference = current.difference;
            switch (_this.status) {
                case "OK":
                    _this.message = "Room temperature is perfect.\n Enjoy the moment!";
                    break;
                case "OVER":
                    _this.message = "It's " + _this.difference + "\u2103 too hot in here.\nMaybe you want to turn the air conditioner on?";
                    break;
                case "BELOW":
                    _this.message = "It's " + _this.difference + "\u2103 too cold in here.\nMaybe you want to turn the heating on?";
                    break;
                default: _this.message = "Unknown status";
            }
        }, function (err) { });
    }
    TempMonitorComponent = __decorate([
        core_1.Component({
            selector: 'temp-monitor',
            templateUrl: 'app/templates/temp-monitor.component.html'
        }), 
        __metadata('design:paramtypes', [temperature_service_1.AbstractTemperatureService])
    ], TempMonitorComponent);
    return TempMonitorComponent;
}());
exports.TempMonitorComponent = TempMonitorComponent;
//# sourceMappingURL=temp-monitor.component.js.map