import {Component} from '@angular/core'
import {User} from "../../models/user";
import {UserContext} from "../contexts/user.context";
import {Api} from "../../models/api";
import {Router,OnActivate,RouteSegment,RouteTree} from '@angular/router';
import {UserService} from "../../services/user.service";
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */

@Component({
    selector:'api-user-usage',
    templateUrl :'app/templates/api-user-usage.component.html'
})
export class ApiUserUsageComponent implements OnActivate{

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        let id = curr.getParam('id');
        this._userService.getUser('/api/accounts/'+id).subscribe( user => this.user = user);
    }

    user: User;

    apis: Api[];

    constructor(private _userContext: UserContext, private _userService: UserService){}
}