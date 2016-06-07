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
var brightness_service_1 = require("../../services/brightness.service");
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */
var BrightnessMonitorComponent = (function () {
    function BrightnessMonitorComponent(_brightnessOptiService) {
        var _this = this;
        this._brightnessOptiService = _brightnessOptiService;
        this.message = "Data is being collected...";
        this._brightnessOptiService.getOptimization().subscribe(function (current) {
            _this.currentBrightness = current.currentBrightness;
            _this.status = current.status;
            _this.difference = current.difference;
            switch (_this.status) {
                case "OK":
                    _this.message = "The light is just perfect for your eye.\n Enjoy the moment!";
                    break;
                case "OVER":
                    _this.message = "It's " + _this.difference + " lux too bright in here.\nMaybe you want me to turn draw your curtain?";
                    break;
                case "BELOW":
                    _this.message = "It's " + _this.difference + " lux too dark in here.\nDo you want me to turn on some light?";
                    break;
                default: _this.message = "Unknown status";
            }
        }, function (err) { });
    }
    BrightnessMonitorComponent = __decorate([
        core_1.Component({
            selector: 'brightness-monitor',
            templateUrl: 'app/templates/brightness-monitor.component.html'
        }), 
        __metadata('design:paramtypes', [brightness_service_1.AbstractBrightnessService])
    ], BrightnessMonitorComponent);
    return BrightnessMonitorComponent;
}());
exports.BrightnessMonitorComponent = BrightnessMonitorComponent;
//# sourceMappingURL=brightness-monitor.component.js.map