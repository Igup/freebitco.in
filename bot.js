/**
 * Created by Administrator on 11.04.2017.
 */

iimPlayCode(`CLEAR`, 60);

//js.js
var js = {};
js.loadedModules = {};
js.rootUrl = "https://raw.githubusercontent.com/Igup/freebitco.in/master/Maintenance/";
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


if ( !js.include('Tabs') ) throw new Error("Module include error: Tabs");
if ( !js.include('Proxy') ) throw new Error("Module include error: Proxy");
//if ( !js.include('Folders') ) throw new Error("Module include error: Folders");
//if ( !js.include('BaseOfAnswers') ) throw new Error("Module include error: BaseOfAnswers");


Tabs.go(2);

