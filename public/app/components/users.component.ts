import {Component, OnInit} from '@angular/core'
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {UserContext} from "./contexts/user.context";
/**
 * @author DucNguyenMinh
 * @since 15/05/16
 */

@Component({
    selector: 'users',
    templateUrl: 'app/templates/users.component.html'
})
export class UsersComponent{
    users: User[];

    constructor(private _userService: UserService, private _userContext: UserContext){
        this._userService.getUsers().subscribe(
            users => this.users = users,
            err => {}
        );
    }

    userContext(): UserContext{
        return this._userContext;
    }
    
}