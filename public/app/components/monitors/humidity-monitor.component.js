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
var humidity_service_1 = require("../../services/humidity.service");
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */
var HumidityMonitorComponent = (function () {
    function HumidityMonitorComponent(_humidityOptiService) {
        var _this = this;
        this._humidityOptiService = _humidityOptiService;
        this.message = "Data is being collected...";
        this._humidityOptiService.getOptimization().subscribe(function (current) {
            _this.currentPercentage = current.currentHumidity;
            _this.status = current.status;
            _this.difference = current.difference;
            switch (_this.status) {
                case "OK":
                    _this.message = "Room humidity is just perfect.\n Enjoy the moment!";
                    break;
                case "OVER":
                    _this.message = "It's " + _this.difference + "% of air humidity above the comfort zone.\n May be you want to turn on the Airdryer.";
                    break;
                case "BELOW":
                    _this.message = "It's " + _this.difference + "% of air humidity below the comfort zone.\n Steamsprayer is ready to be turn on.";
                    break;
                default: _this.message = "Unknown status";
            }
        }, function (err) { });
    }
    HumidityMonitorComponent = __decorate([
        core_1.Component({
            selector: 'humidity-monitor',
            templateUrl: 'app/templates/humidity-monitor.component.html'
        }), 
        __metadata('design:paramtypes', [humidity_service_1.AbstractHumidityServie])
    ], HumidityMonitorComponent);
    return HumidityMonitorComponent;
}());
exports.HumidityMonitorComponent = HumidityMonitorComponent;
//# sourceMappingURL=humidity-monitor.component.js.map