/**
 * Created by Igup on 12.04.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module("Proxy");

//Настройка прокси
Proxy = {

    _pref: function () {
        return Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    }(),

    set: function (ip = '127.0.0.1', port = '0', authtoken = 'test') {
        this._pref.setIntPref("network.proxy.type", 1);
        this._pref.setCharPref("network.proxy.http", ip);
        this._pref.setIntPref("network.proxy.http_port", port);
        this._pref.setCharPref("network.proxy.ssl", ip);
        this._pref.setIntPref("network.proxy.ssl_port", port);
        this._pref.setCharPref("network.proxy.ftp", ip);
        this._pref.setIntPref("network.proxy.ftp_port", port);
        this._pref.setCharPref("network.proxy.socks", ip);
        this._pref.setIntPref("network.proxy.socks_port", port);
        this._pref.setIntPref("network.proxy.socks_version", '5');
        this._pref.setCharPref("extensions.proxyauth.authtoken", authtoken);
        this._pref.setBoolPref("network.proxy.share_proxy_settings", true);
        this._pref.setBoolPref("network.proxy.socks_remote_dns", true);
    }

};