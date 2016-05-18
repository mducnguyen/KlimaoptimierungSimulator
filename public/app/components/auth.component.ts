/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
import {Component, OnInit} from '@angular/core';
import {AuthService, AUTH_TOKEN} from "../services/auth.service";
import {UserContext} from "./contexts/user.context";
import {AbstractStorage} from "../services/storage/abstract.storage";

@Component({
    selector: 'auth',
    templateUrl: 'app/templates/auth.component.html'
})
export class AuthComponent {

    name:String;
    password:String;


    constructor(private _authService:AuthService, private _userContext:UserContext, private _storage:AbstractStorage) {
        // this.checkForCurrentUser();
    }

    login() {
        this._authService.login(this.name, this.password).subscribe(
            user => {
                this._userContext.setUser(user)
            },
            error => {

            }
        );
        
        
    }

    // checkForCurrentUser() {
    //     var token = this._storage.getItem(AUTH_TOKEN);
    //     if (token) {
    //         this._authService.getCurrentUser(token).subscribe(
    //             user => {
    //                 this._userContext.setUser(user)
    //             },
    //             error => {
    //
    //             }
    //         );
    //     }
    // }
}
