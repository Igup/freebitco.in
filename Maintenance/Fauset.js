/**
 * Created by Igup on 06.08.2017.
 */

if (typeof js !== 'undefined') {
    js.module('Fauset');
    js.include('WorkWithFile');
    WorkWithFile = new WorkWithFile
}

// --------- Класс-Родитель сборщика с кранов ------------
// Конструктор родителя пишет свойства конкретного объекта
function Fauset() {

    this.enabled = false;
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
Fauset.prototype.checkConfig = function () {
    if (!this.fausetName) {
        throw new Error('Fauset Name not defined.');
    } else if (!this.enabled) {
        throw new Error(this.fausetName + ' not enabled.');
    } else if (!this.fausetURL) {
        throw new Error('Fauset URL not defined for ' + this.fausetName + '.');
    } else if (!this.fausetLogin) {
        throw new Error('Fauset Login not defined for ' + this.fausetName + '.');
    } else if (!this.fausetPass) {
        throw new Error('Fauset Pass not defined for ' + this.fausetName + '.');
    } else if (!this.fausetBTCWallet) {
        throw new Error('Fauset BTC Wallet not defined for ' + this.fausetName + '.');
    } else if (!this.fausetRefer) {
        throw new Error('Fauset Refer not defined for ' + this.fausetName + '.');
    } else {
        return true;
    }
};

Fauset.prototype.clearCookies = function () {
    iimPlayCode('CLEAR');
};

Fauset.prototype.loadFromFile = function (fileName) {
    var obj = false;
    if (obj = WorkWithFile.readJSONFromFile(fileName)) {
        if (obj = obj[this.fausetName]) {
            for (var key in obj) {
                this[key] = obj[key];
            }
        }
    }
};

Fauset.prototype.saveToFile = function (fileName) {
    var save = {};
    save[this.fausetName] = {lastSbor: this.lastSbor};
    WorkWithFile.saveJSONToFile(fileName, save);
};



