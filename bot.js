/**
 * Created by Administrator on 11.04.2017.
 */

//iimPlayCode(`CLEAR`, 60);

var js = {};
js.loadedModules = {};
js.rootUrl = "https://raw.githubusercontent.com/Igup/freebitco.in/master/";


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

js.include('Тabs');


var Tabs = {
    _browser: function () {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
        return wm.getMostRecentWindow("navigator:browser").gBrowser;
    }(),

    go: function (tabIndex) {
        this._browser.selectedTab = this._browser.tabContainer.childNodes[tabIndex - 1];
    }

};
Tabs.go(2);