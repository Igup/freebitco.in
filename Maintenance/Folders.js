/**
 * Created by Igup on 15.04.2017.
 */

//Определение путей
function Folders() {

    var ds = function () {
        iimPlayCode(`SET !EXTRACT {{!FOLDER_DATASOURCE}}`);
        return iimGetExtract();
    }();
    var iMacros = ds.substring(0, ds.toLowerCase().indexOf('datasources'));

    this.downloads = iMacros + "Downloads";
    this.macros = iMacros + "Macros";
    this.datasources = ds;
}