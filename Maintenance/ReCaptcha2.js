/**
 * Created by Igup on 05.08.2017.
 * Solve Google reCaptcha v.2
 */
/*Enable:
 ReCaptcha2 = new ReCaptcha2;
 ReCaptcha2.key = "RuCaptcha key";
 ReCaptcha2.proxy="login:pass@123.123.123.123:3128";
 ReCaptcha2.proxytype = "SOCKS5";
 ReCaptcha2.soft_id = "ID разработчика ПО";
 ReCaptcha2.solve();
 */

if (typeof js !== 'undefined') {
    js.module('ReCaptcha2');
    js.include('RuCaptcha');
}


function ReCaptcha2() {
    RuCaptcha.apply(this, arguments);
}
ReCaptcha2.prototype = Object.create(RuCaptcha.prototype);
ReCaptcha2.prototype.constructor = ReCaptcha2;

ReCaptcha2.prototype.solve = function () {
    var answer = {
        isSolved: false,
        hasError: false,
        errorText: '',
        answerText: ''
    };
    if (!window.document.querySelector('.g-recaptcha')) {
        answer.hasError = true;
        answer.errorText = "ReCaptcha2 not found";
        return answer;
    }
    /*
     var options = {
     method:     "userrecaptcha",
     googlekey:  window.document.querySelector('.g-recaptcha').getAttribute('data-sitekey'),
     pageurl:    window.location.host
     };
     answer = ReCaptcha2.getAnswer(options);
     if (answer.isSolved) {
     window.document.querySelector('.g-recaptcha-response').style = "";
     window.document.querySelector('.g-recaptcha-response').textContent = answer.answerText;
     return true;
    } else {

    }
     */
};

ReCaptcha2 = new ReCaptcha2;
ReCaptcha2.key = "RuCaptcha key";
ReCaptcha2.proxy = "login:pass@123.123.123.123:3128";
ReCaptcha2.proxytype = "SOCKS5";
ReCaptcha2.soft_id = "ID разработчика ПО";
solve = ReCaptcha2.solve();

window.console.log(ReCaptcha2);
window.console.log(solve);
solve
//ReCaptcha2.test2();


