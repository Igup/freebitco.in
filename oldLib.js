/**
 * Created by sun on 05.08.2017.
 */
'use strict'

var n = '\n';

//Управление ТАБами
var Tabs = {
    _browser: function () {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
            .getService(Components.interfaces.nsIWindowMediator);
        return wm.getMostRecentWindow("navigator:browser").gBrowser;
    }
    (),

    go: function (tabIndex) {
        this._browser.selectedTab = this._browser.tabContainer.childNodes[tabIndex - 1];
    }

};

//Выставление настроек прокси
var Proxy = {

    _pref: function () {
        var pb = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
        return pb;
    }
    (),
    set: function (ip = '127.0.0.1', port = '0', authtoken = 'test') {
        this._pref.setIntPref("network.proxy.type", 1);
        this._pref.setCharPref("network.proxy.http", ip);
        this._pref.setIntPref("network.proxy.http_port", port);
        this._pref.setCharPref("network.proxy.ssl", ip);
        this._pref.setIntPref("network.proxy.ssl_port", port);
        this._pref.setCharPref("network.proxy.ftp", ip)
        this._pref.setIntPref("network.proxy.ftp_port", port);
        this._pref.setCharPref("network.proxy.socks", ip);
        this._pref.setIntPref("network.proxy.socks_port", port);
        this._pref.setIntPref("network.proxy.socks_version", '5');
        this._pref.setCharPref("extensions.proxyauth.authtoken", authtoken);
        this._pref.setBoolPref("network.proxy.share_proxy_settings", true);
        this._pref.setBoolPref("network.proxy.socks_remote_dns", true);
    }

};

//Определение путей
function Folders() {

    var ds = function () {
        iimPlayCode(`SET !EXTRACT {{!FOLDER_DATASOURCE}}`);
        return iimGetExtract();
    }
    ();
    var iMacros = ds.substring(0, ds.toLowerCase().indexOf('datasources'));

    this.downloads = iMacros + "Downloads";
    this.macros = iMacros + "Macros";
    this.datasources = ds;
}

//База с ответами, конструктор для объекта
function BaseOfAnswers () = {

}
//Меняем местами ключ и значение, чтобы было удобнее искать ответы
BaseOfAnswers.prototype.valueToKey = function () {
    for (var key in this) {
        var val = this.key;
        this.val = key;
        delete this.key;
    }
}

// --------- Класс для решения капчи SolveMedia ------------
// Конструктор родителя пишет свойства конкретного объекта
function SolveMediaCaptha() {

    this.apiKey			 = false;
    this.folders		 = false;
    this.macrosHeader	 = false;
    this.imageName		 = 'mediaCaptha.png';
    this.answer			 = {
        isSolved: false,
        hasError: false,
        errorText: '',
        answerText: '',
        ruCaptchaID: false
    }

}

