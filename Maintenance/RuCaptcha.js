/**
 * Created by Igup on 09.08.2017.
 * Solve Captcha with rucaptcha.com service
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('RuCaptcha');

function RuCaptcha() {

    this.key = false;
    this.proxy = false;
    this.proxytype = false;
    this.soft_id = false;
    /*
     this.answer			 = {
     isSolved: false,
     hasError: false,
     errorText: '',
     answerText: '',
     ruCaptchaID: false
     }
     */

    this.connect = function (base64) {
        alert(base64);
    }

}

RuCaptcha.prototype.solveBase64 = function (base64) {
    this.connect(base64);
};
RuCaptcha.prototype.solveReCaptcha = function (googlekey, pageurl) {

};
