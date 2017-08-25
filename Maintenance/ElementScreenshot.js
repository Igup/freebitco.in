/**
 * Created by Igup on 07.08.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('ElementScreenshot');

ElementScreenshot = {
    Base64: function (elm) {
        _mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIWebNavigation)
            .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
            .getInterface(Components.interfaces.nsIDOMWindow);
        _findPosX = function (obj) {
            var curleft = 0;
            if (obj.offsetParent) {
                while (1) {
                    curleft += obj.offsetLeft;
                    if (!obj.offsetParent) {
                        break;
                    }
                    obj = obj.offsetParent;
                }
            } else if (obj.x) {
                curleft += obj.x;
            }
            return curleft;
        };
        _findPosY = function (obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                while (1) {
                    curtop += obj.offsetTop;
                    if (!obj.offsetParent) {
                        break;
                    }
                    obj = obj.offsetParent;
                }
            } else if (obj.y) {
                curtop += obj.y;
            }
            return curtop;
        };

        _getOffsetRect = function (elem) {
            var box = elem.getBoundingClientRect();
            var body = window.document.body;
            var docElem = window.document.documentElement;
            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
            var clientTop = docElem.clientTop || body.clientTop || 0;
            var clientLeft = docElem.clientLeft || body.clientLeft || 0;
            var top = box.top + scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;
            return {top: Math.round(top), left: Math.round(left)}
        };

        //var x = _findPosX(elm);
        //var y = _findPosY(elm);

        var elrmTopLeft = _getOffsetRect(elm);
        var x = elrmTopLeft.left;
        var y = elrmTopLeft.top;
        var p = 400;
        var k = p / (elm.clientWidth + elm.clientHeight);

        var cnvs = window.document.createElement("canvas");
        cnvs.setAttribute("id", "acanvas");
        cnvs.width = k * elm.clientWidth;
        cnvs.height = k * elm.clientHeight;
        var ctx = cnvs.getContext("2d");
        ctx.scale(k, k);
        ctx.drawWindow(_mainWindow.content, x, y, elm.clientWidth, elm.clientHeight, "rgb(255,255,255)");

        //return (cnvs2.toDataURL().replace(/^data:image\/(png|jpg);base64,/, ""));
        return (cnvs.toDataURL());
    }
};