// Методы хранятся в прототипе
SolveMediaCaptha.prototype.getAnswer = function () {

    var imageName = this.imageName;
    var answer = this.answer;

    var folders = this.folders;
    if ( folders ) {
    } else {
        answer.hasError = true;
        answer.errorText = "Folders not defined!";
        return this.answer = answer;
    }

    var apiKey = this.apiKey;
    if ( apiKey ) {
    } else {
        answer.hasError = true;
        answer.errorText = "apiKey not defined!";
        return this.answer = answer;
    }

    var macrosHeader = this.macrosHeader;
    if ( macrosHeader ) {
    } else {
        answer.hasError = true;
        answer.errorText = "macrosHeader not defined!";
        return this.answer = answer;
    }

    var baseOfAnswers = this.baseOfAnswers;
    if ( baseOfAnswers ) {
    } else {
        answer.hasError = true;
        answer.errorText = "baseOfAnswers not defined!";
        return this.answer = answer;
    }


    _reload 			 = function () {
        iimPlayCode(`${macrosHeader}
     WAIT SECONDS=1
     TAG POS=1 TYPE=IMG ATTR=SRC:*solvemedia.com/media/reload*.gif
     WAIT SECONDS=5
  `, 60);
    }
    _saveImage			 = function () {
        iimPlayCode(`${macrosHeader}
					SET !ENCRYPTION NO
					WAIT SECONDS=1
					ONDOWNLOAD FOLDER=${folders.downloads} FILE=${imageName} WAIT=YES
					TAG POS=1 TYPE=DIV ATTR=ID:adcopy-puzzle-image CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=1
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=2
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=3
					ТAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=4
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=5
					ТAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					ONDOWNLOAD FOLDER=${folders.downloads} FILE=${imageName}+{{!NOW:yy.mm.dd_hh.nn.ss}} WAIT=YES
					FRAME F=1
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=2
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=3
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=4
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					FRAME F=5
					TAG POS=1 TYPE=DIV ATTR=ID:overlay CONTENT=EVENT:SAVE_ELEMENT_SCREENSHOT
					WAIT SECONDS=3
		`, 60);
    }
    _getRuCaptchaBalance = function () {
        iimPlayCode(`${macrosHeader}
    TAB OPEN
    TAB T=2
    URL GOTO=http://rucaptcha.com/res.php?key=${apikey}&action=getbalance
    TAG POS=1 TYPE=BODY ATTR=TXT:* EXTRACT=TXT
    WAIT SECONDS=1
    TAB CLOSE
  `, 120);
        var ext;
        //почему не  iimGetExtract
        if (ext = iimGetLastExtract()) {
            return parseFloat(ext);
        } else {
            return false;
        }
    }
    _getRuCaptchaSolve	 = function () {
        if ( _getRuCaptchaBalance < 1 ) {
            answer.hasError = true;
            answer.errorText = "RuCaptcha Not enough Balance!";
            return ans;
        }
        var result = new Array();
        iimPlayCode(`${macrosHeader}
					TAB OPEN
					TAB T=2
					URL GOTO=http://imacros2.rucaptcha.com/new
					TAG POS=1 TYPE=INPUT:TEXT ATTR=NAME:key&&SIZE:64 CONTENT=${apikey}
					TAG POS=1 TYPE=INPUT:FILE ATTR=TYPE:file CONTENT=${folders.downloads}\\${imageName}
					TAG POS=1 TYPE=INPUT:CHECKBOX ATTR=NAME:get_id CONTENT=YES
					TAG POS=1 TYPE=INPUT:SUBMIT ATTR=TYPE:submit&&VALUE:recognize
					TAG POS=1 TYPE=BODY ATTR=TXT:* EXTRACT=TXT
					WAIT SECONDS=1
					TAB CLOSE
		`, 120);
        result = iimGetLastExtract().split('|');
        switch (result[0]) {
            case 'OK':
                answer.isSolved = true;
                answer.ruCaptcha = result[1];
                answer.answerText = result[2];
            default:
                answer.hasError = true;
                answer.errorText = result[0];
        }

    }
    _captchaIsSelect	 = function () {
        var qs;
        return ( window.document.querySelector('select[id=adcopy_response] option') ) ? qs : false;
    }
    _captchaIsSpan		 = function () {
        var qs;
        return ( qs = window.document.querySelector('div[id=adcopy-puzzle-image-image]').
        contentWindow.document.querySelector('span[id=slog]') ) ? qs : false;
    }
    _captchaIsCanvas	 = function () {
        var qs;
        return ( qs = window.document.querySelector('div[id=adcopy-puzzle-image-image]').
        ccontentWindow.document.querySelector('span[id=instr]') ) ? qs : false;
    }
    _captchaIsOverlay	 = function () {
        var qs;
        return ( qs = window.document.querySelector('div[id=adcopy-puzzle-image-image]').
        contentWindow.document.querySelector('div[id=overlay]') ) ? qs : false;
    }
    _capthaIsImage		 = function () {
        var qs;
        return ( window.document.querySelector('img[id=adcopy-puzzle-image-image]') ) ? qs : false;
    }

    var sel;
    if ( sel = _captchaIsSelect () ) {
        answer.isSolved = true;
        answer.answerText = sel.selectOption.nextElementSibling.nextElementSibling.textContent;
    } else if ( sel = _captchaIsSpan () )	{
        answer.isSolved = true;
        answer.answerText = sel.textContent;
    } else if ( sel = _captchaIsCanvas () ) {
        sel.remove();
        _saveImage();
        _getRuCaptchaSolve();
    } else if ( sel = _captchaIsOverlay () ) {
        var style = sel.currentStyle || window.getComputedStyle(sel, false),
            base64 = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        if ( base64 in baseOfAnswers ) {
            answer.isSolved = true;
            answer.answerText = baseOfAnswers.base64;
        } else {
            sel.setAttribute("style", "display: block;");
            sel.nextElementSibling.setAttribute("style", "display: none;");
            sel.nextElementSibling.nextElementSibling.setAttribute("style", "display: none;");
            _saveImage();
            _getRuCaptchaSolve();
        }
    } else if ( sel = _captchaIsImage () ) {
        sel.setAttribute("width","266");
        sel.setAttribute("height","133");
        window.document.querySelector('div[id=adcopy-puzzle-image]').setAttribute("style", "width: 266px; height: 133px; ");
        _saveImage();
        _getRuCaptchaSolve();
    }
    this.answer = answer;
};

var test = new SolveMediaCaptha;
test.getAnswer();
window.console.log(test.apikey);

//
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
    this.macrosHeader = 'SET !EXTRACT_TEST_POPUP NO' + n +
        'SET !ERRORIGNORE  YES' + n +
        'SET !TIMEOUT_STEP 0' + n +
        //'SET !SINGLESTEP YES'   + n +
        'ONLOGIN USER=${' + this.proxyLogin + '} PASSWORD=${' + this.proxyPass + '}';
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

    iimPlayCode(`
  CLEAR
 `, 60);

};
Fauset.prototype.setProxy = function () {

    if (this.proxyIP && this.proxyPort && this.proxyAuthtoken) {
        Proxy.set(this.proxyIP, this.proxyPort, this.proxyAuthtoken);
    } else {
        Proxy.setDefaultProxy();
    }

}
Fauset.prototype.setDefaultProxy = function () {

    Proxy.set();
}


// --------- Класс-потомок сборщика с крана freebitco.in -----------
function Freebitcoin() {

    Fauset.apply(this, arguments);

}

// Унаследовать
Freebitcoin.prototype = Object.create(Fauset.prototype);
// Желательно и constructor сохранить
Freebitcoin.prototype.constructor = Freebitcoin;

// Методы потомка
Freebitcoin.prototype.solveMediaCaptha = function () {
    //SolveMediaCaptha.reload(this.macrosHeader);
}

/*
 var test = new Freebitcoin;
 //test.setProxy ();
 */
