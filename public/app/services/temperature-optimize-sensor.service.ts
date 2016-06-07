import {Injectable} from '@angular/core'
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {AbstractTemperatureService} from "./temperature.service";
import {CurrentTemperature} from "./temperature-optimize.service";
import {Observer} from "rxjs/Observer";
/**
 * @author DucNguyenMinh
 * @since 25/05/16
 */


@Injectable()
export class TemperaturSensorService extends AbstractTemperatureService {

    _temp_buffer = [];

    currentTemp:number;

    constructor(private _http:AuthHttp) {
        super();
        setInterval(()=> {
            this.fetchTemperature();
        }, 2000);
    }

    getOptimization():Observable<CurrentTemperature> {
        return new Observable<CurrentTemperature>((observer:Observer<CurrentTemperature>) => {

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
                            status: result.status,
                            currentTemp: this.currentTemp,
                            difference: result.difference
                        });
                    });
                }
            }, 2000);
        });
    }

    private fetchTemperature() {
        let options = {
            headers: new Headers({'Content-Type': 'application/json'})
        };

        this._http.get('/api/temperature', options).map(
            res => {
                let result = res.json();
                return result.currentTemp;
            }
        ).catch(err => {
                let errMsg = err.message || 'Unknown error';
                return Observable.throw(errMsg);
            }
        ).subscribe(
            currentTemp => {
                this._temp_buffer.unshift(currentTemp);
                this.currentTemp = currentTemp;
            },
            err => {}
        );
    }
}