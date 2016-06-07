/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */

import {Component, provide} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS, Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {AuthComponent} from "./auth.component";
import {AUTH_TOKEN, AuthService} from "../services/auth.service";
import {AuthHttp, JwtHelper, AuthConfig} from "angular2-jwt/angular2-jwt";
import {AbstractStorage} from "../services/storage/abstract.storage";
import {DelegateStorage} from "../services/storage/delegate.storage";
import {UserService} from "../services/user.service";
import {UserContext} from "./contexts/user.context";
import {UsersComponent} from "./users.component";
import {HomeComponent} from "./home.component";
import {AccountSettingComponent} from "./account-setting.component";
import {MonitorComponent} from "./monitors/monitor.component";
import {ControllersComponent} from "./controllers.component";
import {BrightnessOptimizeService} from "../services/brightness-optimize.service";
import {HumidityOptimizeService} from "../services/humidity-optimize.service";
import {AbstractTemperatureService} from "../services/temperature.service";
import {TemperaturSensorService} from "../services/temperature-optimize-sensor.service";
import {TemperatureOptimizeService} from "../services/temperature-optimize.service";
import {AbstractBrightnessService} from "../services/brightness.service";
import {BrightnessSensorService} from "../services/brightness-optimize-sensor.service";
import {AbstractHumidityServie} from "../services/humidity.service";
import {HumiditySensorService} from "../services/humidity-optimize-sensor.service";
import {APIUsageComponent} from "./api-usage/api-usage.component";
import {ApiRankingService} from "../services/api-ranking/api-ranking.service";
import {ApiUserUsage} from "../services/api-ranking/api-user-usage";

let authProvider = provide(AuthHttp, {
    useFactory: (http, storage) => {
        return new AuthHttp(new AuthConfig({
            headerName: "x-access-token",
            headerPrefix: " ",
            tokenName: AUTH_TOKEN,
            tokenGetter: () => storage.getItem(AUTH_TOKEN),
            globalHeaders: [{'Content-Type': 'application/json'}],
            noJwtError: true
        }), http);
    },
    deps: [Http, AbstractStorage]
});


let storageProvider = provide(AbstractStorage, {
    useFactory: () => new DelegateStorage(localStorage)
});

let temperatureService = provide(AbstractTemperatureService, {
    useClass: TemperaturSensorService
});

let brightnessService = provide(AbstractBrightnessService, {
    useClass: BrightnessSensorService
});

let humidityService = provide(AbstractHumidityServie, {
    useClass: HumiditySensorService
});

@Component({
    selector: 'app',
    templateUrl: 'app/templates/app.component.html',
    directives: [ControllersComponent, AuthComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, AuthService, JwtHelper, authProvider, storageProvider,
        UserService, UserContext, temperatureService,brightnessService,humidityService, BrightnessOptimizeService,HumidityOptimizeService, 
        TemperatureOptimizeService, ApiRankingService]
})
@Routes([
    {path: '/home', component: HomeComponent},
    {path: '/accounts', component: UsersComponent},
    {path: '/monitor', component: MonitorComponent},
    {path: '/account/setting', component: AccountSettingComponent},
    {path: '/api_usage', component:APIUsageComponent},
    {path: '/api_usage/:id/usage_detail', component: ApiUserUsage},
    {path:'*', component: HomeComponent},
])
export class AppComponent {

    isLoggedIn:boolean;

    constructor(private _authService:AuthService, private _userContext:UserContext, private _router:Router) {
        this.isLoggedIn = this.userContext().isLoggedIn();
        // this.isLoggedIn = true;
    }

    public userContext() {
        return this._userContext;
    }

    public logout() {
        this._userContext.setUser(null);
        this._authService.logout();
    }


}