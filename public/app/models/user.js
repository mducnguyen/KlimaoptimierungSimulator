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
        this.settings = new Settings({ max: 0, min: 0 }, { max: 0, min: 0 }, { max: 0, min: 0 });
    }
    User.prototype.setSettings = function (settings) {
        this.settings = settings;
    };
    return User;
}());
exports.User = User;
var Settings = (function () {
    function Settings(temp, brightness, humidity) {
        this.temp = temp;
        this.brightness = brightness;
        this.humidity = humidity;
    }
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=user.js.map