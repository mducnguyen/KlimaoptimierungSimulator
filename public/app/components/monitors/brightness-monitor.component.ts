import {Component} from '@angular/core';
import {BrightnessOptimizeService, CurrentBrightness} from "../../services/brightness-optimize.service.ts";
import {AbstractBrightnessService} from "../../services/brightness.service.ts";
/**
 * @author DucNguyenMinh
 * @since 19/05/16
 */

@Component({
    selector:'brightness-monitor',
    templateUrl:'app/templates/brightness-monitor.component.html'
})
export class BrightnessMonitorComponent{

    currentBrightness: number;

    status:string;

    difference:number;

    message: string;

    constructor(private _brightnessOptiService: AbstractBrightnessService){
        this.message = "Data is being collected...";

        this._brightnessOptiService.getOptimization().subscribe(
            (current:CurrentBrightness) => {
                this.currentBrightness = current.currentBrightness;
                this.status = current.status;
                this.difference = current.difference;
                switch (this.status) {
                    case "OK": this.message = "The light is just perfect for your eye.\n Enjoy the moment!"; break;
                    case "OVER": this.message = `It's ${this.difference} lux too bright in here.\nMaybe you want me to turn draw your curtain?`; break;
                    case "BELOW": this.message = `It's ${this.difference} lux too dark in here.\nDo you want me to turn on some light?`; break;
                    default: this.message = "Unknown status";
                }
            },
            err => {}
        );
    }



}