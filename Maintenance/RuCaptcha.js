/**
 * Created by Igup on 09.08.2017.
 * Solve Captcha with rucaptcha.com service
 */
/*Enable:
 js.include('RuCaptcha');
 RuCaptcha = new RuCaptcha;
 RuCaptcha.key = 'RuCaptcha key';
 RuCaptcha.proxy='login:pass@123.123.123.123:3128';
 RuCaptcha.proxytype = 'SOCKS5';
 RuCaptcha.soft_id = 'ID разработчика ПО';
 var options = {
 method: 'base64',
 base64: 'data'
 };
 var options = {
 method:     'userrecaptcha',
 googlekey:  window.document.querySelector('.g-recaptcha').getAttribute('data-sitekey'),
 pageurl:    window.location.host
 };
 var answer = RuCaptcha.getAnswer(options);
 */

if (typeof js !== 'undefined') {
    js.module('RuCaptcha');
}

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
            if (xhr.status !== 200) throw new Error('Connection Error:' + xhr.status + ' ' + xhr.responseText);
            try {
                var res = JSON.parse(xhr.responseText);
            } catch (e) {
                throw new Error('JSON parse error: ' + xhr.responseText);
            }
            if (res && res.status !== 1) {
                if (res.request === 'CAPCHA_NOT_READY') {
                    reqCount++;
                    iimPlayCode('WAIT SECONDS=5');
                    return this.request(url, params);
                } else {
                    throw new Error(res.request);
                }
            }
            answer.isSolved = true;
            answer.answerText = res.request;
        } catch (e) {
            answer.hasError = true;
            answer.errorText = 'ruCaptcha request Error: ' + e.message;
        }
        return answer;
    };
}

/**
 *
 * @param options
 * @returns {{isSolved: boolean, hasError: boolean, errorText: string, answerText: string, ruCaptchaID: string}}
 */
RuCaptcha.prototype.getAnswer = function (options) {

    var url = '';
    var params = '';
    var proxy = '';
    var soft_id = '';
    var answer = {
        isSolved: false,
        hasError: false,
        errorText: '',
        answerText: '',
        ruCaptchaID: ''
    };
    try {
        if (!options.method) {
            throw new Error('ruCaptcha options.method not defined.');
        } else if (options.method === "base64") {
            if (options.base64) {
                url = "http://rucaptcha.com/in2.php";
                params = "key=" + this.key + "&method=base64&json=true&header_acao=1&body=" + encodeURIComponent(options.base64);
            } else {
                throw new Error('ruCaptcha options.base64 for method "base64" not defined.');
            }
        } else if (options.method === "userrecaptcha") {
            if (options.googlekey && options.pageurl) {
                url = "http://rucaptcha.com/in.php";
                params = "key=" + this.key + "&method=userrecaptcha&googlekey=" + options.googlekey + "&pageurl=" + options.pageurl + "&json=true&header_acao=1";
            } else if (!options.googlekey) {
                throw new Error('ruCaptcha options.googlekey for method "userrecaptcha" not defined.');
            } else if (!options.pageurl) {
                throw new Error('ruCaptcha options.pageurl for method "userrecaptcha" not defined.');
            }
        } else {
            throw new Error('ruCaptcha define wrong options.method: ' + options.method);
        }
        if (!this.key) {
            throw new Error('ruCaptcha apiKey not defined.');
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
                throw new Error(ans.answerText);
            }
        } else {
            throw new Error(ans.answerText);
        }
    } catch (e) {
        answer.hasError = true;
        answer.errorText = e.name + ' Captcha unsolve by ruCaptcha: ' + e.message;
        ;
    }
    return answer;
};
