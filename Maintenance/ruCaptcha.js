/**
 * Created by Igup on 09.08.2017.
 * Solve Captcha with rucaptcha.com service
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('ruCaptcha');

function ruCaptcha() {

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

    this.connect = function () {
        alert("Hello");
    }

};

ruCaptcha.prototype.solveBase64 = function (base64) {
    this.connect();
};
ruCaptcha.prototype.solveReCaptcha = function (googlekey, pageurl) {

};
