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
var Observable_1 = require("rxjs/Observable");
var user_1 = require("../models/user");
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
require('rxjs/Rx');
/**
 * @author DucNguyenMinh
 * @since 13/05/16
 */
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getUser = function (uri) {
        return this._http.get('http://localhost:8080' + uri)
            .map(function (res) {
            if (res.status == 200) {
                var result = res.json().user;
                var newUser = new user_1.User(result.uri, result.username, result.username, result.admin);
                return newUser;
            }
            else if (res.status == 403) {
                throw new Error("Authorization failed: current user is not allowed to access this resource.");
            }
            else {
                throw new Error("Unknown error");
            }
        })
            .catch(function (err) {
            var errMsg = err.message || 'Unknown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    UserService.prototype.getUsers = function () {
        return this._http.get('http://localhost:8080/api/accounts')
            .map(function (res) {
            if (res.status == 200) {
                var result = res.json().users;
                var users_1 = [];
                result.forEach(function (user) {
                    var newUser = new user_1.User(user.username, user.username, user.username, user.admin);
                    users_1.push(newUser);
                });
                return users_1;
            }
            else {
                throw new Error("Unknown Error!");
            }
        })
            .catch(function (err) {
            var errMsg = err.message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    UserService.prototype.getUserSetting = function (user) {
        var url = 'http://localhost:8080' + user.id + '/settings';
        return this._http.get(url)
            .map(function (res) {
            if (res.status == 200) {
                var settings = res.json().settings;
                return settings;
            }
            else {
                return Observable_1.Observable.throw('Unknown error');
            }
        })
            .catch(function (err) {
            var errMsg = err.message || 'Unkown error';
            return Observable_1.Observable.throw(errMsg);
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map