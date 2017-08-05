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
    //Проверка, что soft_id определен
    var soft_id = "";
    if (this.soft_id) {
        soft_id = "soft_id=" + this.soft_id
    }

    this.googlekey  = window.document.querySelector('.g-recaptcha').getAttribute('data-sitekey');
    this.pageurl = window.location.host;

    var params = "key=" + this.key + "&method=userrecaptcha&googlekey=" + this.googlekey + "&pageurl=" + this.pageurl + "&json=true&header_acao=1" + soft_id;
    var XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://rucaptcha.com/in.php", false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.timeout = 60000;

    try {
        xhr.send(params);
        if (xhr.status !== 200) {
            this.answer.hasError = true;
            this.answer.errorText = "An error occurred while loading ReCaptcha2 answer from ruCaptcha" + xhr.status;
            return false;
        } else {
            var res = JSON.parse(xhr.responseText);
            if (res.status == 1) {
                //todo добавить получение ответа
                window.console.log(params);
            } else {
                this.answer.hasError = true;
                this.answer.errorText = "An error occurred while solving ReCaptcha2 by ruCaptcha" + xhr.status;
                return false;
            }
        }
    } catch (e) {
        this.answer.hasError = true;
        this.answer.errorText = e.name;
        return false;
    }

}


/*Подключаем Класс и его методы
 ReCaptcha2 = new ReCaptcha2;
 ReCaptcha2.getAnswer();
 */