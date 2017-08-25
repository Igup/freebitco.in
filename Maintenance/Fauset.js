/**
 * Created by Igup on 06.08.2017.
 */

if (typeof js !== 'undefined') {
    js.module('Fauset');
    js.include('Folders');
    Folders = new Folders;
    js.include('WorkWithFile');
    WorkWithFile = new WorkWithFile;
}

// --------- Класс-Родитель сборщика с кранов ------------
// Конструктор родителя пишет свойства конкретного объекта
function Fauset() {

    this.enabled = false;
    this.fausetName = '';
    this.fausetURL = '';
    this.fausetLogin = '';
    this.fausetPass = '';
    this.fausetLoginRegistered = false;
    this.fausetEmailVerified = false;
    this.fausetBTCWallet = '';
    this.fausetRefer = '';
    this.captchaSolver = '';
    this.proxy = false;
    this.proxyIP = '1.1.1.1';
    this.proxyPort = '80';
    this.proxyLogin = '123';
    this.proxyPass = '312';
    this.proxyType = 'SOCKS5';
    this.proxyAuthtoken = 'Authtoken';
    this.nextHandleTime = 0;
    this.macrosHeader = function () {
        var header = '';
        header += 'SET !EXTRACT_TEST_POPUP NO' + '\n';
        header += 'SET !ERRORIGNORE  YES' + '\n';
        header += 'SET !TIMEOUT_STEP 0' + '\n';
        header += 'ONERRORDIALOG BUTTON=OK CONTINUE=YES' + '\n';
        if (this.proxy)
            header += 'ONLOGIN USER=${' + this.proxyLogin + '} PASSWORD=${' + this.proxyPass + '}' + '\n';
        //header += 'SET !SINGLESTEP YES' + '\n';
        return header;
    };
    this.captchaSolver = {
        getBalance: function () {
            return false
        },
        getCurrentRate: function () {
            return false
        },
        reportWrongAnswer: function () {
            return false
        },
        getAnswer: function () {
            return false
        }
    };


    this.timeNow = function () {
        //return parseInt(new Date().getTime()/1000);
        return parseInt(Date.now() / 1000);

    };
    this.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
}
// Методы хранятся в прототипе
//todo подключить класс proxy
Fauset.prototype.checkConfig = function () {
    try {
        //todo добавить загрузку конфига из файла
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
    } catch (e) {
        throw e;
    }
};

Fauset.prototype.clearCookies = function () {
    iimPlayCode('CLEAR');
};

Fauset.prototype.loadTempFromFile = function () {
    try {
        if (this.fausetName) {
            var fileName = Folders.datasources + '/' + this.fausetName;
            var obj;
            if (obj = WorkWithFile.readJSONFromFile(fileName)) {
                if (obj.fausetName == this.fausetName) {
                    for (var key in obj) {
                        this[key] = obj[key];
                    }
                }
            }
        }
    } catch (e) {
        this.saveTempToFile({});
        //throw e;
    }
};

Fauset.prototype.saveTempToFile = function (obj) {
    try {
        if (this.fausetName) {
            var fileName = Folders.datasources + '/' + this.fausetName;
            WorkWithFile.saveJSONToFile(fileName, obj);
        }
    } catch (e) {
        throw e;
    }
};




