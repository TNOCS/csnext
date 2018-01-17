(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else if(typeof exports === 'object')
		exports["csmuuri"] = factory(require("Vue"));
	else
		root["csmuuri"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = {};

['forEach', 'some', 'every', 'filter', 'map'].forEach(function(fnName) {
  utils[fnName] = function(arr, fn, context) {
    if (!arr || typeof arr === 'string') return arr;
    context = context || this;
    if (arr[fnName]) {
      return arr[fnName](fn, context);
    } else {
      var keys = Object.keys(arr);
      return keys[fnName](function(key) {
        return fn.call(context, arr[key], key, arr);
      }, context);
    }
  };
});

var number = 0;
utils.guid = function() {
  return number++;
};

utils.mixin = function(to, from) {
  utils.forEach(from, function(val, key) {
    if (utils.isArray(val) || utils.isObject(val)) {
      to[key] = utils.mixin(val, to[key] || {});
    } else {
      to[key] = val;
    }
  });
  return to;
};

utils.isArray = function(obj) {
  return {}.toString.call(obj) === '[object Array]';
};

utils.isObject = function(obj) {
  return {}.toString.call(obj) === '[object Object]';
};

utils.indexOf = function(elem, arr) {
  if (utils.isArray(arr)) {
    return arr.indexOf(elem);
  }
};

utils.keys = Object.keys;
utils.now  = Date.now;

module.exports = utils;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Helper = {};
var utils = __webpack_require__(2);
__webpack_require__(8)(Helper, utils);
module.exports = Helper;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
__webpack_require__(3);
module.exports = __webpack_require__(20);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Compile = __webpack_require__(7);
var Helper = __webpack_require__(4);
var parse = __webpack_require__(15);

Compile.parse = parse;

var Velocity = {
  parse: parse,
  Compile: Compile,
  Helper: Helper
};

Velocity.render = function(template, context, macros, config) {

  var asts = parse(template);
  var compile = new Compile(asts, config);
  return compile.render(context, macros);
};

module.exports = Velocity;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(2);
var Helper = __webpack_require__(4);
function Velocity(asts, config) {
  this.asts = asts;
  this.config = {
    // 自动输出为经过html encode输出
    escape: true,
    // 不需要转义的白名单
    unescape: {}
  };
  utils.mixin(this.config, config);
  this._state = { stop: false, break: false };
  this.init();
}

Velocity.Helper = Helper;
Velocity.prototype = {
  constructor: Velocity
};

__webpack_require__(9)(Velocity, utils);
__webpack_require__(10)(Velocity, utils);
__webpack_require__(11)(Velocity, utils);
__webpack_require__(12)(Velocity, utils);
__webpack_require__(13)(Velocity, utils);
__webpack_require__(14)(Velocity, utils);
module.exports = Velocity;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(Helper, utils){
  /**
   * 获取引用文本，当引用自身不存在的情况下，需要返回原来的模板字符串
   */
  function getRefText(ast){

    var ret = ast.leader;
    var isFn = ast.args !== undefined;

    if (ast.type === 'macro_call') {
      ret = '#';
    }

    if (ast.isWraped) ret += '{';

    if (isFn) {
      ret += getMethodText(ast);
    } else {
      ret += ast.id;
    }

    utils.forEach(ast.path, function(ref){
      //不支持method并且传递参数
      if (ref.type == 'method') {
        ret += '.' + getMethodText(ref);
      } else if (ref.type == 'index') {

        var text = '';
        var id = ref.id;

        if (id.type === 'integer') {

          text = id.value;

        } else if (id.type === 'string') {

          var sign = id.isEval? '"': "'";
          text = sign + id.value + sign;

        } else {

          text = getRefText(id);

        }

        ret += '[' + text + ']';

      } else if (ref.type == 'property') {

        ret += '.' + ref.id;

      }

    }, this);

    if (ast.isWraped) ret += '}';

    return ret;
  }

  function getMethodText(ref) {

    var args = [];
    var ret = '';

    utils.forEach(ref.args, function(arg){
      args.push(getLiteral(arg));
    });

    ret += ref.id + '(' + args.join(',') + ')';

    return ret;

  }

  function getLiteral(ast){

    var ret = '';

    switch(ast.type) {

      case 'string': {
        var sign = ast.isEval? '"': "'";
        ret = sign + ast.value + sign;
        break;
      }

      case 'integer':
      case 'runt':
      case 'bool'   : {
        ret = ast.value;
        break;
      }

      case 'array': {
        ret = '[';
        var len = ast.value.length - 1;
        utils.forEach(ast.value, function(arg, i){
          ret += getLiteral(arg);
          if (i !== len) ret += ', ';
        });
        ret += ']';
        break;
      }

      default:
        ret = getRefText(ast)
    }

    return ret;
  }

  Helper.getRefText = getRefText;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function(Velocity, utils) {

  /**
   * blocks语法处理
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 处理代码库: if foreach macro
     */
    getBlock: function(block) {

      var ast = block[0];
      var ret = '';

      switch (ast.type) {
        case 'if':
          ret = this.getBlockIf(block);
          break;
        case 'foreach':
          ret = this.getBlockEach(block);
          break;
        case 'macro':
          this.setBlockMacro(block);
          break;
        case 'noescape':
          ret = this._render(block.slice(1));
          break;
        case 'define':
          this.setBlockDefine(block);
          break;
        case 'macro_body':
          ret = this.getMacroBody(block);
          break;
        default:
          ret = this._render(block);
      }

      return ret || '';
    },

    /**
     * define
     */
    setBlockDefine: function(block) {
      var ast = block[0];
      var _block = block.slice(1);
      var defines = this.defines;

      defines[ast.id] = _block;
    },

    /**
     * define macro
     */
    setBlockMacro: function(block) {
      var ast = block[0];
      var _block = block.slice(1);
      var macros = this.macros;

      macros[ast.id] = {
        asts: _block,
        args: ast.args
      };
    },

    getMacroBody: function(asts) {
      const ast = asts[0];
      var _block = asts.slice(1);
      var bodyContent = this.eval(_block, {});
      return this.getMacro(ast, bodyContent);
    },

    /**
     * parse macro call
     */
    getMacro: function(ast, bodyContent) {
      var macro = this.macros[ast.id];
      var ret = '';

      if (!macro) {

        var jsmacros = this.jsmacros;
        macro = jsmacros[ast.id];
        var jsArgs = [];

        if (macro && macro.apply) {

          utils.forEach(ast.args, function(a) {
            jsArgs.push(this.getLiteral(a));
          }, this);

          var self = this;

          // bug修复：此处由于闭包特性，导致eval函数执行时的this对象是上一次函数执行时的this对象，渲染时上下文发生错误。
          jsmacros.eval = function() {
            return self.eval.apply(self, arguments);
          };


          try {
            ret = macro.apply(jsmacros, jsArgs);
          } catch (e) {
            var pos = ast.pos;
            var text = Velocity.Helper.getRefText(ast);
            // throws error tree
            var err = '\n      at ' + text + ' L/N ' + pos.first_line + ':' + pos.first_column;
            e.name = '';
            e.message += err;
            throw new Error(e);
          }

        }

      } else {
        var asts = macro.asts;
        var args = macro.args;
        var callArgs = ast.args;
        var local = { bodyContent: bodyContent };
        var guid = utils.guid();
        var contextId = 'macro:' + ast.id + ':' + guid;

        utils.forEach(args, function(ref, i) {
          if (callArgs[i]) {
            local[ref.id] = this.getLiteral(callArgs[i]);
          } else {
            local[ref.id] = undefined;
          }
        }, this);

        ret = this.eval(asts, local, contextId);
      }

      return ret;
    },

    /**
     * eval
     * @param str {array|string} 需要解析的字符串
     * @param local {object} 局部变量
     * @param contextId {string}
     * @return {string}
     */
    eval: function(str, local, contextId) {

      if (!local) {

        if (utils.isArray(str)) {
          return this._render(str);
        } else {
          return this.evalStr(str);
        }

      } else {

        var asts = [];
        var parse = Velocity.parse;
        contextId = contextId || ('eval:' + utils.guid());

        if (utils.isArray(str)) {

          asts = str;

        } else if (parse) {

          asts = parse(str);

        }

        if (asts.length) {

          this.local[contextId] = local;
          var ret = this._render(asts, contextId);
          this.local[contextId] = {};
          this.conditions.shift();
          this.condition = this.conditions[0] || '';

          return ret;
        }

      }

    },

    /**
     * parse #foreach
     */
    getBlockEach: function(block) {

      var ast = block[0];
      var _from = this.getLiteral(ast.from);
      var _block = block.slice(1);
      var _to = ast.to;
      var local = {
        foreach: {
          count: 0
        }
      };
      var ret = '';
      var guid = utils.guid();
      var contextId = 'foreach:' + guid;

      var type = ({}).toString.call(_from);
      if (!_from || (type !== '[object Array]' && type !== '[object Object]')) {
        return '';
      }

      if (utils.isArray(_from)) {
        var len = _from.length;
        utils.forEach(_from, function(val, i) {
          if (this._state.break) {
            return;
          }
          // 构造临时变量
          local[_to] = val;
          local.foreach = {
            count: i + 1,
            index: i,
            hasNext: i + 1 < len
          };
          local.velocityCount = i + 1;

          this.local[contextId] = local;
          ret += this._render(_block, contextId);

        }, this);
      } else {
        var len = utils.keys(_from).length;
        utils.forEach(utils.keys(_from), function(key, i) {
          if (this._state.break) {
            return;
          }
          local[_to] = _from[key];
          local.foreach = {
            count: i + 1,
            index: i,
            hasNext: i + 1 < len
          };
          local.velocityCount = i + 1;
          this.local[contextId] = local;
          ret += this._render(_block, contextId);
        }, this);
      }

      // if foreach items be an empty array, then this code will shift current
      // conditions, but not this._render call, so this will shift parent context
      if (_from && _from.length) {
        this._state.break = false;
        // empty current local context object
        this.local[contextId] = {};
        this.conditions.shift();
        this.condition = this.conditions[0] || '';
      }

      return ret;

    },

    /**
     * parse #if
     */
    getBlockIf: function(block) {

      var received = false;
      var asts = [];

      utils.some(block, function(ast) {

        if (ast.condition) {

          if (received) {
            return true;
          }
          received = this.getExpression(ast.condition);

        } else if (ast.type === 'else') {
          if (received) {
            return true;
          }
          received = true;
        } else if (received) {
          asts.push(ast);
        }

        return false;

      }, this);

      // keep current condition fix #77
      return this._render(asts, this.condition);
    }
  });
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function(Velocity, utils) {
  /**
   * literal解释模块
   * @require {method} getReferences
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 字面量求值，主要包括string, integer, array, map四种数据结构
     * @param literal {object} 定义于velocity.yy文件，type描述数据类型，value属性
     * 是literal值描述
     * @return {object|string|number|array}返回对应的js变量
     */
    getLiteral: function(literal) {

      var type = literal.type;
      var ret = '';

      if (type === 'string') {

        ret = this.getString(literal);

      } else if (type === 'integer') {

        ret = parseInt(literal.value, 10);

      } else if (type === 'decimal') {

        ret = parseFloat(literal.value, 10);

      } else if (type === 'array') {

        ret = this.getArray(literal);

      } else if (type === 'map') {

        ret = {};
        var map = literal.value;

        utils.forEach(map, function(exp, key) {
          ret[key] = this.getLiteral(exp);
        }, this);
      } else if (type === 'bool') {

        if (literal.value === "null") {
          ret = null;
        } else if (literal.value === 'false') {
          ret = false;
        } else if (literal.value === 'true') {
          ret = true;
        }

      } else {

        return this.getReferences(literal);

      }

      return ret;
    },

    /**
     * 对字符串求值，对已双引号字符串，需要做变量替换
     */
    getString: function(literal) {
      var val = literal.value;
      var ret = val;

      if (literal.isEval && (val.indexOf('#') !== -1 ||
            val.indexOf("$") !== -1)) {
        ret = this.evalStr(val);
      }

      return ret;
    },

    /**
     * 对array字面量求值，比如[1, 2]=> [1,2]，[1..5] => [1,2,3,4,5]
     * @param literal {object} array字面量的描述对象，分为普通数组和range数组两种
     * ，和js基本一致
     * @return {array} 求值得到的数组
     */
    getArray: function(literal) {

      var ret = [];

      if (literal.isRange) {

        var begin = literal.value[0];
        if (begin.type === 'references') {
          begin = this.getReferences(begin);
        }

        var end = literal.value[1];
        if (end.type === 'references') {
          end = this.getReferences(end);
        }

        end   = parseInt(end, 10);
        begin = parseInt(begin, 10);

        var i;

        if (!isNaN(begin) && !isNaN(end)) {

          if (begin < end) {
            for (i = begin; i <= end; i++) ret.push(i);
          } else {
            for (i = begin; i >= end; i--) ret.push(i);
          }
        }

      } else {
        utils.forEach(literal.value, function(exp) {
          ret.push(this.getLiteral(exp));
        }, this);
      }

      return ret;
    },

    /**
     * 对双引号字符串进行eval求值，替换其中的变量，只支持最基本的变量类型替换
     */
    evalStr: function(str) {
      var asts = Velocity.parse(str);
      return this._render(asts, this.condition);
    }
  });
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(Velocity, utils) {

  'use strict';

  function getSize(obj) {

    if (utils.isArray(obj)) {
      return obj.length;
    } else if (utils.isObject(obj)) {
      return utils.keys(obj).length;
    }

    return undefined;
  }

  /**
   * unicode转码
   */
  function convert(str) {

    if (typeof str !== 'string') return str;

    var result = ""
    var escape = false
    var i, c, cstr;

    for (i = 0 ; i < str.length ; i++) {
      c = str.charAt(i);
      if ((' ' <= c && c <= '~') || (c === '\r') || (c === '\n')) {
        if (c === '&') {
          cstr = "&amp;"
          escape = true
        } else if (c === '<') {
          cstr = "&lt;"
          escape = true
        } else if (c === '>') {
          cstr = "&gt;"
          escape = true
        } else {
          cstr = c.toString()
        }
      } else {
        cstr = "&#" + c.charCodeAt().toString() + ";"
      }

      result = result + cstr
    }

    return escape ? result : str
  }

  function getter(base, property) {
    // get(1)
    if (typeof property === 'number') {
      return base[property];
    }

    var letter = property.charCodeAt(0);
    var isUpper = letter < 91;
    var ret = base[property];

    if (ret !== undefined) {
      return ret;
    }

    if (isUpper) {
      // Address => address
      property = String.fromCharCode(letter).toLowerCase() + property.slice(1);
    }

    if (!isUpper) {
      // address => Address
      property = String.fromCharCode(letter).toUpperCase() + property.slice(1);
    }

    return base[property];
  }

  utils.mixin(Velocity.prototype, {
    // 增加某些函数，不需要执行html转义
    addIgnoreEscpape: function(key) {

      if (!utils.isArray(key)) key = [key]

      utils.forEach(key, function(key) {
        this.config.unescape[key] = true
      }, this)

    },

    /**
     * 引用求值
     * @param {object} ast 结构来自velocity.yy
     * @param {bool} isVal 取值还是获取字符串，两者的区别在于，求值返回结果，求
     * 字符串，如果没有返回变量自身，比如$foo
     */
    getReferences: function(ast, isVal) {

      if (ast.prue) {
        var define = this.defines[ast.id];
        if (utils.isArray(define)) {
          return this._render(define);
        }
        if (ast.id in this.config.unescape) ast.prue = false;
      }
      var escape = this.config.escape;

      var isSilent = this.silence || ast.leader === "$!";
      var isfn     = ast.args !== undefined;
      var context  = this.context;
      var ret      = context[ast.id];
      var local    = this.getLocal(ast);

      var text = Velocity.Helper.getRefText(ast);

      if (text in context) {
        return (ast.prue && escape) ? convert(context[text]) : context[text];
      }


      if (ret !== undefined && isfn) {
        ret = this.getPropMethod(ast, context, ast);
      }

      if (local.isLocaled) ret = local['value'];

      if (ast.path) {

        utils.some(ast.path, function(property, i, len) {

          if (ret === undefined) {
            this._throw(ast, property);
          }

          // 第三个参数，返回后面的参数ast
          ret = this.getAttributes(property, ret, ast);

        }, this);
      }

      if (isVal && ret === undefined) {
        ret = isSilent ? '' : Velocity.Helper.getRefText(ast);
      }

      ret = (ast.prue && escape) ? convert(ret) : ret;

      return ret;
    },

    /**
     * 获取局部变量，在macro和foreach循环中使用
     */
    getLocal: function(ast) {

      var id = ast.id;
      var local = this.local;
      var ret = false;

      var isLocaled = utils.some(this.conditions, function(contextId) {
        var _local = local[contextId];
        if (id in _local) {
          ret = _local[id];
          return true;
        }

        return false;
      }, this);

      return {
        value: ret,
        isLocaled: isLocaled
      };
    },
    /**
     * $foo.bar 属性求值，最后面两个参数在用户传递的函数中用到
     * @param {object} property 属性描述，一个对象，主要包括id，type等定义
     * @param {object} baseRef 当前执行链结果，比如$a.b.c，第一次baseRef是$a,
     * 第二次是$a.b返回值
     * @private
     */
    getAttributes: function(property, baseRef, ast) {
      // fix #54
      if (baseRef === null || baseRef === undefined) {
        return undefined;
      }

      /**
       * type对应着velocity.yy中的attribute，三种类型: method, index, property
       */
      var type = property.type;
      var ret;
      var id = property.id;
      if (type === 'method') {
        ret = this.getPropMethod(property, baseRef, ast);
      } else if (type === 'property') {
        ret = baseRef[id];
      } else {
        ret = this.getPropIndex(property, baseRef);
      }
      return ret;
    },

    /**
     * $foo.bar[1] index求值
     * @private
     */
    getPropIndex: function(property, baseRef) {
      var ast = property.id;
      var key;
      if (ast.type === 'references') {
        key = this.getReferences(ast);
      } else if (ast.type === 'integer') {
        key = ast.value;
      } else {
        key = ast.value;
      }

      return baseRef[key];
    },

    /**
     * $foo.bar()求值
     */
    getPropMethod: function(property, baseRef, ast) {

      var id = property.id;
      var ret = '';

      // getter 处理
      if (id.indexOf('get') === 0 && !(id in baseRef)) {
        if (id.length === 3) {
          // get('address')
          ret = getter(baseRef, this.getLiteral(property.args[0]));
        } else {
          // getAddress()
          ret = getter(baseRef, id.slice(3));
        }

        return ret;

      // setter 处理
      } else if (id.indexOf('set') === 0 && !baseRef[id]) {

        baseRef[id.slice(3)] = this.getLiteral(property.args[0]);
        // $page.setName(123)
        baseRef.toString = function() { return ''; };
        return baseRef;

      } else if (id.indexOf('is') === 0 && !(id in baseRef)) {

        return getter(baseRef, id.slice(2));
      } else if (id === 'keySet') {

        return utils.keys(baseRef);

      } else if (id === 'entrySet') {

        ret = [];
        utils.forEach(baseRef, function(value, key) {
          ret.push({key: key, value: value});
        });

        return ret;

      } else if (id === 'size') {

        return getSize(baseRef);

      } else {

        ret = baseRef[id];
        var args = [];

        utils.forEach(property.args, function(exp) {
          args.push(this.getLiteral(exp));
        }, this);

        if (ret && ret.call) {

          var that = this;

          if(typeof baseRef === 'object' && baseRef){
            baseRef.eval = function() {
              return that.eval.apply(that, arguments);
            };
          }

          try {
            ret = ret.apply(baseRef, args);
          } catch (e) {
            var pos = ast.pos;
            var text = Velocity.Helper.getRefText(ast);
            var err = ' on ' + text + ' at L/N ' +
              pos.first_line + ':' + pos.first_column;
            e.name = '';
            e.message += err;
            throw new Error(e);
          }

        } else {
          this._throw(ast, property, 'TypeError');
          ret = undefined;
        }
      }

      return ret;
    },

    _throw: function(ast, property, errorName) {
      if (this.config.env !== 'development') {
        return;
      }

      var text = Velocity.Helper.getRefText(ast);
      var pos = ast.pos;
      var propertyName = property.type === 'index' ? property.id.value : property.id;
      var errorMsg = 'get property ' + propertyName + ' of undefined';
      if (errorName === 'TypeError') {
        errorMsg = propertyName + ' is not method';
      }

      errorMsg += '\n  at L/N ' + text + ' ' + pos.first_line + ':' + pos.first_column;
      var e = new Error(errorMsg);
      e.name = errorName || 'ReferenceError';
      throw e;
    }
  })

}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(Velocity, utils){
  /**
   * 变量设置
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 获取执行环境，对于macro中定义的变量，为局部变量，不贮存在全局中，执行后销毁
     */
    getContext: function(){
      var condition = this.condition;
      var local = this.local;
      if (condition) {
        return local[condition];
      } else {
        return this.context;
      }
    },
    /**
     * parse #set
     */
    setValue: function(ast){
      var ref = ast.equal[0];
      var context  = this.getContext();

      //see https://github.com/shepherdwind/velocity.js/issues/25
      if (this.condition && this.condition.indexOf('macro:') === 0) {
        context = this.context;
      } else if (this.context[ref.id] != null) {
        context = this.context;
      }

      var valAst = ast.equal[1];
      var val;

      if (valAst.type === 'math') {
        val = this.getExpression(valAst);
      } else {
        val = this.getLiteral(ast.equal[1]);
      }

      if (!ref.path) {

        context[ref.id] = val;

      } else {

        var baseRef = context[ref.id];
        if (typeof baseRef != 'object') {
          baseRef = {};
        }

        context[ref.id] = baseRef;
        var len = ref.path ? ref.path.length: 0;

        const self = this;
        //console.log(val);
        utils.some(ref.path, function(exp, i){

          var isEnd = len === i + 1;
          var key = exp.id;
          if (exp.type === 'index')  {
            if (exp.id) {
              key = self.getLiteral(exp.id);
            } else {
              key = key.value;
            }
          }

          if (isEnd) {
            return baseRef[key] = val;
          }

          baseRef = baseRef[key];

          // such as
          // #set($a.d.c2 = 2)
          // but $a.d is undefined , value set fail
          if (baseRef === undefined) {
            return true;
          }
        });

      }
    }
  });
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(Velocity, utils){
  /**
   * expression运算
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 表达式求值，表达式主要是数学表达式，逻辑运算和比较运算，到最底层数据结构，
     * 基本数据类型，使用 getLiteral求值，getLiteral遇到是引用的时候，使用
     * getReferences求值
     */
    getExpression: function(ast){

      var exp = ast.expression;
      var ret;
      if (ast.type === 'math') {

        switch(ast.operator) {
          case '+':
          ret = this.getExpression(exp[0]) + this.getExpression(exp[1]);
          break;

          case '-':
          ret = this.getExpression(exp[0]) - this.getExpression(exp[1]);
          break;

          case '/':
          ret = this.getExpression(exp[0]) / this.getExpression(exp[1]);
          break;

          case '%':
          ret = this.getExpression(exp[0]) % this.getExpression(exp[1]);
          break;

          case '*':
          ret = this.getExpression(exp[0]) * this.getExpression(exp[1]);
          break;

          case '||':
          ret = this.getExpression(exp[0]) || this.getExpression(exp[1]);
          break;

          case '&&':
          ret = this.getExpression(exp[0]) && this.getExpression(exp[1]);
          break;

          case '>':
          ret = this.getExpression(exp[0]) > this.getExpression(exp[1]);
          break;

          case '<':
          ret = this.getExpression(exp[0]) < this.getExpression(exp[1]);
          break;

          case '==':
          ret = this.getExpression(exp[0]) == this.getExpression(exp[1]);
          break;

          case '>=':
          ret = this.getExpression(exp[0]) >= this.getExpression(exp[1]);
          break;

          case '<=':
          ret = this.getExpression(exp[0]) <= this.getExpression(exp[1]);
          break;

          case '!=':
          ret = this.getExpression(exp[0]) != this.getExpression(exp[1]);
          break;

          case 'minus':
          ret = - this.getExpression(exp[0]);
          break;

          case 'not':
          ret = !this.getExpression(exp[0]);
          break;

          case 'parenthesis':
          ret = this.getExpression(exp[0]);
          break;

          default:
          return;
          // code
        }

        return ret;
      } else {
        return this.getLiteral(ast);
      }
    }
  });
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(Velocity, utils) {

  /**
   * compile
   */
  utils.mixin(Velocity.prototype, {
    init: function() {
      this.context = {};
      this.macros = {};
      this.defines = {};
      this.conditions = [];
      this.local = {};
      this.silence = false;
      this.unescape = {};

      var self = this;
      this.directive = {
        stop: function() {
          self._state.stop = true;
          return '';
        }
      };
    },

    /**
     * @param context {object} 上下文环境，数据对象
     * @param macro   {object} self defined #macro
     * @param silent {bool} 如果是true，$foo变量将原样输出
     * @return str
     */
    render: function(context, macros, silence) {

      this.silence = !!silence;
      this.context = context || {};
      this.jsmacros = utils.mixin(macros || {}, this.directive);
      var t1 = utils.now();
      var str = this._render();
      var t2 = utils.now();
      var cost = t2 - t1;

      this.cost = cost;

      return str;
    },

    /**
     * 解析入口函数
     * @param ast {array} 模板结构数组
     * @param contextId {number} 执行环境id，对于macro有局部作用域，变量的设置和
     * 取值，都放在一个this.local下，通过contextId查找
     * @return {string}解析后的字符串
     */
    _render: function(asts, contextId) {

      var str = '';
      asts = asts || this.asts;

      if (contextId) {

        if (contextId !== this.condition &&
            utils.indexOf(contextId, this.conditions) === -1) {
          this.conditions.unshift(contextId);
        }

        this.condition = contextId;

      } else {
        this.condition = null;
      }

      utils.forEach(asts, function(ast) {

        // 进入stop，直接退出
        if (this._state.stop === true) {
          return false;
        }

        switch (ast.type) {
          case 'references':
            str += this.format(this.getReferences(ast, true));
          break;

          case 'set':
            this.setValue(ast);
          break;

          case 'break':
            this._state.break = true;
          break;

          case 'macro_call':
            str += this.getMacro(ast);
          break;

          case 'comment':
          break;

          case 'raw':
            str += ast.value;
          break;

          default:
            str += typeof ast === 'string' ? ast : this.getBlock(ast);
          break;
        }
      }, this);

      return str;
    },
    format: function(value) {
      if (utils.isArray(value)) {
        return "[" + value.map(this.format.bind(this)).join(", ") + "]";
      }

      if (utils.isObject(value)) {
        if (value.toString.toString().indexOf('[native code]') === -1) {
          return value;
        }

        var kvJoin = function(k) { return k + "=" + this.format(value[k]); }.bind(this);
        return "{" + Object.keys(value).map(kvJoin).join(", ") + "}";
      }

      return value;
    }
  });
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Parser  = __webpack_require__(16);
var _parse = Parser.parse;
var utils = __webpack_require__(2);

var blockTypes = {
  if: true,
  foreach: true,
  macro: true,
  noescape: true,
  define: true,
  macro_body: true,
};

var customBlocks = [];

/**
 * @param {string} str string to parse
 * @param {object} blocks self define blocks, such as `#cms(1) hello #end`
 * @param {boolean} ignoreSpace if set true, then ignore the newline trim.
 * @return {array} ast array
 */
var parse = function(str, blocks, ignoreSpace) {
  var asts = _parse(str);
  customBlocks = blocks || {};

  /**
   * remove all newline after all direction such as `#set, #each`
   */
  ignoreSpace || utils.forEach(asts, function trim(ast, i) {
    var TRIM_REG = /^[ \t]*\n/;
    // after raw and references, then keep the newline.
    if (ast.type && ['references', 'raw'].indexOf(ast.type) === -1) {
      var _ast = asts[i + 1];
      if (typeof _ast === 'string' && TRIM_REG.test(_ast)) {
        asts[i + 1] = _ast.replace(TRIM_REG, '');
      }
    }
  });

  var ret = makeLevel(asts);

  return utils.isArray(ret) ? ret : ret.arr;
};

function makeLevel(block, index) {

  var len = block.length;
  index = index || 0;
  var ret = [];
  var ignore = index - 1;

  for (var i = index; i < len; i++) {

    if (i <= ignore) continue;

    var ast = block[i];
    var type = ast.type;

    var isBlockType = blockTypes[type];

    // 自定义类型支持
    if (!isBlockType && ast.type === 'macro_call' && customBlocks[ast.id]) {
      isBlockType = true;
      ast.type = ast.id;
      delete ast.id;
    }

    if (!isBlockType && type !== 'end') {

      ret.push(ast);

    } else if (type === 'end') {

      return {arr: ret, step: i};

    } else {

      var _ret = makeLevel(block, i + 1);
      ignore = _ret.step;
      _ret.arr.unshift(block[i]);
      ret.push(_ret.arr);

    }

  }

  return ret;
}

module.exports = parse;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var velocity = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,9],$V2=[1,19],$V3=[1,10],$V4=[1,24],$V5=[1,25],$V6=[1,23],$V7=[4,10,11,20,35,36,46,82],$V8=[1,29],$V9=[1,33],$Va=[1,32],$Vb=[4,10,11,20,23,35,36,39,46,49,50,51,54,55,56,57,58,59,60,61,62,63,64,65,66,82,84,94],$Vc=[1,50],$Vd=[1,55],$Ve=[1,56],$Vf=[1,72],$Vg=[1,71],$Vh=[1,84],$Vi=[1,79],$Vj=[1,87],$Vk=[1,95],$Vl=[1,85],$Vm=[1,90],$Vn=[1,94],$Vo=[1,91],$Vp=[1,92],$Vq=[4,10,11,20,23,35,36,39,46,49,50,51,54,55,56,57,58,59,60,61,62,63,64,65,66,75,80,82,83,84,94],$Vr=[1,107],$Vs=[1,121],$Vt=[1,117],$Vu=[1,118],$Vv=[1,131],$Vw=[23,50,84],$Vx=[2,96],$Vy=[23,39,49,50,84],$Vz=[23,39,49,50,54,55,56,57,58,59,60,61,62,63,64,65,66,82,84],$VA=[23,39,49,50,54,55,56,57,58,59,60,61,62,63,64,65,66,82,84,96],$VB=[2,109],$VC=[23,39,49,50,54,55,56,57,58,59,60,61,62,63,64,65,66,82,84,94],$VD=[2,112],$VE=[1,140],$VF=[1,146],$VG=[23,49,50],$VH=[1,151],$VI=[1,152],$VJ=[1,153],$VK=[1,154],$VL=[1,155],$VM=[1,156],$VN=[1,157],$VO=[1,158],$VP=[1,159],$VQ=[1,160],$VR=[1,161],$VS=[1,162],$VT=[1,163],$VU=[23,54,55,56,57,58,59,60,61,62,63,64,65,66],$VV=[50,84],$VW=[2,113],$VX=[23,35],$VY=[1,213],$VZ=[1,212],$V_=[39,50],$V$=[23,54,55],$V01=[23,54,55,56,57,61,62,63,64,65,66],$V11=[23,54,55,61,62,63,64,65,66];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"EOF":4,"statements":5,"statement":6,"references":7,"directives":8,"content":9,"RAW":10,"COMMENT":11,"set":12,"if":13,"elseif":14,"else":15,"end":16,"foreach":17,"break":18,"define":19,"HASH":20,"NOESCAPE":21,"PARENTHESIS":22,"CLOSE_PARENTHESIS":23,"macro":24,"macro_call":25,"macro_body":26,"SET":27,"equal":28,"IF":29,"expression":30,"ELSEIF":31,"ELSE":32,"END":33,"FOREACH":34,"DOLLAR":35,"ID":36,"IN":37,"MAP_BEGIN":38,"MAP_END":39,"array":40,"BREAK":41,"DEFINE":42,"MACRO":43,"macro_args":44,"macro_call_args_all":45,"MACRO_BODY":46,"macro_call_args":47,"literals":48,"SPACE":49,"COMMA":50,"EQUAL":51,"map":52,"math":53,"||":54,"&&":55,"+":56,"-":57,"*":58,"/":59,"%":60,">":61,"<":62,"==":63,">=":64,"<=":65,"!=":66,"parenthesis":67,"!":68,"literal":69,"brace_begin":70,"attributes":71,"brace_end":72,"methodbd":73,"VAR_BEGIN":74,"VAR_END":75,"attribute":76,"method":77,"index":78,"property":79,"DOT":80,"params":81,"CONTENT":82,"BRACKET":83,"CLOSE_BRACKET":84,"string":85,"number":86,"BOOL":87,"integer":88,"INTEGER":89,"DECIMAL_POINT":90,"STRING":91,"EVAL_STRING":92,"range":93,"RANGE":94,"map_item":95,"MAP_SPLIT":96,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",10:"RAW",11:"COMMENT",20:"HASH",21:"NOESCAPE",22:"PARENTHESIS",23:"CLOSE_PARENTHESIS",27:"SET",29:"IF",31:"ELSEIF",32:"ELSE",33:"END",34:"FOREACH",35:"DOLLAR",36:"ID",37:"IN",38:"MAP_BEGIN",39:"MAP_END",41:"BREAK",42:"DEFINE",43:"MACRO",46:"MACRO_BODY",49:"SPACE",50:"COMMA",51:"EQUAL",54:"||",55:"&&",56:"+",57:"-",58:"*",59:"/",60:"%",61:">",62:"<",63:"==",64:">=",65:"<=",66:"!=",68:"!",74:"VAR_BEGIN",75:"VAR_END",80:"DOT",82:"CONTENT",83:"BRACKET",84:"CLOSE_BRACKET",87:"BOOL",89:"INTEGER",90:"DECIMAL_POINT",91:"STRING",92:"EVAL_STRING",94:"RANGE",96:"MAP_SPLIT"},
productions_: [0,[3,1],[3,2],[5,1],[5,2],[6,1],[6,1],[6,1],[6,1],[6,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,4],[8,1],[8,1],[8,1],[12,5],[13,5],[14,5],[15,2],[16,2],[17,8],[17,10],[17,8],[17,10],[18,2],[19,6],[24,6],[24,5],[44,1],[44,2],[25,5],[25,4],[26,5],[26,4],[47,1],[47,1],[47,3],[47,3],[47,3],[47,3],[45,1],[45,2],[45,3],[45,2],[28,3],[30,1],[30,1],[30,1],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,3],[53,1],[53,2],[53,2],[53,1],[53,1],[67,3],[7,5],[7,3],[7,5],[7,3],[7,2],[7,4],[7,2],[7,4],[70,1],[70,1],[72,1],[72,1],[71,1],[71,2],[76,1],[76,1],[76,1],[77,2],[73,4],[73,3],[81,1],[81,1],[81,1],[81,3],[81,3],[79,2],[79,2],[78,3],[78,3],[78,3],[78,2],[78,2],[69,1],[69,1],[69,1],[86,1],[86,3],[86,4],[88,1],[88,2],[85,1],[85,1],[48,1],[48,1],[48,1],[40,3],[40,1],[40,2],[93,5],[93,5],[93,5],[93,5],[52,3],[52,2],[95,3],[95,3],[95,2],[95,5],[95,5],[9,1],[9,1],[9,2],[9,3],[9,3],[9,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return []; 
break;
case 2:
 return $$[$0-1]; 
break;
case 3: case 35: case 41: case 42: case 86: case 94: case 96:
 this.$ = [$$[$0]]; 
break;
case 4: case 36: case 87:
 this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 5:
 $$[$0]['prue'] = true;  $$[$0].pos = this._$; this.$ = $$[$0]; 
break;
case 6:
 $$[$0].pos = this._$; this.$ = $$[$0]; 
break;
case 7: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 19: case 20: case 21: case 47: case 48: case 52: case 53: case 54: case 68: case 71: case 72: case 82: case 83: case 84: case 85: case 91: case 99: case 106: case 107: case 112: case 118: case 120: case 133: case 134:
 this.$ = $$[$0]; 
break;
case 8:
 this.$ = {type: 'raw', value: $$[$0] }; 
break;
case 9:
 this.$ = {type: 'comment', value: $$[$0] }; 
break;
case 18:
 this.$ = { type: 'noescape' }; 
break;
case 22:
 this.$ = {type: 'set', equal: $$[$0-1] }; 
break;
case 23:
 this.$ = {type: 'if', condition: $$[$0-1] }; 
break;
case 24:
 this.$ = {type: 'elseif', condition: $$[$0-1] }; 
break;
case 25:
 this.$ = {type: 'else' }; 
break;
case 26:
 this.$ = {type: 'end' }; 
break;
case 27: case 29:
 this.$ = {type: 'foreach', to: $$[$0-3], from: $$[$0-1] }; 
break;
case 28: case 30:
 this.$ = {type: 'foreach', to: $$[$0-4], from: $$[$0-1] }; 
break;
case 31:
 this.$ = {type: $$[$0] }; 
break;
case 32:
 this.$ = {type: 'define', id: $$[$0-1] }; 
break;
case 33:
 this.$ = {type: 'macro', id: $$[$0-2], args: $$[$0-1] }; 
break;
case 34:
 this.$ = {type: 'macro', id: $$[$0-1] }; 
break;
case 37:
 this.$ = { type:"macro_call", id: $$[$0-3].replace(/^\s+|\s+$/g, ''), args: $$[$0-1] }; 
break;
case 38:
 this.$ = { type:"macro_call", id: $$[$0-2].replace(/^\s+|\s+$/g, '') }; 
break;
case 39:
 this.$ = {type: 'macro_body', id: $$[$0-3], args: $$[$0-1] }; 
break;
case 40:
 this.$ = {type: 'macro_body', id: $$[$0-2] }; 
break;
case 43: case 44: case 45: case 46: case 97: case 98:
 this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 49: case 50: case 101: case 102:
 this.$ = $$[$0-1]; 
break;
case 51:
 this.$ = [$$[$0-2], $$[$0]]; 
break;
case 55:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '||' }; 
break;
case 56:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '&&' }; 
break;
case 57: case 58: case 59: case 60: case 61:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1] }; 
break;
case 62:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '>' }; 
break;
case 63:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '<' }; 
break;
case 64:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '==' }; 
break;
case 65:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '>=' }; 
break;
case 66:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '<=' }; 
break;
case 67:
 this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: '!=' }; 
