import {Component} from '@angular/core'
import {TempMonitorComponent} from "./temp-monitor.component";
import {BrightnessMonitorComponent} from "./brightness-monitor.component";
import {HumidityMonitorComponent} from "./humidity-monitor.component";
import {RoomColorMonitorComponent} from "./room-color-monitor.component";
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