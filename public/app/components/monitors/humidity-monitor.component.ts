import {Component} from '@angular/core';
import {HumidityOptimizeService, OptimizedHumidity} from "../../services/humidity-optimize.service.ts";
import {AbstractHumidityServie} from "../../services/humidity.service.ts";
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */

@Component({
    selector:'humidity-monitor',
    templateUrl:'app/templates/humidity-monitor.component.html'
})
export class HumidityMonitorComponent{

    currentPercentage: number;

    status:string;

    difference:number;

    message: string;

    constructor(private _humidityOptiService: AbstractHumidityServie){
        this.message = "Data is being collected...";

        this._humidityOptiService.getOptimization().subscribe(
            (current:OptimizedHumidity) => {
                this.currentPercentage = current.currentHumidity;
                this.status = current.status;
                this.difference = current.difference;
                switch (this.status) {
                    case "OK": this.message = "Room humidity is just perfect.\n Enjoy the moment!"; break;
                    case "OVER": this.message = `It's ${this.difference}% of air humidity above the comfort zone.\n May be you want to turn on the Airdryer.`; break;
                    case "BELOW": this.message = `It's ${this.difference}% of air humidity below the comfort zone.\n Steamsprayer is ready to be turn on.`; break;
                    default: this.message = "Unknown status";
                }
            },
            err => {}
        );
    }

}