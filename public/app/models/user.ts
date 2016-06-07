/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */

export class User {
    id: string;
    name:string;
    email: string;
    admin: boolean;
    settings:Settings;

    constructor(id:string, name:string, email:string, admin:boolean) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
        this.settings = new Settings({max:0,min:0},{max:0,min:0},{max:0,min:0});
    }

    setSettings(settings: Settings){
        this.settings = settings;
    }
}

export class Settings {
    temp: Object;
    brightness: Object;
    humidity:Object;


    constructor(temp:Object, brightness:Object, humidity:Object) {
        this.temp = temp;
        this.brightness = brightness;
        this.humidity = humidity;
    }
}

