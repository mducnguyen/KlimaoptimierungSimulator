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
var user_context_1 = require("../contexts/user.context");
var user_service_1 = require("../../services/user.service");
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */
var ApiUserUsageComponent = (function () {
    function ApiUserUsageComponent(_userContext, _userService) {
        this._userContext = _userContext;
        this._userService = _userService;
    }
    ApiUserUsageComponent.prototype.routerOnActivate = function (curr, prev, currTree, prevTree) {
        var _this = this;
        var id = curr.getParam('id');
        this._userService.getUser('/api/accounts/' + id).subscribe(function (user) { return _this.user = user; });
    };
    ApiUserUsageComponent = __decorate([
        core_1.Component({
            selector: 'api-user-usage',
            templateUrl: 'app/templates/api-user-usage.component.html'
        }), 
        __metadata('design:paramtypes', [user_context_1.UserContext, user_service_1.UserService])
    ], ApiUserUsageComponent);
    return ApiUserUsageComponent;
}());
exports.ApiUserUsageComponent = ApiUserUsageComponent;
//# sourceMappingURL=api-user-usage.js.map