import {Observable} from "rxjs/Observable";
import {OptimizedHumidity} from "./humidity-optimize.service";
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */


export abstract class  AbstractHumidityServie{
    abstract getOptimization(): Observable<OptimizedHumidity>;
}