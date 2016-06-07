import {Component} from '@angular/core'
import {UserContext} from "./contexts/user.context";
/**
 * @author DucNguyenMinh
 * @since 15/05/16
 */

@Component({
    selector:'home',
    templateUrl:'app/templates/home.component.html'
})
export class HomeComponent {
    constructor(private _userContext: UserContext){

    }

    userContext(): UserContext{
        return this._userContext;
    }
}