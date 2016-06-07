import {User} from "./user";
/**
 * @author DucNguyenMinh
 * @since 26/05/16
 */


export interface Api{

    name:string;
    url:string;
    frequency: number;
    mostActiveUser: User;

}