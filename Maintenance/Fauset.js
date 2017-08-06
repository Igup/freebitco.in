/**
 * Created by Igup on 06.08.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('Fauset');

// --------- Класс-Родитель сборщика с кранов ------------
// Конструктор родителя пишет свойства конкретного объекта
function Fauset() {

    this.enable = false;
    this.fausetName = '';
    this.fausetURL = '';
    this.fausetLogin = '';
    this.fausetPass = '';
    this.fausetBTC = '';
    this.fausetRefer = '';
    this.proxy = false;
    this.proxyIP = '1.1.1.1';
    this.proxyPort = '80';
    this.proxyLogin = '123';
    this.proxyPass = '312';
    this.proxyAuthtoken = 'test';
    this.cookie = false;
    this.fausetMaxRate = 0;
    this.fausetBalance = 0;
    this.lastSbor = 0;
    this.macrosHeader = '';
    this.macrosHeader += 'SET !EXTRACT_TEST_POPUP NO' + '\n';
    this.macrosHeader += 'SET !ERRORIGNORE  YES' + '\n';
    this.macrosHeader += 'SET !TIMEOUT_STEP 0' + '\n';
    this.macrosHeader += 'ONERRORDIALOG BUTTON=OK CONTINUE=YES' + '\n';
    this.macrosHeader += 'ONLOGIN USER=${' + this.proxyLogin + '} PASSWORD=${' + this.proxyPass + '}' + '\n';
    //this.macrosHeader += 'SET !SINGLESTEP YES' + '\n';

}
// Методы хранятся в прототипе
Fauset.prototype.getCookies = function () {

    this.cookies = window.document.cookie.split(';');

};
Fauset.prototype.setCookies = function () {

    if (this.cookies) {
        for (var i = 0; i < this.cookies.length; i++) {
            window.document.cookie = this.cookies[i];
        }
    }

};
Fauset.prototype.clearCookies = function () {
    iimPlayCode('CLEAR');
};
//todo подключить класс proxy
/**
 Fauset.prototype.setProxy = function () {

    if (this.proxyIP && this.proxyPort && this.proxyAuthtoken) {
        Proxy.set(this.proxyIP, this.proxyPort, this.proxyAuthtoken);
    } else {
        Proxy.setDefaultProxy();
    }

}
 Fauset.prototype.setDefaultProxy = function () {

    //Proxy.set();
}
 */