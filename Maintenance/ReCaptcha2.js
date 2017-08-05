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

    this.apiKey			 = false;
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
    if (window.document.querySelector('.g-recaptcha') == null) {
        this.answer.hasError = true;
        this.answer.errorText = "Recaptcha not found on page.";
    }

}


/*Подключаем Класс и его методы
 ReCaptcha2 = new ReCaptcha2;
 ReCaptcha2.getAnswer();
 */