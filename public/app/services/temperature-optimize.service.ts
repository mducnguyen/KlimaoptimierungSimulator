import  {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import {AbstractTemperatureService} from "./temperature.service";
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */

export interface CurrentTemperature {

    currentTemp:number;

    status:string;

    difference:number;
}

@Injectable()
export class TemperatureOptimizeService extends AbstractTemperatureService{

    currentTemp:number;

    status:string;

    difference:number;

    private _observers = [];

    private _temp_buffer = [];

    constructor(private _http:AuthHttp) {
    }

    public observable():Observable<TemperatureOptimizeService> {
        return new Observable<TemperatureOptimizeService>((observer:Observer<TemperatureOptimizeService>) => {
            this._observers.push(observer);
        });
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
    

    getCurrentTemp():number {
        return this.currentTemp;
    }

    getStatus():string {
        return this.status;
    }

    getDifference():number {
        return this.difference;
    }

    setOptimiztion(status:string, difference:number) {
        this.status = status;
        this.difference = difference;
        this.notify();
    }

    setTemp(temperature:number) {
        this.currentTemp = temperature;
        this._temp_buffer.unshift(this.currentTemp);
        this.notify();
    }

    private notify():void {
        this._observers.forEach(observer => {
            observer.next(this);
        });
    }
}