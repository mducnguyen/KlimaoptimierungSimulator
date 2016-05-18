import {Component, OnInit} from '@angular/core';
import {UserContext} from "./contexts/user.context";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */

@Component({
    selector: 'account-setting',
    templateUrl: 'app/templates/account-setting.component.html'
})
export class AccountSettingComponent implements OnInit {

    currentUser:User;

    ngOnInit() {
        this.currentUser = this._userContext.getCurrentUser();
        this._userService.getUserSetting(this.currentUser).subscribe(
            settings => {
                this.currentUser.settings = settings;
            },

            err => {
            });
    }

    constructor(private _userContext:UserContext, private _userService:UserService) {}
}


