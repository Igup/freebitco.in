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
        answerText: '',
        Price: 0
    };
    try {
        if (!window.document.querySelector('.g-recaptcha')) throw new Error('ReCaptcha2 not found.');
        if (!window.document.querySelector('.g-recaptcha').getAttribute('data-sitekey')) throw new Error('ReCaptcha2 data-sitekey not found.');
        if (!window.document.querySelector('.g-recaptcha-response')) throw new Error('ReCaptcha2 textarea for g-recaptcha-response not found.');
        var options = {
            method: "userrecaptcha",
            googlekey: window.document.querySelector('.g-recaptcha').getAttribute('data-sitekey'),
            pageurl: window.location.host
        };
        var ans = ReCaptcha2.getAnswer(options);
        if (ans.isSolved) {
            answer.isSolved = ans.isSolved;
            answer.answerText = ans.answerText;
            answer.Price = ans.Price;
            //window.document.querySelector('.g-recaptcha-response').style = '';
            window.document.querySelector('.g-recaptcha-response').textContent = ans.answerText;
        } else {
            throw new Error(ans.errorText);
        }
    } catch (e) {
        answer.hasError = true;
        answer.errorText = e.name + ': reCaptcha unsolved: ' + e.message + '\n stack: ' + e.stack;
    }
    return answer;
};


