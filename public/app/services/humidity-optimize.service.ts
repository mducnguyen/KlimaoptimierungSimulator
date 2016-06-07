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
export class HumidityOptimizeService {
     _humidity_buffer  = [];

    constructor(private _http: AuthHttp){}

    getOptimization(): Observable<OptimizedHumidity> {
        return new Observable<OptimizedHumidity>((observer:Observer<OptimizedHumidity>) => {
            setInterval(() => {
                
                // let url = 'http://localhost:8080/api/humidity_optimization';
                let url = 'http://klimaoptimierungsservice.eu-gb.mybluemix.net/api/humidity_optimization';

                if (this._humidity_buffer.length >= 5) {

                    let body = {
                        humidities: [
                            {
                                value: this._humidity_buffer[0]
                            },
                            {
                                value: this._humidity_buffer[1]
                            },
                            {
                                value: this._humidity_buffer[2]
                            },
                            {
                                value: this._humidity_buffer[3]
                            },
                            {
                                value: this._humidity_buffer[4]
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
                            currentHumidity: this._humidity_buffer[0],
                            difference: result.difference
                        });
                    });
                }
            }, 2000);
        });
    }

    setHumidity(humidity:number) {
        this._humidity_buffer.unshift(humidity);
    }

}

export interface OptimizedHumidity{

    currentHumidity:number;

    status:string;

    difference:number;
}