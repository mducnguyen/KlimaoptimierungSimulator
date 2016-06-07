import {Component} from '@angular/core'
import {TempMonitorComponent} from "./temp-monitor.component.ts";
import {BrightnessMonitorComponent} from "./brightness-monitor.component.ts";
import {HumidityMonitorComponent} from "./humidity-monitor.component.ts";
import {RoomColorMonitorComponent} from "../room-color-monitor.component.ts";
/**
 * @author DucNguyenMinh
 * @since 18/05/16
 */

@Component({
    selector:'simulator',
    templateUrl:'app/templates/monitor.component.html',
    directives:[TempMonitorComponent,BrightnessMonitorComponent,HumidityMonitorComponent,RoomColorMonitorComponent]
})
export class MonitorComponent{}