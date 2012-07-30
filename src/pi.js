/*******************************************
  PiJs is a helper library that provides methods to
  extend and clone javascript objects

  author: Javier Alvarez
  <javieralvarezlop@gmail.com>
  http://twitter.com/johnhackworth
*******************************************/

// Still in development, not functional right now
var pi = function() {
    var _cloneArray = function(arr)  {
        var _clonedArr = [];
        for (var el in arr) {
            _clonedArr.push(_cloneAll(arr[el]));
        }
        return _clonedArr;
    }

    var _copyArray = function(arrayDest, arrayOrigin, overwrite)  {
        var _clonedArr = [];
        var longest = arrayDest.length > arrayOrigin.length ?
                                            arrayDest.length :
                                                arrayOrigin.length;
        for (var i = 0; i < longest; i++) {
            _clonedArr[i] = _copyAll(arrayDest[i], arrayOrigin[i], overwrite);
        }
        return _clonedArr;
    }

    var _clonedObjs = [];
    var _copiedObjs = [];

    var _cloneObj = function(obj) {
        if (typeof obj != 'object') {
            return obj;
        }
        var objAlreadyInsertedPosition = _clonedObjs.indexOf(obj);
        if (objAlreadyInsertedPosition >= 0) {
            return undefined;
        } else {
            _clonedObjs.push(obj);
        }

        var _clonedObj = {};
        var _clonedValue = null;
        for (var prop in obj) {
            if (prop //&&
                    // obj.hasOwnProperty(prop) &&
                        // !prop.indexOf('_') == 0
                        )
            {
                _clonedValue = _cloneAll(obj[prop]);
                _clonedObj[prop] = _clonedValue;
            }
        }

        return _clonedObj;
    }

    var _copyObj = function(objDest, objOrig, overwrite) {
        if (typeof objDest != 'object') {
            return _clone(objOrg);
        }
        var objAlreadyCopiedPosition = _copiedObjs.indexOf(objOrig);
        if (objAlreadyCopiedPosition >= 0) {
            return undefined;
        } else {
            _copiedObjs.push(objOrig);
        }

        var _clonedObj = _clone(objDest);
        for (var prop in objOrig) {
            if (objOrig.hasOwnProperty(prop)) {

                _clonedObj[prop] = _copyAll(objDest[prop], objOrig[prop], overwrite);
            }
        }
        return _clonedObj;
    }

    var _cloneAll = function(param) {
        if (param === undefined) {
            return undefined;
        } else if (param === null) {
            return null;
        } else if (Object.prototype.toString.call(param) === '[object Array]') {
            return _cloneArray(param);
        } else if (typeof param === 'object') {

            return _cloneObj(param);
            // doesn't support regexps yet.
        } else if (typeof param === 'function') {
            return param;
        } else {
            return param;
        }
    }

    var _copyAll = function(entityDest, entityOrg, overwrite) {
        if (entityDest == null || entityDest == undefined) {
            return _clone(entityOrg);
        } else if (entityOrg == null || entityOrg == undefined) {
            return _clone(entityDest);
        } else if (Object.prototype.toString.call(entityOrg) === '[object Array]') {
            return _copyArray(entityDest, entityOrg, overwrite);
        } else if (typeof entityOrg === 'object') {
            return _copyObj(entityDest, entityOrg, overwrite);
            // doesn't support regexps yet.
        } else {
            if (overwrite) {
                return entityOrg;
            } else {
                return entityDest;
            }

        }
    }

    var _copy = function(entityDest, entityOrg, overwrite) {
        _copiedObjs = [];
        return _copyAll(entityDest, entityOrg, overwrite);
    }

    var _clone = function(clonable) {
        _clonedObjs = [];
        return _cloneAll(clonable);
    }

    return {
        extend: function(destinationObject, originObject) {
            return _copy(destinationObject, originObject, true);
        },
        clone: function(clonable) {
            return _clone(clonable);
        },
        copy: function(entityDest, entityOrg, overwrite) {
            return _copy(entityDest, entityOrg, overwrite);
        }
    };
}();
