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

    confirmMsg: Object;
    currentUser:User;
    model : User;

    ngOnInit() {

    }

    constructor(private _userContext:UserContext, private _userService:UserService) {
        this.currentUser = this._userContext.getCurrentUser();
        if (this.currentUser) {
            this._userService.getUserSetting(this.currentUser).subscribe(
                settings => {
                    this.currentUser.setSettings(settings);
                    this.model.setSettings(this.currentUser.settings);
                },
                err => {
                });
            this.model = new User(this.currentUser.id,this.currentUser.name, this.currentUser.email, this.currentUser.admin);
            this.model.setSettings(this.currentUser.settings);
        }
    }

    userContext():UserContext {
        return this._userContext;
    }

    saveAccountSettings() {
        this._userService.updateUser(this.model).subscribe(
            alert => { this.confirmMsg = { success: alert.success, message:alert.message}},
            err => {this.confirmMsg = {success: false, message:"Update Failed"}}
        );
    }
}


