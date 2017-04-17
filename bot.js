/**
 * Created by Administrator on 11.04.2017.
 */

iimPlayCode(`CLEAR`, 60);

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

js.include('Tabs');
js.include('Folders');
js.include('Proxy');
js.include('BaseOfAnswers');

Tabs.go(2);

var Folders = new Folders;
alert(Folders.downloads);

Proxy.set();
var BaseOfAnswers = new BaseOfAnswers;
BaseOfAnswers.valueToKey;
alert(BaseOfAnswers["Good Vibes Only"]);

alert(BaseOfAnswers["data:image/png;base64,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"]);
