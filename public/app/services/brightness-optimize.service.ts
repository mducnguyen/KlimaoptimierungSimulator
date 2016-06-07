import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
/**
 * @author DucNguyenMinh
 * @since 20/05/16
 */

@Injectable()
export class BrightnessOptimizeService {

    _brightness_buffer = [];

    currentBrightness;

    constructor(private _http: AuthHttp){}

    getOptimization(): Observable<CurrentBrightness> {
        return new Observable<CurrentBrightness>((observer:Observer<CurrentBrightness>) => {
            setInterval(() => {

                // let url = 'http://localhost:8080/api/brightness_optimization';
                let url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/brightness_optimization';

                if (this._brightness_buffer.length >= 5) {

                    let body = {
                        brightnesses: [
                            {
                                value: this._brightness_buffer[0]
                            },
                            {
                                value: this._brightness_buffer[1]
                            },
                            {
                                value: this._brightness_buffer[2]
                            },
                            {
                                value: this._brightness_buffer[3]
                            },
                            {
                                value: this._brightness_buffer[4]
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
                            status: result.status,
                            currentBrightness: this.currentBrightness,
                            difference: result.difference
                        });
                    });
                }
            }, 2000);
        })
    }

    setBrightness(brightness:number) {
        this.currentBrightness = brightness;
        this._brightness_buffer.unshift(this.currentBrightness);
        // this.notify();
    }

}

export interface CurrentBrightness {

    currentBrightness:number;

    status:string;

    difference:number;
}