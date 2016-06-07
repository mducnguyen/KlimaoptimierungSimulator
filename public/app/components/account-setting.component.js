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
var user_1 = require("../models/user");
var user_service_1 = require("../services/user.service");
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */
var AccountSettingComponent = (function () {
    function AccountSettingComponent(_userContext, _userService) {
        var _this = this;
        this._userContext = _userContext;
        this._userService = _userService;
        this.currentUser = this._userContext.getCurrentUser();
        if (this.currentUser) {
            this._userService.getUserSetting(this.currentUser).subscribe(function (settings) {
                _this.currentUser.setSettings(settings);
                _this.model.setSettings(_this.currentUser.settings);
            }, function (err) {
            });
            this.model = new user_1.User(this.currentUser.id, this.currentUser.name, this.currentUser.email, this.currentUser.admin);
            this.model.setSettings(this.currentUser.settings);
        }
    }
    AccountSettingComponent.prototype.ngOnInit = function () {
    };
    AccountSettingComponent.prototype.userContext = function () {
        return this._userContext;
    };
    AccountSettingComponent.prototype.saveAccountSettings = function () {
        var _this = this;
        this._userService.updateUser(this.model).subscribe(function (alert) { _this.confirmMsg = { success: alert.success, message: alert.message }; }, function (err) { _this.confirmMsg = { success: false, message: "Update Failed" }; });
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