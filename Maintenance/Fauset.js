/**
 * Created by Igup on 06.08.2017.
 */

if (typeof js !== 'undefined') {
    js.module('Fauset');
    js.include('WorkWithFile');

}

// --------- Класс-Родитель сборщика с кранов ------------
// Конструктор родителя пишет свойства конкретного объекта
function Fauset() {

    this.enable = false;
    this.fausetName = '';
    this.fausetURL = '';
    this.fausetLogin = '';
    this.fausetPass = '';
    this.fausetBTCWallet = '';
    this.fausetRefer = '';
    this.proxy = false;
    this.proxyIP = '1.1.1.1';
    this.proxyPort = '80';
    this.proxyLogin = '123';
    this.proxyPass = '312';
    this.proxyType = 'SOCKS5';
    this.proxyAuthtoken = 'Authtoken';
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
//todo подключить класс proxy
Fauset.prototype.clearCookies = function () {
    iimPlayCode('CLEAR');
};
Fauset.prototype.load_FromFile = function (fileName) {
    WorkWithFile = new WorkWithFile;
    var obj = WorkWithFile.readJSONFromFile(fileName).fausetName;
    for (var key in obj) {
        this[key] = obj[key]
    }
};



