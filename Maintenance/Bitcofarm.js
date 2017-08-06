/**
 * Created by Igup on 06.08.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module("Bitcofarm");


// --------- Класс-потомок сборщика с крана freebitco.in -----------
function Bitcofarm() {
    Fauset.apply(this, arguments);
}
// Унаследовать
Freebitcoin.prototype = Object.create(Fauset.prototype);
// Желательно и constructor сохранить
Freebitcoin.prototype.constructor = Freebitcoin;