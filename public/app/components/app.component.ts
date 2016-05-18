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

@Component({
    selector: 'app',
    templateUrl: 'app/templates/app.component.html',
    directives: [AuthComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, AuthService, JwtHelper, authProvider, storageProvider, UserService, UserContext]
})
@Routes([
    {path: '/home', component: HomeComponent},
    // {path:'/accounts', component: UsersComponent},
    {path: '/account/setting', component: AccountSettingComponent}
    // {path:'*', component: HomeComponent},
])
export class AppComponent {

    private isLoggin;

    constructor(private _authService:AuthService, private _userContext:UserContext, private _router:Router) {
        this.isLoggin = this.userContext().isLoggedIn();
    }

    public userContext() {
        return this._userContext;
    }

    public logout() {
        this._userContext.setUser(null);
        this._authService.logout();
    }



}