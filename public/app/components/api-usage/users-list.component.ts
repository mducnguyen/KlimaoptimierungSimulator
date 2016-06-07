import {Component} from '@angular/core'
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {UserContext} from "../contexts/user.context";
import {Router,OnActivate,RouteSegment,RouteTree} from '@angular/router';
/**
 * @author DucNguyenMinh
 * @since 27/05/16
 */

@Component({
    selector:'users-list',
    templateUrl: 'app/templates/users-list.component.html'
})

export class UsersListComponent{

    users: User[];

    constructor(private _userService: UserService, private _userContext: UserContext, private _router: Router){
        this._userService.getUsers().subscribe(
            users => this.users = users,
            err => {}
        );
    }

    userContext(): UserContext{
        return this._userContext;
    }

    gotoUsageDetail(username: string){
        this._router.navigate(['api_usage',username]);
    }
}