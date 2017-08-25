/**
 * Created by Igup on 15.04.2017.
 */


if (typeof js !== 'undefined') {
    js.module('Folders');

}

//Определение путей
Folders = function Folders() {

    var ds = function () {
        iimPlayCode(`SET !EXTRACT {{!FOLDER_DATASOURCE}}`);
        return iimGetExtract();
    }();
    var iMacros = ds.substring(0, ds.toLowerCase().indexOf('datasources'));

    this.downloads = iMacros + "Downloads";
    this.macros = iMacros + "Macros";
    this.datasources = ds;
};