import {Injectable} from '@angular/core'
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Api} from "../../models/api";
import {Observer} from "rxjs/Observer";
import {UserService} from "../user.service";
import {Headers} from '@angular/http';
import {isArray} from "rxjs/util/isArray";
import {User} from "../../models/user";
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */

@Injectable()
export class ApiUserUsage {

    constructor(private _http:AuthHttp, private _userService:UserService) {
    }

    getApiUsage(user:string):Observable<Api[]> {
        return new Observable<Api[]>((observer:Observer<Api[]>) => {

            let apis:Api[] = [];

            this.getTemperatureServiceUsage(user).subscribe(api => {

                apis.push(api);
                this.getBrightnessServiceUsage(user).subscribe(api => {
                    apis.push(api);
                    this.getHumidityServiceUsage(user).subscribe(api => {
                        apis.push(api);

                        let returnApis = apis.sort((api1, api2) => {
                            if (api1.frequency > api2.frequency) {
                                return 1;
                            } else if (api1.frequency > api2.frequency) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });

                        observer.next(returnApis);
                    })
                });
            });
        });
    }

    private getTemperatureServiceUsage(userId:string):Observable<Api> {
        return new Observable<Api>((observer:Observer<Api>) => {

            let options = {
                headers: new Headers({'Content-Type': 'application/json'})
            };

            let url_frequency = 'http://localhost:8080/api/tracking/' + userId + '/temperature_optimization/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/' + userId + '/temperature_optimization';

            let frequency = 0;
            let currUser:User;
            this._userService.getUser('http://localhost:8080/api/accounts/' + userId).subscribe(user => {

                currUser = user;
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
                            // this._http.get(url_usage, options)
                            //     .map(res => {
                            //         let result = res.json();
                            //
                            //     })
                            //     .catch(err => {
                            //         let errMsg = err.message || 'Unkown error';
                            //         return Observable.throw(errMsg);
                            //     })
                            //     .subscribe(
                            //         user => {

                            observer.next({
                                name: 'temperature_optimization',
                                url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization',
                                frequency: frequency,
                                mostActiveUser: currUser
                            });
                            // }
                            // );
                        }
                    );

            });
        });
    }

    private getBrightnessServiceUsage(userId:string):Observable<Api> {
       return this.getServiceUsage(userId, 'brightness_optimization');
    }

    private getHumidityServiceUsage(userId:string): Observable<Api>{
        return  this.getServiceUsage(userId, 'humidity_optimization');
    }

    private getServiceUsage(userId:string, service: string) :Observable<Api> {
        return new Observable<Api>((observer:Observer<Api>) => {

            let options = {
                headers: new Headers({'Content-Type': 'application/json'})
            };

            let url_frequency = 'http://localhost:8080/api/tracking/' + userId + '/'+service+'/occurence';
            // let url_usage = 'http://localhost:8080/api/tracking/' + userId + '/temperature_optimization';

            let frequency = 0;
            let currUser:User;
            this._userService.getUser('http://localhost:8080/api/accounts/' + userId).subscribe(user => {

                currUser = user;
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


                            observer.next({
                                name: 'temperature_optimization',
                                url: 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization',
                                frequency: frequency,
                                mostActiveUser: currUser
                            });
                        }
                    );

            });
        });
    }
}
