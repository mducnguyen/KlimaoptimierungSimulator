import {Component} from '@angular/core'
import {TemperatureOptimizeService} from "../services/temperature-optimize.service";
import {BrightnessMonitorComponent} from "./monitors/brightness-monitor.component.ts";
import {BrightnessOptimizeService} from "../services/brightness-optimize.service";
import {HumidityOptimizeService} from "../services/humidity-optimize.service";
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */

@Component({
    selector: 'controllers',
    templateUrl: 'app/templates/controllers.component.html'
})
export class ControllersComponent {
    temperature:number;
    brightness:number;
    humidity:number;


    constructor(private _tempService: TemperatureOptimizeService, private _brightnessService: BrightnessOptimizeService, private _humityService: HumidityOptimizeService) {
        this.temperature = 20;
        this.brightness = 60;
        this.humidity = 75;
        
        setInterval(() => {
            this._tempService.setTemp(this.temperature)
        },1000);

        setInterval(() => {
            this._brightnessService.setBrightness(this.brightness);
        },1000);

        setInterval(() => {
            this._humityService.setHumidity(this.humidity);
        },1000);
    }

    public addTemperature(amount:number) {
        this.temperature += amount;
    }
    
    public addBrightness(amount:number) {
        this.brightness += amount;
        if (this.brightness < 0)
            this.brightness = 0;
    }
    
    public addHumidity(amount:number) {
        this.humidity += amount;
        if (this.humidity < 0)
            this.humidity = 0;
    }
}