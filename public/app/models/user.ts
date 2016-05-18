/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */

export class User {
    id: string;
    name:string;
    email: string;
    admin: boolean;
    settings:any;

    constructor(id:string, name:string, email:string, admin:boolean) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
    }

}

export class Settings {
    temperature: any;
    brightness: any;
    humidity:any;


    constructor(temperature:any, brightness:any, humidity:any) {
        this.temperature = temperature;
        this.brightness = brightness;
        this.humidity = humidity;
    }
}

