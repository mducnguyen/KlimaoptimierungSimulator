import {Component} from '@angular/core';
import {TemperatureOptimizeService, CurrentTemperature} from "../../services/temperature-optimize.service.ts";
import {AbstractTemperatureService} from "../../services/temperature.service.ts";
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */

@Component({
    selector: 'temp-monitor',
    templateUrl: 'app/templates/temp-monitor.component.html'
})
export class TempMonitorComponent{

    currentTemp:number;

    status:string;

    difference:number;

    message: string;

    constructor(private temperatureOptimizeService: AbstractTemperatureService) {

        this.message = "Data is being collected...";

        this.temperatureOptimizeService.getOptimization().subscribe(
            (current:CurrentTemperature) => {
                this.currentTemp = current.currentTemp;
                this.status = current.status;
                this.difference = current.difference;
                switch (this.status) {
                    case "OK": this.message = "Room temperature is perfect.\n Enjoy the moment!"; break;
                    case "OVER": this.message = `It's ${this.difference}℃ too hot in here.\nMaybe you want to turn the air conditioner on?`; break;
                    case "BELOW": this.message = `It's ${this.difference}℃ too cold in here.\nMaybe you want to turn the heating on?`; break;
                    default: this.message = "Unknown status";
                }
            },
            err => {}
        );
    }
}