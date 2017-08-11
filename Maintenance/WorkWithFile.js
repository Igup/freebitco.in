/**
 * Created by Igup on 11.08.2017.
 */
/*Enable:
 js.include('WorkWithFile');
 WorkWithFile = new WorkWithFile;
 var cbj = WorkWithFile.readJSONFromFile("fileName");
 */


if (typeof js !== 'undefined') {
    js.module('WorkWithFile');
}

/**
 * @constructor
 */
function WorkWithFile() {

    /**
     * @param fileName
     * @returns {*}
     */
    this.fileDescriptor = function (fileName) {
        return imns.FIO.openNode(fileName);
    };
}

/**
 * @param fileName
 * @returns {{text: {text, strings}, strings: Array}}
 */
WorkWithFile.prototype.readTextFile = function (fileName) {
    try {
        var text = imns.FIO.readTextFile(this.fileDescriptor(fileName));
        return {
            text: text,
            strings: text.split('\r\n')
        };
    } catch (e) {
        return e;
    }
};
/**
 * @param fileName
 * @param text
 */
WorkWithFile.prototype.writeTextFile = function (fileName, text) {
    try {
        imns.FIO.writeTextFile(this.fileDescriptor(fileName), text);
    } catch (e) {
        return e;
    }
    return true;
};
/**
 * @param fileName
 * @param text
 */
WorkWithFile.prototype.appendTextFile = function (fileName, text) {
    try {
        imns.FIO.appendTextFile(this.fileDescriptor(fileName), text);
    } catch (e) {
        return e;
    }
    return true;
};
/**
 * @param fileName
 * @param obj
 * @returns {*}
 */
WorkWithFile.prototype.saveJSONToFile = function (fileName, obj) {
    try {
        this.writeTextFile(fileName, JSON.stringify(obj, null, 4));
    } catch (e) {
        return e;
    }
    return true;
};
/**
 * @param fileName
 * @returns {boolean}
 */
WorkWithFile.prototype.readJSONFromFile = function (fileName) {
    try {
        var text = this.readTextFile(fileName).text;
        var obj = JSON.parse(text);
        return obj;
    } catch (e) {
        return false;
    }
};