break;
case 69:
 this.$ = {type: 'math', expression: [$$[$0]], operator: 'minus' }; 
break;
case 70:
 this.$ = {type: 'math', expression: [$$[$0]], operator: 'not' }; 
break;
case 73:
 this.$ = {type: 'math', expression: [$$[$0-1]], operator: 'parenthesis' }; 
break;
case 74:
 this.$ = {type: "references", id: $$[$0-2], path: $$[$0-1], isWraped: true, leader: $$[$0-4] }; 
break;
case 75:
 this.$ = {type: "references", id: $$[$0-1], path: $$[$0], leader: $$[$0-2] }; 
break;
case 76:
 this.$ = {type: "references", id: $$[$0-2].id, path: $$[$0-1], isWraped: true, leader: $$[$0-4], args: $$[$0-2].args }; 
break;
case 77:
 this.$ = {type: "references", id: $$[$0-1].id, path: $$[$0], leader: $$[$0-2], args: $$[$0-1].args }; 
break;
case 78:
 this.$ = {type: "references", id: $$[$0], leader: $$[$0-1] }; 
break;
case 79:
 this.$ = {type: "references", id: $$[$0-1], isWraped: true, leader: $$[$0-3] }; 
break;
case 80:
 this.$ = {type: "references", id: $$[$0].id, leader: $$[$0-1], args: $$[$0].args }; 
break;
case 81:
 this.$ = {type: "references", id: $$[$0-1].id, isWraped: true, args: $$[$0-1].args, leader: $$[$0-3] }; 
break;
case 88:
 this.$ = {type:"method", id: $$[$0].id, args: $$[$0].args }; 
break;
case 89:
 this.$ = {type: "index", id: $$[$0] }; 
break;
case 90:
 this.$ = {type: "property", id: $$[$0] }; if ($$[$0].type === 'content') this.$ = $$[$0]; 
break;
case 92:
 this.$ = {id: $$[$0-3], args: $$[$0-1] }; 
break;
case 93:
 this.$ = {id: $$[$0-2], args: false }; 
break;
case 95:
 this.$ = [ { type: 'runt', value: $$[$0] } ]; 
break;
case 100:
 this.$ = {type: 'content', value: $$[$0-1] + $$[$0] }; 
break;
case 103:
 this.$ = {type: "content", value: $$[$0-2] + $$[$0-1].value + $$[$0] }; 
break;
case 104: case 105:
 this.$ = {type: "content", value: $$[$0-1] + $$[$0] }; 
break;
case 108:
 this.$ = {type: 'bool', value: $$[$0] }; 
break;
case 109:
 this.$ = {type: "integer", value: $$[$0]}; 
break;
case 110:
 this.$ = {type: "decimal", value: + ($$[$0-2] + '.' + $$[$0]) }; 
break;
case 111:
 this.$ = {type: "decimal", value: - ($$[$0-2] + '.' + $$[$0]) }; 
break;
case 113:
 this.$ = - parseInt($$[$0], 10); 
break;
case 114:
 this.$ = {type: 'string', value: $$[$0] }; 
break;
case 115:
 this.$ = {type: 'string', value: $$[$0], isEval: true }; 
break;
case 116: case 117:
 this.$ = $$[$0];
break;
case 119:
 this.$ = {type: 'array', value: $$[$0-1] }; 
break;
case 121:
 this.$ = {type: 'array', value: [] }; 
break;
case 122: case 123: case 124: case 125:
 this.$ = {type: 'array', isRange: true, value: [$$[$0-3], $$[$0-1]]}; 
break;
case 126:
 this.$ = {type: 'map', value: $$[$0-1] }; 
break;
case 127:
 this.$ = {type: 'map'}; 
break;
case 128: case 129:
 this.$ = {}; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 130:
 this.$ = {}; this.$[$$[$0-1].value] = $$[$01]; 
break;
case 131: case 132:
 this.$ = $$[$0-4]; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 135: case 138:
 this.$ = $$[$0-1] + $$[$0]; 
break;
case 136:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 137:
 this.$ = $$[$0-2] + $$[$0-1]; 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:6,9:7,10:$V0,11:$V1,12:11,13:12,14:13,15:14,16:15,17:16,18:17,19:18,20:$V2,24:20,25:21,26:22,35:$V3,36:$V4,46:$V5,82:$V6},{1:[3]},{1:[2,1]},{4:[1,26],6:27,7:5,8:6,9:7,10:$V0,11:$V1,12:11,13:12,14:13,15:14,16:15,17:16,18:17,19:18,20:$V2,24:20,25:21,26:22,35:$V3,36:$V4,46:$V5,82:$V6},o($V7,[2,3]),o($V7,[2,5]),o($V7,[2,6]),o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),{36:$V8,38:$V9,70:28,73:30,74:$Va,82:[1,31]},o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),o($V7,[2,13]),o($V7,[2,14]),o($V7,[2,15]),o($V7,[2,16]),o($V7,[2,17]),{21:[1,34],27:[1,37],29:[1,38],31:[1,39],32:[1,40],33:[1,41],34:[1,42],36:[1,36],41:[1,43],42:[1,44],43:[1,45],82:[1,35]},o($V7,[2,19]),o($V7,[2,20]),o($V7,[2,21]),o($V7,[2,133]),o($V7,[2,134]),{36:[1,46]},{1:[2,2]},o($V7,[2,4]),{36:[1,47],73:48},o($Vb,[2,78],{71:49,76:51,77:52,78:53,79:54,22:$Vc,80:$Vd,83:$Ve}),o($Vb,[2,80],{76:51,77:52,78:53,79:54,71:57,80:$Vd,83:$Ve}),o($V7,[2,138]),{36:[2,82]},{36:[2,83]},{22:[1,58]},o($V7,[2,135]),{4:[1,60],22:[1,61],82:[1,59]},{22:[1,62]},{22:[1,63]},{22:[1,64]},o($V7,[2,25]),o($V7,[2,26]),{22:[1,65]},o($V7,[2,31]),{22:[1,66]},{22:[1,67]},{22:[1,68]},{22:$Vc,39:$Vf,71:69,72:70,75:$Vg,76:51,77:52,78:53,79:54,80:$Vd,83:$Ve},{39:$Vf,71:73,72:74,75:$Vg,76:51,77:52,78:53,79:54,80:$Vd,83:$Ve},o($Vb,[2,75],{77:52,78:53,79:54,76:75,80:$Vd,83:$Ve}),{7:80,23:[1,77],35:$Vh,36:$Vi,38:$Vj,40:81,48:78,52:82,57:$Vk,69:83,81:76,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},o($Vq,[2,86]),o($Vq,[2,88]),o($Vq,[2,89]),o($Vq,[2,90]),{36:[1,97],73:96,82:[1,98]},{7:100,35:$Vh,57:$Vk,69:99,82:[1,101],84:[1,102],85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},o($Vb,[2,77],{77:52,78:53,79:54,76:75,80:$Vd,83:$Ve}),{23:[1,103]},o($V7,[2,136]),o($V7,[2,137]),{7:109,23:[1,105],35:$Vh,38:$Vj,40:81,45:104,47:106,48:108,49:$Vr,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{7:111,28:110,35:$Vh},{7:119,22:$Vs,30:112,35:$Vh,38:$Vj,40:113,52:114,53:115,57:$Vt,67:116,68:$Vu,69:120,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{7:119,22:$Vs,30:122,35:$Vh,38:$Vj,40:113,52:114,53:115,57:$Vt,67:116,68:$Vu,69:120,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{35:[1,123]},{35:[1,124]},{36:[1,125]},{7:109,23:[1,127],35:$Vh,38:$Vj,40:81,45:126,47:106,48:108,49:$Vr,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{39:$Vf,72:128,75:$Vg,76:75,77:52,78:53,79:54,80:$Vd,83:$Ve},o($Vb,[2,79]),o($Vb,[2,84]),o($Vb,[2,85]),{39:$Vf,72:129,75:$Vg,76:75,77:52,78:53,79:54,80:$Vd,83:$Ve},o($Vb,[2,81]),o($Vq,[2,87]),{23:[1,130],50:$Vv},o($Vq,[2,93]),o($Vw,[2,94]),o($Vw,[2,95]),o([23,50],$Vx),o($Vy,[2,116]),o($Vy,[2,117]),o($Vy,[2,118]),{36:$V8,38:$V9,70:28,73:30,74:$Va},{7:135,35:$Vh,36:$Vi,38:$Vj,40:81,48:78,52:82,57:$Vk,69:83,81:132,83:$Vl,84:[1,133],85:88,86:89,87:$Vm,88:134,89:$Vn,91:$Vo,92:$Vp,93:86},o($Vy,[2,120]),{39:[1,137],85:138,91:$Vo,92:$Vp,95:136},o($Vz,[2,106]),o($Vz,[2,107]),o($Vz,[2,108]),o($VA,[2,114]),o($VA,[2,115]),o($Vz,$VB),o($VC,$VD,{90:[1,139]}),{89:$VE},o($Vq,[2,91]),o($Vq,[2,99],{22:$Vc}),o($Vq,[2,100]),{82:[1,142],84:[1,141]},{84:[1,143]},o($Vq,[2,104]),o($Vq,[2,105]),o($V7,[2,18]),{23:[1,144]},o($V7,[2,38]),{23:[2,47],49:[1,145],50:$VF},{7:109,35:$Vh,38:$Vj,40:81,47:147,48:108,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},o($VG,[2,41]),o($VG,[2,42]),{23:[1,148]},{51:[1,149]},{23:[1,150]},{23:[2,52]},{23:[2,53]},{23:[2,54],54:$VH,55:$VI,56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN,61:$VO,62:$VP,63:$VQ,64:$VR,65:$VS,66:$VT},o($VU,[2,68]),{22:$Vs,67:164,89:$VE},{7:119,22:$Vs,35:$Vh,53:165,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},o($VU,[2,71]),o($VU,[2,72]),{7:119,22:$Vs,35:$Vh,53:166,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{23:[1,167]},{36:[1,168],38:[1,169]},{36:[1,170]},{7:173,23:[1,172],35:$Vh,44:171},{23:[1,174]},o($V7,[2,40]),o($Vb,[2,74]),o($Vb,[2,76]),o($Vq,[2,92]),{7:176,35:$Vh,38:$Vj,40:81,48:175,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{50:$Vv,84:[1,177]},o($Vy,[2,121]),o($VV,$VB,{94:[1,178]}),o($VV,$Vx,{94:[1,179]}),{39:[1,180],50:[1,181]},o($Vy,[2,127]),{96:[1,182]},{89:[1,183]},o($VC,$VW,{90:[1,184]}),o($Vq,[2,101]),o($Vq,[2,103]),o($Vq,[2,102]),o($V7,[2,37]),{7:186,23:[2,50],35:$Vh,38:$Vj,40:81,48:185,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{7:188,35:$Vh,38:$Vj,40:81,48:187,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{23:[2,48],49:[1,189],50:$VF},o($V7,[2,22]),{7:119,22:$Vs,30:190,35:$Vh,38:$Vj,40:113,52:114,53:115,57:$Vt,67:116,68:$Vu,69:120,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},o($V7,[2,23]),{7:119,22:$Vs,35:$Vh,53:191,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:192,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:193,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:194,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:195,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:196,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:197,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:198,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:199,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:200,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:201,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:202,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},{7:119,22:$Vs,35:$Vh,53:203,57:$Vt,67:116,68:$Vu,69:120,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp},o($VU,[2,69]),o($VU,[2,70]),{23:[1,204],54:$VH,55:$VI,56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN,61:$VO,62:$VP,63:$VQ,64:$VR,65:$VS,66:$VT},o($V7,[2,24]),{37:[1,205]},{36:[1,206]},{23:[1,207]},{7:209,23:[1,208],35:$Vh},o($V7,[2,34]),o($VX,[2,35]),o($V7,[2,39]),o($Vw,[2,97]),o($Vw,[2,98]),o($Vy,[2,119]),{7:211,35:$Vh,57:$VY,88:210,89:$VZ},{7:215,35:$Vh,57:$VY,88:214,89:$VZ},o($Vy,[2,126]),{85:216,91:$Vo,92:$Vp},o($V_,[2,130],{40:81,52:82,69:83,93:86,85:88,86:89,88:93,48:217,7:218,35:$Vh,38:$Vj,57:$Vk,83:$Vl,87:$Vm,89:$Vn,91:$Vo,92:$Vp}),o($Vz,[2,110]),{89:[1,219]},o($VG,[2,43]),o($VG,[2,46]),o($VG,[2,44]),o($VG,[2,45]),{7:186,23:[2,49],35:$Vh,38:$Vj,40:81,48:185,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},{23:[2,51]},o($V$,[2,55],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN,61:$VO,62:$VP,63:$VQ,64:$VR,65:$VS,66:$VT}),o($V$,[2,56],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN,61:$VO,62:$VP,63:$VQ,64:$VR,65:$VS,66:$VT}),o($V01,[2,57],{58:$VL,59:$VM,60:$VN}),o($V01,[2,58],{58:$VL,59:$VM,60:$VN}),o($VU,[2,59]),o($VU,[2,60]),o($VU,[2,61]),o($V11,[2,62],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN}),o($V11,[2,63],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN}),o($V11,[2,64],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN}),o($V11,[2,65],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN}),o($V11,[2,66],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN}),o($V11,[2,67],{56:$VJ,57:$VK,58:$VL,59:$VM,60:$VN}),o($VU,[2,73]),{7:220,35:$Vh,40:221,83:$Vl,93:86},{39:[1,222]},o($V7,[2,32]),o($V7,[2,33]),o($VX,[2,36]),{84:[1,223]},{84:[1,224]},{84:$VD},{89:[1,225]},{84:[1,226]},{84:[1,227]},{96:[1,228]},o($V_,[2,128]),o($V_,[2,129]),o($Vz,[2,111]),{23:[1,229]},{23:[1,230]},{37:[1,231]},o($Vy,[2,122]),o($Vy,[2,124]),{84:$VW},o($Vy,[2,123]),o($Vy,[2,125]),{7:232,35:$Vh,38:$Vj,40:81,48:233,52:82,57:$Vk,69:83,83:$Vl,85:88,86:89,87:$Vm,88:93,89:$Vn,91:$Vo,92:$Vp,93:86},o($V7,[2,27]),o($V7,[2,29]),{7:234,35:$Vh,40:235,83:$Vl,93:86},o($V_,[2,131]),o($V_,[2,132]),{23:[1,236]},{23:[1,237]},o($V7,[2,28]),o($V7,[2,30])],
