/**
 * Created by Igup on 07.08.2017.
 */
//todo вынести из SimpleCaptcha и ReCaptcha2 в отдельный метод общение с серверами RuCaptcha, а способ разгадывания регулировать указывая метод:Base64 или userrecaptcha

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('SimpleCaptcha');


function SimpleCaptcha() {

    this.key = false;
    this.proxy = false;
    this.proxytype = false;

    this.soft_id = false;
    this.macrosHeader = false;
    this.answer = {
        isSolved: false,
        hasError: false,
        errorText: '',
        answerText: '',
        ruCaptchaID: false
    }

}

SimpleCaptcha.prototype.getAnswer = function (base64) {
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
            answer.errorText = e.name + " SimpleCaptcha unsolve by ruCaptcha: " + e.message;
            return answer;
        }
    }

    var reqCount = 0;
    var url = "http://rucaptcha.com/in.php";
    var params = "key=" + this.key + "&method=base64&json=true&header_acao=1&body=" + encodeURIComponent(base64);
    var ans = req(url, params);
    if (ans.isSolved) {
        url = "http://rucaptcha.com/res.php";
        params = "key=" + this.key + "&action=get&id=" + ans.answerText + "&json=1";
        this.answer = req(url, params);
    } else {
        //todo описать негативный вариант anы.hasError
    }
}




