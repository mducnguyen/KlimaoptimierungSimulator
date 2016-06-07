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
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var Observable_1 = require("rxjs/Observable");
var user_service_1 = require("../user.service");
var http_1 = require('@angular/http');
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */
var ApiUserUsage = (function () {
    function ApiUserUsage(_http, _userService) {
        this._http = _http;
        this._userService = _userService;
    }
    ApiUserUsage.prototype.getApiUsage = function (user) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var apis = [];
            _this.getTemperatureServiceUsage(user).subscribe(function (api) {
                apis.push(api);
                _this.getBrightnessServiceUsage(user).subscribe(function (api) {
                    apis.push(api);
                    _this.getHumidityServiceUsage(user).subscribe(function (api) {
                        apis.push(api);
                        var returnApis = apis.sort(function (api1, api2) {
                            if (api1.frequency > api2.frequency) {
                                return 1;
                            }
                            else if (api1.frequency > api2.frequency) {
                                return -1;
                            }
                            else {
                                return 0;
                            }
                        });
                        observer.next(returnApis);
                    });
                });
            });
        });
    };
    ApiUserUsage.prototype.getTemperatureServiceUsage = function (userId) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var options = {
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            };
            var url_frequency = 'http://localhost:8080/api/tracking/' + userId + '/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/' + userId + '/temperature_optimization';
            var frequency = 0;
            var currUser;
            _this._userService.getUser('http://localhost:8080/api/accounts/' + userId).subscribe(function (user) {
                currUser = user;
                _this._http.get(url_frequency, options)
                    .map(function (res) {
                    var result = res.json();
                    return result.frequency;
                })
                    .catch(function (err) {
                    var errMsg = err.message || 'Unkown error';
                    return Observable_1.Observable.throw(errMsg);
                })
                    .subscribe(function (result) {
                    frequency = result;
                    // this._http.get(url_usage, options)
                    //     .map(res => {
                    //         let result = res.json();
                    //
                    //     })
                    //     .catch(err => {
                    //         let errMsg = err.message || 'Unkown error';
                    //         return Observable.throw(errMsg);
                    //     })
                    //     .subscribe(
                    //         user => {
                    observer.next({
                        name: 'temperature_optimization',
                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization',
                        frequency: frequency,
                        mostActiveUser: currUser
                    });
                    // }
                    // );
                });
            });
        });
    };
    ApiUserUsage.prototype.getBrightnessServiceUsage = function (userId) {
        return this.getServiceUsage(userId, 'brightness_optimization');
    };
    ApiUserUsage.prototype.getHumidityServiceUsage = function (userId) {
        return this.getServiceUsage(userId, 'humidity_optimization');
    };
    ApiUserUsage.prototype.getServiceUsage = function (userId, service) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var options = {
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            };
            var url_frequency = 'http://localhost:8080/api/tracking/' + userId + '/' + service + '/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/' + userId + '/temperature_optimization';
            var frequency = 0;
            var currUser;
            _this._userService.getUser('http://localhost:8080/api/accounts/' + userId).subscribe(function (user) {
                currUser = user;
                _this._http.get(url_frequency, options)
                    .map(function (res) {
                    var result = res.json();
                    return result.frequency;
                })
                    .catch(function (err) {
                    var errMsg = err.message || 'Unkown error';
                    return Observable_1.Observable.throw(errMsg);
                })
                    .subscribe(function (result) {
                    frequency = result;
                    observer.next({
                        name: 'temperature_optimization',
                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization',
                        frequency: frequency,
                        mostActiveUser: currUser
                    });
                });
            });
        });
    };
    ApiUserUsage = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, user_service_1.UserService])
    ], ApiUserUsage);
    return ApiUserUsage;
}());
exports.ApiUserUsage = ApiUserUsage;
//# sourceMappingURL=api-user-usage.js.map