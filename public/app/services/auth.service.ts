import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {UserService} from "./user.service";
import {AbstractStorage} from "./storage/abstract.storage";
import {UserContext} from "../components/contexts/user.context";

/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */

@Injectable()
export class AuthService {

    private _authEndpoint: string;


    constructor(private _http: Http, private _jwtHelper: JwtHelper, private _storage:AbstractStorage, private _userService: UserService,private _userContext: UserContext) {
        this._authEndpoint = "http://localhost:8080/api/authenticate";

        this.checkForCurrentUser();
    }

    login(name:String, password:String): Observable<User> {

        let body = {
            username:name,
            password:password,
        };

        let options = {
            headers: new Headers({'Content-Type':'application/json'})
        };
        return this._http.post(this._authEndpoint, JSON.stringify(body), options)
            .flatMap( (res) => {
                    if (res.status == 200) {

                        let body = res.json();
                        let token = body.token;
                        let jwtContent = this._jwtHelper.decodeToken(token);
                        
                        this.saveToken(token);

                        return this._userService.getUser(jwtContent.uri).map( (user:User) => {
                            return user;
                        });

                    } else if (res.status == 401){

                    } else if (res.status == 404) {

                    }
                }
            )
            .catch( err => {
                let errMsg = err.message || 'Unkown error';
                return Observable.throw(errMsg);
            });

    }

    getCurrentUser(token: string):Observable<User>{
        let jwtContent = this._jwtHelper.decodeToken(token);

        return this._userService.getUser(jwtContent.uri).map( (user:User) => {
            return user;
        });
    }

    private saveToken(token:string) {
        this._storage.setItem(AUTH_TOKEN, token);
    }

    logout() {
         this._storage.removeItem(AUTH_TOKEN);
    }

    checkForCurrentUser() {
        var token = this._storage.getItem(AUTH_TOKEN);
        if (token) {
            this.getCurrentUser(token).subscribe(
                user => {
                    this._userContext.setUser(user)
                },
                error => {

                }
            );
        }
    }
}

export var AUTH_TOKEN:string = "jwt_auth_token";