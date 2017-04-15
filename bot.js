/**
 * Created by Administrator on 11.04.2017.
 */

iimPlayCode(`CLEAR`, 60);

var js = {};
js.loadedModules = {};
js.rootUrl = "https://raw.githubusercontent.com/Igup/freebitco.in/master/maintenance/";


js.include = function (path) {
    if (js.loadedModules[path]) return;

    var transport = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
    var async = false;

    transport.open("GET", js.rootUrl + path.replace(/\./g, "/") + ".js", async);
    transport.send(null);

    if (transport.status !== 200) {
        var message = "An error occurred while loading script at url: " + js.rootUrl + path + ".js" + ", status: " + transport.status;
        iimDisplay(message);
        return false;
    }

    var code = transport.responseText;
    eval(code);
    return true;

};


if ( !js.include('Tabs2')) throw new Error("Error module includ: Tabs");
iimDisplay("Hello");
/*
try {

    Tabs.go(2);
}
catch (e) {
    //alert(e);
    iimDisplay(e);
    //throw new Error("stop");

}
iimDisplay("Hello");
js.include('Tabs');
Tabs.go(2);
iimDisplay("Hello2");
    */