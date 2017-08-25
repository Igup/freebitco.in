/**
 * Created by Igup on 06.08.2017.
 */

if (typeof js !== 'undefined') {
    js.module('Freebitcoin');
    js.include('Fauset');
    js.include('jquery');
    js.include('ElementScreenshot');
}

// --------- Класс-потомок сборщика с крана freebitco.in -----------
function Freebitcoin() {
    Fauset.apply(this, arguments);
    /**
     *
     */
    this.checkIfSignUpFailed = function () {
        //todo описать checkIfSignUpFailed
    };
    /**
     *
     */
    this.signUp = function () {
        //todo описать signUp
        iimPlayCode(`${this.macrosHeader}  
			    TAG POS=1 TYPE=A ATTR=TXT:SIGN<SP>UP
			    WAIT SECONDS=1
	    `);
        this.fausetLoginRegistered = true;
        return this.signIn();
    };
    /**
     *
     * @returns {Element}
     */
    this.checkIfAlreadySignIn = function () {
        //todo выкинуть лишнюю конструкцию, если короткая работает
        /*
         if ( window.document.querySelector('span[id=balance]') ) {
         return true;
         } else {
         return false;
         }
         */
        return window.document.querySelector('span[id=balance]');
    };
    /**
     *
     * @returns {boolean}
     */
    this.checkIfSignInSucsess = function () {
        try {
            if (this.checkIfAlreadySignIn()) {
                return true;
            } else {
                if ($(window.document.querySelector('div[id=reward_point_redeem_result_container_div] span')).is(':visible')) {
                    if (err = window.document.querySelector('div[id=reward_point_redeem_result_container_div] span').textContent) {
                        if (err === 'Incorrect login details' && !this.fausetLoginRegistered) {
                            this.signUp();
                        } else if (err === 'Incorrect captcha entered') {
                            //todo добавить rucaptcha bad report
                            this.signIn();
                        } else if (w = err.match(/Too many tries. Please wait (\d+) (seconds|minutes)/)) {
                            if (w[2] === 'seconds') {
                                this.nextHandleTime = this.timeNow() + 60;
                            } else if (w[2] === 'minutes') {
                                this.nextHandleTime = this.timeNow() + w[1] * 60;
                            }
                            return false;
                        } else {
                            //todo протестировать перехват ошибки
                            throw new Error(this.fausetName + ' Login failed: ' + err + '\n');
                        }
                    } else {
                        throw new Error(this.fausetName + ' SignIn failed! Empty error, possible HTML content was changed, need script actualization.');
                    }
                } else {
                    throw new Error(this.fausetName + ' SignIn failed! Undefined error, possible HTML content was changed, need script actualization.');
                }
            }
        } catch (e) {
            throw e;
        }
    };
    this.signIn = function () {
        try {
            if (this.checkIfAlreadySignIn()) return true;
            iimPlayCode(`${this.macrosHeader}  
	            TAG POS=1 TYPE=A ATTR=TXT:LOGIN
			    WAIT SECONDS=1
			    TAG POS=1 TYPE=INPUT:TEXT FORM=ID:login_form ATTR=ID:login_form_btc_address CONTENT=${this.fausetLogin}
			    WAIT SECONDS=1
			    SET !ENCRYPTION NO
			    TAG POS=1 TYPE=INPUT:PASSWORD FORM=ID:login_form ATTR=ID:login_form_password CONTENT=${this.fausetPass}
			    WAIT SECONDS=1
		    `);
            iimPlayCode(`${this.macrosHeader}  
	            TAG POS=1 TYPE=BUTTON FORM=ID:login_form ATTR=ID:login_button
			    WAIT SECONDS=3
		    `);
            return this.checkIfSignInSucsess();
        } catch (e) {
            throw e;
        }
    };
    this.prepare = function () {
        try {
            var r;
            var rewardPoints = 0;
            var buttonPos;

            if (!$(window.document.querySelector('span[id=bonus_span_free_points]')).is(':visible')) {
                if (r = window.document.querySelector('div[id=rewards_tab] div div div')) {
                    rewardPoints = parseInt(r.nextElementSibling.textContent.replace(/,/g, ''), 10);
                    if (rewardPoints > 1200) {
                        buttonPos = 28;
                        rewardPoints = rewardPoints - 1200;
                    } else if (rewardPoints > 600) {
                        buttonPos = 29;
                        rewardPoints = rewardPoints - 600;
                    } else if (rewardPoints > 120) {
                        buttonPos = 30;
                        rewardPoints = rewardPoints - 120;
                    } else if (rewardPoints > 12) {
                        buttonPos = 31;
                        rewardPoints = rewardPoints - 12;
                    } else {
                        buttonPos = false;
                    }
                    if (buttonPos) {
                        iimPlayCode(`${this.macrosHeader}  
			            TAG POS=1 TYPE=A ATTR=TXT:REWARDS
						WAIT SECONDS=1
						TAG POS=1 TYPE=DIV ATTR=TXT:REWARD<SP>POINTS<SP>BONUS
						WAIT SECONDS=1
						TAG POS=${buttonPos} TYPE=BUTTON ATTR=TXT:REDEEM
						WAIT SECONDS=1
	                `);
                        rewardPoints = rewardPoints - 2000;
                        if (rewardPoints > 1200) {
                            buttonPos = 19;
                        } else if (rewardPoints > 320) {
                            buttonPos = 21;
                        } else if (rewardPoints > 160) {
                            buttonPos = 22;
                        } else if (rewardPoints > 32) {
                            buttonPos = 23;
                        } else {
                            buttonPos = false;
                        }
                        if (buttonPos) {
                            iimPlayCode(`${this.macrosHeader}  
			                TAG POS=1 TYPE=DIV ATTR=TXT:FREE<SP>BTC<SP>BONU
						    WAIT SECONDS=1
						    TAG POS=${buttonPos} TYPE=BUTTON ATTR=TXT:REDEEM
						    WAIT SECONDS=1
	                    `);
                        }
                    }
                }
            }
        } catch (e) {
            throw e;
        }
    };
    this.fauset = function () {
        try {
            var time_remaining;
            var el;
            iimPlayCode(`
				TAG POS=1 TYPE=A ATTR=TXT:FREE<SP>BTC
				WAIT SECONDS=1
		    `, 60);
            if ($(window.document.querySelector('div[id=time_remaining]')).is(':visible')) {
                if (time_remaining = window.document.querySelector('div[id=time_remaining]')) {
                    if (time_remaining = time_remaining.textContent.split('Minute')[0]) {
                        this.nextHandleTime = this.timeNow() + 60 + 60 * time_remaining;
                        return;
                    }
                }
            }
            if (el = window.document.querySelector('div[id=captchasnet_free_play_captcha] div img')) {
                var options = {
                    method: 'base64',
                    base64: ElementScreenshot.Base64(el)
                };
                window.console.log(options);
                var answer = Freebitcoin.captchaSolver.getAnswer(options);
                window.console.log(answer);
                if (answer.isSolved) {
                    window.document.querySelector('div[id=captchasnet_free_play_captcha] input.captchasnet_captcha_input_box').value = answer.answerText;
                    iimPlayCode(`
				    TAG POS=1 TYPE=INPUT:SUBMIT ATTR=ID:free_play_form_button
				    WAIT SECONDS=1
		        `, 60);
                    if ($(window.document.querySelector('p[id=free_play_error]')).is(':visible')) {
                        if (err = window.document.querySelector('p[id=free_play_error]').textContent) {
                            if (err === 'Incorrect captcha entered' || err === 'Captcha is incorrect or has expired. Please try again.') {
                                Freebitcoin.captchaSolver.reportWrongAnswer(answer.captchaID);
                                this.fauset();
                                //todo добавить обработку ошибок
                            } else if (err === 'Sorry, this IP address has been blocked from playing the FREE PLAY game. You may continue to use the rest of the website as normal.') {
                                this.nextHandleTime = this.timeNow() + 3600 * 24 * this.getRandomInt(1, 7);
                            } else if (err === 'Sorry, this IP address has been blocked. If you are using a proxy, VPN or anonymization service, please turn it off before claiming free bitcoins.') {
                                this.nextHandleTime = this.timeNow() + 3600 * 24 * this.getRandomInt(1, 7);
                            } else if (err === 'Your browser or some add-on/plugin is blocking our javascript. Please try to disable these add-ons or use a different browser to play the FREE BTC game.') {
                                this.nextHandleTime = this.timeNow() + 3600 * this.getRandomInt(1, 6);
                            } else {
                            }
                        }
                    } else {
                        //todo добавить проверку удачного ролла
                        if ($(window.document.querySelector('span[id=bonus_span_free_points]')).is(':visible')) {
                            if (t = window.document.querySelector('span[id=bonus_span_free_points]').textContent) {
                                if (t.split(':')[0] === '00') {
                                    this.nextHandleTime = this.timeNow() + 3600 * this.getRandomInt(1, 7);
                                }
                            }
                        } else {
                            this.nextHandleTime = this.timeNow() + 60
                        }
                    }
                } else {
                    throw new Error(answer.errorText);
                }
            }
        } catch (e) {
            throw e;
        }
    };

}
Freebitcoin.prototype = Object.create(Fauset.prototype);
Freebitcoin.prototype.constructor = Freebitcoin;

Freebitcoin.prototype.init = function () {
    try {
        this.loadTempFromFile();
        this.checkConfig();
    } catch (e) {
        throw e;
    }

};

Freebitcoin.prototype.run = function () {
    try {
        if (this.nextHandleTime <= this.timeNow()) {
            iimPlayCode(`${this.macrosHeader} 
                WAIT SECONDS=1
			    URL GOTO=about:blank
			    WAIT SECONDS=1
 			    URL GOTO=${this.fausetURL}
			    WAIT SECONDS=3
			    TAG POS=1 TYPE=A ATTR=TXT:Got<SP>it!
			    WAIT SECONDS=1
		    `);
            if (this.signIn()) {
                this.prepare();
                this.fauset();
            }
            this.saveTempToFile({fausetName: this.fausetName, nextHandleTime: this.nextHandleTime});
            iimPlayCode(`${this.macrosHeader}
				WAIT SECONDS=1
				URL GOTO=about:blank
				WAIT SECONDS=1
	        `);
        }
    } catch (e) {
        //window.console.log(e);
        throw e;
    }
};
