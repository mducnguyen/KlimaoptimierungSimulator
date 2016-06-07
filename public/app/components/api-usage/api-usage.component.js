"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var api_ranking_component_1 = require("./api-ranking.component");
var users_list_component_1 = require("./users-list.component");
var router_1 = require('@angular/router');
var api_user_usage_1 = require("./api-user-usage");
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */
var APIUsageComponent = (function () {
    function APIUsageComponent() {
    }
    APIUsageComponent = __decorate([
        core_1.Component({
            selector: 'api-usage',
            templateUrl: 'app/templates/api-usage.component.html',
            directives: [
                api_ranking_component_1.ApiRanking, users_list_component_1.UsersListComponent
            ]
        }),
        router_1.Routes([
            { path: '/api_usage/:id', component: api_user_usage_1.ApiUserUsageComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], APIUsageComponent);
    return APIUsageComponent;
}());
exports.APIUsageComponent = APIUsageComponent;
//# sourceMappingURL=api-usage.component.js.map