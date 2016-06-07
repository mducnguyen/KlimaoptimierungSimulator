import  {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/Rx';
import {Headers} from '@angular/http';
/**
 * @author DucNguyenMinh
 * @since 20/05/16
 */

@Injectable()
export class ColorForTemperatureServie {

    _temp_buffer = [];

    constructor(private _http:AuthHttp) {
    }

    getBestColor():Observable<BestColor> {
        return new Observable<BestColor>((observer:Observer<BestColor>) => {
            setInterval(() => {

                // let url = 'http://localhost:8080/api/temperature_optimization';
                let url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/temperature_optimization';

                if (this._temp_buffer.length >= 5) {

                    let body = {
                        temperatures: [
                            {
                                value: this._temp_buffer[0]
                            },
                            {
                                value: this._temp_buffer[1]
                            },
                            {
                                value: this._temp_buffer[2]
                            },
                            {
                                value: this._temp_buffer[3]
                            },
                            {
                                value: this._temp_buffer[4]
                            }
                        ]

                    };

                    let options = {
                        headers: new Headers({'Content-Type': 'application/json'})
                    };

                    this._http.post(url, JSON.stringify(body), options)
                        .map(res => {
                            let result = res.json();
                            return result;
                        })
                        .catch(err => {
                            let errMsg = err.message || 'Unkown error';
                            return Observable.throw(errMsg);
                        }).subscribe(result => {

                        observer.next({
                            color: result.color
                        });
                    });
                }
            });
        });
    }

    setTemp(temperature:number) {
        this._temp_buffer.unshift(temperature);
    }
}

export interface BestColor {
    color:string;
}