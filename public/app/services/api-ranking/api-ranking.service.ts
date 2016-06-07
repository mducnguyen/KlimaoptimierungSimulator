import {Injectable} from '@angular/core'
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Api} from "../../models/api";
import {Observer} from "rxjs/Observer";
import {User} from "../../models/user";
import {isArray} from "rxjs/util/isArray";
import {map} from "rxjs/operator/map";
import {UserService} from "../user.service";
import {Headers} from '@angular/http';
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */


@Injectable()
export class ApiRankingService {

    constructor(private _http:AuthHttp, private _userService:UserService) {
    }

    getApiRanking():Observable<Api[]> {

        return new Observable<Api[]>((observer:Observer<Api[]>) => {

            let apis:Api[] = [];


            // this.getTemperatureServiceUsage()
            //     .map(api => {
            //         apis.push(api);
            //         return this.getBrightnessServiceUsage()
            //             .map(api => {
            //                 apis.push(api);
            //                 return this.getHumidityServiceUsage()
            //                     .map(api => {
            //                         apis.push(api);
            //                         return apis;
            //                     })
            //             });
            //     }).mergeAll().subscribe(apis => {
            //     observer.next(apis);
            // });

            this.getTemperatureServiceUsage().subscribe(api => {

                apis.push(api);
                this.getBrightnessServiceUsage().subscribe(api => {
                    apis.push(api);
                    this.getHumidityServiceUsage().subscribe(api => {
                        apis.push(api);

                        let returnApis = apis.sort((api1,api2) => {
                            if (api1.frequency > api2.frequency){
                                return 1;
                            } else if (api1.frequency > api2.frequency) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });

                        observer.next( returnApis);
                    })
                });
            });
        });
    }

    private getTemperatureServiceUsage():Observable<Api> {

        let url_frequency = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/occurrence/f/temperature_optimization';
        let url_usage = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/f/temperature_optimization';

        return new Observable<Api>((observer:Observer<Api>) => {

            let options = {
                headers: new Headers({'Content-Type': 'application/json'})
            };

            // let url_frequency = 'http://localhost:8080/api/tracking/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/temperature_optimization';

            let frequency = 0;
            let mostActiveUser:User;

            this._http.get(url_frequency, options)
                .map(res => {
                    let result = res.json();
                    return result.frequency;
                })
                .catch(err => {
                    let errMsg = err.message || 'Unkown error';
                    return Observable.throw(errMsg);
                })
                .subscribe(
                    result => {
                        frequency = result;
                        this._http.get(url_usage, options)
                            .flatMap(res => {
                                let result = res.json();
                                if (isArray(result)) {
                                    return this.getMostActiveUser(result);
                                } else {
                                    throw new Error;
                                }
                            })
                            .catch(err => {
                                let errMsg = err.message || 'Unkown error';
                                return Observable.throw(errMsg);
                            })
                            .subscribe(
                                user => {
                                    mostActiveUser = user;

                                    observer.next({
                                        name: 'temperature_optimization',
                                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization',
                                        frequency: frequency,
                                        mostActiveUser: mostActiveUser
                                    });
                                }
                            );
                    }
                );
        });

    }

    private getBrightnessServiceUsage():Observable<Api> {

        let url_frequency = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/occurrence/f/brightness_optimization';
        let url_usage = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/f/brightness_optimization';

        return new Observable<Api>((observer:Observer<Api>) => {

            let options = {
                headers: new Headers({'Content-Type': 'application/json'})
            };

            // let url_frequency = 'http://localhost:8080/api/tracking/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/temperature_optimization';

            let frequency = 0;
            let mostActiveUser:User;

            this._http.get(url_frequency, options)
                .map(res => {
                    let result = res.json();
                    return result.frequency;
                })
                .catch(err => {
                    let errMsg = err.message || 'Unkown error';
                    return Observable.throw(errMsg);
                })
                .subscribe(
                    result => {
                        frequency = result;
                        this._http.get(url_usage, options)
                            .flatMap(res => {
                                let result = res.json();
                                if (isArray(result)) {
                                    return this.getMostActiveUser(result);
                                } else {
                                    throw new Error;
                                }
                            })
                            .catch(err => {
                                let errMsg = err.message || 'Unkown error';
                                return Observable.throw(errMsg);
                            })
                            .subscribe(
                                user => {
                                    mostActiveUser = user;

                                    observer.next({
                                        name: 'brightness_optimization',
                                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/brightness_optimization',
                                        frequency: frequency,
                                        mostActiveUser: mostActiveUser
                                    });
                                }
                            );
                    }
                );
        });

    }

    private getHumidityServiceUsage():Observable<Api> {

        let url_frequency = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/occurrence/f/humidity_optimization';
        let url_usage = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/tracking/f/humidity_optimization';

        return new Observable<Api>((observer:Observer<Api>) => {

            let options = {
                headers: new Headers({'Content-Type': 'application/json'})
            };

            // let url_frequency = 'http://localhost:8080/api/tracking/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/temperature_optimization';

            let frequency = 0;
            let mostActiveUser:User;

            this._http.get(url_frequency, options)
                .map(res => {
                    let result = res.json();
                    return result.frequency;
                })
                .catch(err => {
                    let errMsg = err.message || 'Unkown error';
                    return Observable.throw(errMsg);
                })
                .subscribe(
                    result => {
                        frequency = result;
                        this._http.get(url_usage, options)
                            .flatMap(res => {
                                let result = res.json();
                                if (isArray(result)) {
                                    return this.getMostActiveUser(result);
                                } else {
                                    throw new Error;
                                }
                            })
                            .catch(err => {
                                let errMsg = err.message || 'Unkown error';
                                return Observable.throw(errMsg);
                            })
                            .subscribe(
                                user => {
                                    mostActiveUser = user;

                                    observer.next({
                                        name: 'humidity_optimization',
                                        url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/humidity_optimization',
                                        frequency: frequency,
                                        mostActiveUser: mostActiveUser
                                    });
                                }
                            );
                    }
                );
        });

    }

    private getMostActiveUser(users:any):Observable<User> {


        let userMap:{[s:string]:number} = {};


        users.forEach(user => {
            if (userMap[user.user] != undefined) {
                userMap[user.user] += 1;
            } else {
                userMap[user.user] = 1;
            }
        });

        let sortedUsers = users.sort((user1, user2) => {

            if (userMap[user1.user] > userMap[user2.user]) {
                return 1;
            } else if (userMap[user1.user] < userMap[user2.user]) {
                return -1;
            } else {
                return 0;
            }
        });

        let user = sortedUsers[sortedUsers.length - 1];
        let returnUser:User;
        // return this._userService.getUser('http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/accounts/' + user.name)
        return this._userService.getUser('/api/accounts/' + user.username)
            .map(user => {
                return user;
            });
    }


}