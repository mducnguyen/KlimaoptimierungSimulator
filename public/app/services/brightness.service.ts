import {Observable} from "rxjs/Observable";
import {CurrentBrightness} from "./brightness-optimize.service";
/**
 * @author DucNguyenMinh
 * @since 25/05/16
 */

export abstract class  AbstractBrightnessService{
    abstract getOptimization(): Observable<CurrentBrightness>;
}