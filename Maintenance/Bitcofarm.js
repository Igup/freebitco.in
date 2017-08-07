/**
 * Created by Igup on 06.08.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module("Bitcofarm");
js.include('Fauset');


function extend(Child, Parent) {
    var F = function () {
    };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}
// --------- Класс-потомок сборщика с крана freebitco.in -----------
function Bitcofarm() {
    //Fauset.apply(this, arguments);
    Bitcofarm.superclass.constructor.apply(this, arguments);
}
extend(Bitcofarm, Fauset);

/*
// Унаследовать
Bitcofarm.prototype = Object.create(Fauset.prototype);
// Желательно и constructor сохранить
 Bitcofarm.prototype.constructor = Bitcofarm;
 */