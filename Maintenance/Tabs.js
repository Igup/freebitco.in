/**
 * Created by Igup on 12.04.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module("Tabs");

//Управление ТАБам
var Tabs;
Tabs = {
    _browser: function () {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
        return wm.getMostRecentWindow("navigator:browser").gBrowser;
    }(),

    go: function (tabIndex) {
        this._browser.selectedTab = this._browser.tabContainer.childNodes[tabIndex - 1];
    }

};

alert(Tabs.go(2));