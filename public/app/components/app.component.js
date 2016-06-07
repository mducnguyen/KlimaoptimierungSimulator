/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
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
var router_1 = require('@angular/router');
var auth_component_1 = require("./auth.component");
var auth_service_1 = require("../services/auth.service");
var angular2_jwt_1 = require("angular2-jwt/angular2-jwt");
var abstract_storage_1 = require("../services/storage/abstract.storage");
var delegate_storage_1 = require("../services/storage/delegate.storage");
var user_service_1 = require("../services/user.service");
var user_context_1 = require("./contexts/user.context");
var users_component_1 = require("./users.component");
var home_component_1 = require("./home.component");
var account_setting_component_1 = require("./account-setting.component");
var monitor_component_1 = require("./monitors/monitor.component");
var controllers_component_1 = require("./controllers.component");
var brightness_optimize_service_1 = require("../services/brightness-optimize.service");
var humidity_optimize_service_1 = require("../services/humidity-optimize.service");
var temperature_service_1 = require("../services/temperature.service");
var temperature_optimize_sensor_service_1 = require("../services/temperature-optimize-sensor.service");
var temperature_optimize_service_1 = require("../services/temperature-optimize.service");
var brightness_service_1 = require("../services/brightness.service");
var brightness_optimize_sensor_service_1 = require("../services/brightness-optimize-sensor.service");
var humidity_service_1 = require("../services/humidity.service");
var humidity_optimize_sensor_service_1 = require("../services/humidity-optimize-sensor.service");
var api_usage_component_1 = require("./api-usage/api-usage.component");
var api_ranking_service_1 = require("../services/api-ranking/api-ranking.service");
var api_user_usage_1 = require("../services/api-ranking/api-user-usage");
var authProvider = core_1.provide(angular2_jwt_1.AuthHttp, {
    useFactory: function (http, storage) {
        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
            headerName: "x-access-token",
            headerPrefix: " ",
            tokenName: auth_service_1.AUTH_TOKEN,
            tokenGetter: function () { return storage.getItem(auth_service_1.AUTH_TOKEN); },
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }), http);
    },
    deps: [http_1.Http, abstract_storage_1.AbstractStorage]
});
var storageProvider = core_1.provide(abstract_storage_1.AbstractStorage, {
    useFactory: function () { return new delegate_storage_1.DelegateStorage(localStorage); }
});
var temperatureService = core_1.provide(temperature_service_1.AbstractTemperatureService, {
    useClass: temperature_optimize_sensor_service_1.TemperaturSensorService
});
var brightnessService = core_1.provide(brightness_service_1.AbstractBrightnessService, {
    useClass: brightness_optimize_sensor_service_1.BrightnessSensorService
});
var humidityService = core_1.provide(humidity_service_1.AbstractHumidityServie, {
    useClass: humidity_optimize_sensor_service_1.HumiditySensorService
});
var AppComponent = (function () {
    function AppComponent(_authService, _userContext, _router) {
        this._authService = _authService;
        this._userContext = _userContext;
        this._router = _router;
        this.isLoggedIn = this.userContext().isLoggedIn();
        // this.isLoggedIn = true;
    }
    AppComponent.prototype.userContext = function () {
        return this._userContext;
    };
    AppComponent.prototype.logout = function () {
        this._userContext.setUser(null);
        this._authService.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/templates/app.component.html',
            directives: [controllers_component_1.ControllersComponent, auth_component_1.AuthComponent, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, auth_service_1.AuthService, angular2_jwt_1.JwtHelper, authProvider, storageProvider,
                user_service_1.UserService, user_context_1.UserContext, temperatureService, brightnessService, humidityService, brightness_optimize_service_1.BrightnessOptimizeService, humidity_optimize_service_1.HumidityOptimizeService,
                temperature_optimize_service_1.TemperatureOptimizeService, api_ranking_service_1.ApiRankingService]
        }),
        router_1.Routes([
            { path: '/home', component: home_component_1.HomeComponent },
            { path: '/accounts', component: users_component_1.UsersComponent },
            { path: '/monitor', component: monitor_component_1.MonitorComponent },
            { path: '/account/setting', component: account_setting_component_1.AccountSettingComponent },
            { path: '/api_usage', component: api_usage_component_1.APIUsageComponent },
            { path: '/api_usage/:id/usage_detail', component: api_user_usage_1.ApiUserUsage },
            { path: '*', component: home_component_1.HomeComponent },
        ]), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_context_1.UserContext, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map