import {Observable} from "rxjs/Observable";
import {CurrentTemperature} from "./temperature-optimize.service";
/**
 * @author DucNguyenMinh
 * @since 25/05/16
 */

export abstract class AbstractTemperatureService {
    abstract getOptimization(): Observable<CurrentTemperature>;
}