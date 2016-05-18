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
var user_context_1 = require("./contexts/user.context");
var user_service_1 = require("../services/user.service");
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */
var AccountSettingComponent = (function () {
    function AccountSettingComponent(_userContext, _userService) {
        this._userContext = _userContext;
        this._userService = _userService;
    }
    AccountSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this._userContext.getCurrentUser();
        this._userService.getUserSetting(this.currentUser).subscribe(function (settings) {
            _this.currentUser.settings = settings;
        }, function (err) {
        });
    };
    AccountSettingComponent = __decorate([
        core_1.Component({
            selector: 'account-setting',
            templateUrl: 'app/templates/account-setting.component.html'
        }), 
        __metadata('design:paramtypes', [user_context_1.UserContext, user_service_1.UserService])
    ], AccountSettingComponent);
    return AccountSettingComponent;
}());
exports.AccountSettingComponent = AccountSettingComponent;
//# sourceMappingURL=account-setting.component.js.map