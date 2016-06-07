import {Injectable} from '@angular/core'
import {Observable} from "rxjs/Observable";
import {User, Settings} from "../models/user";
import {Headers} from '@angular/http'
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx'
/**
 * @author DucNguyenMinh
 * @since 13/05/16
 */
@Injectable()
export class UserService {

    constructor(private _http:AuthHttp) {
    }


    getUser(uri:string):Observable<User> {

        // return this._http.get('http://localhost:8080' + uri)
        return this._http.get('http://klimaoptimierungsservice.eu-gb.mybluemix.net' + uri)
            .map(res => {
                if (res.status == 200) {
                    let result = res.json().user;
                    let newUser = new User(result.uri, result.username, result.username, result.admin);
                    return newUser;
                } else if (res.status == 403) {
                    throw new Error("Authorization failed: current user is not allowed to access this resource.");
                } else {
                    throw new Error("Unknown error");
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unknown error';
                return Observable.throw(errMsg);
            });

    }

    getUsers():Observable<User[]> {
        // return this._http.get('http://localhost:8080/api/accounts')
        return this._http.get('http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/accounts')
            .map(res => {
                if (res.status == 200) {
                    let result = res.json().users;
                    let users:User[] = [];
                    result.forEach(function (user) {
                        let newUser = new User(user.username, user.username, user.username, user.admin);
                        users.push(newUser);
                    });
                    return users;
                } else {
                    throw new Error("Unknown Error!");
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }

    getUserSetting(user:User):Observable<Settings> {
        // let url = 'http://localhost:8080' + user.id + '/settings';
        let url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net' + user.id + '/settings';
        return this._http.get(url)
            .map(res => {
                if (res.status == 200) {
                    let settings = res.json().settings;
                    // return settings;
                    return new Settings(settings.temp, settings.brightness, settings.humidity);
                } else {
                    return Observable.throw('Unknown error');
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }

    updateUser(user:User): Observable<any> {
        // let url = 'http://localhost:8080' + user.id + '/settings';
        let url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net' + user.id + '/settings';
        let body = JSON.stringify ({
            settings: user.settings
        });
        let options = {
            headers: new Headers({'Content-Type':'application/json'})
        };
        return this._http.put(url,body,options)
            .map(res => {
                if (res.status == 200) {
                    let result = res.json();
                    return {success:result.success, message:"Update Success"};

                } else {
                    return Observable.throw('Unknown error');
                }
            })
            .catch(err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });
    }
}

