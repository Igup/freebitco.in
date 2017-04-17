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

alert(BaseOfAnswers["data:image/png;base64,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"]);
