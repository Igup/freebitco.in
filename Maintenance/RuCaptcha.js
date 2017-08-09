/**
 * Created by Igup on 09.08.2017.
 * Solve Captcha with rucaptcha.com service
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('RuCaptcha');

/**
 * @constructor
 */
function RuCaptcha() {

    this.key = false;
    this.proxy = false;
    this.proxytype = false;
    this.soft_id = false;
    /**
     * @param url
     * @param params
     * @returns {*}
     */
    this.request = function (url, params) {
        var reqCount = 0;
        var answer = {
            isSolved: false,
            hasError: false,
            errorText: '',
            answerText: ''
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.timeout = 60000;
        try {
            xhr.send(params);
            if (xhr.status !== 200) throw new Error(xhr.responseText + " - " + xhr.status);
            try {
                var res = JSON.parse(xhr.responseText);
            } catch (e) {
                throw new Error(xhr.responseText);
            }
            if (res && res.status !== 1) {
                window.console.log(res);
                if (res.request === 'CAPCHA_NOT_READY' && reqCount > 35) {
                    reqCount++;
                    iimPlayCode('WAIT SECONDS=5');
                    return req(url, params);
                } else {
                    throw new Error(res.request);
                }
            }
            answer.isSolved = true;
            answer.answerText = res.request;
            return answer;
        } catch (e) {
            answer.hasError = true;
            answer.errorText = e.name + " ReCaptcha2 unsolve by ruCaptcha: " + e.message;
            return answer;
        }
    }

}

/**
 *
 * @param options
 * @returns {{isSolved: boolean, hasError: boolean, errorText: string, answerText: string, ruCaptchaID: string}}
 */
RuCaptcha.prototype.solve = function (options) {
    var url = "";
    var params = "";
    var proxy = "";
    var soft_id = "";
    var answer = {
        isSolved: false,
        hasError: false,
        errorText: '',
        answerText: '',
        ruCaptchaID: ''
    };
    if (!options.method) {
        answer.hasError = true;
        answer.errorText = "ruCaptcha options.method not defined.";
        return answer;
    } else if (options.method === "base64") {
        if (options.base64) {
            url = "http://rucaptcha.com/in.php";
            params = "key=" + this.key + "&method=base64&json=true&header_acao=1&body=" + encodeURIComponent(options.base64);
        } else {
            answer.hasError = true;
            answer.errorText = "ruCaptcha options.base64 for method 'base64' not defined ";
            return answer;
        }
    } else if (options.method === "userrecaptcha") {
        if (options.googlekey && options.pageurl) {
            url = "http://rucaptcha.com/in.php";
            params = "key=" + this.key + "&method=userrecaptcha&googlekey=" + options.googlekey + "&pageurl=" + options.pageurl + "&json=true&header_acao=1"
        } else if (!options.googlekey) {
            answer.hasError = true;
            answer.errorText = "ruCaptcha options.googlekey for method 'userrecaptcha' not defined ";
            return answer;
        } else if (!options.pageurl) {
            answer.hasError = true;
            answer.errorText = "ruCaptcha options.pageurl for method 'userrecaptcha' not defined ";
            return answer;
        }
    } else {
        answer.hasError = true;
        answer.errorText = "ruCaptcha define wrong options.method.";
        return answer;
    }
    if (!this.key) {
        answer.hasError = true;
        answer.errorText = "ruCaptcha apiKey not defined.";
        return answer;
    }
    if (this.proxy && this.proxytype) {
        proxy = "&proxy=" + this.proxy + "&proxytype=" + this.proxytype;
    }
    if (this.soft_id) {
        soft_id = "&soft_id=" + this.soft_id
    }
    params = params + proxy + soft_id;
    var ans = this.request(url, params);
    if (ans.isSolved) {
        answer.ruCaptchaID = ans.answerText;
        url = "http://rucaptcha.com/res.php";
        params = "key=" + this.key + "&action=get&id=" + answer.ruCaptchaID + "&json=1";
        ans = this.request(url, params);
        if (ans.isSolved) {
            answer.isSolved = true;
            answer.answerText = ans.answerText;
        } else {
            answer.hasError = true;
            answer.errorText = ans.answerText;
        }
    } else {
        answer.hasError = true;
        answer.errorText = ans.answerText;
    }
    return answer;
};