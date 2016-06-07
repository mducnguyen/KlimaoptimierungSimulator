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
var temp_monitor_component_1 = require("./temp-monitor.component.ts");
var brightness_monitor_component_1 = require("./brightness-monitor.component.ts");
var humidity_monitor_component_1 = require("./humidity-monitor.component.ts");
var room_color_monitor_component_1 = require("./room-color-monitor.component");
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */
var MonitorComponent = (function () {
    function MonitorComponent() {
    }
    MonitorComponent = __decorate([
        core_1.Component({
            selector: 'simulator',
            templateUrl: 'app/templates/monitor.component.html',
            directives: [temp_monitor_component_1.TempMonitorComponent, brightness_monitor_component_1.BrightnessMonitorComponent, humidity_monitor_component_1.HumidityMonitorComponent, room_color_monitor_component_1.RoomColorMonitorComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MonitorComponent);
    return MonitorComponent;
}());
exports.MonitorComponent = MonitorComponent;
//# sourceMappingURL=monitor.component.js.map