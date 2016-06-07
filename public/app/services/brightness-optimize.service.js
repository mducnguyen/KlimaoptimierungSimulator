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
var http_1 = require('@angular/http');
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var Observable_1 = require("rxjs/Observable");
/**
 * @author DucNguyenMinh
 * @since 20/05/16
 */
var BrightnessOptimizeService = (function () {
    function BrightnessOptimizeService(_http) {
        this._http = _http;
        this._brightness_buffer = [];
    }
    BrightnessOptimizeService.prototype.getOptimization = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            setInterval(function () {
                // let url = 'http://localhost:8080/api/brightness_optimization';
                var url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/brightness_optimization';
                if (_this._brightness_buffer.length >= 5) {
                    var body = {
                        brightnesses: [
                            {
                                value: _this._brightness_buffer[0]
                            },
                            {
                                value: _this._brightness_buffer[1]
                            },
                            {
                                value: _this._brightness_buffer[2]
                            },
                            {
                                value: _this._brightness_buffer[3]
                            },
                            {
                                value: _this._brightness_buffer[4]
                            }
                        ]
                    };
                    var options = {
                        headers: new http_1.Headers({ 'Content-Type': 'application/json' })
                    };
                    _this._http.post(url, JSON.stringify(body), options)
                        .map(function (res) {
                        var result = res.json();
                        return result;
                    })
                        .catch(function (err) {
                        var errMsg = err.message || 'Unkown error';
                        return Observable_1.Observable.throw(errMsg);
                    }).subscribe(function (result) {
                        observer.next({
                            status: result.status,
                            currentBrightness: _this.currentBrightness,
                            difference: result.difference
                        });
                    });
                }
            }, 2000);
        });
    };
    BrightnessOptimizeService.prototype.setBrightness = function (brightness) {
        this.currentBrightness = brightness;
        this._brightness_buffer.unshift(this.currentBrightness);
        // this.notify();
    };
    BrightnessOptimizeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BrightnessOptimizeService);
    return BrightnessOptimizeService;
}());
exports.BrightnessOptimizeService = BrightnessOptimizeService;
//# sourceMappingURL=brightness-optimize.service.js.map