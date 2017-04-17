/**
 * Created by Igup on 15.04.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module("Folders");

//Определение путей
js.Folders = function Folders() {

    var ds = function () {
        iimPlayCode(`SET !EXTRACT {{!FOLDER_DATASOURCE}}`);
        return iimGetExtract();
    }();
    var iMacros = ds.substring(0, ds.toLowerCase().indexOf('datasources'));

    this.downloads = iMacros + "Downloads";
    this.macros = iMacros + "Macros";
    this.datasources = ds;
};