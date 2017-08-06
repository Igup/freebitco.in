/**
 * Created by Igup on 05.08.2017.
 * Solve Google reCaptcha v.2 with rucaptcha.com service
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('ReCaptcha2');

// --------- Класс для решения капчи SolveMedia ------------
// Конструктор родителя пишет свойства конкретного объекта
function ReCaptcha2() {

    this.key			 = false;
    this.proxy = false;
    this.proxytype = false;

    this.soft_id         = false;
    this.macrosHeader	 = false;
    this.answer			 = {
        isSolved: false,
        hasError: false,
        errorText: '',
        answerText: '',
        ruCaptchaID: false
    }

}

// Методы хранятся в прототипе
ReCaptcha2.prototype.getAnswer = function () {
    function req(url, params) {
        var answer = {
            isSolved: false,
            hasError: false,
            errorText: '',
            answerText: ''
        }
        xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.timeout = 60000;
        try {
            xhr.send(params);
            if (xhr.status != 200) throw new Error(xhr.responseText + " - " + xhr.status);
            try {
                var res = JSON.parse(xhr.responseText);
            } catch (e) {
                throw new Error(xhr.responseText);
            }
            if (res && res.status != 1) {
                if (res.request == 'CAPCHA_NOT_READY' && reqCount < 35) {
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

    //Проверка, что на странице есть Recaptcha
    if ( window.document.querySelector('.g-recaptcha') === null ) {
        this.answer.hasError = true;
        this.answer.errorText = "Recaptcha not found on page.";
        return false;
    }
    //Проверка, что ruCaptcha apiKey определен
    if (this.key) {
    } else {
        this.answer.hasError = true;
        this.answer.errorText = "ruCaptcha apiKey not defined.";
        return false;
    }

    //Проверка, что proxy подключено
    var proxy = "";
    if (this.proxy && this.proxytype) {
        proxy = "&proxy=" + this.proxy + "&proxytype=" + this.proxytype;
    }
    //Проверка, что soft_id определен
    var soft_id = "";
    if (this.soft_id) {
        soft_id = "&soft_id=" + this.soft_id
    }

    this.googlekey  = window.document.querySelector('.g-recaptcha').getAttribute('data-sitekey');
    this.pageurl = window.location.host;

    var url = "http://rucaptcha.com/in.php";
    var params = "key=" + this.key + "&method=userrecaptcha&googlekey=" + this.googlekey + "&pageurl=" + this.pageurl + "&json=true&header_acao=1" + proxy + soft_id;

    var reqCount = 0;
    ans = req(url, params);
    if (ans.isSolved) {
        url = "http://rucaptcha.com/res.php";
        params = "key=" + this.key + "&action=get&id=" + ans.answerText + "&json=1";
        this.answer = req(url, params);
        this.answer.ruCaptchaID = ans.answerText;
        if (this.answer.isSolved) {
            window.document.querySelector('.g-recaptcha-response').style = "";
            window.document.querySelector('.g-recaptcha-response').textContent = this.answer.answerText;
        }
    }
}

/*Подключаем Класс и его методы
 ReCaptcha2 = new ReCaptcha2;
 ReCaptcha2.getAnswer();
 ReCaptcha2.proxy="логин:пароль@123.123.123.123:3128";
 ReCaptcha2.proxytype = "SOCKS5";
 ReCaptcha2.soft_id = "ID разработчика ПО"
 */
