import {Component} from '@angular/core'
import {ApiRanking} from "./api-ranking.component";
import {ApiUserUsage} from "../../services/api-ranking/api-user-usage";
import {UsersListComponent} from "./users-list.component";
import {ROUTER_PROVIDERS, Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ApiUserUsageComponent} from "./api-user-usage";
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */

@Component({
    selector:'api-usage',
    templateUrl:'app/templates/api-usage.component.html',
    directives: [
        ApiRanking, UsersListComponent
    ]
})
@Routes([
    {path: '/api_usage/:id', component: ApiUserUsageComponent }
])
export class APIUsageComponent{

}