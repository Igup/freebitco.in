/**
 * @author Vladimir Kolesnikov <voloko@gmail.com>
 * @copyright (c) Vladimir Kolesnikov <voloko@gmail.com>
 * Include in main JS Object and Propertys from custom script.js by URL
 *
 * Enable code:
 var js = {
        version: '1.1.7_als',
        rootUrl: 'CUSTOM_URL',
        context: this,
        versioninig: false
    }
 js.include = function(path) {
        //todo: (перенести загрузку по сети из include.js)
        var loadFile = function (fileName) {
            var fileDescriptor = imns.FIO.openNode(fileName);
            return imns.FIO.readTextFile(fileDescriptor);
        }
        eval(loadFile("LOCAL_PATCH_TO include.js"));
    }
 js.include('include');
 js.include('CUSTOM_SCRIPT');
 */

/**
 * From prototype.js
 */
function $(element) {
    if (arguments.length > 1) {
        for (var i = 0, elements = [], length = arguments.length; i < length; i++)
            elements.push($(arguments[i]));
        return elements;
    }
    if (typeof element == 'string')
        element = document.getElementById(element);
    return element;
}

Function.prototype.bind = function () {
    var __method = this;
    var object = arguments[0];
    return function () {
        return __method.apply(object);
    }
}

Object.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

js.getXHTTPTransport = function () {
    var result = false;
    var actions = [
        function () {
            return new XMLHttpRequest()
        },
        function () {
            return new ActiveXObject('Msxml2.XMLHTTP')
        },
        function () {
            return new ActiveXObject('Microsoft.XMLHTTP')
        }
    ];
    for (var i = 0; i < actions.length; i++) {
        try {
            result = actions[i]();
            break;
        } catch (e) {
        }
    }
    return result;
}

/**
 * @param {Object} object
 * @param {String} name
 * @param {Object?} value
 * @param {bool?} forceSet
 */
js.evalProperty = function (object, name, value, forceSet) {
    if (object) {
        if (!object[name] || forceSet) object[name] = value || true;
        return object[name];
    }
    return null;
}
/**
 * @param {String} path
 * @param {Object?} context
 * @param {Object?} value
 * @param {bool?} forceSet
 */
js.evalPath = function (path, context, value, forceSet) {
    context = context || js.context;
    var pos = path.indexOf('.');
    if (pos == -1) {
        return js.evalProperty(context, path, value, forceSet);
    } else {
        var name = path.substring(0, pos);
        var path = path.substring(pos + 1);
        var obj = js.evalProperty(context, name, value);
        return js.evalPath(path, obj, value, forceSet);
    }
}

/**
 * @param {String} path
 * @param {float} version
 * @return {String}
 */
js.pathToUrl = function (path, version) {
    return js.rootUrl + path.replace(/\./g, '/') +
        (js.versioninig ? '.v' + version : '') + '.js';
}
/**
 * @type {Array}
 */
js.loadedModules = {};

/**
 * @param {String} path
 * @param {float} version
 */
js.module = function (path, version) {
    version = version || 1.0;
    js.loadedModules[path] = js.loadedModules[path] ? Math.max(js.loadedModules[path], version) : version;
    return js.evalPath(path, null, {});
}


/**
 * @param {String} path
 * @param {float} version
 */
js.include = function (path, version) {
    version = version || 1.0;
    if (js.loadedModules[path] && js.loadedModules[path] >= version) return false;
    var transport = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
    var async = false;

    transport.open("GET", js.rootUrl + path.replace(/\./g, "/") + ".js", async);
    //ToDo: Запилить проверку версионности
    //transport.open('GET', js.pathToUrl(path, version), false);
    transport.send(null);

    if (transport.status !== 200) {
        var message = "An error occurred while loading script at url: " + js.rootUrl + path.replace(/\./g, "/") + ".js" + ", status: " + transport.status;
        iimDisplay(message);
        return false;
    }
    var code = transport.responseText;

    //todo : задать путь переменной для подгрузки кода из локального хранилища
    var loadFile = function (fileName) {
        var fileDescriptor = imns.FIO.openNode(fileName);
        return imns.FIO.readTextFile(fileDescriptor);
    }
    var pth = "C:\\Users\\sun\\Documents\\GitHub\\freebitco.in\\Maintenance\\" + path + ".js";
    var code = loadFile(pth);
    (typeof execScript != 'undefined') ? execScript(code) :
        (js.context.eval ? js.context.eval(code) : eval(code));
    return true;
}
js.load = js.include;

/**
 * @param {String} newClass
 * @param {Object} superClass
 * @param {Object} props
 */
js.extend = function (newClass, superClass, props) {
    var multiple = [];
    if (superClass instanceof Array || typeof superClass == 'array') {
        multiple = superClass;
        superClass = multiple.shift();
    }
    if (typeof newClass == 'string') {
        newClass = js.evalPath(newClass, null, js.createClass(), 1);
    } else {
        return;
    }

    if (superClass) {
        var inheritance = function () {
        };
        inheritance.prototype = superClass.prototype;

        newClass.prototype = new inheritance();
        newClass.superClass = superClass.prototype;
    }
    for (var i = 0; i < multiple.length; i++) {
        Object.extend(newClass.prototype, multiple[i].prototype);
    }
    newClass.mixins = multiple;

    Object.extend(newClass.prototype, props || {});

    newClass.prototype.constructor = newClass;
}
js.define = js.extend;

js.createClass = function () {
    return function () {
        var _this = arguments.callee.prototype;
        _this.init.apply(this, arguments);
        for (var i = 0, mixins = _this.constructor.mixins, length = mixins.length; i < length; i++) {
            mixins[i].init.apply(this);
        }
    }
}

js.hasOwnProperty = function (obj, prop) {
    if (Object.prototype.hasOwnProperty) {
        return obj.hasOwnProperty(prop);
    }

    return typeof obj[prop] != 'undefined' &&
        obj.constructor.prototype[prop] !== obj[prop];
}

js.dump = function (text) {
};
js.error = function (text) {
};

restorejs = function (obj) {
    return function () {
        window.js = obj;
    }
}(js);