defaultActions: {2:[2,1],26:[2,2],32:[2,82],33:[2,83],113:[2,52],114:[2,53],190:[2,51],212:[2,112],225:[2,113]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
                                    var _reg = /\\+$/;
                                    var _esc = yy_.yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    /*转义实现，非常恶心，暂时没有好的解决方案*/
                                    if (!_num || !(_num % 2)) {
                                      this.begin("mu");
                                    } else {
                                      yy_.yytext = yy_.yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yy_.yytext = yy_.yytext.replace(/(\\\\)+$/, '\\');
                                    if(yy_.yytext) return 82;
                                  
break;
case 1:
                                    var _reg = /\\+$/;
                                    var _esc = yy_.yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    if (!_num || !(_num % 2)) {
                                      this.begin("h");
                                    } else {
                                      yy_.yytext = yy_.yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yy_.yytext = yy_.yytext.replace(/(\\\\)+$/, '\\');
                                    if(yy_.yytext) return 82;
                                  
break;
case 2: return 82; 
break;
case 3: this.popState(); return 11; 
break;
case 4: this.popState(); yy_.yytext = yy_.yytext.replace(/^#\[\[|\]\]#$/g, ''); return 10
break;
case 5: this.popState(); return 11; 
break;
case 6: return 46; 
break;
case 7: return 20; 
break;
case 8: return 27; 
break;
case 9: return 29; 
break;
case 10: return 31; 
break;
case 11: this.popState(); return 32; 
break;
case 12: this.popState(); return 32; 
break;
case 13: this.popState(); return 33; 
break;
case 14: this.popState(); return 33; 
break;
case 15: this.popState(); return 41; 
break;
case 16: return 34; 
break;
case 17: return 21; 
break;
case 18: return 42; 
break;
case 19: return 43; 
break;
case 20: return 37; 
break;
case 21: return yy_.yytext; 
break;
case 22: return yy_.yytext; 
break;
case 23: return 65; 
break;
case 24: return yy_.yytext; 
break;
case 25: return 64; 
break;
case 26: return yy_.yytext; 
break;
case 27: return 61; 
break;
case 28: return 62; 
break;
case 29: return yy_.yytext; 
break;
case 30: return 63; 
break;
case 31: return yy_.yytext; 
break;
case 32: return 54; 
break;
case 33: return yy_.yytext; 
break;
case 34: return 55; 
break;
case 35: return yy_.yytext; 
break;
case 36: return 66; 
break;
case 37: return 68; 
break;
case 38: return 35; 
break;
case 39: return 35; 
break;
case 40: return yy_.yytext; 
break;
case 41: return 51; 
break;
case 42:
                                    var len = this.stateStackSize();
                                    if (len >= 2 && this.topState() === 'c' && this.topState(1) === 'run') {
                                      return 49;
                                    }
                                  
break;
case 43: /*ignore whitespace*/ 
break;
case 44: return 38; 
break;
case 45: return 39; 
break;
case 46: return 96; 
break;
case 47: yy.begin = true; return 74; 
break;
case 48: this.popState(); if (yy.begin === true) { yy.begin = false; return 75;} else { return 82; } 
break;
case 49: this.begin("c"); return 22; 
break;
case 50:
                                    if (this.popState() === "c") {
                                      var len = this.stateStackSize();

                                      if (this.topState() === 'run') {
                                        this.popState();
                                        len = len - 1;
                                      }

                                      var tailStack = this.topState(len - 2);
                                      /** 遇到#set(a = b)括号结束后结束状态h*/
                                      if (len === 2 && tailStack === "h"){
                                        this.popState();
                                      } else if (len === 3 && tailStack === "mu" &&  this.topState(len - 3) === "h") {
                                        // issue#7 $foo#if($a)...#end
                                        this.popState();
                                        this.popState();
                                      }

                                      return 23; 
                                    } else {
                                      return 82; 
                                    }
                                  
break;
case 51: this.begin("i"); return 83; 
break;
case 52: 
                                    if (this.popState() === "i") {
                                      return 84; 
                                    } else {
                                      return 82;
                                    }
                                  
break;
case 53: return 94; 
break;
case 54: return 80; 
break;
case 55: return 90; 
break;
case 56: return 50; 
break;
case 57: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\"/g,'"'); return 92; 
break;
case 58: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\'/g,"'"); return 91; 
break;
case 59: return 87; 
break;
case 60: return 87; 
break;
case 61: return 87; 
break;
case 62: return 89; 
break;
case 63: return 36; 
break;
case 64: this.begin("run"); return 36; 
break;
case 65: this.begin('h'); return 20; 
break;
case 66: this.popState(); return 82; 
break;
case 67: this.popState(); return 82; 
break;
case 68: this.popState(); return 82; 
break;
case 69: this.popState(); return 4; 
break;
case 70: return 4; 
break;
}
},
rules: [/^(?:[^#]*?(?=\$))/,/^(?:[^\$]*?(?=#))/,/^(?:[^\x00]+)/,/^(?:#\*[\s\S]+?\*#)/,/^(?:#\[\[[\s\S]+?\]\]#)/,/^(?:##[^\n]*)/,/^(?:#@)/,/^(?:#(?=[a-zA-Z{]))/,/^(?:set[ ]*(?=[^a-zA-Z0-9_]+))/,/^(?:if[ ]*(?=[^a-zA-Z0-9_]+))/,/^(?:elseif[ ]*(?=[^a-zA-Z0-9_]+))/,/^(?:else\b)/,/^(?:\{else\})/,/^(?:end\b)/,/^(?:\{end\})/,/^(?:break\b)/,/^(?:foreach[ ]*(?=[^a-zA-Z0-9_]+))/,/^(?:noescape(?=[^a-zA-Z0-9_]+))/,/^(?:define[ ]*(?=[^a-zA-Z0-9_]+))/,/^(?:macro[ ]*(?=[^a-zA-Z0-9_]+))/,/^(?:in\b)/,/^(?:[%\+\-\*\/])/,/^(?:<=)/,/^(?:le\b)/,/^(?:>=)/,/^(?:ge\b)/,/^(?:[><])/,/^(?:gt\b)/,/^(?:lt\b)/,/^(?:==)/,/^(?:eq\b)/,/^(?:\|\|)/,/^(?:or\b)/,/^(?:&&)/,/^(?:and\b)/,/^(?:!=)/,/^(?:ne\b)/,/^(?:not\b)/,/^(?:\$!(?=[{a-zA-Z_]))/,/^(?:\$(?=[{a-zA-Z_]))/,/^(?:!)/,/^(?:=)/,/^(?:[ ]+(?=[^,]))/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?::[\s]*)/,/^(?:\{)/,/^(?:\})/,/^(?:\([\s]*(?=[$'"\[\{\-0-9\w()!]))/,/^(?:\))/,/^(?:\[[\s]*(?=[\-$"'0-9{\[\]]+))/,/^(?:\])/,/^(?:\.\.)/,/^(?:\.(?=[a-zA-Z_]))/,/^(?:\.(?=[\d]))/,/^(?:,[ ]*)/,/^(?:"(\\"|[^\"])*")/,/^(?:'(\\'|[^\'])*')/,/^(?:null\b)/,/^(?:false\b)/,/^(?:true\b)/,/^(?:[0-9]+)/,/^(?:[_a-zA-Z][a-zA-Z0-9_\-]*)/,/^(?:[_a-zA-Z][a-zA-Z0-9_\-]*[ ]*(?=\())/,/^(?:#)/,/^(?:.)/,/^(?:\s+)/,/^(?:[\$#])/,/^(?:$)/,/^(?:$)/],
conditions: {"mu":{"rules":[5,38,39,47,48,49,50,51,52,54,63,65,66,67,69],"inclusive":false},"c":{"rules":[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,49,50,51,52,54,55,56,57,58,59,60,61,62,63],"inclusive":false},"i":{"rules":[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,43,44,44,45,45,46,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],"inclusive":false},"h":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,38,39,40,41,46,49,50,51,52,54,62,64,66,67,69],"inclusive":false},"esc":{"rules":[68],"inclusive":false},"run":{"rules":[38,39,40,42,43,44,45,46,49,50,51,52,54,55,56,57,58,59,60,61,62,63,66,67,69],"inclusive":false},"INITIAL":{"rules":[0,1,2,70],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = velocity;
exports.Parser = velocity.Parser;
exports.parse = function () { return velocity.parse.apply(velocity, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(18).readFileSync(__webpack_require__(19).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(17)(module)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(21));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_property_decorator_1 = __webpack_require__(22);
const vue_1 = __webpack_require__(1);
const vue_class_component_1 = __webpack_require__(26);
const Muuri = __webpack_require__(27);
let MuuriLayout = class MuuriLayout extends vue_1.default {
    get widgets() {
        return this.dashboard.widgets.filter(w => !w.options || !w.options.background);
    }
    get backgroundWidgets() {
        return this.dashboard.widgets.filter(w => w.options && w.options.background);
    }
    initWidget(widget) {
        // check if widget options is set
        if (!widget.options) {
            widget.options = { x: 1, y: 1, width: 1, height: 1 };
        }
    }
    widgetsChanged(n, old) {
        vue_1.default.nextTick(() => {
            n.forEach(w => {
                //  this.grid.data('gridstack').makeWidget('#' + w.id);
                // this.grid.addWidget()
            });
        });
    }
    beforeMount() {
        this.options = this.dashboard.options;
        this.dashboard.widgets.forEach(widget => {
            this.initWidget(widget);
        });
    }
    created() {
        if (!this.dashboard) {
            return;
        }
        vue_1.default.nextTick(() => {
            if (!this.dashboard.options) {
                this.options = {};
            }
            var muuri = new Muuri('#muurigrid');
            // const options = {
            //   // tslint:disable-next-line:no-bitwise
            // };
            // this.grid = $('#gridstack');
            // this.grid.gridstack(options);
            // // store resize result
            // this.grid.on('change', (event, items) => {
            //   items.forEach(i => {
            //     if (i.id) {
            //       this.options.autoposition = false;
            //       const widget = this.dashboard.widgets.find(k => k.id === i.id);
            //       if (widget) {
            //         widget.options.width = i.width;
            //         widget.options.height = i.height;
            //         widget.options.x = i.x;
            //         widget.options.y = i.y;
            //       }
            //     }
            //   });
            // });
        });
    }
};
__decorate([
    vue_property_decorator_1.Watch('dashboard.widgets')
], MuuriLayout.prototype, "widgetsChanged", null);
MuuriLayout = __decorate([
    vue_class_component_1.default({
        template: __webpack_require__(28),
        props: {
            dashboard: null
        }
    })
], MuuriLayout);
exports.MuuriLayout = MuuriLayout;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(1), __webpack_require__(23), __webpack_require__(24)) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vue-class-component', 'reflect-metadata'], factory) :
	(factory((global.VuePropertyDecorator = {}),global.Vue,global.VueClassComponent));
}(this, (function (exports,vue,vueClassComponent) { 'use strict';

vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;
var vueClassComponent__default = 'default' in vueClassComponent ? vueClassComponent['default'] : vueClassComponent;

/** vue-property-decorator verson 6.0.0 MIT LICENSE copyright 2017 kaorun343 */
'use strict';
/**
 * decorator of an inject
 * @param key key
 * @return PropertyDecorator
 */
function Inject(key) {
    return vueClassComponent.createDecorator(function (componentOptions, k) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[k] = key || k;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return vueClassComponent.createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of model
 * @param  event event name
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        if (!Array.isArray(options) && typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
        vueClassComponent.createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        if (!Array.isArray(options) && typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
        vueClassComponent.createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return vueClassComponent.createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        componentOptions.watch[path] = { handler: handler, deep: deep, immediate: immediate };
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (original.apply(this, args) !== false)
                this.$emit.apply(this, [event || key].concat(args));
        };
    };
}

exports.Component = vueClassComponent__default;
exports.Vue = vue;
exports.Inject = Inject;
exports.Provide = Provide;
exports.Model = Model;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Emit = Emit;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-class-component v6.0.0
  * (c) 2015-2017 Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(1));

function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    Component.prototype._init = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(vm);
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; }
                });
            }
        });
    };
    var data = new Component();
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured'
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
    }
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    return Super.extend(options);
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports['default'] = Component$1;
exports.createDecorator = createDecorator;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Symbol support
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var HashMap;
    (function (HashMap) {
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        HashMap.create = supportsCreate
            ? function () { return MakeDictionary(Object.create(null)); }
            : supportsProto
                ? function () { return MakeDictionary({ __proto__: null }); }
                : function () { return MakeDictionary({}); };
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param propertyKey (Optional) The property key to decorate.
      * @param attributes (Optional) The property descriptor for the target key.
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                throw new TypeError();
            if (IsNull(attributes))
                attributes = undefined;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param propertyKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
            if (!Create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
            if (!Create)
                return undefined;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
    }
    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
    }
    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        return ToBoolean(metadataMap.has(MetadataKey));
    }
    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
    }
    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return undefined;
        return metadataMap.get(MetadataKey);
    }
    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
    function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
                keys.length = k;
                return keys;
            }
            var nextValue = IteratorValue(next);
            try {
                keys[k] = nextValue;
            }
            catch (e) {
                try {
                    IteratorClose(iterator);
                }
                finally {
                    throw e;
                }
            }
            k++;
        }
    }
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
        if (x === null)
            return 1 /* Null */;
        switch (typeof x) {
            case "undefined": return 0 /* Undefined */;
            case "boolean": return 2 /* Boolean */;
            case "string": return 3 /* String */;
            case "symbol": return 4 /* Symbol */;
            case "number": return 5 /* Number */;
            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
            default: return 6 /* Object */;
        }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
        return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
            case 0 /* Undefined */: return input;
            case 1 /* Null */: return input;
            case 2 /* Boolean */: return input;
            case 3 /* String */: return input;
            case 4 /* Symbol */: return input;
            case 5 /* Number */: return input;
        }
        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
                throw new TypeError();
            return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                    return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
        return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
        return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key))
            return key;
        return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
        return Array.isArray
            ? Array.isArray(argument)
            : argument instanceof Object
                ? argument instanceof Array
                : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
    }
    // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey
    function IsPropertyKey(argument) {
        switch (Type(argument)) {
            case 3 /* String */: return true;
            case 4 /* Symbol */: return true;
            default: return false;
        }
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
            return undefined;
        if (!IsCallable(func))
            throw new TypeError();
        return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
            throw new TypeError(); // from Call
        var iterator = method.call(obj);
        if (!IsObject(iterator))
            throw new TypeError();
        return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
        return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey !== key) {
                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                }
                if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheIndex;
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            Set.prototype["@@iterator"] = function () { return this.keys(); };
            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
            return Set;
        }());
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        }());
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof global !== "undefined" ? global :
        typeof self !== "undefined" ? self :
            Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(25)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-class-component v6.1.2
  * (c) 2015-2017 Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(1));

