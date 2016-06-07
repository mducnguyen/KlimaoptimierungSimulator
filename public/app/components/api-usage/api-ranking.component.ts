import {Component} from '@angular/core'
import {ApiRankingService} from "../../services/api-ranking/api-ranking.service";
import {UserContext} from "../contexts/user.context";
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */


@Component({
    selector: 'api-ranking',
    templateUrl: 'app/templates/api-ranking.component.html'
})
export class ApiRanking{
    
    rankingList = [];

    constructor(private _rankingService: ApiRankingService, private _userContext: UserContext) {
        this._rankingService.getApiRanking().subscribe(ranklinkList => {
            this.rankingList = ranklinkList;
            console.log(this.rankingList);
        });
    }

    userContext(): UserContext {
        return this._userContext;
    }
    
}