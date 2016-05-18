/**
 * @author DucNguyenMinh
 * @since 12/05/16
 */
"use strict";
var User = (function () {
    function User(id, name, email, admin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
    }
    return User;
}());
exports.User = User;
var Settings = (function () {
    function Settings(temperature, brightness, humidity) {
        this.temperature = temperature;
        this.brightness = brightness;
        this.humidity = humidity;
    }
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=user.js.map