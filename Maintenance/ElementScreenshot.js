/**
 * Created by Igup on 07.08.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module("ElementScreenshot");

ElementScreenshot = {

    mainWindow: window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIWebNavigation)
        .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
        .rootTreeItem
        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIDOMWindow),
    _findPosX: function (obj) {
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
    }(),
    _findPosY: function (obj) {
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
    }(),
    Base64: function (elm) {
        var x = findPosX(elm);
        var y = findPosY(elm);
        var width = elm.clientWidth;
        var height = elm.clientHeight;
        var cnvs = window.document.createElement("canvas");
        cnvs.setAttribute("id", "acanvas");

        cnvs.width = width;
        cnvs.height = height;
        var ctx = cnvs.getContext("2d");
        // To take a snapshot of entire window
        // ctx.drawWindow(mainWindow.content, 0, 0, mainWindow.innerWidth, mainWindow.innerHeight, "rgb(255,255,255)");
        ctx.drawWindow(mainWindow.content, x, y, width, height, "rgb(255,255,255)");

        var cnvs2 = window.document.createElement("canvas");
        cnvs2.width = 266;
        cnvs2.height = 133;
        ctx = cnvs2.getContext("2d");
        ctx.drawImage(cnvs, 0, 0, cnvs2.width, cnvs2.height);

        return (cnvs2.toDataURL());
        //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}