var hasProto = { __proto__: [] } instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== "object" && type !== "function");
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(vm);
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    var data = new Component();
    Component.prototype._init = originalInit;
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured'
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    return Extended;
}
var reservedPropertyNames = [
    'cid',
    'super',
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    'component',
    'directive',
    'filter'
];
function forwardStaticMembers(Extended, Original, Super) {
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        if (key === 'prototype') {
            return;
        }
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        if (!hasProto) {
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value)
                && superDescriptor
                && superDescriptor.value === descriptor.value) {
                return;
            }
        }
        if (process.env.NODE_ENV !== 'production'
            && reservedPropertyNames.indexOf(key) >= 0) {
            warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
                'conflicts with reserved property name of Vue internal. ' +
                'It may cause unexpected behavior of the component. Consider renaming the property.');
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports['default'] = Component$1;
exports.createDecorator = createDecorator;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Muuri v0.5.3
 * https://github.com/haltu/muuri
 * Copyright (c) 2015, Haltu Oy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, factory) {

  var namespace = 'Muuri';
  var Hammer;

  if (typeof module === 'object' && module.exports) {
    /* eslint-disable */
    try { Hammer = __webpack_require__(3); } catch (e) {}
    /* eslint-enable */
    module.exports = factory(namespace, Hammer);
  }
  else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Hammer) {
      return factory(namespace, Hammer);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else {
    global[namespace] = factory(namespace, global.Hammer);
  }

}(typeof window !== 'undefined' ? window : this, function (namespace, Hammer, undefined) {

  'use strict';

  // Get references to all the stuff we are using from the global scope.
  var global = window;
  var Object = global.Object;
  var Array = global.Array;
  var Math = global.Math;
  var Error = global.Error;
  var Element = global.Element;
  var doc = global.document;
  var docElem = doc.documentElement;
  var body = doc.body;

  // Types.
  var typeFunction = 'function';
  var typeString = 'string';
  var typeNumber = 'number';

  // Raf loop that can be used to organize DOM write and read operations
  // optimally in the next animation frame.
  var rafLoop = createRafLoop();

  // Raf loop queue names.
  var rafQueueLayout = 'layout';
  var rafQueueVisibility = 'visibility';
  var rafQueueMove = 'move';
  var rafQueueScroll = 'scroll';

  // Drag start predicate states.
  var startPredicateInactive = 0;
  var startPredicatePending = 1;
  var startPredicateResolved = 2;
  var startPredicateRejected = 3;

  // Keep track of Grid instances.
  var gridInstances = {};

  // Keep track of Item instances.
  var itemInstances = {};

  // No operation function.
  var noop = function () {};

  // Unique id which is used for Grid instances and Item instances.
  // Should be incremented every time when used.
  var uuid = 0;

  // Get the supported element.matches().
  var elementMatches = getSupportedElementMatches();

  // Get the supported transform style property.
  var transform = getSupportedStyle('transform');

  // Test if transformed elements leak fixed elements.
  var transformLeaksFixed = body ? doesTransformLeakFixed() : null;

  // Event names.
  var evSynchronize = 'synchronize';
  var evLayoutStart = 'layoutStart';
  var evLayoutEnd = 'layoutEnd';
  var evAdd = 'add';
  var evRemove = 'remove';
  var evShowStart = 'showStart';
  var evShowEnd = 'showEnd';
  var evHideStart = 'hideStart';
  var evHideEnd = 'hideEnd';
  var evFilter = 'filter';
  var evSort = 'sort';
  var evMove = 'move';
  var evSend = 'send';
  var evBeforeSend = 'beforeSend';
  var evReceive = 'receive';
  var evBeforeReceive = 'beforeReceive';
  var evDragInit = 'dragInit';
  var evDragStart = 'dragStart';
  var evDragMove = 'dragMove';
  var evDragScroll = 'dragScroll';
  var evDragEnd = 'dragEnd';
  var evDragReleaseStart = 'dragReleaseStart';
  var evDragReleaseEnd = 'dragReleaseEnd';
  var evDestroy = 'destroy';

  /**
   * Grid
   * ****
   */

  /**
   * Creates a new Grid instance.
   *
   * @public
   * @class
   * @param {(HTMLElement|String)} element
   * @param {Object} [options]
   * @param {(?HTMLElement[]|NodeList|String)} [options.items]
   * @param {Number} [options.showDuration=300]
   * @param {String} [options.showEasing="ease"]
   * @param {Object} [options.visibleStyles]
   * @param {Number} [options.hideDuration=300]
   * @param {String} [options.hideEasing="ease"]
   * @param {Object} [options.hiddenStyles]
   * @param {(Function|Object)} [options.layout]
   * @param {Boolean} [options.layout.fillGaps=false]
   * @param {Boolean} [options.layout.horizontal=false]
   * @param {Boolean} [options.layout.alignRight=false]
   * @param {Boolean} [options.layout.alignBottom=false]
   * @param {Boolean} [options.layout.rounding=true]
   * @param {(Boolean|Number)} [options.layoutOnResize=100]
   * @param {Boolean} [options.layoutOnInit=true]
   * @param {Number} [options.layoutDuration=300]
   * @param {String} [options.layoutEasing="ease"]
   * @param {?Object} [options.sortData=null]
   * @param {Boolean} [options.dragEnabled=false]
   * @param {?HtmlElement} [options.dragContainer=null]
   * @param {?Function} [options.dragStartPredicate]
   * @param {Number} [options.dragStartPredicate.distance=0]
   * @param {Number} [options.dragStartPredicate.delay=0]
   * @param {(Boolean|String)} [options.dragStartPredicate.handle=false]
   * @param {?String} [options.dragAxis]
   * @param {(Boolean|Function)} [options.dragSort=true]
   * @param {Number} [options.dragSortInterval=100]
   * @param {(Function|Object)} [options.dragSortPredicate]
   * @param {Number} [options.dragSortPredicate.threshold=50]
   * @param {String} [options.dragSortPredicate.action="move"]
   * @param {String} [options.dragSortPredicate.gaps=true]
   * @param {Number} [options.dragReleaseDuration=300]
   * @param {String} [options.dragReleaseEasing="ease"]
   * @param {Object} [options.dragHammerSettings={touchAction: "none"}]
   * @param {String} [options.containerClass="muuri"]
   * @param {String} [options.itemClass="muuri-item"]
   * @param {String} [options.itemVisibleClass="muuri-item-visible"]
   * @param {String} [options.itemHiddenClass="muuri-item-hidden"]
   * @param {String} [options.itemPositioningClass="muuri-item-positioning"]
   * @param {String} [options.itemDraggingClass="muuri-item-dragging"]
   * @param {String} [options.itemReleasingClass="muuri-item-releasing"]
   */
  function Grid(element, options) {

    var inst = this;
    var settings;
    var items;
    var layoutOnResize;

    // Muuri can be loaded inside the head tag also, but in that case Muuri can
    // not cache body element and run the initial DOM tests. So, if we detect
    // that body element could not be fetched on init we do it here once and
    // also run the DOM tests. If the Grid is instantiated before body is ready
    // you are doing it wrong ;)
    if (!body) {
      body = document.body;
      transformLeaksFixed = doesTransformLeakFixed();
    }

    // Allow passing element as selector string. Store element for instance.
    element = inst._element = typeof element === typeString ? doc.querySelector(element) : element;

    // Throw an error if the container element is not body element or does not
    // exist within the body element.
    if (!body.contains(element)) {
      throw new Error('Container element must be an existing DOM element');
    }

    // Create instance settings by merging the options with default options.
    settings = inst._settings = mergeSettings(Grid.defaultOptions, options);

    // Sanitize dragSort setting.
    if (typeof settings.dragSort !== typeFunction) {
      settings.dragSort = !!settings.dragSort;
    }

    // Create instance id and store it to the grid instances collection.
    gridInstances[inst._id = ++uuid] = inst;

    // Destroyed flag.
    inst._isDestroyed = false;

    // Reference to the currently used Layout instance.
    inst._layout = null;

    // Create private Emitter instance.
    inst._emitter = new Grid.Emitter();

    // Setup grid's show/hide animation handler for items.
    inst._itemShowHandler = getItemVisibilityHandler('show', settings);
    inst._itemHideHandler = getItemVisibilityHandler('hide', settings);

    // Add container element's class name.
    addClass(element, settings.containerClass);

    // Create initial items.
    inst._items = [];
    items = settings.items;
    if (typeof items === typeString) {
      nodeListToArray(inst._element.children).forEach(function (itemElement) {
        if (items === '*' || elementMatches(itemElement, items)) {
          inst._items.push(new Grid.Item(inst, itemElement));
        }
      });
    }
    else if (Array.isArray(items) || isNodeList(items)) {
      inst._items = nodeListToArray(items).map(function (itemElement) {
        return new Grid.Item(inst, itemElement);
      });
    }

    // Sanitize layoutOnResize option and bind debounced resize handler if the
    // layoutOnResize option a valid number.
    layoutOnResize = settings.layoutOnResize;
    layoutOnResize = layoutOnResize === true ? 0 : typeof layoutOnResize === typeNumber ? layoutOnResize : -1;
    if (layoutOnResize >= 0) {
      global.addEventListener('resize', inst._resizeHandler = debounce(function () {
        inst.refreshItems().layout();
      }, layoutOnResize));
    }

    // Layout on init if necessary.
    if (settings.layoutOnInit) {
      inst.layout(true);
    }

  }

  /**
   * Grid - Public properties
   * ************************
   */

  /**
   * @see Item
   */
  Grid.Item = Item;

  /**
   * @see ItemDrag
   */
  Grid.ItemDrag = ItemDrag;

  /**
   * @see ItemRelease
   */
  Grid.ItemRelease = ItemRelease;

  /**
   * @see ItemMigrate
   */
  Grid.ItemMigrate = ItemMigrate;

  /**
   * @see ItemAnimate
   */
  Grid.ItemAnimate = ItemAnimate;

  /**
   * @see Layout
   */
  Grid.Layout = Layout;

  /**
   * @see Emitter
   */
  Grid.Emitter = Emitter;

  /**
   * Default options for Grid instance.
   *
   * @public
   * @memberof Grid
   */
  Grid.defaultOptions = {

    // Item elements
    items: '*',

    // Default show animation
    showDuration: 300,
    showEasing: 'ease',

    // Default hide animation
    hideDuration: 300,
    hideEasing: 'ease',

    // Item's visible/hidden state styles
    visibleStyles: {
      opacity: '1',
      transform: 'scale(1)'
    },
    hiddenStyles: {
      opacity: '0',
      transform: 'scale(0.5)'
    },

    // Layout
    layout: {
      fillGaps: false,
      horizontal: false,
      alignRight: false,
      alignBottom: false,
      rounding: true
    },
    layoutOnResize: 100,
    layoutOnInit: true,
    layoutDuration: 300,
    layoutEasing: 'ease',

    // Sorting
    sortData: null,

    // Drag & Drop
    dragEnabled: false,
    dragContainer: null,
    dragStartPredicate: {
      distance: 0,
      delay: 0,
      handle: false
    },
    dragAxis: null,
    dragSort: true,
    dragSortInterval: 100,
    dragSortPredicate: {
      threshold: 50,
      action: 'move'
    },
    dragReleaseDuration: 300,
    dragReleaseEasing: 'ease',
    dragHammerSettings: {
      touchAction: 'none'
    },

    // Classnames
    containerClass: 'muuri',
    itemClass: 'muuri-item',
    itemVisibleClass: 'muuri-item-shown',
    itemHiddenClass: 'muuri-item-hidden',
    itemPositioningClass: 'muuri-item-positioning',
    itemDraggingClass: 'muuri-item-dragging',
    itemReleasingClass: 'muuri-item-releasing'

  };

  /**
   * Grid - Private properties
   * *************************
   */

  Grid._maxRafBatchSize = 100;

  /**
   * Grid - Public prototype methods
   * *******************************
   */

  /**
   * Bind an event listener.
   *
   * @public
   * @memberof Grid.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Grid}
   */
  Grid.prototype.on = function (event, listener) {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.on(event, listener);
    }

    return inst;

  };

  /**
   * Bind an event listener that is triggered only once.
   *
   * @public
   * @memberof Grid.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Grid}
   */
  Grid.prototype.once = function (event, listener) {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.once(event, listener);
    }

    return inst;

  };

  /**
   * Unbind an event listener.
   *
   * @public
   * @memberof Grid.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Grid}
   */
  Grid.prototype.off = function (event, listener) {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.off(event, listener);
    }

    return inst;

  };

  /**
   * Get the container element.
   *
   * @public
   * @memberof Grid.prototype
   * @returns {HTMLElement}
   */
  Grid.prototype.getElement = function () {

    return this._element;

  };

  /**
   * Get all items. Optionally you can provide specific targets (elements and
   * indices) and filter the results based on the state of the items. Note that
   * the returned array is not the same object used by the instance so modifying
   * it will not affect instance's items. All items that are not found are
   * omitted from the returned array.
   *
   * @public
   * @memberof Grid.prototype
   * @param {GridMultiItemQuery} [targets]
   * @param {GridItemState} [state]
   * @returns {Item[]}
   */
  Grid.prototype.getItems = function (targets, state) {

    var inst = this;

    // Return an empty array immediately if the instance is destroyed.
    if (inst._isDestroyed) {
      return [];
    }

    var hasTargets = targets === 0 || (targets && typeof targets !== typeString);
    var targetItems = !hasTargets ? null : isNodeList(targets) ? nodeListToArray(targets) : [].concat(targets);
    var targetState = !hasTargets ? targets : state;
    var ret = [];
    var item;
    var i;

    // Sanitize target state.
    targetState = typeof targetState === typeString ? targetState : null;

    // If target state or target items are defined return filtered results.
    if (targetState || targetItems) {
      targetItems = targetItems || inst._items;
      for (i = 0; i < targetItems.length; i++) {
        item = hasTargets ? inst._getItem(targetItems[i]) : targetItems[i];
        if (item && (!targetState || isItemInState(item, targetState))) {
          ret.push(item);
        }
      }
      return ret;
    }

    // Otherwise return all items.
    else {
      return ret.concat(inst._items);
    }

  };

  /**
   * Update the cached dimensions of the instance's items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} [items]
   * @returns {Grid}
   */
  Grid.prototype.refreshItems = function (items) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var targetItems = inst.getItems(items || 'active');
    var i;

    for (i = 0; i < targetItems.length; i++) {
      targetItems[i]._refreshDimensions();
    }

    return inst;

  };

  /**
   * Update the sort data of the instance's items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} [items]
   * @returns {Grid}
   */
  Grid.prototype.refreshSortData = function (items) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var targetItems = inst.getItems(items);
    var i;

    for (i = 0; i < targetItems.length; i++) {
      targetItems[i]._refreshSortData();
    }

    return inst;

  };

  /**
   * Synchronize the item elements to match the order of the items in the DOM.
   * This comes handy if you need to keep the DOM structure matched with the
   * order of the items. Note that if an item's element is not currently a child
   * of the container element (if it is dragged for example) it is ignored and
   * left untouched.
   *
   * @public
   * @memberof Grid.prototype
   * @returns {Grid}
   */
  Grid.prototype.synchronize = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var container = inst._element;
    var items = inst._items;
    var fragment;
    var element;
    var i;

    // Append all elements in order to the container element.
    if (items.length) {
      for (i = 0; i < items.length; i++) {
        element = items[i]._element;
        if (element.parentNode === container) {
          fragment = fragment || doc.createDocumentFragment();
          fragment.appendChild(element);
        }
      }
      if (fragment) {
        container.appendChild(fragment);
      }
    }

    // Emit synchronize event.
    inst._emit(evSynchronize);

    return inst;

  };

  /**
   * Calculate and apply item positions.
   *
   * @public
   * @memberof Grid.prototype
   * @param {Boolean} [instant=false]
   * @param {LayoutCallback} [onFinish]
   * @returns {Grid}
   */
  Grid.prototype.layout = function (instant, onFinish) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var callback = typeof instant === typeFunction ? instant : onFinish;
    var isInstant = instant === true;
    var items = inst.getItems('active');
    var layout = inst._layout = new Grid.Layout(inst, items);
    var counter = items.length;
    var isBorderBox;
    var containerStyles;
    var item;
    var position;
    var i;

    // The finish function, which will be used for checking if all the items
    // have laid out yet. After all items have finished their animations call
    // callback and emit layoutEnd event. Only emit layoutEnd event if there
    // hasn't been a new layout call during this layout.
    function tryFinish() {
      if (--counter <= 0) {
        if (typeof callback === typeFunction) {
          callback(inst._layout !== layout, items.concat());
        }
        if (inst._layout === layout) {
          inst._emit(evLayoutEnd, items.concat());
        }
      }
    }

    // If grid's width or height was modified, we need to update it's cached
    // dimensions. Also keep in mind that grid's cached width/height should
    // always equal to what elem.getBoundingClientRect() would return, so
    // therefore we need to add the grid element's borders to the dimensions if
    // it's box-sizing is border-box.
    if (layout.setWidth || layout.setHeight) {

      containerStyles = {};
      isBorderBox = getStyle(inst._element, 'box-sizing') === 'border-box';

      if (layout.setHeight) {
        if (typeof layout.height === typeNumber) {
          containerStyles.height = (isBorderBox ? layout.height + inst._border.top + inst._border.bottom : layout.height) + 'px';
        }
        else {
          containerStyles.height = layout.height;
        }
      }

      if (layout.setWidth) {
        if (typeof layout.width === typeNumber) {
          containerStyles.width = (isBorderBox ? layout.width + inst._border.left + inst._border.right : layout.width) + 'px';
        }
        else {
          containerStyles.width = layout.width;
        }
      }

      setStyles(inst._element, containerStyles);

    }

    // Emit layoutStart event. Note that this is intentionally emitted after the
    // container element's dimensions are set, because otherwise there would be
    // no hook for reacting to container dimension changes.
    inst._emit(evLayoutStart, items.concat());

    // If there are no items let's finish quickly.
    if (!items.length) {
      tryFinish();
      return inst;
    }

    // If there are items let's position them.
    for (i = 0; i < items.length; i++) {

      item = items[i];
      position = layout.slots[item._id];

      // Update item's position.
      item._left = position.left;
      item._top = position.top;

      // Layout non-dragged items.
      if (item.isDragging()) {
        tryFinish(true, item);
      }
      else {
        item._layout(isInstant, tryFinish);
      }

    }

    return inst;

  };

  /**
   * Add new items by providing the elements you wish to add to the instance and
   * optionally provide the index where you want the items to be inserted into.
   * All elements that are not already children of the container element will be
   * automatically appended to the container element. If an element has it's CSS
   * display property set to "none" it will be marked as inactive during the
   * initiation process. As long as the item is inactive it will not be part of
   * the layout, but it will retain it's index. You can activate items at any
   * point with grid.show() method. This method will automatically call
   * grid.layout() if one or more of the added elements are visible. If only
   * hidden items are added no layout will be called. All the new visible items
   * are positioned without animation during their first layout.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(HTMLElement|HTMLElement[])} elements
   * @param {Object} [options]
   * @param {Number} [options.index=-1]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Item[]}
   */
  Grid.prototype.add = function (elements, options) {

    var inst = this;

    if (inst._isDestroyed) {
      return [];
    }

    var targetElements = isNodeList(elements) ? nodeListToArray(elements) : [].concat(elements);
    var newItems = [];

    // Return early if there are no items.
    if (!targetElements.length) {
      return newItems;
    }

    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var items = inst._items;
    var needsLayout = false;
    var elementIndex;
    var item;
    var i;

    // Filter out all elements that exist already in current instance.
    // TODO: This filtering can be made a lot faster by storing item elements
    // in a Map or WeakMap. Other option would be to transfer the reponsibility
    // completely to the user and get rid of this sanity check.
    for (i = 0; i < items.length; i++) {
      elementIndex = targetElements.indexOf(items[i]._element);
      if (elementIndex > -1) {
        targetElements.splice(elementIndex, 1);
        if (!targetElements.length) {
          return newItems;
        }
      }
    }

    // Create new items.
    for (i = 0; i < targetElements.length; i++) {

      item = new Grid.Item(inst, targetElements[i]);
      newItems.push(item);

      // If the item to be added is active, we need to do a layout. Also, we
      // need to mark the item with the skipNextLayoutAnimation flag to make it
      // position instantly (without animation) during the next layout. Without
      // the hack the item would animate to it's new position from the northwest
      // corner of the grid, which feels a bit buggy (imho).
      if (item._isActive) {
        needsLayout = true;
        item._skipNextLayoutAnimation = true;
      }

    }

    // Add the new items to the items collection to correct index.
    insertItemsToArray(items, newItems, opts.index);

    // Emit add event.
    inst._emit(evAdd, newItems.concat());

    // If layout is needed.
    if (needsLayout && layout) {
      inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
    }

    // Return new items.
    return newItems;

  };

  /**
   * Remove items from the instance.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.removeElements=false]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Item[]}
   */
  Grid.prototype.remove = function (items, options) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var needsLayout = false;
    var targetItems = inst.getItems(items);
    var item;
    var i;

    // Remove the individual items.
    for (i = 0; i < targetItems.length; i++) {
      item = targetItems[i];
      if (item._isActive) {
        needsLayout = true;
      }
      item._destroy(opts.removeElements);
    }

    // Emit remove event.
    inst._emit(evRemove, targetItems.concat());

    // If layout is needed.
    if (needsLayout && layout) {
      inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
    }

    return targetItems;

  };

  /**
   * Show instance items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {ShowCallback} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.show = function (items, options) {

    return this._isDestroyed ? this : gridShowHideHandler(this, 'show', items, options);

  };

  /**
   * Hide instance items.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {HideCallback} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.hide = function (items, options) {

    return this._isDestroyed ? this : gridShowHideHandler(this, 'hide', items, options);

  };

  /**
   * Filter items. Expects at least one argument, a predicate, which should be
   * either a function or a string. The predicate callback is executed for every
   * item in the instance. If the return value of the predicate is truthy the
   * item in question will be shown and otherwise hidden. The predicate callback
   * receives the item instance as it's argument. If the predicate is a string
   * it is considered to be a selector and it is checked against every item
   * element in the instance with the native element.matches() method. All the
   * matching items will be shown and others hidden.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(Function|String)} predicate
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {FilterCallback} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.filter = function (predicate, options) {

    var inst = this;

    // Return immediately if there are no items or if the instance id destroyed.
    if (inst._isDestroyed || !inst._items.length) {
      return inst;
    }

    var items = inst._items;
    var predicateType = typeof predicate;
    var isPredicateString = predicateType === typeString;
    var isPredicateFn = predicateType === typeFunction;
    var opts = options || {};
    var isInstant = opts.instant === true;
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var onFinish = typeof opts.onFinish === typeFunction ? opts.onFinish : null;
    var itemsToShow = [];
    var itemsToHide = [];
    var tryFinishCounter = -1;
    var tryFinish = !onFinish ? noop : function () {
      ++tryFinishCounter && onFinish(itemsToShow.concat(), itemsToHide.concat());
    };
    var item;
    var i;

    // Check which items need to be shown and which hidden.
    if (isPredicateFn || isPredicateString) {
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (isPredicateFn ? predicate(item) : elementMatches(item._element, predicate)) {
          itemsToShow.push(item);
        }
        else {
          itemsToHide.push(item);
        }
      }
    }

    // Show items that need to be shown.
    if (itemsToShow.length) {
      inst.show(itemsToShow, {
        instant: isInstant,
        onFinish: tryFinish,
        layout: false
      });
    }
    else {
      tryFinish();
    }

    // Hide items that need to be hidden.
    if (itemsToHide.length) {
      inst.hide(itemsToHide, {
        instant: isInstant,
        onFinish: tryFinish,
        layout: false
      });
    }
    else {
      tryFinish();
    }

    // If there are any items to filter.
    if (itemsToShow.length || itemsToHide.length) {

      // Emit filter event.
      inst._emit(evFilter, itemsToShow.concat(), itemsToHide.concat());

      // If layout is needed.
      if (layout) {
        inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
      }

    }

    return inst;

  };

  /**
   * Sort items. There are three ways to sort the items. The first is simply by
   * providing a function as the comparer which works identically to native
   * array sort. Alternatively you can sort by the sort data you have provided
   * in the instance's options. Just provide the sort data key(s) as a string
   * (separated by space) and the items will be sorted based on the provided
   * sort data keys. Lastly you have the opportunity to provide a presorted
   * array of items which will be used to sync the internal items array in the
   * same order.
   *
   * @public
   * @memberof Grid.prototype
   * @param {(Function|Item[]|String|String[])} comparer
   * @param {Object} [options]
   * @param {Boolean} [options.descending=false]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.sort = function (comparer, options) {

    var inst = this;

    // Let's not sort if it has no effect.
    if (inst._isDestroyed || inst._items.length < 2) {
      return inst;
    }

    var items = inst._items;
    var opts = options || {};
    var isDescending = !!opts.descending;
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var origItems = items.concat();
    var indexMap;

    // If function is provided do a native array sort.
    if (typeof comparer === typeFunction) {
      items.sort(function (a, b) {
        var result = comparer(a, b);
        return (isDescending && result !== 0 ? -result : result) || compareItemIndices(a, b, isDescending, indexMap || (indexMap = getItemIndexMap(origItems)));
      });
    }

    // Otherwise if we got a string, let's sort by the sort data as provided in
    // the instance's options.
    else if (typeof comparer === typeString) {
      comparer = comparer.trim().split(' ').map(function (val) {
        return val.split(':');
      });
      items.sort(function (a, b) {
        return compareItems(a, b, isDescending, comparer) || compareItemIndices(a, b, isDescending, indexMap || (indexMap = getItemIndexMap(origItems)));
      });
    }

    // Otherwise if we got an array, let's assume it's a presorted array of the
    // items and order the items based on it.
    else if (Array.isArray(comparer)) {
      sortItemsByReference(items, comparer);
      if (isDescending) {
        items.reverse();
      }
    }

    // Otherwise, let's go home.
    else {
      return inst;
    }

    // Emit sort event.
    inst._emit(evSort, items.concat(), origItems);

    // If layout is needed.
    if (layout) {
      inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
    }

    return inst;

  };

  /**
   * Move item to another index or in place of another item.
   *
   * @public
   * @memberof Grid.prototype
   * @param {GridSingleItemQuery} item
   * @param {GridSingleItemQuery} position
   * @param {Object} [options]
   * @param {String} [options.action="move"]
   *   - Accepts either "move" or "swap".
   *   - "move" moves the item in place of the other item.
   *   - "swap" swaps the position of the items.
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  Grid.prototype.move = function (item, position, options) {

    var inst = this;

    // Return immediately, if moving an item is not possible.
    if (inst._isDestroyed || inst._items.length < 2) {
      return inst;
    }

    var items = inst._items;
    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var isSwap = opts.action === 'swap';
    var action = isSwap ? 'swap' : 'move';
    var fromItem = inst._getItem(item);
    var toItem = inst._getItem(position);
    var fromIndex;
    var toIndex;

    // Make sure the items exist and are not the same.
    if (fromItem && toItem && (fromItem !== toItem)) {

      // Get the indices of the items.
      fromIndex = items.indexOf(fromItem);
      toIndex = items.indexOf(toItem);

      // Do the move/swap.
      (isSwap ? arraySwap : arrayMove)(items, fromIndex, toIndex);

      // Emit move event.
      inst._emit(evMove, {
        item: fromItem,
        fromIndex: fromIndex,
        toIndex: toIndex,
        action: action
      });

      // If layout is needed.
      if (layout) {
        inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
      }

    }

    return inst;

  };

  /**
   * Send item to another Grid instance.
   *
   * @public
   * @memberof Grid.prototype
   * @param {GridSingleItemQuery} item
   * @param {Grid} grid
   * @param {GridSingleItemQuery} position
   * @param {Object} [options]
   * @param {HTMLElement} [options.appendTo=document.body]
   * @param {(Boolean|LayoutCallback|String)} [options.layoutSender=true]
   * @param {(Boolean|LayoutCallback|String)} [options.layoutReceiver=true]
   * @returns {Grid}
   */
  Grid.prototype.send = function (item, grid, position, options) {

    var currentGrid = this;

    // Return immediately if either grid is destroyed or if the grids are the
    // same, or if target item was not found.
    if (currentGrid._isDestroyed || grid._isDestroyed || currentGrid === grid || !(item = currentGrid._getItem(item))) {
      return currentGrid;
    }

    var targetGrid = grid;
    var opts = options || {};
    var container = opts.appendTo || body;
    var layoutSender = opts.layoutSender ? opts.layoutSender : opts.layoutSender === undefined;
    var layoutReceiver = opts.layoutReceiver ? opts.layoutReceiver : opts.layoutReceiver === undefined;

    // Start the migration process.
    item._migrate.start(targetGrid, position, container);

    // If migration was started succesfully and the item is active, let's layout
    // the grids.
    if (item._migrate.isActive && item.isActive()) {
      if (layoutSender) {
        currentGrid.layout(layoutSender === 'instant', typeof layoutSender === typeFunction ? layoutSender : undefined);
      }
      if (layoutReceiver) {
        targetGrid.layout(layoutReceiver === 'instant', typeof layoutReceiver === typeFunction ? layoutReceiver : undefined);
      }
    }

    return currentGrid;

  };

  /**
   * Destroy the instance.
   *
   * @public
   * @memberof Grid.prototype
   * @param {Boolean} [removeElements=false]
   * @returns {Grid}
   */
  Grid.prototype.destroy = function (removeElements) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var container = inst._element;
    var items = inst._items.concat();
    var i;

    // Unbind window resize event listener.
    if (inst._resizeHandler) {
      global.removeEventListener('resize', inst._resizeHandler);
    }

    // Destroy items.
    for (i = 0; i < items.length; i++) {
      items[i]._destroy(removeElements);
    }

    // Restore container.
    removeClass(container, inst._settings.containerClass);
    setStyles(container, {height: ''});

    // Emit destroy event and unbind all events.
    inst._emit(evDestroy);
    inst._emitter.destroy();

    // Remove reference from the grid instances collection.
    gridInstances[inst._id] = undefined;

    // Flag instance as destroyed.
    inst._isDestroyed = true;

    return inst;

  };

  /**
   * Grid - Protected prototype methods
   * **********************************
   */

  /**
   * Get instance's item by element or by index. Target can also be an Item
   * instance in which case the function returns the item if it exists within
   * related Grid instance. If nothing is found with the provided target, null
   * is returned.
   *
   * @protected
   * @memberof Grid.prototype
   * @param {GridSingleItemQuery} [target=0]
   * @returns {?Item}
   */
  Grid.prototype._getItem = function (target) {

    var inst = this;
    var items = inst._items;
    var i;

    // If no target is specified or the instance is destroyed, return the first
    // item or null.
    if (inst._isDestroyed || !target) {
      return items[0] || null;
    }

    // If target is number return the item in that index. If the number is lower
    // than zero look for the item starting from the end of the items array. For
    // example -1 for the last item, -2 for the second last item, etc.
    else if (typeof target === typeNumber) {
      return items[target > -1 ? target : items.length + target] || null;
    }

    // If the target is an instance of Item return it if it is attached to this
    // Grid instance, otherwise return null.
    else if (target instanceof Item) {
      return target._gridId === inst._id ? target : null;
    }

    // In other cases let's assume that the target is an element, so let's try
    // to find an item that matches the element and return it. If item is not
    // found return null.
    else {
      // TODO: This could be made a lot faster by using WeakMap or Map.
      for (i = 0; i < items.length; i++) {
        if (items[i]._element === target) {
          return items[i];
        }
      }
      return null;
    }

  };

  /**
   * Bind an event listener.
   *
   * @protected
   * @memberof Grid.prototype
   * @param {String} event
   * @param {*} [arg1]
   * @param {*} [arg2]
   * @param {*} [arg3]
   * @returns {Grid}
   */
  Grid.prototype._emit = function () {

    var inst = this;

    if (!inst._isDestroyed) {
      inst._emitter.emit.apply(inst._emitter, arguments);
    }

    return inst;

  };

  /**
   * Refresh container's internal dimensions.
   *
   * @private
   * @memberof Grid.prototype
   * @returns {Grid}
   */
  Grid.prototype._refreshDimensions = function () {

    var inst = this;
    var element = inst._element;
    var rect = element.getBoundingClientRect();
    var sides = ['left', 'right', 'top', 'bottom'];
    var i;

    inst._width = rect.width;
    inst._height = rect.height;
    inst._left = rect.left;
    inst._top = rect.top;
    inst._border = {};

    for (i = 0; i < sides.length; i++) {
      inst._border[sides[i]] = getStyleAsFloat(element, 'border-' + sides[i] + '-width');
    }

    return inst;

  };

  /**
   * Item
   * ****
   */

  /**
   * Creates a new Item instance for a Grid instance.
   *
   * @public
   * @class
   * @param {Grid} grid
   * @param {HTMLElement} element
   */
  function Item(grid, element) {

    var inst = this;
    var settings = grid._settings;
    var isHidden;

    // Create instance id and add item to the itemInstances collection.
    inst._id = ++uuid;
    itemInstances[inst._id] = inst;

    // Destroyed flag.
    inst._isDestroyed = false;

    // If the provided item element is not a direct child of the grid container
    // element, append it to the grid container.
    if (element.parentNode !== grid._element) {
      grid._element.appendChild(element);
    }

    // Set item class.
    addClass(element, settings.itemClass);

    // Check if the element is hidden.
    isHidden = getStyle(element, 'display') === 'none';

    // Set visible/hidden class.
    addClass(element, isHidden ? settings.itemHiddenClass : settings.itemVisibleClass);

    // Refrence to connected Grid instance's id.
    inst._gridId = grid._id;

    // The elements.
    inst._element = element;
    inst._child = element.children[0];

    // Initiate item's animation controllers.
    inst._animate = new Grid.ItemAnimate(inst, element);
    inst._animateChild = new Grid.ItemAnimate(inst, inst._child);

    // Set up active state (defines if the item is considered part of the layout
    // or not).
    inst._isActive = isHidden ? false : true;

    // Set up positioning state (defines if the item is currently animating
    // it's position).
    inst._isPositioning = false;

    // Set up visibility states.
    inst._isHidden = isHidden;
    inst._isHiding = false;
    inst._isShowing = false;

    // Visibility animation callback queue. Whenever a callback is provided for
    // show/hide methods and animation is enabled the callback is stored
    // temporarily to this array. The callbacks are called with the first
    // argument as false if the animation succeeded without interruptions and
    // with the first argument as true if the animation was interrupted.
    inst._visibilityQueue = [];

    // Layout animation callback queue. Whenever a callback is provided for
    // layout method and animation is enabled the callback is stored temporarily
    // to this array. The callbacks are called with the first argument as false
    // if the animation succeeded without interruptions and with the first
    // argument as true if the animation was interrupted.
    inst._layoutQueue = [];

    // Set up initial positions.
    inst._left = 0;
    inst._top = 0;

    // Set element's initial styles.
    setStyles(element, {
      left: '0',
      top: '0',
      transform: getTranslateString(0, 0),
      display: isHidden ? 'none' : 'block'
    });

    // Set up the initial dimensions and sort data.
    inst._refreshDimensions()._refreshSortData();

    // Set initial styles for the child element.
    if (isHidden) {
      grid._itemHideHandler.start(inst, true);
    }
    else {
      grid._itemShowHandler.start(inst, true);
    }

    // Set up migration handler data.
    inst._migrate = new Grid.ItemMigrate(inst);

    // Set up release handler
    inst._release = new Grid.ItemRelease(inst);

    // Set up drag handler.
    inst._drag = settings.dragEnabled ? new Grid.ItemDrag(inst) : null;

  }

  /**
   * Item - Public prototype methods
   * *******************************
   */

  /**
   * Get the instance grid reference.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Grid}
   */
  Item.prototype.getGrid = function () {

    return gridInstances[this._gridId];

  };

  /**
   * Get the instance element.
   *
   * @public
   * @memberof Item.prototype
   * @returns {HTMLElement}
   */
  Item.prototype.getElement = function () {

    return this._element;

  };

  /**
   * Get instance element's cached width.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Number}
   */
  Item.prototype.getWidth = function () {

    return this._width;

  };

  /**
   * Get instance element's cached height.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Number}
   */
  Item.prototype.getHeight = function () {

    return this._height;

  };

  /**
   * Get instance element's cached margins.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Object}
   *   - The returned object contains left, right, top and bottom properties
   *     which indicate the item element's cached margins.
   */
  Item.prototype.getMargin = function () {

    return {
      left: this._margin.left,
      right: this._margin.right,
      top: this._margin.top,
      bottom: this._margin.bottom
    };

  };

  /**
   * Get instance element's cached position.
   *
   * @public
   * @memberof Item.prototype
   * @returns {Object}
   *   - The returned object contains left and top properties which indicate the
   *     item element's cached position in the grid.
   */
  Item.prototype.getPosition = function () {

    return {
      left: this._left,
      top: this._top
    };

  };

  /**
   * Is the item active?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isActive = function () {

    return this._isActive;

  };

  /**
   * Is the item visible?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isVisible = function () {

    return !this._isHidden;

  };

  /**
   * Is the item being animated to visible?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isShowing = function () {

    return this._isShowing;

  };

  /**
   * Is the item being animated to hidden?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isHiding = function () {

    return this._isHiding;

  };

  /**
   * Is the item positioning?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isPositioning = function () {

    return this._isPositioning;

  };

  /**
   * Is the item being dragged?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isDragging = function () {

    return !!this._drag && this._drag._data.isActive;

  };

  /**
   * Is the item being released?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isReleasing = function () {

    return this._release.isActive;

  };

  /**
   * Is the item destroyed?
   *
   * @public
   * @memberof Item.prototype
   * @returns {Boolean}
   */
  Item.prototype.isDestroyed = function () {

    return this._isDestroyed;

  };

  /**
   * Item - Protected prototype methods
   * **********************************
   */

  /**
   * Recalculate item's dimensions.
   *
   * @protected
   * @memberof Item.prototype
   * @returns {Item}
   */
  Item.prototype._refreshDimensions = function () {

    var inst = this;

    if (inst._isDestroyed || inst._isHidden) {
      return inst;
    }

    var element = inst._element;
    var rect = element.getBoundingClientRect();
    var sides = ['left', 'right', 'top', 'bottom'];
    var margin = inst._margin = inst._margin || {};
    var side;
    var i;

    // Calculate width and height.
    inst._width = rect.width;
    inst._height = rect.height;

    // Calculate margins (ignore negative margins).
    for (i = 0; i < 4; i++) {
      side = getStyleAsFloat(element, 'margin-' + sides[i]);
      margin[sides[i]] = side > 0 ? side : 0;
    }

    return inst;

  };

  /**
   * Fetch and store item's sort data.
   *
   * @protected
   * @memberof Item.prototype
   * @returns {Item}
   */
  Item.prototype._refreshSortData = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var sortData = {};
    var getters = inst.getGrid()._settings.sortData;

    // Fetch sort data.
    if (getters) {
      Object.keys(getters).forEach(function (key) {
        sortData[key] = getters[key](inst, inst._element);
      });
    }

    // Store sort data to the instance.
    inst._sortData = sortData;

    return inst;

  };

  /**
   * Position item based on it's current data.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} instant
   * @param {Function} [onFinish]
   * @returns {Item}
   */
  Item.prototype._layout = function (instant, onFinish) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var isPositioning = inst._isPositioning;
    var migrate = inst._migrate;
    var release = inst._release;
    var isJustReleased = release.isActive && release.isPositioningStarted === false;
    var grid = inst.getGrid();
    var settings = grid._settings;
    var animDuration = isJustReleased ? settings.dragReleaseDuration : settings.layoutDuration;
    var animEasing = isJustReleased ? settings.dragReleaseEasing : settings.layoutEasing;
    var animEnabled = !instant && !inst._skipNextLayoutAnimation && animDuration > 0;
    var isAnimating;
    var offsetLeft;
    var offsetTop;
    var currentLeft;
    var currentTop;
    var targetStyles;

    // If the item is currently positioning process current layout callback
    // queue with interrupted flag on if the item is currently positioning.
    if (isPositioning) {
      processQueue(inst._layoutQueue, true, inst);
    }

    // Mark release positioning as started.
    if (isJustReleased) {
      release.isPositioningStarted = true;
    }

    // Push the callback to the callback queue.
    if (typeof onFinish === typeFunction) {
      inst._layoutQueue.push(onFinish);
    }

    // Get item container offsets and target styles.
    offsetLeft = release.isActive ? release.containerDiffX : migrate.isActive ? migrate.containerDiffX : 0;
    offsetTop = release.isActive ? release.containerDiffY : migrate.isActive ? migrate.containerDiffY : 0;
    targetStyles = {transform: getTranslateString(inst._left + offsetLeft, inst._top + offsetTop)};

    // If no animations are needed, easy peasy!
    if (!animEnabled) {
      isPositioning && rafLoop.cancel(rafQueueLayout, inst._id);
      isAnimating = inst._animate.isAnimating();
      inst._stopLayout(false, targetStyles);
      !isAnimating && setStyles(element, targetStyles);
      inst._skipNextLayoutAnimation = false;
      return inst._finishLayout();
    }

    // Set item as positioning.
    inst._isPositioning = true;

    // Get the element's current left and top position in the read callback.
    // Then in the write callback do the animation if necessary.
    rafLoop.add(rafQueueLayout, inst._id, function () {
      currentLeft = getTranslateAsFloat(element, 'x') - offsetLeft;
      currentTop = getTranslateAsFloat(element, 'y') - offsetTop;
    }, function () {

      // If the item is already in correct position let's quit early.
      if (inst._left === currentLeft && inst._top === currentTop) {
        isPositioning && inst._stopLayout(false, targetStyles);
        inst._isPositioning = false;
        return inst._finishLayout();
      }

      // Set item's positioning class.
      !isPositioning && addClass(element, settings.itemPositioningClass);

      // Animate.
      inst._animate.start(
        {transform: getTranslateString(currentLeft + offsetLeft, currentTop + offsetTop)},
        targetStyles,
        {
          duration: animDuration,
          easing: animEasing,
          onFinish: function () {
            inst._finishLayout();
          }
        }
      );

    });

    return inst;

  };

  /**
   * Position item based on it's current data.
   *
   * @protected
   * @memberof Item.prototype
   * @returns {Item}
   */
  Item.prototype._finishLayout = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    // Mark the item as not positioning and remove positioning classes.
    if (inst._isPositioning) {
      inst._isPositioning = false;
      removeClass(inst._element, inst.getGrid()._settings.itemPositioningClass);
    }

    // Finish up release.
    if (inst._release.isActive) {
      inst._release.stop();
    }

    // Finish up migration.
    if (inst._migrate.isActive) {
      inst._migrate.stop();
    }

    // Process the callback queue.
    processQueue(inst._layoutQueue, false, inst);

    return inst;

  };

  /**
   * Stop item's position animation if it is currently animating.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} [processLayoutQueue=false]
   * @param {Object} [targetStyles]
   * @returns {Item}
   */
  Item.prototype._stopLayout = function (processLayoutQueue, targetStyles) {

    var inst = this;

    if (inst._isDestroyed || !inst._isPositioning) {
      return inst;
    }

    // Cancel animation init.
    rafLoop.cancel(rafQueueLayout, inst._id);

    // Stop animation.
    inst._animate.stop(targetStyles);

    // Remove positioning class.
    removeClass(inst._element, inst.getGrid()._settings.itemPositioningClass);

    // Reset state.
    inst._isPositioning = false;

    // Process callback queue.
    if (processLayoutQueue) {
      processQueue(inst._layoutQueue, true, inst);
    }

    return inst;

  };

  Item.prototype._show = function (instant, onFinish) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var queue = inst._visibilityQueue;
    var callback = typeof onFinish === typeFunction ? onFinish : null;
    var grid = inst.getGrid();
    var settings = grid._settings;

    // If item is visible call the callback and be done with it.
    if (!inst._isShowing && !inst._isHidden) {
      callback && callback(false, inst);
      return inst;
    }

    // If item is showing and does not need to be shown instantly, let's just
    // push callback to the callback queue and be done with it.
    if (inst._isShowing && !instant) {
      callback && queue.push(callback);
      return inst;
    }

    // If the item is hiding or hidden process the current visibility callback
    // queue with the interrupted flag active, update classes and set display
    // to block if necessary.
    if (!inst._isShowing) {
      processQueue(queue, true, inst);
      removeClass(element, settings.itemHiddenClass);
      addClass(element, settings.itemVisibleClass);
      !inst._isHiding && setStyles(element, {display: 'block'});
    }

    // Push callback to the callback queue.
    callback && queue.push(callback);

    // Update item's internal states.
    inst._isActive = inst._isShowing = true;
    inst._isHiding = inst._isHidden = false;

    // If we need to show instantly.
    if (instant) {
      grid._itemShowHandler.stop(inst, settings.visibleStyles);
      inst._isShowing = false;
      processQueue(queue, false, inst);
    }

    // If we need to animate.
    else {
      grid._itemShowHandler.start(inst, instant, function () {
        if (!inst._isHidden) {
          inst._isShowing = false;
          processQueue(queue, false, inst);
        }
      });
    }

    return inst;

  };

  /**
   * Hide item.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} instant
   * @param {Function} [onFinish]
   * @returns {Item}
   */
  Item.prototype._hide = function (instant, onFinish) {

    var inst = this;

    // Return immediately if the instance is destroyed.
    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var queue = inst._visibilityQueue;
    var callback = typeof onFinish === typeFunction ? onFinish : null;
    var grid = inst.getGrid();
    var settings = grid._settings;

    // If item is already hidden call the callback and be done with it.
    if (!inst._isHiding && inst._isHidden) {
      callback && callback(false, inst);
      return inst;
    }

    // If item is hiding and does not need to be hidden instantly, let's just
    // push callback to the callback queue and be done with it.
    if (inst._isHiding && !instant) {
      callback && queue.push(callback);
      return inst;
    }

    // If the item is showing or visible process the current visibility callback
    // queue with the interrupted flag active, update classes and set display
    // to block if necessary.
    if (!inst._isHiding) {
      processQueue(queue, true, inst);
      addClass(element, settings.itemHiddenClass);
      removeClass(element, settings.itemVisibleClass);
    }

    // Push callback to the callback queue.
    callback && queue.push(callback);

    // Update item's internal states.
    inst._isHidden = inst._isHiding = true;
    inst._isActive = inst._isShowing = false;

    // If we need to hide instantly.
    if (instant) {
      grid._itemHideHandler.stop(inst, settings.hiddenStyles);
      inst._isHiding = false;
      inst._stopLayout(true, {transform: getTranslateString(0, 0)});
      setStyles(element, {display: 'none'});
      processQueue(queue, false, inst);
    }

    // If we need to animate.
    else {
      grid._itemHideHandler.start(inst, instant, function () {
        if (inst._isHidden) {
          inst._isHiding = false;
          inst._stopLayout(true, {transform: getTranslateString(0, 0)});
          setStyles(element, {display: 'none'});
          processQueue(queue, false, inst);
        }
      });
    }

    return inst;

  };

  /**
   * Destroy item instance.
   *
   * @protected
   * @memberof Item.prototype
   * @param {Boolean} [removeElement=false]
   * @returns {Item}
   */
  Item.prototype._destroy = function (removeElement) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var element = inst._element;
    var grid = inst.getGrid();
    var settings = grid._settings;
    var index = grid._items.indexOf(inst);

    // Destroy release and migration.
    inst._release.destroy();
    inst._migrate.destroy();

    // Stop animations.
    inst._stopLayout(true, {});
    grid._itemShowHandler.stop(inst, {});
    grid._itemHideHandler.stop(inst, {});

    // Destroy drag.
    inst._drag && inst._drag.destroy();

    // Destroy animation handlers.
    inst._animate.destroy();
    inst._animateChild.destroy();

    // Handle visibility callback queue, fire all uncompleted callbacks with
    // interrupted flag.
    processQueue(inst._visibilityQueue, true, inst);

    // Remove all inline styles.
    element.removeAttribute('style');
    inst._child.removeAttribute('style');

    // Remove classes.
    removeClass(element, settings.itemPositioningClass);
    removeClass(element, settings.itemDraggingClass);
    removeClass(element, settings.itemReleasingClass);
    removeClass(element, settings.itemClass);
    removeClass(element, settings.itemVisibleClass);
    removeClass(element, settings.itemHiddenClass);

    // Remove item from Grid instance if it still exists there.
    index > -1 && grid._items.splice(index, 1);

    // Remove element from DOM.
    removeElement && element.parentNode.removeChild(element);

    // Remove item instance from the item instances collection.
    itemInstances[inst._id] = undefined;

    // Update item states (mostly just for good measure).
    inst._isActive = inst._isPositioning = inst._isHiding = inst._isShowing = false;
    inst._isDestroyed = inst._isHidden = true;

    return inst;

  };

  /**
   * Layout
   * ******
   */

  /**
   * Creates a new Layout instance.
   *
   * @public
   * @class
   * @param {Grid} grid
   * @param {Item[]} items
   */
  function Layout(grid, items) {

    var inst = this;
    var layoutSettings = grid._settings.layout;

    // Clone items.
    items = items.concat();

    // Let's make sure we have the correct container dimensions before going
    // further.
    grid._refreshDimensions();

    var width = grid._width - grid._border.left - grid._border.right;
    var height = grid._height - grid._border.top - grid._border.bottom;
    var isCustomLayout = typeof layoutSettings === typeFunction;
    var layout = isCustomLayout ? layoutSettings(items, width, height) :
      muuriLayout(items, width, height, isPlainObject(layoutSettings) ? layoutSettings : {});

    // Set instance data based on layout data.
    inst.slots = layout.slots;
    inst.setWidth = layout.setWidth || false;
    inst.setHeight = layout.setHeight || false;
    inst.width = layout.width;
    inst.height = layout.height;

  }

  /**
   * Emitter
   * *******
   */

  /**
   * Event emitter constructor.
   *
   * @public
   * @class
   */
  function Emitter() {

    this._events = {};
    this._isDestroyed = false;

  }

  /**
   * Emitter - Public prototype methods
   * **********************************
   */

  /**
   * Bind an event listener.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Emitter}
   */
  Emitter.prototype.on = function (event, listener) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var listeners = inst._events[event] || [];
    listeners.push(listener);
    inst._events[event] = listeners;

    return inst;

  };

  /**
   * Bind an event listener that is triggered only once.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Emitter}
   */
  Emitter.prototype.once = function (event, listener) {

    var inst = this;
    return this.on(event, function callback() {
      inst.off(event, callback);
      listener.apply(null, arguments);
    });

  };

  /**
   * Unbind all event listeners that match the provided listener function.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {Function} listener
   * @returns {Emitter}
   */
  Emitter.prototype.off = function (event, listener) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var listeners = inst._events[event] || [];
    var i = listeners.length;

    while (i--) {
      if (listener === listeners[i]) {
        listeners.splice(i, 1);
      }
    }

    return inst;

  };

  /**
   * Emit all listeners in a specified event with the provided arguments.
   *
   * @public
   * @memberof Emitter.prototype
   * @param {String} event
   * @param {*} [arg1]
   * @param {*} [arg2]
   * @param {*} [arg3]
   * @returns {Emitter}
   */
  Emitter.prototype.emit = function (event, arg1, arg2, arg3) {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var listeners = inst._events[event] || [];
    var listenersLength = listeners.length;
    var argsLength = arguments.length - 1;
    var i;

    if (listenersLength) {
      listeners = listeners.concat();
      for (i = 0; i < listenersLength; i++) {
        argsLength === 0 ? listeners[i]() :
        argsLength === 1 ? listeners[i](arg1) :
        argsLength === 2 ? listeners[i](arg1, arg2) :
                            listeners[i](arg1, arg2, arg3);
      }
    }

    return inst;

  };

  /**
   * Destroy emitter instance. Basically just removes all bound listeners.
   *
   * @public
   * @memberof Emitter.prototype
   * @returns {Emitter}
   */
  Emitter.prototype.destroy = function () {

    var inst = this;

    if (inst._isDestroyed) {
      return inst;
    }

    var eventNames = Object.keys(inst._events);
    var i;

    for (i = 0; i < eventNames.length; i++) {
      inst._events[eventNames[i]] = null;
    }

    inst._isDestroyed = true;

    return inst;

  };

  /**
   * ItemAnimate
   * ***********
   */

  /**
   * Muuri's internal animation engine. Uses Web Animations API.
   *
   * @public
   * @class
   * @param {Item} item
   * @param {HTMLElement} element
   */
  function ItemAnimate(item, element) {

    var inst = this;
    inst._item = item;
    inst._element = element;
    inst._animation = null;
    inst._propsTo = null;
    inst._isDestroyed = false;

  }

  /**
   * ItemAnimate - Public prototype methods
   * **************************************
   */

  /**
   * Start instance's animation. Automatically stops current animation if it is
   * running.
   *
   * @public
   * @memberof ItemAnimate.prototype
   * @param {Object} propsFrom
   * @param {Object} propsTo
   * @param {Object} [options]
   * @param {Number} [options.duration=300]
   * @param {String} [options.easing='ease']
   * @param {Function} [options.onFinish]
   */
  ItemAnimate.prototype.start = function (propsFrom, propsTo, options) {

    var inst = this;

    if (inst._isDestroyed) {
      return;
    }

    var opts = options || {};
    var callback = typeof opts.onFinish === typeFunction ? opts.onFinish : null;
    var shouldStop;

    // If item is being animate check if the target animation properties equal
    // to the properties in the current animation. If they match we can just let
    // the animation continue and be done with it (and of course change the
    // cached callback). If the animation properties do not match we need to
    // stop the ongoing animation.
    if (inst._animation) {
      shouldStop = Object.keys(propsTo).some(function (propName) {
        return propsTo[propName] !== inst._propsTo[propName];
      });
      if (shouldStop) {
        inst._animation.cancel();
      }
      else {
        inst._animation.onfinish = function () {
          inst._animation = inst._propsTo = null;
          callback && callback();
        };
        return;
      }
    }

    // Cache target props.
    inst._propsTo = propsTo;

    // Start the animation.
    inst._animation = inst._element.animate([propsFrom, propsTo], {
      duration: opts.duration || 300,
      easing: opts.easing || 'ease'
    });

    // Bind animation finish callback.
    inst._animation.onfinish = function () {
      inst._animation = inst._propsTo = null;
      callback && callback();
    };

    // Set the end styles.
    setStyles(inst._element, propsTo);

  };

  /**
   * Stop instance's current animation if running.
   *
   * @private
   * @memberof ItemAnimate.prototype
   * @param {Object} [currentProps]
   */
  ItemAnimate.prototype.stop = function (currentProps) {

    var inst = this;

    if (!inst._isDestroyed && inst._animation) {
      setStyles(inst._element, currentProps || getCurrentStyles(inst._element, inst._propsTo));
      inst._animation.cancel();
      inst._animation = inst._propsTo = null;
    }

  };

  /**
   * Check if the item is being animated currently.
   *
   * @private
   * @memberof ItemAnimate.prototype
   * @return {Boolean}
   */
  ItemAnimate.prototype.isAnimating = function () {

    return !!this._animation;

  };

  /**
   * Destroy the instance and stop current animation if it is running.
   *
   * @public
   * @memberof ItemAnimate.prototype
   * @returns {Boolean}
   */
  ItemAnimate.prototype.destroy = function () {

    var inst = this;

    if (!inst._isDestroyed) {
      inst.stop();
      inst._item = inst._element = null;
      inst._isDestroyed = true;
    }

  };

  /**
   * ItemMigrate
   * ***********
   */

  /**
   * The migrate process handler constructor.
   *
   * @class
   * @private
   * @param {Item} item
   */
  function ItemMigrate(item) {

    var migrate = this;

    // Private props.
    migrate._itemId = item._id;
    migrate._isDestroyed = false;

    // Public props.
    migrate.isActive = false;
    migrate.container = false;
    migrate.containerDiffX = 0;
    migrate.containerDiffY = 0;

  }

  /**
   * ItemMigrate - Public prototype methods
   * **************************************
   */

  /**
   * Destroy instance.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @returns {ItemMigrate}
   */
  ItemMigrate.prototype.destroy = function () {

    var migrate = this;

    if (!migrate._isDestroyed) {
      migrate.stop(true);
      migrate._isDestroyed = true;
    }

    return migrate;

  };

  /**
   * Get Item instance.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @returns {?Item}
   */
  ItemMigrate.prototype.getItem = function () {

    return itemInstances[this._itemId] || null;

  };

  /**
   * Start the migrate process of an item.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @param {Grid} targetGrid
   * @param {GridSingleItemQuery} position
   * @param {HTMLElement} [container]
   * @returns {ItemMigrate}
   */
  ItemMigrate.prototype.start = function (targetGrid, position, container) {

    var migrate = this;

    if (migrate._isDestroyed) {
      return migrate;
    }

    var item = migrate.getItem();
    var itemElement = item._element;
    var isItemVisible = item.isVisible();
    var currentGrid = item.getGrid();
    var currentGridStn = currentGrid._settings;
    var targetGridStn = targetGrid._settings;
    var targetGridElement = targetGrid._element;
    var currentIndex = currentGrid._items.indexOf(item);
    var targetIndex = typeof position === typeNumber ? position : targetGrid._items.indexOf(targetGrid._getItem(position));
    var targetContainer = container || body;
    var currentContainer;
    var offsetDiff;
    var containerDiff;
    var translateX;
    var translateY;

    // If we have invalid new index, let's return immediately.
    if (targetIndex === null) {
      return migrate;
    }

    // Normalize target index (for event data).
    targetIndex = normalizeArrayIndex(targetGrid._items, targetIndex, true);

    // Get current translateX and translateY values if needed.
    if (item.isPositioning() || migrate.isActive || item.isReleasing()) {
      translateX = getTranslateAsFloat(itemElement, 'x');
      translateY = getTranslateAsFloat(itemElement, 'y');
    }

    // Abort current positioning.
    if (item.isPositioning()) {
      item._stopLayout(true, {transform: getTranslateString(translateX, translateY)});
    }

    // Abort current migration.
    if (migrate.isActive) {
      translateX -= migrate.containerDiffX;
      translateY -= migrate.containerDiffY;
      migrate.stop(true, {transform: getTranslateString(translateX, translateY)});
    }

    // Abort current release.
    if (item.isReleasing()) {
      translateX -= item._release.containerDiffX;
      translateY -= item._release.containerDiffY;
      item._release.stop(true, {transform: getTranslateString(translateX, translateY)});
    }

    // Stop current visibility animations.
    // TODO: This causes potentially layout thrashing, because we are not
    // feeding any styles to the stop handlers.
    currentGrid._itemShowHandler.stop(item);
    currentGrid._itemHideHandler.stop(item);

    // Destroy current drag.
    if (item._drag) {
      item._drag.destroy();
    }

    // Destroy current animation handlers.
    item._animate.destroy();
    item._animateChild.destroy();

    // Process current visibility animation queue.
    processQueue(item._visibilityQueue, true, item);

    // Emit beforeSend event.
    currentGrid._emit(evBeforeSend, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    // Emit beforeReceive event.
    targetGrid._emit(evBeforeReceive, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    // Remove current classnames.
    removeClass(itemElement, currentGridStn.itemClass);
    removeClass(itemElement, currentGridStn.itemVisibleClass);
    removeClass(itemElement, currentGridStn.itemHiddenClass);

    // Add new classnames.
    addClass(itemElement, targetGridStn.itemClass);
    addClass(itemElement, isItemVisible ? targetGridStn.itemVisibleClass : targetGridStn.itemHiddenClass);

    // Move item instance from current grid to target grid.
    currentGrid._items.splice(currentIndex, 1);
    insertItemsToArray(targetGrid._items, item, targetIndex);

    // Update item's grid id reference.
    item._gridId = targetGrid._id;

    // Instantiate new animation controllers.
    item._animate = new Grid.ItemAnimate(item, itemElement);
    item._animateChild = new Grid.ItemAnimate(item, item._child);

    // Get current container
    currentContainer = itemElement.parentNode;

    // Move the item inside the target container if it's different than the
    // current container.
    if (targetContainer !== currentContainer) {
      targetContainer.appendChild(itemElement);
      offsetDiff = getOffsetDiff(targetContainer, currentContainer, true);
      if (translateX === undefined) {
        translateX = getTranslateAsFloat(itemElement, 'x');
        translateY = getTranslateAsFloat(itemElement, 'y');
      }
      setStyles(itemElement, {transform: getTranslateString(translateX + offsetDiff.left, translateY + offsetDiff.top)});
    }

    // Update child element's styles to reflect the current visibility state.
    item._child.removeAttribute('style');
    if (isItemVisible) {
      targetGrid._itemShowHandler.start(item, true);
    }
    else {
      targetGrid._itemHideHandler.start(item, true);
    }

    // Update display styles.
    setStyles(itemElement, {
      display: isItemVisible ? 'block' : 'hidden'
    });

    // Get offset diff for the migration data.
    containerDiff = getOffsetDiff(targetContainer, targetGridElement, true);

    // Update item's cached dimensions and sort data.
    item._refreshDimensions()._refreshSortData();

    // Create new drag handler.
    item._drag = targetGridStn.dragEnabled ? new Grid.ItemDrag(item) : null;

    // Setup migration data.
    migrate.isActive = true;
    migrate.container = targetContainer;
    migrate.containerDiffX = containerDiff.left;
    migrate.containerDiffY = containerDiff.top;

    // Emit send event.
    currentGrid._emit(evSend, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    // Emit receive event.
    targetGrid._emit(evReceive, {
      item: item,
      fromGrid: currentGrid,
      fromIndex: currentIndex,
      toGrid: targetGrid,
      toIndex: targetIndex
    });

    return migrate;

  };

  /**
   * End the migrate process of an item. This method can be used to abort an
   * ongoing migrate process (animation) or finish the migrate process.
   *
   * @public
   * @memberof ItemMigrate.prototype
   * @param {Boolean} [abort=false]
   *  - Should the migration be aborted?
   * @param {Object} [currentStyles]
   *  - Optional current translateX and translateY styles.
   * @returns {ItemMigrate}
   */
  ItemMigrate.prototype.stop = function (abort, currentStyles) {

    var migrate = this;

    if (migrate._isDestroyed || !migrate.isActive) {
      return migrate;
    }

    var item = migrate.getItem();
    var element = item._element;
    var grid = item.getGrid();
    var gridElement = grid._element;
    var translateX;
    var translateY;

    if (migrate.container !== gridElement) {
      if (!currentStyles) {
        translateX = abort ? getTranslateAsFloat(element, 'x') - migrate.containerDiffX : item._left;
        translateY = abort ? getTranslateAsFloat(element, 'y') - migrate.containerDiffY : item._top;
        currentStyles = {transform: getTranslateString(translateX, translateY)};
      }
      gridElement.appendChild(element);
      setStyles(element, currentStyles);
    }

    migrate.isActive = false;
    migrate.container = null;
    migrate.containerDiffX = 0;
    migrate.containerDiffY = 0;

    return migrate;

  };

  /**
   * ItemRelease
   * ***********
   */

  /**
   * The release process handler constructor. Although this might seem as proper
   * fit for the drag process this needs to be separated into it's own logic
   * because there might be a scenario where drag is disabled, but the release
   * process still needs to be implemented (dragging from a grid to another).
   *
   * @class
   * @private
   * @param {Item} item
   */
  function ItemRelease(item) {

    var release = this;

    // Private props.
    release._itemId = item._id;
    release._isDestroyed = false;

    // Public props.
    release.isActive = false;
    release.isPositioningStarted = false;
    release.containerDiffX = 0;
    release.containerDiffY = 0;

  }

  /**
   * ItemRelease - Public prototype methods
   * **************************************
   */

  /**
   * Destroy instance.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.destroy = function () {

    var release = this;

    if (!release._isDestroyed) {
      release.stop(true);
      release._isDestroyed = true;
    }

    return release;

  };

  /**
   * Get Item instance.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {?Item}
   */
  ItemRelease.prototype.getItem = function () {

    return itemInstances[this._itemId] || null;

  };

  /**
   * Reset public data and remove releasing class.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.reset = function () {

    var release = this;

    if (release._isDestroyed) {
      return release;
    }

    var item = release.getItem();
    release.isActive = false;
    release.isPositioningStarted = false;
    release.containerDiffX = 0;
    release.containerDiffY = 0;
    removeClass(item._element, item.getGrid()._settings.itemReleasingClass);

    return release;

  };

  /**
   * Start the release process of an item.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.start = function () {

    var release = this;

    if (release._isDestroyed || release.isActive) {
      return release;
    }

    var item = release.getItem();
    var grid = item.getGrid();

    // Flag release as active.
    release.isActive = true;

    // Add release classname to the released element.
    addClass(item._element, grid._settings.itemReleasingClass);

    // Emit dragReleaseStart event.
    grid._emit(evDragReleaseStart, item);

    // Position the released item.
    item._layout(false);

    return release;

  };

  /**
   * End the release process of an item. This method can be used to abort an
   * ongoing release process (animation) or finish the release process.
   *
   * @public
   * @memberof ItemRelease.prototype
   * @param {Boolean} [abort=false]
   *  - Should the release be aborted? When true, the release end event won't be
   *    emitted. Set to true only when you need to abort the release process
   *    while the item is animating to it's position.
   * @param {Object} [currentStyles]
   *  - Optional current translateX and translateY styles.
   * @returns {ItemRelease}
   */
  ItemRelease.prototype.stop = function (abort, currentStyles) {

    var release = this;

    if (release._isDestroyed || !release.isActive) {
      return release;
    }

    var item = release.getItem();
    var element = item._element;
    var grid = item.getGrid();
    var container = grid._element;
    var containerDiffX = release.containerDiffX;
    var containerDiffY = release.containerDiffY;
    var translateX;
    var translateY;

    // Reset data and remove releasing classname from the element.
    release.reset();

    // If the released element is outside the grid's container element put it
    // back there and adjust position accordingly.
    if (element.parentNode !== container) {
      if (!currentStyles) {
        translateX = abort ? getTranslateAsFloat(element, 'x') - containerDiffX : item._left;
        translateY = abort ? getTranslateAsFloat(element, 'y') - containerDiffY : item._top;
        currentStyles = {transform: getTranslateString(translateX, translateY)};
      }
      container.appendChild(element);
      setStyles(element, currentStyles);
    }

    // Emit dragReleaseEnd event.
    if (!abort) {
      grid._emit(evDragReleaseEnd, item);
    }

    return release;

  };

  /**
   * ItemDrag
   * ********
   */

  /**
   * Bind Hammer touch interaction to an item.
   *
   * @class
   * @private
   * @param {Item} item
   */
  function ItemDrag(item) {

    if (!Hammer) {
      throw new Error('[' + namespace + '] required dependency Hammer is not defined.');
    }

    var drag = this;
    var element = item._element;
    var grid = item.getGrid();
    var settings = grid._settings;
    var hammer;

    // Start predicate.
    var startPredicate = typeof settings.dragStartPredicate === typeFunction ?
      settings.dragStartPredicate : ItemDrag.defaultStartPredicate;
    var startPredicateState = startPredicateInactive;
    var startPredicateResult;

    // Protected data.
    drag._itemId = item._id;
    drag._gridId = grid._id;
    drag._hammer = hammer = new Hammer.Manager(element);
    drag._isDestroyed = false;
    drag._isMigrating = false;
    drag._data = {};

    // Create a private drag start resolver that can be used to resolve the drag
    // start predicate asynchronously.
    drag._resolveStartPredicate = function (event) {
      if (!drag._isDestroyed && startPredicateState === startPredicatePending) {
        startPredicateState = startPredicateResolved;
        drag.onStart(event);
      }
    };

    // Create scroll listener.
    drag._scrollListener = function (e) {
      drag.onScroll(e);
    };

    // Create overlap checker function.
    drag._checkSortOverlap = debounce(function () {
      drag._data.isActive && drag.checkOverlap();
    }, settings.dragSortInterval);

    // Create sort predicate.
    drag._sortPredicate = typeof settings.dragSortPredicate === typeFunction ?
      settings.dragSortPredicate : ItemDrag.defaultSortPredicate;

    // Setup item's initial drag data.
    drag.reset();

    // Add drag recognizer to hammer.
    hammer.add(new Hammer.Pan({
      event: 'drag',
      pointers: 1,
      threshold: 0,
      direction: Hammer.DIRECTION_ALL
    }));

    // Add draginit recognizer to hammer.
    hammer.add(new Hammer.Press({
      event: 'draginit',
      pointers: 1,
      threshold: 1000,
      time: 0
    }));

    // Configure the hammer instance.
    if (isPlainObject(settings.dragHammerSettings)) {
      hammer.set(settings.dragHammerSettings);
    }

    // Bind drag events.
    hammer
    .on('draginit dragstart dragmove', function (e) {

      // Let's activate drag start predicate state.
      if (startPredicateState === startPredicateInactive) {
        startPredicateState = startPredicatePending;
      }

      // If predicate is pending try to resolve it.
      if (startPredicateState === startPredicatePending) {
        startPredicateResult = startPredicate(drag.getItem(), e);
        if (startPredicateResult === true) {
          startPredicateState = startPredicateResolved;
          drag.onStart(e);
        }
        else if (startPredicateResult === false) {
          startPredicateState = startPredicateRejected;
        }
      }

      // Otherwise if predicate is resolved and drag is active, move the item.
      else if (startPredicateState === startPredicateResolved && drag._data.isActive) {
        drag.onMove(e);
      }

    })
    .on('dragend dragcancel draginitup', function (e) {

      // Check if the start predicate was resolved during drag.
      var isResolved = startPredicateState === startPredicateResolved;

      // Do final predicate check to allow user to unbind stuff for the current
      // drag procedure within the predicate callback. The return value of this
      // check will have no effect to the state of the predicate.
      startPredicate(drag.getItem(), e);

      // Reset start predicate state.
      startPredicateState = startPredicateInactive;

      // If predicate is resolved and dragging is active, call the end handler.
      if (isResolved && drag._data.isActive) {
        drag.onEnd(e);
      }

    });

    // Prevent native link/image dragging for the item and it's ancestors.
    element.addEventListener('dragstart', preventDefault, false);

  }

  /**
   * ItemDrag - Public methods
   * *************************
   */

  /**
   * Default drag start predicate handler that handles anchor elements
   * gracefully. The return value of this function defines if the drag is
   * started, rejected or pending. When true is returned the dragging is started
   * and when false is returned the dragging is rejected. If nothing is returned
   * the predicate will be called again on the next drag movement.
   *
   * @public
   * @memberof ItemDrag
   * @param {Item} item
   * @param {Object} event
   * @param {Object} [options]
   *   - An optional options object which can be used to pass the predicate
   *     it's options manually. By default the predicate retrieves the options
   *     from the grid's settings.
   * @returns {Boolean}
   */
  ItemDrag.defaultStartPredicate = function (item, event, options) {

    var element = item._element;
    var predicate = item._drag._startPredicateData;
    var config;
    var isAnchor;
    var href;
    var target;

    // Setup data if it is not set up yet.
    if (!predicate) {
      config = options || item._drag.getGrid()._settings.dragStartPredicate;
      config = isPlainObject(config) ? config : {};
      predicate = item._drag._startPredicateData = {
        distance: Math.abs(config.distance) || 0,
        delay: Math.max(config.delay, 0) || 0,
        handle: typeof config.handle === 'string' ? config.handle : false
      };
    }

    // Final event logic. At this stage return value does not matter anymore,
    // the predicate is either resolved or it's not and there's nothing to do
    // about it. Here we just reset data and if the item element is a link
    // we follow it (if there has only been slight movement).
    if (event.isFinal) {
      isAnchor = element.tagName.toLowerCase() === 'a';
      href = element.getAttribute('href');
      target = element.getAttribute('target');
      dragStartPredicateReset(item);
      if (isAnchor && href && Math.abs(event.deltaX) < 2 && Math.abs(event.deltaY) < 2 && event.deltaTime < 200) {
        if (target && target !== '_self') {
          global.open(href, target);
        }
        else {
          global.location.href = href;
        }
      }
      return;
    }

    // Find and store the handle element so we can check later on if the
    // cursor is within the handle. If we have a handle selector let's find
    // the corresponding element. Otherwise let's use the item element as the
    // handle.
    if (!predicate.handleElement) {
      if (predicate.handle) {
        predicate.handleElement = (event.changedPointers[0] || {}).target;
        while (predicate.handleElement && !elementMatches(predicate.handleElement, predicate.handle)) {
          predicate.handleElement = predicate.handleElement !== element ? predicate.handleElement.parentElement : null;
        }
        if (!predicate.handleElement) {
          return false;
        }
      }
      else {
        predicate.handleElement = element;
      }
    }

    // If delay is defined let's keep track of the latest event and initiate
    // delay if it has not been done yet.
    if (predicate.delay) {
      predicate.event = event;
      if (!predicate.delayTimer) {
        predicate.delayTimer = global.setTimeout(function () {
          predicate.delay = 0;
          if (dragStartPredicateResolve(item, predicate.event)) {
            item._drag._resolveStartPredicate(predicate.event);
            dragStartPredicateReset(item);
          }
        }, predicate.delay);
      }
    }

    return dragStartPredicateResolve(item, event);

  };

  /**
   * Default drag sort predicate.
   *
   * @public
   * @memberof ItemDrag
   * @param {Item} item
   * @param {Object} event
   * @returns {(Boolean|DragSortCommand)}
   *   - Returns false if no valid index was found. Otherwise returns drag sort
   *     command.
   */
  ItemDrag.defaultSortPredicate = function (item) {

    var drag = item._drag;
    var dragData = drag._data;
    var rootGrid = drag.getGrid();
    var settings = rootGrid._settings;
    var config = settings.dragSortPredicate || {};
    var sortThreshold = config.threshold || 50;
    var sortAction = config.action || 'move';
    var itemRect = {
      width: item._width,
      height: item._height,
      left: dragData.elementClientX,
      top: dragData.elementClientY
    };
    var grid = getTargetGrid(item, rootGrid, itemRect, sortThreshold);
    var gridOffsetLeft = 0;
    var gridOffsetTop = 0;
    var matchScore = -1;
    var matchIndex;
    var hasValidTargets;
    var target;
    var score;
    var i;

    // Return early if we found no grid container element that overlaps the
    // dragged item enough.
    if (!grid) {
      return false;
    }

    // If item is moved within it's originating grid adjust item's left and top
    // props. Otherwise if item is moved to/within another grid get the
    // container element's offset (from the element's content edge).
    if (grid === rootGrid) {
      itemRect.left = dragData.gridX + item._margin.left;
      itemRect.top = dragData.gridY + item._margin.top;
    }
    else {
      gridOffsetLeft = grid._left + grid._border.left;
      gridOffsetTop = grid._top + grid._border.top;
    }

    // Loop through the target grid items and try to find the best match.
    for (i = 0; i < grid._items.length; i++) {

      target = grid._items[i];

      // If the target item is not active or the target item is the dragged item
      // let's skip to the next item.
      if (!target._isActive || target === item) {
        continue;
      }

      // Mark the grid as having valid target items.
      hasValidTargets = true;

      // Calculate the target's overlap score with the dragged item.
      score = getRectOverlapScore(itemRect, {
        width: target._width,
        height: target._height,
        left: target._left + target._margin.left + gridOffsetLeft,
        top: target._top + target._margin.top + gridOffsetTop
      });

      // Update best match index and score if the target's overlap score with
      // the dragged item is higher than the current best match score.
      if (score > matchScore) {
        matchIndex = i;
        matchScore = score;
      }

    }

    // If there is no valid match and the item is being moved into another grid.
    if (matchScore < sortThreshold && item.getGrid() !== grid) {
      matchIndex = hasValidTargets ? -1 : 0;
      matchScore = Infinity;
    }

    // Check if the best match overlaps enough to justify a placement switch.
    if (matchScore >= sortThreshold) {
      return {
        grid: grid,
        index: matchIndex,
        action: sortAction
      };
    }

    return false;

  };

  /**
   * ItemDrag - Public prototype methods
   * ***********************************
   */

  /**
   * Destroy instance.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.destroy = function () {

    var drag = this;

    if (!drag._isDestroyed) {
      drag.stop();
      drag._hammer.destroy();
      drag.getItem()._element.removeEventListener('dragstart', preventDefault, false);
      drag._isDestroyed = true;
    }

    return drag;

  };

  /**
   * Get Item instance.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {?Item}
   */
  ItemDrag.prototype.getItem = function () {

    return itemInstances[this._itemId] || null;

  };

  /**
   * Get Grid instance.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {?Grid}
   */
  ItemDrag.prototype.getGrid = function () {

    return gridInstances[this._gridId] || null;

  };

  /**
   * Setup/reset drag data.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.reset = function () {

    var drag = this;
    var dragData = drag._data;

    // Is item being dragged?
    dragData.isActive = false;

    // The dragged item's container element.
    dragData.container = null;

    // The dragged item's containing block.
    dragData.containingBlock = null;

    // Hammer event data.
    dragData.startEvent = null;
    dragData.currentEvent = null;

    // All the elements which need to be listened for scroll events during
    // dragging.
    dragData.scrollers = [];

    // The current translateX/translateY position.
    dragData.left = 0;
    dragData.top = 0;

    // Dragged element's current position within the grid.
    dragData.gridX = 0;
    dragData.gridY = 0;

    // Dragged element's current offset from window's northwest corner. Does
    // not account for element's margins.
    dragData.elementClientX = 0;
    dragData.elementClientY = 0;

    // Offset difference between the dragged element's temporary drag
    // container and it's original container.
    dragData.containerDiffX = 0;
    dragData.containerDiffY = 0;

    return drag;

  };

  /**
   * Bind drag scroll handlers to all scrollable ancestor elements of the
   * dragged element and the drag container element.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.bindScrollListeners = function () {

    var drag = this;
    var gridContainer = drag.getGrid()._element;
    var dragContainer = drag._data.container;
    var scrollers = getScrollParents(drag.getItem()._element);
    var i;

    // If drag container is defined and it's not the same element as grid
    // container then we need to add the grid container and it's scroll parents
    // to the elements which are going to be listener for scroll events.
    if (dragContainer !== gridContainer) {
      scrollers = arrayUnique(scrollers.concat(gridContainer).concat(getScrollParents(gridContainer)));
    }

    // Bind scroll listeners.
    for (i = 0; i < scrollers.length; i++) {
      scrollers[i].addEventListener('scroll', drag._scrollListener);
    }

    // Save scrollers to drag data.
    drag._data.scrollers = scrollers;

    return drag;

  };

  /**
   * Unbind currently bound drag scroll handlers from all scrollable ancestor
   * elements of the dragged element and the drag container element.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.unbindScrollListeners = function () {

    var drag = this;
    var dragData = drag._data;
    var scrollers = dragData.scrollers;
    var i;

    for (i = 0; i < scrollers.length; i++) {
      scrollers[i].removeEventListener('scroll', drag._scrollListener);
    }

    dragData.scrollers = [];

    return drag;

  };

  /**
   * Check (during drag) if an item is overlapping other items and based on
   * the configuration layout the items.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.checkOverlap = function () {

    var drag = this;
    var item = drag.getItem();
    var result = drag._sortPredicate(item, drag._data.currentEvent);
    var currentGrid;
    var currentIndex;
    var targetGrid;
    var targetIndex;
    var sortAction;
    var isMigration;

    // Let's make sure the result object has a valid index before going further.
    if (!isPlainObject(result) || typeof result.index !== typeNumber) {
      return drag;
    }

    currentGrid = item.getGrid();
    targetGrid = result.grid || currentGrid;
    isMigration = currentGrid !== targetGrid;
    currentIndex = currentGrid._items.indexOf(item);
    targetIndex = normalizeArrayIndex(targetGrid._items, result.index, isMigration);
    sortAction = result.action === 'swap' ? 'swap' : 'move';

    // If the item was moved within it's current grid.
    if (!isMigration) {

      // Make sure the target index is not the current index.
      if (currentIndex !== targetIndex) {

        // Do the sort.
        (sortAction === 'swap' ? arraySwap : arrayMove)(currentGrid._items, currentIndex, targetIndex);

        // Emit move event.
        currentGrid._emit(evMove, {
          item: item,
          fromIndex: currentIndex,
          toIndex: targetIndex,
          action: sortAction
        });

        // Layout the grid.
        currentGrid.layout();

      }

    }

    // If the item was moved to another grid.
    else {

      // Emit beforeSend event.
      currentGrid._emit(evBeforeSend, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Emit beforeReceive event.
      targetGrid._emit(evBeforeReceive, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Update item's grid id reference.
      item._gridId = targetGrid._id;

      // Update drag instances's migrating indicator.
      drag._isMigrating = item._gridId !== drag._gridId;

      // Move item instance from current grid to target grid.
      currentGrid._items.splice(currentIndex, 1);
      insertItemsToArray(targetGrid._items, item, targetIndex);

      // Set sort data as null, which is an indicator for the item comparison
      // function that the sort data of this specific item should be fetched
      // lazily.
      item._sortData = null;

      // Emit send event.
      currentGrid._emit(evSend, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Emit receive event.
      targetGrid._emit(evReceive, {
        item: item,
        fromGrid: currentGrid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });

      // Layout both grids.
      currentGrid.layout();
      targetGrid.layout();

    }

    return drag;

  };

  /**
   * If item is dragged into another grid, finish the migration process
   * gracefully.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.finishMigration = function () {

    var drag = this;
    var item = drag.getItem();
    var release = item._release;
    var element = item._element;
    var targetGrid = item.getGrid();
    var targetGridElement = targetGrid._element;
    var targetSettings = targetGrid._settings;
    var targetContainer = targetSettings.dragContainer || targetGridElement;
    var currentSettings = drag.getGrid()._settings;
    var currentContainer = element.parentNode;
    var translateX;
    var translateY;
    var offsetDiff;

    // Destroy current drag. Note that we need to set the migrating flag to
    // false first, because otherwise we create an infinite loop between this
    // and the drag.stop() method.
    drag._isMigrating = false;
    drag.destroy();

    // Destroy current animation handlers.
    item._animate.destroy();
    item._animateChild.destroy();

    // Remove current classnames.
    removeClass(element, currentSettings.itemClass);
    removeClass(element, currentSettings.itemVisibleClass);
    removeClass(element, currentSettings.itemHiddenClass);

    // Add new classnames.
    addClass(element, targetSettings.itemClass);
    addClass(element, targetSettings.itemVisibleClass);

    // Instantiate new animation controllers.
    item._animate = new Grid.ItemAnimate(item, element);
    item._animateChild = new Grid.ItemAnimate(item, item._child);

    // Move the item inside the target container if it's different than the
    // current container.
    if (targetContainer !== currentContainer) {
      targetContainer.appendChild(element);
      offsetDiff = getOffsetDiff(currentContainer, targetContainer, true);
      translateX = getTranslateAsFloat(element, 'x') - offsetDiff.left;
      translateY = getTranslateAsFloat(element, 'y') - offsetDiff.top;
    }

    // Update item's cached dimensions and sort data.
    item._refreshDimensions()._refreshSortData();

    // Calculate the offset difference between target's drag container (if any)
    // and actual grid container element. We save it later for the release
    // process.
    offsetDiff = getOffsetDiff(targetContainer, targetGridElement, true);
    release.containerDiffX = offsetDiff.left;
    release.containerDiffY = offsetDiff.top;

    // Recreate item's drag handler.
    item._drag = targetSettings.dragEnabled ? new Grid.ItemDrag(item) : null;

    // Adjust the position of the item element if it was moved from a container
    // to another.
    if (targetContainer !== currentContainer) {
      setStyles(element, {transform: getTranslateString(translateX, translateY)});
    }

    // Update child element's styles to reflect the current visibility state.
    item._child.removeAttribute('style');
    targetGrid._itemShowHandler.start(item, true);

    // Start the release.
    release.start();

    return drag;

  };

  /**
   * cancel move/scroll event raf loop action.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.cancelRafLoop = function () {

    var id = this.getItem()._id;

    rafLoop.cancel(rafQueueScroll, id);
    rafLoop.cancel(rafQueueMove, id);

    return this;

  };

  /**
   * Abort dragging and reset drag data.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.stop = function () {

    var drag = this;
    var dragData = drag._data;
    var item = drag.getItem();
    var element = item._element;
    var grid = drag.getGrid();

    if (!dragData.isActive) {
      return drag;
    }

    // If the item is being dropped into another grid, finish it up and return
    // immediately.
    if (drag._isMigrating) {
      return drag.finishMigration(dragData.currentEvent);
    }

    // Cancel raf loop actions.
    drag.cancelRafLoop();

    // Remove scroll listeners.
    drag.unbindScrollListeners();

    // Cancel overlap check.
    drag._checkSortOverlap('cancel');

    // Append item element to the container if it's not it's child. Also make
    // sure the translate values are adjusted to account for the DOM shift.
    if (element.parentNode !== grid._element) {
      grid._element.appendChild(element);
      setStyles(element, {transform: getTranslateString(dragData.gridX, dragData.gridY)});
    }

    // Remove dragging class.
    removeClass(element, grid._settings.itemDraggingClass);

    // Reset drag data.
    drag.reset();

    return drag;

  };

  /**
   * Drag start handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onStart = function (event) {

    var drag = this;
    var item = drag.getItem();

    // If item is not active, don't start the drag.
    if (!item._isActive) {
      return drag;
    }

    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var dragData = drag._data;
    var release = item._release;
    var migrate = item._migrate;
    var gridContainer = grid._element;
    var dragContainer = settings.dragContainer || gridContainer;
    var containingBlock = getContainingBlock(dragContainer, true);
    var offsetDiff = dragContainer !== gridContainer ? getOffsetDiff(containingBlock, gridContainer) : 0;
    var currentLeft = getTranslateAsFloat(element, 'x');
    var currentTop = getTranslateAsFloat(element, 'y');
    var elementRect = element.getBoundingClientRect();

    // Stop current positioning animation.
    if (item.isPositioning()) {
      item._stopLayout(true, {transform: getTranslateString(currentLeft, currentTop)});
    }

    // Stop current migration animation.
    if (migrate.isActive) {
      currentLeft -= migrate.containerDiffX;
      currentTop -= migrate.containerDiffY;
      migrate.stop(true, {transform: getTranslateString(currentLeft, currentTop)});
    }

    // If item is being released reset release data.
    if (item.isReleasing()) {
      release.reset();
    }

    // Setup drag data.
    dragData.isActive = true;
    dragData.startEvent = dragData.currentEvent = event;
    dragData.container = dragContainer;
    dragData.containingBlock = containingBlock;
    dragData.elementClientX = elementRect.left;
    dragData.elementClientY = elementRect.top;
    dragData.left = dragData.gridX = currentLeft;
    dragData.top = dragData.gridY = currentTop;

    // Emit dragInit event.
    grid._emit(evDragInit, item, event);

    // If a specific drag container is set and it is different from the
    // grid's container element we need to cast some extra spells.
    if (dragContainer !== gridContainer) {

      // Store the container offset diffs to drag data.
      dragData.containerDiffX = offsetDiff.left;
      dragData.containerDiffY = offsetDiff.top;

      // If the dragged element is a child of the drag container all we need to
      // do is setup the relative drag position data.
      if (element.parentNode === dragContainer) {
        dragData.gridX = currentLeft - dragData.containerDiffX;
        dragData.gridY = currentTop - dragData.containerDiffY;
      }

      // Otherwise we need to append the element inside the correct container,
      // setup the actual drag position data and adjust the element's translate
      // values to account for the DOM position shift.
      else {
        dragData.left = currentLeft + dragData.containerDiffX;
        dragData.top = currentTop + dragData.containerDiffY;
        dragContainer.appendChild(element);
        setStyles(element, {transform: getTranslateString(dragData.left, dragData.top)});
      }

    }

    // Set drag class and bind scrollers.
    addClass(element, settings.itemDraggingClass);
    drag.bindScrollListeners();

    // Emit dragStart event.
    grid._emit(evDragStart, item, event);

    return drag;

  };

  /**
   * Drag move handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onMove = function (event) {

    var drag = this;
    var item = drag.getItem();

    // If item is not active, reset drag.
    if (!item._isActive) {
      return drag.stop();
    }

    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var dragData = drag._data;
    var axis = settings.dragAxis;
    var xDiff = event.deltaX - dragData.currentEvent.deltaX;
    var yDiff = event.deltaY - dragData.currentEvent.deltaY;

    rafLoop.add(rafQueueMove, item._id, function () {

      // Update current event.
      dragData.currentEvent = event;

      // Update horizontal position data.
      if (axis !== 'y') {
        dragData.left += xDiff;
        dragData.gridX += xDiff;
        dragData.elementClientX += xDiff;
      }

      // Update vertical position data.
      if (axis !== 'x') {
        dragData.top += yDiff;
        dragData.gridY += yDiff;
        dragData.elementClientY += yDiff;
      }

      // Overlap handling.
      settings.dragSort && drag._checkSortOverlap();

    }, function () {

      // Update element's translateX/Y values.
      setStyles(element, {transform: getTranslateString(dragData.left, dragData.top)});

      // Emit dragMove event.
      grid._emit(evDragMove, item, event);

    });

    return drag;

  };

  /**
   * Drag scroll handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onScroll = function (event) {

    var drag = this;
    var item = drag.getItem();
    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var axis = settings.dragAxis;
    var dragData = drag._data;
    var gridContainer = grid._element;
    var elementRect;
    var xDiff;
    var yDiff;
    var offsetDiff;

    rafLoop.add(rafQueueScroll, item._id, function () {

      // Calculate element's rect and x/y diff.
      elementRect = element.getBoundingClientRect();
      xDiff = dragData.elementClientX - elementRect.left;
      yDiff = dragData.elementClientY - elementRect.top;

      // Update container diff.
      if (dragData.container !== gridContainer) {
        offsetDiff = getOffsetDiff(dragData.containingBlock, gridContainer);
        dragData.containerDiffX = offsetDiff.left;
        dragData.containerDiffY = offsetDiff.top;
      }

      // Update horizontal position data.
      if (axis !== 'y') {
        dragData.left += xDiff;
        dragData.gridX = dragData.left - dragData.containerDiffX;
      }

      // Update vertical position data.
      if (axis !== 'x') {
        dragData.top += yDiff;
        dragData.gridY = dragData.top - dragData.containerDiffY;
      }

      // Overlap handling.
      settings.dragSort && drag._checkSortOverlap();

    }, function () {

      // Update element's translateX/Y values.
      setStyles(element, {transform: getTranslateString(dragData.left, dragData.top)});

      // Emit dragScroll event.
      grid._emit(evDragScroll, item, event);

    });

    return drag;

  };

  /**
   * Drag end handler.
   *
   * @public
   * @memberof ItemDrag.prototype
   * @param {Object} event
   * @returns {ItemDrag}
   */
  ItemDrag.prototype.onEnd = function (event) {

    var drag = this;
    var item = drag.getItem();
    var element = item._element;
    var grid = drag.getGrid();
    var settings = grid._settings;
    var dragData = drag._data;
    var release = item._release;

    // If item is not active, reset drag.
    if (!item._isActive) {
      return drag.stop();
    }

    // Cancel raf loop actions.
    drag.cancelRafLoop();

    // Finish currently queued overlap check.
    settings.dragSort && drag._checkSortOverlap('finish');

    // Remove scroll listeners.
    drag.unbindScrollListeners();

    // Setup release data.
    release.containerDiffX = dragData.containerDiffX;
    release.containerDiffY = dragData.containerDiffY;

    // Reset drag data.
    drag.reset();

    // Remove drag classname from element.
    removeClass(element, settings.itemDraggingClass);

    // Emit dragEnd event.
    grid._emit(evDragEnd, item, event);

    // Finish up the migration process or start the release process.
    drag._isMigrating ? drag.finishMigration() : release.start();

    return drag;

  };

  /**
   * Helpers - Generic
   * *****************
   */

  /**
   * Normalize array index. Basically this function makes sure that the provided
   * array index is within the bounds of the provided array and also transforms
   * negative index to the matching positive index.
   *
   * @private
   * @param {Array} array
   * @param {Number} index
   * @param {Boolean} isMigration
   */
  function normalizeArrayIndex(array, index, isMigration) {

    var length = array.length;
    var maxIndex = Math.max(0, isMigration ? length : length - 1);

    return index > maxIndex ? maxIndex :
      index < 0 ? Math.max(maxIndex + index + 1, 0) :
      index;

  }

  /**
   * Swap array items.
   *
   * @private
   * @param {Array} array
   * @param {Number} index
   *   - Index (positive or negative) of the item that will be swapped.
   * @param {Number} withIndex
   *   - Index (positive or negative) of the other item that will be swapped.
   */
  function arraySwap(array, index, withIndex) {

    // Make sure the array has two or more items.
    if (array.length < 2) {
      return;
    }

    // Normalize the indices.
    var indexA = normalizeArrayIndex(array, index);
    var indexB = normalizeArrayIndex(array, withIndex);
    var temp;

    // Swap the items.
    if (indexA !== indexB) {
      temp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = temp;
    }

  }

  /**
   * Move array item to another index.
   *
   * @private
   * @param {Array} array
   * @param {Number} fromIndex
   *   - Index (positive or negative) of the item that will be moved.
   * @param {Number} toIndex
   *   - Index (positive or negative) where the item should be moved to.
   */
  function arrayMove(array, fromIndex, toIndex) {

    // Make sure the array has two or more items.
    if (array.length < 2) {
      return;
    }

    // Normalize the indices.
    var from = normalizeArrayIndex(array, fromIndex);
    var to = normalizeArrayIndex(array, toIndex);

    // Add target item to the new position.
    if (from !== to) {
      array.splice(to, 0, array.splice(from, 1)[0]);
    }

  }

  /**
   * Returns a new duplicate free version of the provided array.
   *
   * @private
   * @param {Array} array
   * @returns {Array}
   */
  function arrayUnique(array) {

    var ret = [];
    var len = array.length;
    var i;

    if (len) {
      ret[0] = array[0];
      for (i = 1; i < len; i++) {
        if (ret.indexOf(array[i]) < 0) {
          ret.push(array[i]);
        }
      }
    }

    return ret;

  }

  /**
   * Check if a value is a plain object.
   *
   * @private
   * @param {*} val
   * @returns {Boolean}
   */
  function isPlainObject(val) {

    return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';

  }

  /**
   * Check if a value is a node list
   *
   * @private
   * @param {*} val
   * @returns {Boolean}
   */
  function isNodeList(val) {

    var type = Object.prototype.toString.call(val);
    return type === '[object HTMLCollection]' || type === '[object NodeList]';

  }

  /**
   * Merge two objects recursively (deep merge). The source object's properties
   * are merged to the target object.
   *
   * @private
   * @param {Object} target
   *   - The target object.
   * @param {Object} source
   *   - The source object.
   * @returns {Object} Returns the target object.
   */
  function mergeObjects(target, source) {

    // Loop through the surce object's props.
    Object.keys(source).forEach(function (propName) {

      var isObject = isPlainObject(source[propName]);

      // If target and source values are both objects, merge the objects and
      // assign the merged value to the target property.
      if (isPlainObject(target[propName]) && isObject) {
        target[propName] = mergeObjects({}, target[propName]);
        target[propName] = mergeObjects(target[propName], source[propName]);
      }

      // Otherwise set the source object's value to target object and make sure
      // that object and array values are cloned and directly assigned.
      else {
        target[propName] = isObject ? mergeObjects({}, source[propName]) :
          Array.isArray(source[propName]) ? source[propName].concat() :
          source[propName];
      }

    });

    return target;

  }

  /**
   * Insert an item or an array of items to array to a specified index. Mutates
   * the array. The index can be negative in which case the items will be added
   * to the end of the array.
   *
   * @private
   * @param {Array} array
   * @param {*} items
   * @param {Number} [index=-1]
   */
  function insertItemsToArray(array, items, index) {

    var targetIndex = typeof index === typeNumber ? index : -1;
    array.splice.apply(array, [targetIndex < 0 ? array.length - targetIndex + 1 : targetIndex, 0].concat(items));

  }

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. The returned function accepts one argument which, when
   * being "finish", calls the debounced function immediately if it is currently
   * waiting to be called, and when being "cancel" cancels the currently queued
   * function call.
   *
   * @private
   * @param {Function} fn
   * @param {Number} wait
   * @returns {Function}
   */
  function debounce(fn, wait) {

    var timeout;
    var actionCancel = 'cancel';
    var actionFinish = 'finish';

    return wait > 0 ? function (action) {

      if (timeout !== undefined) {
        timeout = global.clearTimeout(timeout);
        if (action === actionFinish) {
          fn();
        }
      }

      if (action !== actionCancel && action !== actionFinish) {
        timeout = global.setTimeout(function () {
          timeout = undefined;
          fn();
        }, wait);
      }

    } : function (action) {

      if (action !== actionCancel) {
        fn();
      }

    };

  }

  /**
   * Returns a raf loop queue system that allows pushing callbacks to either
   * the read queue or the write queue.
   *
   * @private
   * @returns {Object}
   */
  function createRafLoop() {

    var nextTick = null;
    var queue = [];
    var map = {};
    var raf = (global.requestAnimationFrame
      || global.webkitRequestAnimationFrame
      || global.mozRequestAnimationFrame
      || global.msRequestAnimationFrame
      || function (cb) {
        return global.setTimeout(cb, 16);
      }
    ).bind(global);

    function add(type, id, readCallback, writeCallback) {

      // First, let's check if an item has been added to the queues with the
      // same id and remove it.
      var currentIndex = queue.indexOf(type + id);
      if (currentIndex > -1) {
        queue.splice(currentIndex, 1);
      }

      // Add all move/scroll event callbacks to the beginning of the queue
      // and other callbacks to the end of the queue.
      type === rafQueueMove || type === rafQueueScroll ? queue.unshift(type + id) : queue.push(type + id);
      map[type + id] = [readCallback, writeCallback];

      // Finally, let's kickstart the next tick if it is not running yet.
      !nextTick && (nextTick = raf(flush));

    }

    function cancel(type, id) {

      // Let's check if an item has been added to the queue with the id and
      // if so -> remove it.
      var currentIndex = queue.indexOf(type + id);
      if (currentIndex > -1) {
        queue.splice(currentIndex, 1);
        map[type + id] = undefined;
      }

    }

    function flush() {

      var maxBatchSize = +Grid._maxRafBatchSize || 100;
      var batch = queue.splice(0, Math.min(maxBatchSize, queue.length));
      var batchMap = {};
      var i;

      // Reset ticker.
      nextTick = null;

      // Create batch map and clear map items.
      for (i = 0; i < batch.length; i++) {
        batchMap[batch[i]] = map[batch[i]];
        map[batch[i]] = undefined;
      }

      // Process read callbacks.
      for (i = 0; i < batch.length; i++) {
        batchMap[batch[i]][0]();
      }

      // Process write callbacks.
      for (i = 0; i < batch.length; i++) {
        batchMap[batch[i]][1]();
      }

      // Restart the ticker if needed.
      if (!nextTick && queue.length) {
        nextTick = raf(flush);
      }

    }

    return {
      add: add,
      cancel: cancel
    };

  }

  /**
   * Helpers - DOM utils
   * *******************
   */

  /**
   * Transforms a camel case style property to kebab case style property.
   *
   * @private
   * @param {String} string
   * @returns {String}
   */
  function getStyleName(string) {

    return string.replace(/([A-Z])/g, '-$1').toLowerCase();

  }

  /**
   * Returns the computed value of an element's style property as a string.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} style
   * @returns {String}
   */
  function getStyle(element, style) {

    return global.getComputedStyle(element, null).getPropertyValue(style === 'transform' ? transform.styleName || style : style);

  }

  /**
   * Returns the computed value of an element's style property transformed into
   * a float value.
   *
   * @private
   * @param {HTMLElement} el
   * @param {String} style
   * @returns {Number}
   */
  function getStyleAsFloat(el, style) {

    return parseFloat(getStyle(el, style)) || 0;

  }

  /**
   * Returns the element's computed translateX/Y value as a float. Assumes that
   * the translate value is defined as pixels.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} axis
   *   - "x" or "y".
   * @returns {Number}
   */
  function getTranslateAsFloat(element, axis) {

    return parseFloat((getStyle(element, 'transform') || '').replace('matrix(', '').split(',')[axis === 'x' ? 4 : 5]) || 0;

  }

  /**
   * Transform translateX and translateY value into CSS transform style
   * property's value.
   *
   * @private
   * @param {Number} translateX
   * @param {Number} translateY
   * @returns {String}
   */
  function getTranslateString(translateX, translateY) {

    return 'translateX(' + translateX + 'px) translateY(' + translateY + 'px)';

  }

  /**
   * Get current values of the provided styles definition object.
   *
   * @private
   * @param {HTMLElement} element
   * @param {Object} styles
   * @return {Object}
   */
  function getCurrentStyles(element, styles) {

    var current = {};
    var keys = Object.keys(styles);
    var i;

    for (i = 0; i < keys.length; i++) {
      current[keys[i]] = getStyle(element, getStyleName(keys[i]));
    }

    return current;

  }

  /**
   * Set inline styles to an element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {Object} styles
   */
  function setStyles(element, styles) {

    var props = Object.keys(styles);
    var i;

    for (i = 0; i < props.length; i++) {
      element.style[props[i] === 'transform' && transform ? transform.propName : props[i]] = styles[props[i]];
    }

  }

  /**
   * Add class to an element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} className
   */
  function addClass(element, className) {

    if (element.classList) {
      element.classList.add(className);
    }
    else if (!elementMatches(element, '.' + className)) {
      element.className += ' ' + className;
    }

  }

  /**
   * Remove class name from an element.
   *
   * @private
   * @param {HTMLElement} element
   * @param {String} className
   */
  function removeClass(element, className) {

    if (element.classList) {
      element.classList.remove(className);
    }
    else if (elementMatches(element, '.' + className)) {
      element.className = (' ' + element.className + ' ').replace(' ' + className + ' ', ' ').trim();
    }

  }

  /**
   * Convert nodeList to array.
   *
   * @private
   * @param {NodeList} nodeList
   * @returns {HTMLElement[]}
   */
  function nodeListToArray(nodeList) {

    return [].slice.call(nodeList);

  }

  /**
   * Checks the supported element.matches() method and returns a function that
   * can be used to call the supported method.
   *
   * @private
   * @returns {Function}
   */
  function getSupportedElementMatches() {

    var p = Element.prototype;
    var fn = p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;

    return function (el, selector) {
      return fn.call(el, selector);
    };

  }

  /**
   * Returns the supported style property's prefix, property name and style name
   * or null if the style property is not supported. This is used for getting
   * the supported transform.
   *
   * @private
   * @param {String} style
   * @returns {?Object}
   */
  function getSupportedStyle(style) {

    var styleCap = style.charAt(0).toUpperCase() + style.slice(1);
    var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
    var prefix;
    var propName;
    var i;

    for (i = 0; i < prefixes.length; i++) {
      prefix = prefixes[i];
      propName = prefix ? prefix + styleCap : style;
      if (docElem.style[propName] !== undefined) {
        prefix = prefix.toLowerCase();
        return {
          prefix: prefix,
          propName: propName,
          styleName: prefix ? '-' + prefix + '-' + style : style
        };
      }
    }

    return null;

  }

  /**
   * Calculate the offset difference two elements.
   *
   * @private
   * @param {HTMLElement} elemA
   * @param {HTMLElement} elemB
   * @param {Boolean} [compareContainingBlocks=false]
   *   - When this is set to true the containing blocks of the provided elements
   *     will be used for calculating the difference. Otherwise the provided
   *     elements will be compared directly.
   * @returns {Object}
   */
  function getOffsetDiff(elemA, elemB, compareContainingBlocks) {

    if (elemA === elemB) {
      return {
        left: 0,
        top: 0
      };
    }

    if (compareContainingBlocks) {
      elemA = getContainingBlock(elemA, true);
      elemB = getContainingBlock(elemB, true);
    }

    var aOffset = getOffset(elemA, true);
    var bOffset = getOffset(elemB, true);

    return {
      left: bOffset.left - aOffset.left,
      top: bOffset.top - aOffset.top
    };

  }

  /**
   * Returns the element's document offset, which in practice means the vertical
   * and horizontal distance between the element's northwest corner and the
   * document's northwest corner.
   *
   * @private
   * @param {(Document|Element|Window)} element
   * @param {Boolean} [excludeElementBorders=false]
   * @returns {Offset}
   */
  function getOffset(element, excludeElementBorders) {

    var rect;
    var ret = {
      left: 0,
      top: 0
    };

    // Document's offsets are always 0.
    if (element === doc) {
      return ret;
    }

    // Add viewport's scroll left/top to the respective offsets.
    ret.left = global.pageXOffset || 0;
    ret.top = global.pageYOffset || 0;

    // Window's offsets are the viewport's scroll left/top values.
    if (element.self === global.self) {
      return ret;
    }

    // Add element's client rects to the offsets.
    rect = element.getBoundingClientRect();
    ret.left += rect.left;
    ret.top += rect.top;

    // Exclude element's borders from the offset if needed.
    if (excludeElementBorders) {
      ret.left += getStyleAsFloat(element, 'border-left-width');
      ret.top += getStyleAsFloat(element, 'border-top-width');
    }

    return ret;

  }

  /**
   * Returns an aabsolute positioned element's containing block, which is
   * considered to be the closest ancestor element that the target element's
   * positioning is relative to. Disclaimer: this only works as intended for
   * abolute positioned elements.
   *
   * @private
   * @param {HTMLElement} element
   * @param {Boolean} [isParent=false]
   *   - When this is set to true the containing block checking is started from
   *     the provided element. Otherwise the checking is started from the
   *     provided element's parent element.
   * @returns {(Document|Element)}
   */
  function getContainingBlock(element, isParent) {

    // As long as the containing block is an element, static and not
    // transformed, try to get the element's parent element and fallback to
    // document. https://github.com/niklasramo/mezr/blob/0.6.1/mezr.js#L339
    var ret = (isParent ? element : element.parentElement) || doc;
    while (ret && ret !== doc && getStyle(ret, 'position') === 'static' && !isTransformed(ret)) {
      ret = ret.parentElement || doc;
    }

    return ret;

  }

  /**
   * Get element's scroll parents.
   *
   * Borrowed from jQuery UI library (and heavily modified):
   * https://github.com/jquery/jquery-ui/blob/63448148a217da7e64c04b21a04982f0d6
   * 4aabaa/ui/scroll-parent.js
   *
   * @private
   * @param {HTMLElement} element
   * @returns {HTMLElement[]}
   */
  function getScrollParents(element) {

    var ret = [];
    var overflowRegex = /(auto|scroll)/;
    var parent = element.parentNode;

    // If transformed elements leak fixed elements.
    if (transformLeaksFixed) {

      // If the element is fixed it can not have any scroll parents.
      if (getStyle(element, 'position') === 'fixed') {
        return ret;
      }

      // Find scroll parents.
      while (parent && parent !== doc && parent !== docElem) {
        if (overflowRegex.test(getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x'))) {
          ret.push(parent);
        }
        parent = getStyle(parent, 'position') === 'fixed' ? null : parent.parentNode;
      }

      // If parent is not fixed element, add window object as the last scroll
      // parent.
      parent !== null && ret.push(global);

    }
    // If fixed elements behave as defined in the W3C specification.
    else {

      // Find scroll parents.
      while (parent && parent !== doc) {

        // If the currently looped element is fixed ignore all parents that are
        // not transformed.
        if (getStyle(element, 'position') === 'fixed' && !isTransformed(parent)) {
          parent = parent.parentNode;
          continue;
        }

        // Add the parent element to return items if it is scrollable.
        if (overflowRegex.test(getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x'))) {
          ret.push(parent);
        }

        // Update element and parent references.
        element = parent;
        parent = parent.parentNode;

      }

      // If the last item is the root element, replace it with the global
      // object (window). The root element scroll is propagated to the window.
      if (ret[ret.length - 1] === docElem) {
        ret[ret.length - 1] = global;
      }

      // Otherwise add global object (window) as the last scroll parent.
      else {
        ret.push(global);
      }

    }

    return ret;

  }

  /**
   * Detects if transformed elements leak fixed elements. According W3C
   * transform rendering spec a transformed element should contain even fixed
   * elements. Meaning that fixed elements are positioned relative to the
   * closest transformed ancestor element instead of window. However, not every
   * browser follows the spec (IE and older Firefox). So we need to test it.
   * https://www.w3.org/TR/css3-2d-transforms/#transform-rendering
   *
   * Borrowed from Mezr (v0.6.1):
   * https://github.com/niklasramo/mezr/blob/0.6.1/mezr.js#L607
   *
   * @private
   * @returns {Boolean}
   *   - Returns true if transformed elements leak fixed elements, false
   *     otherwise.
   */
  function doesTransformLeakFixed() {

    if (!transform) {
      return true;
    }

    var elems = [0, 1].map(function (elem, isInner) {
      elem = doc.createElement('div');
      setStyles(elem, {
        position: isInner ? 'fixed' : 'absolute',
        display: 'block',
        visibility: 'hidden',
        left: isInner ? '0px' : '1px',
        transform: 'none'
      });
      return elem;
    });
    var outer = body.appendChild(elems[0]);
    var inner = outer.appendChild(elems[1]);
    var left = inner.getBoundingClientRect().left;
    setStyles(outer, {transform: 'scale(1)'});
    var isLeaking = left === inner.getBoundingClientRect().left;
    body.removeChild(outer);

    return isLeaking;

  }

  /**
   * Returns true if element is transformed, false if not. In practice the
   * element's display value must be anything else than "none" or "inline" as
   * well as have a valid transform value applied in order to be counted as a
   * transformed element.
   *
   * Borrowed from Mezr (v0.6.1):
   * https://github.com/niklasramo/mezr/blob/0.6.1/mezr.js#L661
   *
   * @private
   * @param {HTMLElement} element
   * @returns {Boolean}
   */
  function isTransformed(element) {

    var transform = getStyle(element, 'transform');
    var display = getStyle(element, 'display');

    return transform !== 'none' && display !== 'inline' && display !== 'none';

  }

  /**
   * Calculate how many percent the intersection area of two rectangles is from
   * the maximum potential intersection area between the rectangles.
   *
   * @private
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Number}
   *   - A number between 0-100.
   */
  function getRectOverlapScore(a, b) {

    // Return 0 immediately if the rectangles do not overlap.
    if (!muuriLayout.doRectsOverlap(a, b)) {
      return 0;
    }

    // Calculate intersection area's width, height, max height and max width.
    var width = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
    var height = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
    var maxWidth = Math.min(a.width, b.width);
    var maxHeight = Math.min(a.height, b.height);

    return (width * height) / (maxWidth * maxHeight) * 100;

  }

  /**
   * Helpers - Item sort utilities
   * *****************************
   */

  /**
   * Helper for the sort method to generate mapped version of the items array
   * than contains reference to the item indices.
   *
   * @private
   * @param {Item[]} items
   * @returns {Object}
   */
  function getItemIndexMap(items) {

    var ret = {};
    var i;

    for (i = 0; i < items.length; i++) {
      ret[items[i]._id] = i;
    }

    return ret;

  }

  /**
   * Helper for the sort method to compare the indices of the items to enforce
   * stable sort.
   *
   * @private
   * @param {Item} itemA
   * @param {Item} itemB
   * @param {Boolean} isDescending
   * @param {Object} indexMap
   * @returns {Number}
   */
  function compareItemIndices(itemA, itemB, isDescending, indexMap) {

    var indexA = indexMap[itemA._id];
    var indexB = indexMap[itemB._id];
    return isDescending ? indexB - indexA : indexA - indexB;

  }

  /**
   * Helper for the sort method to compare the items based on the provided
   * attributes.
   *
   * @private
   * @param {Item} itemA
   * @param {Item} itemB
   * @param {Boolean} isDescending
   * @param {Object} criterias
   * @returns {Number}
   */
  function compareItems(itemA, itemB, isDescending, criterias) {

    var ret = 0;
    var criteriaName;
    var criteriaOrder;
    var valA;
    var valB;
    var i;

    // Loop through the list of sort criterias.
    for (i = 0; i < criterias.length; i++) {

      // Get the criteria name, which should match an item's sort data key.
      criteriaName = criterias[i][0];
      criteriaOrder = criterias[i][1];

      // Get items' cached sort values for the criteria. If the item has no sort
      // data let's update the items sort data (this is a lazy load mechanism).
      valA = (itemA._sortData ? itemA : itemA._refreshSortData())._sortData[criteriaName];
      valB = (itemB._sortData ? itemB : itemB._refreshSortData())._sortData[criteriaName];

      // Sort the items in descending order if defined so explicitly.
      if (criteriaOrder === 'desc' || (!criteriaOrder && isDescending)) {
        ret = valB < valA ? -1 : valB > valA ? 1 : 0;
      }

      // Otherwise sort items in ascending order.
      else {
        ret = valA < valB ? -1 : valA > valB ? 1 : 0;
      }

      // If we have -1 or 1 as the return value, let's return it immediately.
      if (ret !== 0) {
        return ret;
      }

    }

    return ret;

  }

  /**
   * Reorder an array of items based on another array of items.
   *
   * @private
   * @param {Item[]} items
   * @param {Item[]} refItems
   * @returns {Item[]}
   */
  function sortItemsByReference(items, refItems) {

    var newItems = [];
    var currentItems = items.concat();
    var item;
    var currentIndex;
    var i;

    for (i = 0; i < refItems.length; i++) {
      item = refItems[i];
      currentIndex = currentItems.indexOf(item);
      if (currentIndex > -1) {
        newItems.push(item);
        currentItems.splice(currentIndex, 1);
      }
    }

    items.splice.apply(items, [0, items.length].concat(newItems).concat(currentItems));

    return items;

  }

  /**
   * Check if a point (coordinate) is within a rectangle.
   *
   * @private
   * @param {Number} x
   * @param {Number} y
   * @param {Rectangle} rect
   * @return {Boolean}
   */
  function isPointWithinRect(x, y, rect) {

    return rect.width
      && rect.height
      && x >= rect.left
      && x < (rect.left + rect.width)
      && y >= rect.top
      && y < (rect.top + rect.height);

  }

  /**
   * Helpers - Muuri
   * ***************
   */

  /**
   * Show or hide Grid instance's items.
   *
   * @private
   * @param {Grid} inst
   * @param {String} method
   *   - "show" or "hide".
   * @param {(GridMultiItemQuery|GridItemState)} items
   * @param {Object} [options]
   * @param {Boolean} [options.instant=false]
   * @param {(ShowCallback|HideCallback)} [options.onFinish]
   * @param {(Boolean|LayoutCallback|String)} [options.layout=true]
   * @returns {Grid}
   */
  function gridShowHideHandler(inst, method, items, options) {

    var targetItems = inst.getItems(items);
    var opts = options || {};
    var isInstant = opts.instant === true;
    var callback = opts.onFinish;
    var layout = opts.layout ? opts.layout : opts.layout === undefined;
    var counter = targetItems.length;
    var isShow = method === 'show';
    var startEvent = isShow ? evShowStart : evHideStart;
    var endEvent = isShow ? evShowEnd : evHideEnd;
    var needsLayout = false;
    var completedItems = [];
    var hiddenItems = [];
    var item;
    var i;

    // If there are no items call the callback, but don't emit any events.
    if (!counter) {
      if (typeof callback === typeFunction) {
        callback(targetItems);
      }
    }

    // Otherwise if we have some items let's dig in.
    else {

      // Emit showStart/hideStart event.
      inst._emit(startEvent, targetItems.concat());

      // Show/hide items.
      for (i = 0; i < targetItems.length; i++) {

        item = targetItems[i];

        // If inactive item is shown or active item is hidden we need to do
        // layout.
        if ((isShow && !item._isActive) || (!isShow && item._isActive)) {
          needsLayout = true;
        }

        // If inactive item is shown we also need to do some special hackery to
        // make the item not animate it's next positioning (layout).
        if (isShow && !item._isActive) {
          item._skipNextLayoutAnimation = true;
        }

        // If the a hidden item is being shown we need to refresh the item's
        // dimensions.
        isShow && item._isHidden && hiddenItems.push(item);

        // Show/hide the item.
        item['_' + method](isInstant, function (interrupted, item) {

          // If the current item's animation was not interrupted add it to the
          // completedItems array.
          if (!interrupted) {
            completedItems.push(item);
          }

          // If all items have finished their animations call the callback
          // and emit showEnd/hideEnd event.
          if (--counter < 1) {
            if (typeof callback === typeFunction) {
              callback(completedItems.concat());
            }
            inst._emit(endEvent, completedItems.concat());
          }

        });

      }

      // Refresh hidden items.
      hiddenItems.length && inst.refreshItems(hiddenItems);

      // Layout if needed.
      if (needsLayout && layout) {
        inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
      }

    }

    return inst;

  }

  /**
   * Returns an object which contains start and stop methods for item's
   * show/hide process.
   *
   * @param {String} type
   * @param {Object} settings
   * @returns {Object}
   */
  function getItemVisibilityHandler(type, settings) {

    var isShow = type === 'show';
    var duration = parseInt(isShow ? settings.showDuration : settings.hideDuration) || 0;
    var easing = (isShow ? settings.showEasing : settings.hideEasing) || 'ease';
    var styles = isShow ? settings.visibleStyles : settings.hiddenStyles;
    var isEnabled = duration > 0;
    var currentStyles;

    styles = isPlainObject(styles) ? styles : null;

    return {
      start: function (item, instant, onFinish) {
        if (!styles) {
          onFinish && onFinish();
        }
        else {
          rafLoop.cancel(rafQueueVisibility, item._id);
          if (!isEnabled || instant) {
            if (item._animateChild.isAnimating()) {
              item._animateChild.stop(styles);
            }
            else {
              setStyles(item._child, styles);
            }
            onFinish && onFinish();
          }
          else {
            rafLoop.add(rafQueueVisibility, item._id, function () {
              currentStyles = getCurrentStyles(item._child, styles);
            }, function () {
              item._animateChild.start(currentStyles, styles, {
                duration: duration,
                easing: easing,
                onFinish: onFinish
              });
            });
          }
        }
      },
      stop: function (item, targetStyles) {
        rafLoop.cancel(rafQueueVisibility, item._id);
        item._animateChild.stop(targetStyles);
      }
    };

  }

  /**
   * Get target grid for the default drag sort predicate.
   *
   * @private
   * @param {Item} item
   * @param {Grid} rootGrid
   * @param {Rectangle} itemRect
   * @param {Number} threshold
   * @returns {?Grid}
   */
  function getTargetGrid(item, rootGrid, itemRect, threshold) {

    var ret = null;
    var dragSort = rootGrid._settings.dragSort;
    var grids = dragSort === true ? [rootGrid] : dragSort.call(rootGrid, item);
    var bestScore = -1;
    var gridScore;
    var grid;
    var i;

    // Return immediately if there are no grids.
    if (!Array.isArray(grids)) {
      return ret;
    }

    // Loop through the grids and get the best match.
    for (i = 0; i < grids.length; i++) {

      grid = grids[i];

      // Filter out all destroyed grids.
      if (grid._isDestroyed) {
        continue;
      }

      // We need to update the grid's offset since it may have changed during
      // scrolling. This could be left as problem for the userland, but it's
      // much nicer this way. One less hack for the user to worry about =)
      grid._refreshDimensions();

      // Check how much dragged element overlaps the container element.
      gridScore = getRectOverlapScore(itemRect, {
        width: grid._width,
        height: grid._height,
        left: grid._left,
        top: grid._top
      });

      // Check if this grid is the best match so far.
      if (gridScore > threshold && gridScore > bestScore) {
        bestScore = gridScore;
        ret = grid;
      }

    }

    return ret;

  }

  /**
   * Process item's callback queue.
   *
   * @private
   * @param {Function[]} queue
   * @param {Boolean} interrupted
   * @param {Item} instance
   */
  function processQueue(queue, interrupted, instance) {

    var callbacks = queue.splice(0, queue.length);
    var i;

    for (i = 0; i < callbacks.length; i++) {
      callbacks[i](interrupted, instance);
    }

  }

  /**
   * Check if item is in specific state.
   *
   * @private
   * @param {Item} item
   * @param {GridItemState} state
   *  - Accepted values are: "active", "inactive", "visible", "hidden",
   *    "showing", "hiding", "positioning", "dragging", "releasing" and
   *    "migrating".
   * @returns {Boolean}
   */
  function isItemInState(item, state) {

    var methodName;

    if (state === 'inactive') {
      return !item.isActive();
    }

    if (state === 'hidden') {
      return !item.isVisible();
    }

    methodName = 'is' + state.charAt(0).toUpperCase() + state.slice(1);

    return typeof item[methodName] === typeFunction ? item[methodName]() : false;

  }

  /**
   * Prevent default.
   *
   * @private
   * @param {Object} e
   */
  function preventDefault(e) {

    if (e.preventDefault) {
      e.preventDefault();
    }

  }

  /**
   * Merge default settings with user settings. The returned object is a new
   * object with merged values. The merging is a deep merge meaning that all
   * objects and arrays within the provided settings objects will be also merged
   * so that modifying the values of the settings object will have no effect on
   * the returned object.
   *
   * @private
   * @param {Object} defaultSettings
   * @param {Object} [userSettings]
   * @returns {Object} Returns a new object.
   */
  function mergeSettings(defaultSettings, userSettings) {

    // Create a fresh copy of default settings.
    var ret = mergeObjects({}, defaultSettings);

    // Merge user settings to default settings.
    ret = userSettings ? mergeObjects(ret, userSettings) : ret;

    // Handle visible/hidden styles manually so that the whole object is
    // overriden instead of the props.
    ret.visibleStyles = (userSettings || {}).visibleStyles || (defaultSettings || {}).visibleStyles;
    ret.hiddenStyles = (userSettings || {}).hiddenStyles || (defaultSettings || {}).hiddenStyles;

    return ret;

  }

  /**
   * Resolver for default drag start predicate function.
   *
   * @private
   * @param {Item} item
   * @param {Object} event
   * @returns {Boolean}
   */
  function dragStartPredicateResolve(item, event) {

    var predicate = item._drag._startPredicateData;
    var pointer = event.changedPointers[0];
    var pageX = pointer && pointer.pageX || 0;
    var pageY = pointer && pointer.pageY || 0;
    var handleRect;

    // If the moved distance is smaller than the threshold distance or there is
    // some delay left, ignore this predicate cycle.
    if (event.distance < predicate.distance || predicate.delay) {
      return;
    }

    // Get handle rect.
    handleRect = predicate.handleElement.getBoundingClientRect();

    // Reset predicate data.
    dragStartPredicateReset(item);

    // If the cursor is still within the handle let's start the drag.
    return isPointWithinRect(pageX, pageY, {
      width: handleRect.width,
      height: handleRect.height,
      left: handleRect.left + (global.pageXOffset || 0),
      top: handleRect.top + (global.pageYOffset || 0)
    });

  }

  /**
   * Reset for default drag start predicate function.
   *
   * @private
   * @param {Item} item
   */
  function dragStartPredicateReset(item) {

    var predicate = item._drag._startPredicateData;

    if (predicate) {
      if (predicate.delayTimer) {
        predicate.delayTimer = global.clearTimeout(predicate.delayTimer);
      }
      item._drag._startPredicateData = null;
    }

  }

  /**
   * Default layout algorithm
   * ************************
   */

  /*!
    * muuriLayout v0.5.3
    * Copyright (c) 2016 Niklas Rämö <inramo@gmail.com>
    * Released under the MIT license
    */

  /**
   * The default Muuri layout algorithm. Based on MAXRECTS approach as described
   * by Jukka Jylänki in his survey: "A Thousand Ways to Pack the Bin - A
   * Practical Approach to Two-Dimensional Rectangle Bin Packing.".
   *
   * This algorithm is intentionally separated from the rest of the codebase,
   * because it is it's own library with a different copyright than the rest of
   * the software. It's also MIT licensed so no worries there. This is intended
   * to be used as Muuri's default layout algorithm and goes hand in hand with
   * Muuri's core development.
   *
   * @private
   * @param {Item[]} items
   * @param {Number} width
   * @param {Number} height
   * @param {Object} options
   * @param {Boolean} [options.fillGaps=false]
   * @param {Boolean} [options.horizontal=false]
   * @param {Boolean} [options.alignRight=false]
   * @param {Boolean} [options.alignBottom=false]
   * @returns {LayoutData}
   */
  function muuriLayout(items, width, height, options) {

    var fillGaps = !!options.fillGaps;
    var isHorizontal = !!options.horizontal;
    var alignRight = !!options.alignRight;
    var alignBottom = !!options.alignBottom;
    var rounding = !!options.rounding;
    var layout = {
      slots: {},
      width: isHorizontal ? 0 : (rounding ? Math.round(width) : width),
      height: !isHorizontal ? 0 : (rounding ? Math.round(height) : height),
      setWidth: isHorizontal,
      setHeight: !isHorizontal
    };
    var freeSlots = [];
    var slotIds;
    var slotData;
    var slot;
    var item;
    var itemWidth;
    var itemHeight;
    var i;

    // No need to go further if items do not exist.
    if (!items.length) {
      return layout;
    }

    // Find slots for items.
    for (i = 0; i < items.length; i++) {
      item = items[i];
      itemWidth = item._width + item._margin.left + item._margin.right;
      itemHeight = item._height + item._margin.top + item._margin.bottom;
      if (rounding) {
        itemWidth = Math.round(itemWidth);
        itemHeight = Math.round(itemHeight);
      }
      slotData = muuriLayout.getSlot(layout, freeSlots, itemWidth, itemHeight, !isHorizontal, fillGaps);
      slot = slotData[0];
      freeSlots = slotData[1];
      if (isHorizontal) {
        layout.width = Math.max(layout.width, slot.left + slot.width);
      }
      else {
        layout.height = Math.max(layout.height, slot.top + slot.height);
      }
      layout.slots[item._id] = slot;
    }

    // If the alignment is set to right or bottom, we need to adjust the
    // results.
    if (alignRight || alignBottom) {
      slotIds = Object.keys(layout.slots);
      for (i = 0; i < slotIds.length; i++) {
        slot = layout.slots[slotIds[i]];
        if (alignRight) {
          slot.left = layout.width - (slot.left + slot.width);
        }
        if (alignBottom) {
          slot.top = layout.height - (slot.top + slot.height);
        }
      }
    }

    return layout;

  }

  /**
   * Calculate position for the layout item. Returns the left and top position
   * of the item in pixels.
   *
   * @private
   * @memberof muuriLayout
   * @param {Layout} layout
   * @param {Array} slots
   * @param {Number} itemWidth
   * @param {Number} itemHeight
   * @param {Boolean} vertical
   * @param {Boolean} fillGaps
   * @returns {Array}
   */
  muuriLayout.getSlot = function (layout, slots, itemWidth, itemHeight, vertical, fillGaps) {

    var leeway = 0.001;
    var newSlots = [];
    var item = {
      left: null,
      top: null,
      width: itemWidth,
      height: itemHeight
    };
    var slot;
    var potentialSlots;
    var ignoreCurrentSlots;
    var i;
    var ii;

    // Try to find a slot for the item.
    for (i = 0; i < slots.length; i++) {
      slot = slots[i];
      if (item.width <= (slot.width + leeway) && item.height <= (slot.height + leeway)) {
        item.left = slot.left;
        item.top = slot.top;
        break;
      }
    }

    // If no slot was found for the item.
    if (item.left === null) {

      // Position the item in to the bottom left (vertical mode) or top right
      // (horizontal mode) of the grid.
      item.left = vertical ? 0 : layout.width;
      item.top = vertical ? layout.height : 0;

      // If gaps don't needs filling do not add any current slots to the new
      // slots array.
      if (!fillGaps) {
        ignoreCurrentSlots = true;
      }

    }

    // In vertical mode, if the item's bottom overlaps the grid's bottom.
    if (vertical && (item.top + item.height) > layout.height) {

      // If item is not aligned to the left edge, create a new slot.
      if (item.left > 0) {
        newSlots.push({
          left: 0,
          top: layout.height,
          width: item.left,
          height: Infinity
        });
      }

      // If item is not aligned to the right edge, create a new slot.
      if ((item.left + item.width) < layout.width) {
        newSlots.push({
          left: item.left + item.width,
          top: layout.height,
          width: layout.width - item.left - item.width,
          height: Infinity
        });
      }

      // Update grid height.
      layout.height = item.top + item.height;

    }

    // In horizontal mode, if the item's right overlaps the grid's right edge.
    if (!vertical && (item.left + item.width) > layout.width) {

      // If item is not aligned to the top, create a new slot.
      if (item.top > 0) {
        newSlots.push({
          left: layout.width,
          top: 0,
          width: Infinity,
          height: item.top
        });
      }

      // If item is not aligned to the bottom, create a new slot.
      if ((item.top + item.height) < layout.height) {
        newSlots.push({
          left: layout.width,
          top: item.top + item.height,
          width: Infinity,
          height: layout.height - item.top - item.height
        });
      }

      // Update grid width.
      layout.width = item.left + item.width;

    }

    // Clean up the current slots making sure there are no old slots that
    // overlap with the item. If an old slot overlaps with the item, split it
    // into smaller slots if necessary.
    for (i = fillGaps ? 0 : ignoreCurrentSlots ? slots.length : i; i < slots.length; i++) {
      potentialSlots = muuriLayout.splitRect(slots[i], item);
      for (ii = 0; ii < potentialSlots.length; ii++) {
        slot = potentialSlots[ii];
        // Let's make sure here that we have a big enough slot
        // (width/height > 0.49px) and also let's make sure that the slot is
        // within the boundaries of the grid.
        if (slot.width > 0.49 && slot.height > 0.49 && ((vertical && slot.top < layout.height) || (!vertical && slot.left < layout.width))) {
          newSlots.push(slot);
        }
      }
    }

    // Sanitize new slots.
    if (newSlots.length) {
      newSlots = muuriLayout.purgeRects(newSlots).sort(vertical ? muuriLayout.sortRectsTopLeft : muuriLayout.sortRectsLeftTop);
    }

    // Return the item and updated slots data.
    return [item, newSlots];

  };

  /**
   * Punch a hole into a rectangle and split the remaining area into smaller
   * rectangles (4 at max).
   *
   * @private
   * @param {Rectangle} rect
   * @param {Rectangle} hole
   * returns {Rectangle[]}
   */
  muuriLayout.splitRect = function (rect, hole) {

    var ret = [];

    // If the rect does not overlap with the hole add rect to the return data as
    // is.
    if (!muuriLayout.doRectsOverlap(rect, hole)) {
      return [{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      }];
    }

    // Left split.
    if (rect.left < hole.left) {
      ret.push({
        left: rect.left,
        top: rect.top,
        width: hole.left - rect.left,
        height: rect.height
      });
    }

    // Right split.
    if ((rect.left + rect.width) > (hole.left + hole.width)) {
      ret.push({
        left: hole.left + hole.width,
        top: rect.top,
        width: (rect.left + rect.width) - (hole.left + hole.width),
        height: rect.height
      });
    }

    // Top split.
    if (rect.top < hole.top) {
      ret.push({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: hole.top - rect.top
      });
    }

    // Bottom split.
    if ((rect.top + rect.height) > (hole.top + hole.height)) {
      ret.push({
        left: rect.left,
        top: hole.top + hole.height,
        width: rect.width,
        height: (rect.top + rect.height) - (hole.top + hole.height)
      });
    }

    return ret;

  };

  /**
   * Check if two rectangles overlap.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Boolean}
   */
  muuriLayout.doRectsOverlap = function (a, b) {

    return !((a.left + a.width) <= b.left || (b.left + b.width) <= a.left || (a.top + a.height) <= b.top || (b.top + b.height) <= a.top);

  };

  /**
   * Check if a rectangle is fully within another rectangle.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Boolean}
   */
  muuriLayout.isRectWithinRect = function (a, b) {

    return a.left >= b.left && a.top >= b.top && (a.left + a.width) <= (b.left + b.width) && (a.top + a.height) <= (b.top + b.height);

  };

  /**
   * Loops through an array of rectangles and removes all that are fully within
   * another rectangle in the array.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle[]} rects
   * @returns {Rectangle[]}
   */
  muuriLayout.purgeRects = function (rects) {

    var i = rects.length;
    var ii;
    var rectA;
    var rectB;

    while (i--) {
      rectA = rects[i];
      ii = rects.length;
      while (ii--) {
        rectB = rects[ii];
        if (i !== ii && muuriLayout.isRectWithinRect(rectA, rectB)) {
          rects.splice(i, 1);
          break;
        }
      }
    }

    return rects;

  };

  /**
   * Sort rectangles with top-left gravity.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Number}
   */
  muuriLayout.sortRectsTopLeft = function (a, b) {

    return a.top - b.top || a.left - b.left;

  };

  /**
   * Sort rectangles with left-top gravity.
   *
   * @private
   * @memberof muuriLayout
   * @param {Rectangle} a
   * @param {Rectangle} b
   * @returns {Number}
   */
  muuriLayout.sortRectsLeftTop = function (a, b) {

    return a.left - b.left || a.top - b.top;

  };

  /**
   * Type definitions
   * ****************
   */

  /* eslint-disable */
  /**
   * The values by which multiple grid items can be queried. An html element or
   * an array of HTML elements. Item or an array of items. Node list, live or
   * static. Number (index) or a list of numbers (indices).
   *
   * @typedef {(HTMLElement|HTMLElement[]|Item|Item[]|NodeList|Number|Number[])} GridMultiItemQuery
   */
  /* eslint-enable */

  /**
   * The values by which a single grid item can be queried. An html element, an
   * item instance or a number (index).
   *
   * @typedef {(HTMLElement|Item|Number)} GridSingleItemQuery
   */

  /**
   * The grid item's state, a string. Accepted values are: "active", "inactive",
   * "visible", "hidden", "showing", "hiding", "positioning", "dragging",
   * "releasing" and "migrating".
   *
   * @typedef {String} GridItemState
   */

  /**
   * The data that is required to orchestrate a sort action during drag.
   *
   * @typedef {Object} DragSortCommand
   * @param {String} action
   *   - "move" or "swap".
   * @param {Number} index
   *   - target index.
   * @param {?Grid} [grid=null]
   *   - target grid.
   */

  /**
   * A rectangle is an object with width, height and offset (left and top) data.
   *
   * @typedef {Object} Rectangle
   * @property {Number} width
   * @property {Number} height
   * @property {Number} left
   * @property {Number} top
   */

  /**
   * Layout data for the layout instance.
   *
   * @typedef {Object} LayoutData
   * @property {Object} slots
   * @property {Number} width
   * @property {Number} height
   * @property {Boolean} setWidth
   * @property {Boolean} setHeight
   */

  /**
   * @callback LayoutCallback
   * @param {Boolean} isAborted
   *   - Was the layout procedure aborted?
   * @param {Item[]} items
   *   - The items that were attempted to be positioned.
   */

  /**
   * @callback ShowCallback
   * @param {Item[]} items
   *   - The items that were successfully shown without interruptions.
   */

  /**
   * @callback HideCallback
   * @param {Item[]} items
   *   - The items that were successfully hidden without interruptions.
   */

  /**
   * @callback FilterCallback
   * @param {Item[]} shownItems
   *   - The items that were shown.
   * @param {Item[]} hiddenItems
   *   - The items that were hidden.
   */

  /**
   * Init
   */

  return Grid;

}));


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div id=\"muurigrid\" class=\"grid\">\r\n\r\n        <div class=\"item\">\r\n            <div class=\"item-content\">\r\n                <!-- Safe zone, enter your custom markup -->\r\n                This can be anything.\r\n                <!-- Safe zone ends -->\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"item\">\r\n            <div class=\"item-content\">\r\n                <!-- Safe zone, enter your custom markup -->\r\n                <div class=\"my-custom-content\">\r\n                    Yippee!\r\n                </div>\r\n                <!-- Safe zone ends -->\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"item\">\r\n                <div class=\"item-content\">\r\n                    <!-- Safe zone, enter your custom markup -->\r\n                    <div class=\"my-custom-content\">\r\n                        Yippee!\r\n                    </div>\r\n                    <!-- Safe zone ends -->\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"item\">\r\n                    <div class=\"item-content\">\r\n                        <!-- Safe zone, enter your custom markup -->\r\n                        <div class=\"my-custom-content\">\r\n                            Yippee!\r\n                        </div>\r\n                        <!-- Safe zone ends -->\r\n                    </div>\r\n                </div>\r\n\r\n    </div>\r\n    <!-- <div class=\"gridstack-background-widget\" v-for=\"widget in backgroundWidgets\" :key=\"widget.id\">\r\n        <cswidget :id=\"widget.id\" v-if=\"widget\" :widget=\"widget\"></cswidget>\r\n    </div>\r\n\r\n    <div class=\"grid-stack\" id=\"gridstack\" data-gs-animate=\"false\" data-gs-width=\"10\">\r\n        <div class=\"grid-stack-item\" v-for=\"widget in widgets\" :key=\"'stack-' + widget.id\" :id=\"widget.id\" :data-gs-id=\"widget.id\" :data-gs-x=\"widget.options.x\"\r\n            :data-gs-y=\"widget.options.y\" :data-gs-width=\"widget.options.width\" :data-gs-auto-position=\"gridoptions.autoposition\"\r\n            :data-gs-height=\"widget.options.height\">\r\n            <div class=\"grid-stack-item-content\">\r\n              \r\n                <cswidget v-if=\"widget\" :widget=\"widget\"></cswidget>\r\n            </div>\r\n        </div>\r\n    </div> -->\r\n</div>"

/***/ })
/******/ ]);
});
//# sourceMappingURL=csmuuri.cs.js.map