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
var isArray_1 = require("rxjs/util/isArray");
var user_service_1 = require("../user.service");
var http_1 = require('@angular/http');
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */
var ApiRankingService = (function () {
    function ApiRankingService(_http, _userService) {
        this._http = _http;
        this._userService = _userService;
    }
    ApiRankingService.prototype.getApiRanking = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var apis = [];
            // this.getTemperatureServiceUsage()
            //     .map(api => {
            //         apis.push(api);
            //         return this.getBrightnessServiceUsage()
            //             .map(api => {
            //                 apis.push(api);
            //                 return this.getHumidityServiceUsage()
            //                     .map(api => {
            //                         apis.push(api);
            //                         return apis;
            //                     })
            //             });
            //     }).mergeAll().subscribe(apis => {
            //     observer.next(apis);
            // });
            _this.getTemperatureServiceUsage().subscribe(function (api) {
                apis.push(api);
                _this.getBrightnessServiceUsage().subscribe(function (api) {
                    apis.push(api);
                    _this.getHumidityServiceUsage().subscribe(function (api) {
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
    ApiRankingService.prototype.getTemperatureServiceUsage = function () {
        var _this = this;
        var url_frequency = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/occurrence/f/temperature_optimization';
        var url_usage = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/f/temperature_optimization';
        return new Observable_1.Observable(function (observer) {
            var options = {
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            };
            // let url_frequency = 'http://localhost:8080/api/tracking/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/temperature_optimization';
            var frequency = 0;
            var mostActiveUser;
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
                _this._http.get(url_usage, options)
                    .flatMap(function (res) {
                    var result = res.json();
                    if (isArray_1.isArray(result)) {
                        return _this.getMostActiveUser(result);
                    }
                    else {
                        throw new Error;
                    }
                })
                    .catch(function (err) {
                    var errMsg = err.message || 'Unkown error';
                    return Observable_1.Observable.throw(errMsg);
                })
                    .subscribe(function (user) {
                    mostActiveUser = user;
                    observer.next({
                        name: 'temperature_optimization',
                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization',
                        frequency: frequency,
                        mostActiveUser: mostActiveUser
                    });
                });
            });
        });
    };
    ApiRankingService.prototype.getBrightnessServiceUsage = function () {
        var _this = this;
        var url_frequency = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/occurrence/f/brightness_optimization';
        var url_usage = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/f/brightness_optimization';
        return new Observable_1.Observable(function (observer) {
            var options = {
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            };
            // let url_frequency = 'http://localhost:8080/api/tracking/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/temperature_optimization';
            var frequency = 0;
            var mostActiveUser;
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
                _this._http.get(url_usage, options)
                    .flatMap(function (res) {
                    var result = res.json();
                    if (isArray_1.isArray(result)) {
                        return _this.getMostActiveUser(result);
                    }
                    else {
                        throw new Error;
                    }
                })
                    .catch(function (err) {
                    var errMsg = err.message || 'Unkown error';
                    return Observable_1.Observable.throw(errMsg);
                })
                    .subscribe(function (user) {
                    mostActiveUser = user;
                    observer.next({
                        name: 'brightness_optimization',
                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/brightness_optimization',
                        frequency: frequency,
                        mostActiveUser: mostActiveUser
                    });
                });
            });
        });
    };
    ApiRankingService.prototype.getHumidityServiceUsage = function () {
        var _this = this;
        var url_frequency = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/occurrence/f/humidity_optimization';
        var url_usage = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/f/humidity_optimization';
        return new Observable_1.Observable(function (observer) {
            var options = {
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            };
            // let url_frequency = 'http://localhost:8080/api/tracking/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/temperature_optimization';
            var frequency = 0;
            var mostActiveUser;
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
                _this._http.get(url_usage, options)
                    .flatMap(function (res) {
                    var result = res.json();
                    if (isArray_1.isArray(result)) {
                        return _this.getMostActiveUser(result);
                    }
                    else {
                        throw new Error;
                    }
                })
                    .catch(function (err) {
                    var errMsg = err.message || 'Unkown error';
                    return Observable_1.Observable.throw(errMsg);
                })
                    .subscribe(function (user) {
                    mostActiveUser = user;
                    observer.next({
                        name: 'humidity_optimization',
                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/humidity_optimization',
                        frequency: frequency,
                        mostActiveUser: mostActiveUser
                    });
                });
            });
        });
    };
    ApiRankingService.prototype.getMostActiveUser = function (users) {
        var userMap = {};
        users.forEach(function (user) {
            if (userMap[user.user] != undefined) {
                userMap[user.user] += 1;
            }
            else {
                userMap[user.user] = 1;
            }
        });
        var sortedUsers = users.sort(function (user1, user2) {
            if (userMap[user1.user] > userMap[user2.user]) {
                return 1;
            }
            else if (userMap[user1.user] < userMap[user2.user]) {
                return -1;
            }
            else {
                return 0;
            }
        });
        var user = sortedUsers[sortedUsers.length - 1];
        var returnUser;
        // return this._userService.getUser('http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/accounts/' + user.name)
        return this._userService.getUser('/api/accounts/' + user.username)
            .map(function (user) {
            return user;
        });
    };
    ApiRankingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, user_service_1.UserService])
    ], ApiRankingService);
    return ApiRankingService;
}());
exports.ApiRankingService = ApiRankingService;
//# sourceMappingURL=api-ranking.service.js.map