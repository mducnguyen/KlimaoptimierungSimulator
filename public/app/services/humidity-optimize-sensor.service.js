"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var Observable_1 = require("rxjs/Observable");
var http_1 = require('@angular/http');
var humidity_service_1 = require("./humidity.service");
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */
var HumiditySensorService = (function (_super) {
    __extends(HumiditySensorService, _super);
    function HumiditySensorService(_http) {
        var _this = this;
        _super.call(this);
        this._http = _http;
        this._humidity_buffer = [];
        setInterval(function () {
            _this.fetchHumidity();
        }, 2000);
    }
    HumiditySensorService.prototype.getOptimization = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            setInterval(function () {
                // let url = 'http://localhost:8080/api/humidity_optimization';
                var url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/humidity_optimization';
                if (_this._humidity_buffer.length >= 5) {
                    var body = {
                        humidities: [
                            {
                                value: _this._humidity_buffer[0]
                            },
                            {
                                value: _this._humidity_buffer[1]
                            },
                            {
                                value: _this._humidity_buffer[2]
                            },
                            {
                                value: _this._humidity_buffer[3]
                            },
                            {
                                value: _this._humidity_buffer[4]
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
                            currentHumidity: _this._humidity_buffer[0],
                            difference: result.difference
                        });
                    });
                }
            }, 2000);
        });
    };
    HumiditySensorService.prototype.fetchHumidity = function () {
        var _this = this;
        var options = {
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        };
        this._http.get('/api/humidity', options).map(function (res) {
            var result = res.json();
            return result.currentHumidity;
        }).catch(function (err) {
            var errMsg = err.message || 'Unknown error';
            return Observable_1.Observable.throw(errMsg);
        }).subscribe(function (currentHumidity) {
            _this._humidity_buffer.unshift(currentHumidity);
        }, function (err) { });
    };
    HumiditySensorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], HumiditySensorService);
    return HumiditySensorService;
}(humidity_service_1.AbstractHumidityServie));
exports.HumiditySensorService = HumiditySensorService;
//# sourceMappingURL=humidity-optimize-sensor.service.js.map