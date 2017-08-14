/**
 * Created by Igup on 06.08.2017.
 */

if (typeof js !== 'undefined') {
    js.module("Freebitcoin");
    js.include('Fauset');
}

// --------- Класс-потомок сборщика с крана freebitco.in -----------
function Freebitcoin() {
    Fauset.apply(this, arguments);
}
Freebitcoin.prototype = Object.create(Fauset.prototype);
Freebitcoin.prototype.constructor = Freebitcoin;

Freebitcoin.prototype.enable = function () {
    try {
        Freebitcoin.checkConfig();
    } catch (e) {
    }
};


Freebitcoin.prototype.singUp = function () {
    iimPlayCode(`${this.macrosHeader}  
			TAG POS=1 TYPE=A ATTR=TXT:SIGN<SP>UP
			WAIT SECONDS=1
	`);

};