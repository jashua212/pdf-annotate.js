/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _adapter_StoreAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _adapter_LocalStoreAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);

// this appears to be the end aggregator import and export module for the PDFJSAnnotate library itself
// this module, in turn, will get imported by 'docs/main.js' which then gets compiled by webpack into 'docs/index.js'







// Exporting a POJO
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	/**
	 * Abstract class that needs to be defined so PDFJSAnnotate
	 * knows how to communicate with your server.
	 */
	StoreAdapter: _adapter_StoreAdapter__WEBPACK_IMPORTED_MODULE_0__["default"],

	/**
	 * Implementation of StoreAdapter that stores annotation data to localStorage.
	 */
	LocalStoreAdapter: _adapter_LocalStoreAdapter__WEBPACK_IMPORTED_MODULE_1__["default"],

	/**
	 * Abstract instance of StoreAdapter
	 */
	__storeAdapter: new _adapter_StoreAdapter__WEBPACK_IMPORTED_MODULE_0__["default"](),

	/**
	 * Getter for the underlying StoreAdapter property
	 *
	 * @return {StoreAdapter}
	 */
	getStoreAdapter() {
		return this.__storeAdapter;
	},

	/**
	 * Setter for the underlying StoreAdapter property
	 *
	 * @param {StoreAdapter} adapter The StoreAdapter implementation to be used.
	 */
	setStoreAdapter(adapter) {
		// TODO this throws an error when bundled
		// if (!(adapter instanceof StoreAdapter)) {
		//   throw new Error('adapter must be an instance of StoreAdapter');
		// }

		this.__storeAdapter = adapter;
	},

	/**
	 * UI is a helper for instrumenting UI interactions for creating,
	 * editing, and deleting annotations in the browser.
	 */
	UI: _UI__WEBPACK_IMPORTED_MODULE_3__["default"],

	/**
	 * Render the annotations for a page in the PDF Document
	 *
	 * @param {SVGElement} svg The SVG element that annotations should be rendered to
	 * @param {PageViewport} viewport The PDFPage.getViewport data
	 * @param {Object} data The StoreAdapter.getAnnotations data
	 * @return {Promise}
	 */
	render: _render__WEBPACK_IMPORTED_MODULE_2__["default"],

	/**
	 * Convenience method for getting annotation data
	 *
	 * @alias StoreAdapter.getAnnotations
	 * @param {String} documentId The ID of the document
	 * @param {String} pageNumber The page number
	 * @return {Promise}
	 */
	getAnnotations(documentId, pageNumber) {
		return this.getStoreAdapter().getAnnotations(...arguments);
	}
});


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoreAdapter)
/* harmony export */ });
/* harmony import */ var _utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _UI_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



// Adapter should never be invoked publicly
class StoreAdapter {
	/**
	 * Create a new StoreAdapter instance
	 *
	 * @param {Object} [definition] The definition to use for overriding abstract methods
	 */
	constructor(definition = {}) {
		// Copy each function from definition if it is a function we know about
		Object.keys(definition).forEach((key) => {
			if (typeof definition[key] === 'function' &&
				typeof this[key] === 'function') {
				this[key] = definition[key];
			}
		});
	}

	/**
	 * Get all the annotations for a given document and page number.
	 *
	 * @param {String} documentId The ID for the document the annotations belong to
	 * @param {Number} pageNumber The number of the page the annotations belong to
	 * @return {Promise}
	 */
	__getAnnotations(documentId, pageNumber) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('getAnnotations');
	}
	get getAnnotations() {
		return this.__getAnnotations;
	}
	set getAnnotations(fn) {
		this.__getAnnotations = function getAnnotations(documentId, pageNumber) {
			return fn(...arguments).then((annotations) => {
				// TODO may be best to have this happen on the server
				if (annotations.annotations) {
					annotations.annotations.forEach((a) => {
						a.documentId = documentId;
					});
				}
				return annotations;
			});
		};
	}

	/**
	 * Get the definition for a specific annotation.
	 *
	 * @param {String} documentId The ID for the document the annotation belongs to
	 * @param {String} annotationId The ID for the annotation
	 * @return {Promise}
	 */
	getAnnotation(documentId, annotationId) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('getAnnotation');
	}

	/**
	 * Add an annotation
	 *
	 * @param {String} documentId The ID for the document to add the annotation to
	 * @param {String} pageNumber The page number to add the annotation to
	 * @param {Object} annotation The definition for the new annotation
	 * @return {Promise}
	 */
	__addAnnotation(documentId, pageNumber, annotation) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('addAnnotation');
	}
	get addAnnotation() {
		return this.__addAnnotation;
	}
	set addAnnotation(fn) {
		this.__addAnnotation = function addAnnotation(documentId, pageNumber, annotation) {
			return fn(...arguments).then((annotation) => {
				(0,_UI_event__WEBPACK_IMPORTED_MODULE_1__.fireEvent)('annotation:add', documentId, pageNumber, annotation);
				return annotation;
			});
		};
	}

	/**
	 * Edit an annotation
	 *
	 * @param {String} documentId The ID for the document
	 * @param {String} pageNumber the page number of the annotation
	 * @param {Object} annotation The definition of the modified annotation
	 * @return {Promise}
	 */
	__editAnnotation(documentId, pageNumber, annotation) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('editAnnotation');
	}
	get editAnnotation() {
		return this.__editAnnotation;
	}
	set editAnnotation(fn) {
		this.__editAnnotation = function editAnnotation(documentId, annotationId, annotation) {
			return fn(...arguments).then((annotation) => {
				(0,_UI_event__WEBPACK_IMPORTED_MODULE_1__.fireEvent)('annotation:edit', documentId, annotationId, annotation);
				return annotation;
			});
		};
	}

	/**
	 * Delete an annotation
	 *
	 * @param {String} documentId The ID for the document
	 * @param {String} annotationId The ID for the annotation
	 * @return {Promise}
	 */
	__deleteAnnotation(documentId, annotationId) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('deleteAnnotation');
	}
	get deleteAnnotation() {
		return this.__deleteAnnotation;
	}
	set deleteAnnotation(fn) {
		this.__deleteAnnotation = function deleteAnnotation(documentId, annotationId) {
			return fn(...arguments).then((success) => {
				if (success) {
					(0,_UI_event__WEBPACK_IMPORTED_MODULE_1__.fireEvent)('annotation:delete', documentId, annotationId);
				}
				return success;
			});
		};
	}

	/**
	 * Get all the comments for an annotation
	 *
	 * @param {String} documentId The ID for the document
	 * @param {String} annotationId The ID for the annotation
	 * @return {Promise}
	 */
	getComments(documentId, annotationId) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('getComments');
	}

	/**
	 * Add a new comment
	 *
	 * @param {String} documentId The ID for the document
	 * @param {String} annotationId The ID for the annotation
	 * @param {Object} content The definition of the comment
	 * @return {Promise}
	 */
	__addComment(documentId, annotationId, content) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('addComment');
	}
	get addComment() {
		return this.__addComment;
	}
	set addComment(fn) {
		this.__addComment = function addComment(documentId, annotationId, content) {
			return fn(...arguments).then((comment) => {
				(0,_UI_event__WEBPACK_IMPORTED_MODULE_1__.fireEvent)('comment:add', documentId, annotationId, comment);
				return comment;
			});
		};
	}

	/**
	 * Delete a comment
	 *
	 * @param {String} documentId The ID for the document
	 * @param {String} commentId The ID for the comment
	 * @return {Promise}
	 */
	__deleteComment(documentId, commentId) {
		(0,_utils_abstractFunction__WEBPACK_IMPORTED_MODULE_0__["default"])('deleteComment');
	}
	get deleteComment() {
		return this.__deleteComment;
	}
	set deleteComment(fn) {
		this.__deleteComment = function deleteComment(documentId, commentId) {
			return fn(...arguments).then((success) => {
				if (success) {
					(0,_UI_event__WEBPACK_IMPORTED_MODULE_1__.fireEvent)('comment:delete', documentId, commentId);
				}
				return success;
			});
		};
	}
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ abstractFunction)
/* harmony export */ });
/**
 * Throw an Error for an abstract function that hasn't been implemented.
 *
 * @param {String} name The name of the abstract function
 */
function abstractFunction(name) {
    throw new Error(name + ' is not implemented');
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fireEvent": () => (/* binding */ fireEvent),
/* harmony export */   "addEventListener": () => (/* binding */ addEventListener),
/* harmony export */   "removeEventListener": () => (/* binding */ removeEventListener)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);




const emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default());

let clickNode;

/**
 * Handle document.click event
 *
 * @param {Event} e The DOM event to be handled
 */
document.addEventListener('click', function handleDocumentClick(e) {
	// Find the applicable svg child element (if any) -- i.e., NOT the parent svg container, but rather the actual svg child element for this annotation
	console.log('e: ', e);
	console.log('   client X, Y: ', e.clientX, e.clientY);
	console.log('   page X, Y: ', e.pageX, e.pageY);
	let target = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.findAnnotationAtPoint)(e.clientX, e.clientY);

	// Emit annotation:blur if clickNode is no longer clicked
	if (clickNode && clickNode !== target) {
		// the listener is attached in 'edit.js'
		emitter.emit('annotation:blur', clickNode);
	}

	// Emit annotation:click if target was clicked
	if (target) {
		// the listener is attached in 'edit.js'
		emitter.emit('annotation:click', target);
	}

	clickNode = target;
});

// let pointerOverNode;
/* document.addEventListener('pointermove', function handleDocumentPointermove(e) {
	let target = findAnnotationAtPoint(e.clientX, e.clientY);

	// Emit annotation:pointerout if target was pointerout'd
	if (pointerOverNode && !target) {
		emitter.emit('annotation:pointerout', pointerOverNode);
	}

	// Emit annotation:pointerover if target was pointerover'd
	if (target && pointerOverNode !== target) {
		emitter.emit('annotation:pointerover', target);
	}

	pointerOverNode = target;
}); */

function fireEvent() {
	emitter.emit(...arguments);
};
function addEventListener() {
	emitter.on(...arguments);
};
function removeEventListener() {
	emitter.removeListener(...arguments);
};


/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BORDER_COLOR": () => (/* binding */ BORDER_COLOR),
/* harmony export */   "findSVGContainer": () => (/* binding */ findSVGContainer),
/* harmony export */   "findSVGAtPoint": () => (/* binding */ findSVGAtPoint),
/* harmony export */   "findAnnotationAtPoint": () => (/* binding */ findAnnotationAtPoint),
/* harmony export */   "pointIntersectsRect": () => (/* binding */ pointIntersectsRect),
/* harmony export */   "getScrolledOffsetAnnotationRect": () => (/* binding */ getScrolledOffsetAnnotationRect),
/* harmony export */   "getOffsetAnnotationRect": () => (/* binding */ getOffsetAnnotationRect),
/* harmony export */   "getAnnotationRect": () => (/* binding */ getAnnotationRect),
/* harmony export */   "scaleUp": () => (/* binding */ scaleUp),
/* harmony export */   "scaleDown": () => (/* binding */ scaleDown),
/* harmony export */   "getScroll": () => (/* binding */ getScroll),
/* harmony export */   "getOffset": () => (/* binding */ getOffset),
/* harmony export */   "disableUserSelect": () => (/* binding */ disableUserSelect),
/* harmony export */   "enableUserSelect": () => (/* binding */ enableUserSelect),
/* harmony export */   "getMetadata": () => (/* binding */ getMetadata)
/* harmony export */ });
/* harmony import */ var create_stylesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var create_stylesheet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(create_stylesheet__WEBPACK_IMPORTED_MODULE_0__);


const BORDER_COLOR = '#00BFFF';

const userSelectStyleSheet = create_stylesheet__WEBPACK_IMPORTED_MODULE_0___default()({
	body: {
		'-webkit-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		'user-select': 'none'
	}
});
userSelectStyleSheet.setAttribute('data-pdf-annotate-user-select', 'true');

/**
 * Find the SVGElement that contains all the annotations for a page
 *
 * @param {Element} node An annotation within that container
 * @return {SVGElement} The container SVG or null if it can't be found
 */
function findSVGContainer(node) {
	let parentNode = node;
	while ((parentNode = parentNode.parentNode) &&
		parentNode !== document) {
		if (parentNode.nodeName.toUpperCase() === 'SVG' &&
			parentNode.getAttribute('data-pdf-annotate-container') === 'true') {
			return parentNode;
		}
	}

	return null;
}

/**
 * Find an SVGElement container at a given point
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @return {SVGElement} The container SVG or null if one can't be found
 */
function findSVGAtPoint(x, y) {
	let elements = document.querySelectorAll('svg[data-pdf-annotate-container="true"]');

	for (let i = 0, l = elements.length; i < l; i++) {
		let el = elements[i];
		let rect = el.getBoundingClientRect();

		if (pointIntersectsRect(x, y, rect)) {
			return el;
		}
	}

	return null;
}

/**
 * Find an Element that represents an annotation at a given point
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @return {Element} The annotation element or null if one can't be found
 */
function findAnnotationAtPoint(x, y) {
	// First, find the parent svg container
	let svg = findSVGAtPoint(x, y);
	if (!svg) {
		return; // bail
	}

	// TEST method
	/* const elm = document.elementFromPoint(x, y);
	console.log('test elm: ', elm);

	if (elm) {
		return elm;
	}

	return null; */

	// Second, get a list of all the child svgs within that parent svg container
	let elements = Array.from(svg.querySelectorAll('[data-pdf-annotate-type]'));

	// Third, loop thru these child svgs to find the 1st one whose extrapolated 4-sided rect contains (i.e., 'intersects') the clicked point (x, y)
	for (let i = 0, l = elements.length; i < l; i++) {
		let el = elements[i];

		// this is the key function call -- to get the bounding client rect for each child svg element in the parent svg container -- see below
		let rect = getOffsetAnnotationRect(el, svg); //*****************

		if (pointIntersectsRect(x, y, rect)) {
			return el;
		}
	}

	return null;
}

/**
 * Determine if a point intersects a rect
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @param {Object} rect The points of a rect (likely from getBoundingClientRect)
 * @return {Boolean} True if a collision occurs, otherwise false
 */
function pointIntersectsRect(x, y, rect) {
	return y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right;
}


// MINE
function getScrolledOffsetAnnotationRect(el) {
	let rect = getAnnotationRect(el);

	let {
		offsetLeft,
		offsetTop
	} = getOffset(el);

	let {
		scrollTop,
		scrollLeft
	} = getScroll(el);

	console.log('OFFSET_left: ', offsetLeft);
	console.log('SCROLL_left: ', scrollLeft);
	console.log('window.pageXOffset: ', window.pageXOffset);
	console.log('___OFFSET_top: ', offsetTop);
	console.log('___SCROLL_top: ', scrollTop);
	console.log('___window.pageYOffset: ', window.pageYOffset);


	return {
		/* top: rect.top + offsetTop - scrollTop,
		left: rect.left + offsetLeft - scrollLeft,
		right: rect.right + offsetLeft - scrollLeft,
		bottom: rect.bottom + offsetTop - scrollTop */

		top: rect.top + offsetTop - scrollTop,
		left: rect.left + offsetLeft - scrollLeft,
		right: rect.right + offsetLeft - scrollLeft,
		bottom: rect.bottom + offsetTop - scrollTop
	};
}



/**
 * Get the rect of an annotation element accounting for parent svg's offset.
 *
 * @param {Element} el The element to get the rect of
 * @return {Object} The dimensions of the element
 */
function getOffsetAnnotationRect(el, svg) {
	let rect = getAnnotationRect(el, svg);

	let {
		offsetLeft,
		offsetTop
	} = getOffset(el);

	const h = rect.height;
	const w = rect.width;
	const x = rect.left + offsetLeft;
	const y = rect.top + offsetTop;

	console.log('offset x1_x2: ', x, x+w);
	console.log('offset y1_y2: ', y, y+h);

	return {
		left: x,
		width: w,
		right: x + w,
		top: y,
		height: h,
		bottom: y + h
	};
}

/**
 * Get the rect of an annotation element.
 *
 * @param {Element} el The element to get the rect of
 * @param {Element} svg The element's parent svg container
 * @return {Object} The dimensions of the element
 */
function getAnnotationRect(el, svg) {
	let h = 0,
		w = 0,
		x = 0,
		y = 0;

	let rect = el.getBoundingClientRect();
	let elNodeName = el.nodeName.toLowerCase();

	// TODO these should be calculated somehow
	// These 2 constants come into play when dealing with a zero height or zero width svg line element
	const LINE_HEIGHT_ADJUSTED = 16;
	const LINE_WIDTH_ADJUSTED = 8;

	switch (elNodeName) {
	case 'path': // applicable to freehand pen draws
		let minX,
			maxX,
			minY,
			maxY;

		el.getAttribute('d').replace(/Z/, '').split('M').splice(1).forEach((p) => {
			var s = p.split(' ').map(i => parseInt(i, 10));

			if (typeof minX === 'undefined' || s[0] < minX) {
				minX = s[0];
			}
			if (typeof maxX === 'undefined' || s[2] > maxX) {
				maxX = s[2];
			}
			if (typeof minY === 'undefined' || s[1] < minY) {
				minY = s[1];
			}
			if (typeof maxY === 'undefined' || s[3] > maxY) {
				maxY = s[3];
			}
		});

		h = maxY - minY;
		w = maxX - minX;
		x = minX;
		y = minY;
		break;

	// I revamped this block so that it also covers all possible straight lines, NOT just the ones that are horizontal
	case 'line': // applicable to straight lines
		const _x1 = parseInt(el.getAttribute('x1'), 10);
		const _y1 = parseInt(el.getAttribute('y1'), 10);
		const _x2 = parseInt(el.getAttribute('x2'), 10);
		const _y2 = parseInt(el.getAttribute('y2'), 10);

		y = Math.min(_y1, _y2);
		x = Math.min(_x1, _x2);
		h = Math.abs(_y1 - _y2);
		w = Math.abs(_x1 - _x2);
		/* console.log('x y w h: ', x, y, w, h); */

		if (h === 0) {
			h += LINE_HEIGHT_ADJUSTED;
			y -= (LINE_HEIGHT_ADJUSTED / 2);
		}
		if (w === 0) {
			w += LINE_WIDTH_ADJUSTED;
			x -= (LINE_WIDTH_ADJUSTED / 2);
		}
		break;

	case 'text':
		h = rect.height;
		w = rect.width;
		x = parseInt(el.getAttribute('x'), 10);
		y = parseInt(el.getAttribute('y'), 10) - h;
		break;

	case 'g':
		let {
			offsetLeft,
			offsetTop
		} = getOffset(el);

		h = rect.height;
		w = rect.width;
		x = rect.left - offsetLeft;
		y = rect.top - offsetTop;

		if (el.getAttribute('data-pdf-annotate-type') === 'strikeout') {
			h += LINE_HEIGHT_ADJUSTED;
			y -= (LINE_HEIGHT_ADJUSTED / 2);
		}
		break;

	case 'rect': // applicable to red and blue rectangles
	case 'svg':
		h = parseInt(el.getAttribute('height'), 10);
		w = parseInt(el.getAttribute('width'), 10);
		x = parseInt(el.getAttribute('x'), 10);
		y = parseInt(el.getAttribute('y'), 10);
		break;
	}

	// Result provides same properties as getBoundingClientRect
	let result = {
		left: x,
		width: w,
		right: x + w,
		top: y,
		height: h,
		bottom: y + h
	};

	// For the case of nested SVG (point annotations) and grouped
	// lines or rects no adjustment needs to be made for scale.
	// I assume that the scale is already being handled
	// natively by virtue of the `transform` attribute.
	/* console.log('svg: ', svg);
	console.log('elNodeName: ', elNodeName); */
	if (!/^(svg|g)$/.test(elNodeName)) {
		result = scaleUp(svg, result);
	}

	console.log('pureScaledUp x1_x2: ', result.left, result.right);
	console.log('pureScaledUp y1_y2: ', result.top, result.bottom);

	return result;
}

/**
 * Adjust scale from normalized scale (100%) to rendered scale.
 *
 * @param {SVGElement} svg The SVG to gather metadata from
 * @param {Object} rect A map of numeric values to scale
 * @return {Object} A copy of `rect` with values scaled up
 */
function scaleUp(svg, rect) {
	let result = {};
	let { viewport } = getMetadata(svg);
	/* console.log('svg: ', svg);
	console.log('typeof viewport.scale: ', typeof viewport.scale); */

	Object.keys(rect).forEach((key) => {
		result[key] = rect[key] * viewport.scale;
	});

	return result;
}

/**
 * Adjust scale from rendered scale to a normalized scale (100%).
 *
 * @param {SVGElement} svg The SVG to gather metadata from
 * @param {Object} rect A map of numeric values to scale
 * @return {Object} A copy of `rect` with values scaled down
 */
function scaleDown(svg, rect) {
	let result = {};
	let { viewport } = getMetadata(svg);

	Object.keys(rect).forEach((key) => {
		result[key] = rect[key] / viewport.scale;
	});

	return result;
}

/**
 * Get the scroll position of an element, accounting for parent elements
 *
 * @param {Element} el The element to get the scroll position for
 * @return {Object} The scrollTop and scrollLeft position
 */
function getScroll(el) {
	let scrollTop = 0;
	let scrollLeft = 0;
	let parentNode = el;

	while ((parentNode = parentNode.parentNode) &&
			parentNode !== document
	) {
		scrollTop += parentNode.scrollTop;
		scrollLeft += parentNode.scrollLeft;
	}

	return {
		scrollTop,
		scrollLeft
	};
}

/**
 * Get the offset position of an element, accounting for parent elements
 *
 * @param {Element} el The element to get the offset position for
 * @return {Object} The offsetTop and offsetLeft position
 */
function getOffset(el) {
	let parentNode = el.closest('svg.annotationLayer');

	/* while ((parentNode = parentNode.parentNode) &&
			parentNode !== document
	) {
		if (parentNode.nodeName.toUpperCase() === 'SVG') {
			break;
		}
	} */

	let rect = parentNode.getBoundingClientRect();

	return {
		offsetLeft: Math.max(0, rect.left),
		offsetTop: Math.max(0, rect.top)
	};
}

/**
 * Disable user ability to select text on page
 */
function disableUserSelect() {
	if (!userSelectStyleSheet.parentNode) {
		document.head.appendChild(userSelectStyleSheet);
	}
}

/**
 * Enable user ability to select text on page
 */
function enableUserSelect() {
	if (userSelectStyleSheet.parentNode) {
		userSelectStyleSheet.parentNode.removeChild(userSelectStyleSheet);
	}
}

/**
 * Get the metadata for a SVG container
 *
 * @param {SVGElement} svg The SVG container to get metadata for
 */
function getMetadata(svg) {
	return {
		documentId: svg.getAttribute('data-pdf-annotate-document'),
		pageNumber: parseInt(svg.getAttribute('data-pdf-annotate-page'), 10),
		viewport: JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'))
	};
}


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = function createStyleSheet(blocks) {
  var style = document.createElement('style');
  var text = Object.keys(blocks).map(function (selector) {
    return processRuleSet(selector, blocks[selector]);
  }).join('\n');
  
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(text));

  return style;
}

function processRuleSet(selector, block) {
  return selector + ' {\n' + processDeclarationBlock(block) + '\n}';
}

function processDeclarationBlock(block) {
  return Object.keys(block).map(function (prop) {
    return processDeclaration(prop, block[prop]);
  }).join('\n');
}

function processDeclaration(prop, value) {
  if (!isNaN(value) && value != 0) {
    value = value + 'px';
  }

  return hyphenate(prop) + ': ' + value + ';';
}

function hyphenate(prop) {
  return prop.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase();
  });
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalStoreAdapter)
/* harmony export */ });
/* harmony import */ var _utils_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _StoreAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
class LocalStoreAdapter extends _StoreAdapter__WEBPACK_IMPORTED_MODULE_1__["default"] {
	constructor() {
		super({
			getAnnotations(documentId, pageNumber) {
				return new Promise((resolve, reject) => {
					let annotations = getAnnotations(documentId).filter((i) => {
						return i.page === pageNumber && i.class === 'Annotation';
					});

					resolve({
						documentId,
						pageNumber,
						annotations
					});
				});
			},

			getAnnotation(documentId, annotationId) {
				return Promise.resolve(getAnnotations(documentId)[findAnnotation(documentId, annotationId)]);
			},

			addAnnotation(documentId, pageNumber, annotation) {
				return new Promise((resolve, reject) => {
					annotation.class = 'Annotation';
					annotation.uuid = (0,_utils_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
					annotation.page = pageNumber;

					let annotations = getAnnotations(documentId);
					annotations.push(annotation);
					updateAnnotations(documentId, annotations);

					resolve(annotation);
				});
			},

			editAnnotation(documentId, annotationId, annotation) {
				return new Promise((resolve, reject) => {
					let annotations = getAnnotations(documentId);
					annotations[findAnnotation(documentId, annotationId)] = annotation;
					updateAnnotations(documentId, annotations);

					resolve(annotation);
				});
			},

			deleteAnnotation(documentId, annotationId) {
				return new Promise((resolve, reject) => {
					let index = findAnnotation(documentId, annotationId);
					if (index > -1) {
						let annotations = getAnnotations(documentId);
						annotations.splice(index, 1);
						updateAnnotations(documentId, annotations);
					}

					resolve(true);
				});
			},

			getComments(documentId, annotationId) {
				return new Promise((resolve, reject) => {
					resolve(getAnnotations(documentId).filter((i) => {
							return i.class === 'Comment' && i.annotation === annotationId;
						}));
				});
			},

			addComment(documentId, annotationId, content) {
				return new Promise((resolve, reject) => {
					let comment = {
						class: 'Comment',
						uuid: (0,_utils_uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
						annotation: annotationId,
						content: content
					};

					let annotations = getAnnotations(documentId);
					annotations.push(comment);
					updateAnnotations(documentId, annotations);

					resolve(comment);
				});
			},

			deleteComment(documentId, commentId) {
				return new Promise((resolve, reject) => {
					getAnnotations(documentId);
					let index = -1;
					let annotations = getAnnotations(documentId);
					for (let i = 0, l = annotations.length; i < l; i++) {
						if (annotations[i].uuid === commentId) {
							index = i;
							break;
						}
					}

					if (index > -1) {
						annotations.splice(index, 1);
						updateAnnotations(documentId, annotations);
					}

					resolve(true);
				});
			}
		});
	}
}

function getAnnotations(documentId) {
	return JSON.parse(localStorage.getItem(`${documentId}/annotations`)) || [];
}

function updateAnnotations(documentId, annotations) {
	localStorage.setItem(`${documentId}/annotations`, JSON.stringify(annotations));
}

function findAnnotation(documentId, annotationId) {
	let index = -1;
	let annotations = getAnnotations(documentId);
	for (let i = 0, l = annotations.length; i < l; i++) {
		if (annotations[i].uuid === annotationId) {
			index = i;
			break;
		}
	}
	return index;
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uuid)
/* harmony export */ });
const REGEXP = /[xy]/g
const PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

function replacement(c) {
  let r = Math.random()*16|0;
  let v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
}

/**
 * Generate a univierally unique identifier
 *
 * @return {String}
 */
function uuid() {
  return PATTERN.replace(REGEXP, replacement);
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _appendChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);

// this file must be a webpack thing -- i.e., this index.js file seems to be used as an aggregator for importing and then exporting all the exports from the other .js files in this 'render' submodule


// this import seems to be unnecessary and circular, but this technique is employed in other modules, so I'll leave this in out of an abundance of caution (presumably webpack will know to handle this correctly)


// I am commenting out this import because it seems to be NOT used at all
/* import renderScreenReaderHints from '../a11y/renderScreenReaderHints'; */




/**
 * Render the response from PDFJSAnnotate.getStoreAdapter().getAnnotations to SVG
 *
 * @param {SVGElement} svg The SVG element to render the annotations to
 * @param {Object} viewport The page viewport data
 * @param {Object} data The response from PDFJSAnnotate.getStoreAdapter().getAnnotations
 * @return {Promise} Settled once rendering has completed
 *  A settled Promise will be either:
 *    - fulfilled: SVGElement
 *    - rejected: Error
 */
function render(svg, viewport, data) {
	console.log('svg: ', svg);

	return new Promise((resolve, reject) => {
		// Reset the content of the SVG
		svg.innerHTML = '';
		svg.setAttribute('data-pdf-annotate-container', true);
		svg.setAttribute('data-pdf-annotate-viewport', JSON.stringify(viewport));
		svg.removeAttribute('data-pdf-annotate-document');
		svg.removeAttribute('data-pdf-annotate-page');

		// If there's no data nothing can be done
		if (!data) {
			return resolve(svg);
		}

		svg.setAttribute('data-pdf-annotate-document', data.documentId);
		svg.setAttribute('data-pdf-annotate-page', data.pageNumber);

		// Make sure annotations is an array
		if (!Array.isArray(data.annotations) || data.annotations.length === 0) {
			return resolve(svg);
		}

		// Append annotation to svg
		data.annotations.forEach((a) => {
			(0,_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, a, viewport);
		});

		resolve(svg);
	});
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ appendChild)
/* harmony export */ });
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _renderLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _renderPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _renderPoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _renderRect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _renderText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);







const isFirefox = /firefox/i.test(navigator.userAgent);

/**
 * Get the x/y translation to be used for transforming the annotations
 * based on the rotation of the viewport.
 *
 * @param {Object} viewport The viewport data from the page
 * @return {Object}
 */
function getTranslation(viewport) {
	let x;
	let y;

	// Modulus 360 on the rotation so that we only
	// have to worry about four possible values.
	switch (viewport.rotation % 360) {
	case 0:
		x = y = 0;
		break;
	case 90:
		x = 0;
		y = (viewport.width / viewport.scale) * -1;
		break;
	case 180:
		x = (viewport.width / viewport.scale) * -1;
		y = (viewport.height / viewport.scale) * -1;
		break;
	case 270:
		x = (viewport.height / viewport.scale) * -1;
		y = 0;
		break;
	}

	return { x, y };
}

/**
 * Transform the rotation and scale of a node using SVG's native transform attribute.
 *
 * @param {Node} node The node to be transformed
 * @param {Object} viewport The page's viewport data
 * @return {Node}
 */
function transform(node, viewport) {
	let trans = getTranslation(viewport);

	// Let SVG natively transform the element
	node.setAttribute('transform', `scale(${viewport.scale}) rotate(${viewport.rotation}) translate(${trans.x}, ${trans.y})`);

	// Manually adjust x/y for nested SVG nodes
	if (!isFirefox && node.nodeName.toLowerCase() === 'svg') {
		node.setAttribute('x', parseInt(node.getAttribute('x'), 10) * viewport.scale);
		node.setAttribute('y', parseInt(node.getAttribute('y'), 10) * viewport.scale);

		let x = parseInt(node.getAttribute('x', 10));
		let y = parseInt(node.getAttribute('y', 10));
		let width = parseInt(node.getAttribute('width'), 10);
		let height = parseInt(node.getAttribute('height'), 10);
		let path = node.querySelector('path');
		let svg = path.parentNode;

		// Scale width/height
		[node, svg, path, node.querySelector('rect')].forEach((n) => {
			n.setAttribute('width', parseInt(n.getAttribute('width'), 10) * viewport.scale);
			n.setAttribute('height', parseInt(n.getAttribute('height'), 10) * viewport.scale);
		});

		// Transform path but keep scale at 100% since it will be handled natively
		transform(path, object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, viewport, {
				scale: 1
			}));

		switch (viewport.rotation % 360) {
		case 90:
			node.setAttribute('x', viewport.width - y - width);
			node.setAttribute('y', x);
			svg.setAttribute('x', 1);
			svg.setAttribute('y', 0);
			break;
		case 180:
			node.setAttribute('x', viewport.width - x - width);
			node.setAttribute('y', viewport.height - y - height);
			svg.setAttribute('y', 2);
			break;
		case 270:
			node.setAttribute('x', y);
			node.setAttribute('y', viewport.height - x - height);
			svg.setAttribute('x', -1);
			svg.setAttribute('y', 0);
			break;
		}
	}

	return node;
}

/**
 * Append an annotation as a child of an SVG.
 *
 * @param {SVGElement} svg The SVG element to append the annotation to
 * @param {Object} annotation The annotation definition to render and append
 * @param {Object} viewport The page's viewport data
 * @return {SVGElement} A node that was created and appended by this function
 */
function appendChild(svg, annotation, viewport) {
	if (!viewport) {
		viewport = JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'));
	}

	let child;

	switch (annotation.type) {
	case 'area':
	/* case 'highlight': */
		child = (0,_renderRect__WEBPACK_IMPORTED_MODULE_4__["default"])(annotation);
		break;
	/* case 'strikeout': */
	case 'line':
		child = (0,_renderLine__WEBPACK_IMPORTED_MODULE_1__["default"])(annotation);
		break;
	case 'point':
		child = (0,_renderPoint__WEBPACK_IMPORTED_MODULE_3__["default"])(annotation);
		break;
	case 'textbox':
		child = (0,_renderText__WEBPACK_IMPORTED_MODULE_5__["default"])(annotation);
		break;
	case 'drawing':
		child = (0,_renderPath__WEBPACK_IMPORTED_MODULE_2__["default"])(annotation);
		break;
	}

	// If no type was provided for an annotation it will result in node being null.
	// Skip appending/transforming if node doesn't exist.
	if (child) {
		/* console.log('child: ', child); */

		// Set attributes
		child.setAttribute('data-pdf-annotate-id', annotation.uuid);
		child.setAttribute('data-pdf-annotate-type', annotation.type);
		child.setAttribute('aria-hidden', true);

		svg.appendChild(transform(child, viewport));
	}

	return child;
}


/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderLine)
/* harmony export */ });
/* harmony import */ var _utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



function renderRectLine(a) {
	let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(group, {
		stroke: (0,_utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__["default"])(a.color || '#f00'),
		strokeWidth: a.width || 1
	});

	a.rectangles.forEach((r) => {
		let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

		(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(line, {
			x1: r.x,
			y1: r.y,
			x2: r.x + r.width,
			y2: r.y,
		});

		group.appendChild(line);
	});

	return group;
}

function renderPureLine(a) {
	let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	console.log('a: ', a);

	(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(line, {
		stroke: (0,_utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__["default"])(a.color || '#f00'),
		strokeWidth: a.width || 1,
		x1: a.lines[0][0],
		y1: a.lines[0][1],
		x2: a.lines[1][0],
		y2: a.lines[1][1]
	});

	return line;
}


/**
 * Create SVGLineElements from an annotation definition.
 * This is used for annotations of type `strikeout` or `line`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement} A group of all lines to be rendered
 */
function renderLine(a) {
	if (a.rectangles) {
		return renderRectLine(a);
	} else {
		return renderPureLine(a);
	}
}


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setAttributes)
/* harmony export */ });
const UPPER_REGEX = /[A-Z]/g;

// Don't convert these attributes from camelCase to hyphenated-attributes
const BLACKLIST = [
  'viewBox'
];

let keyCase = (key) => {
  if (BLACKLIST.indexOf(key) === -1) {
    key = key.replace(UPPER_REGEX, match => '-' + match.toLowerCase());
  }
  return key;
}

/**
 * Set attributes for a node from a map
 *
 * @param {Node} node The node to set attributes on
 * @param {Object} attributes The map of key/value pairs to use for attributes
 */
function setAttributes(node, attributes) {
  Object.keys(attributes).forEach((key) => {
    node.setAttribute(keyCase(key), attributes[key]);
  });
}


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeColor)
/* harmony export */ });
const REGEX_HASHLESS_HEX = /^([a-f0-9]{6}|[a-f0-9]{3})$/i;

/**
 * Normalize a color value
 *
 * @param {String} color The color to normalize
 * @return {String}
 */
function normalizeColor(color) {
  if (REGEX_HASHLESS_HEX.test(color)) {
    color = `#${color}`;
  }
  return color;
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderPath)
/* harmony export */ });
/* harmony import */ var _utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



/**
 * Create SVGPathElement from an annotation definition.
 * This is used for anntations of type `drawing`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGPathElement} The path to be rendered
 */
function renderPath(a) {
	let d = [];
	let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

	for (let i = 0, l = a.lines.length; i < l; i++) {
		var p1 = a.lines[i];
		var p2 = a.lines[i + 1];
		if (p2) {
			d.push(`M${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`);
		}
	}

	(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(path, {
		d: `${d.join(' ')}Z`,
		stroke: (0,_utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__["default"])(a.color || '#000'),
		strokeWidth: a.width || 1,
		fill: 'none'
	});

	return path;
}


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderPoint)
/* harmony export */ });
/* harmony import */ var _utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


const SIZE = 25;
const D = 'M499.968 214.336q-113.832 0 -212.877 38.781t-157.356 104.625 -58.311 142.29q0 62.496 39.897 119.133t112.437 97.929l48.546 27.9 -15.066 53.568q-13.392 50.778 -39.06 95.976 84.816 -35.154 153.45 -95.418l23.994 -21.204 31.806 3.348q38.502 4.464 72.54 4.464 113.832 0 212.877 -38.781t157.356 -104.625 58.311 -142.29 -58.311 -142.29 -157.356 -104.625 -212.877 -38.781z';

/**
 * Create SVGElement from an annotation definition.
 * This is used for anntations of type `comment`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGElement} A svg to be rendered
 */
function renderPoint(a) {
  let outerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  let innerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  (0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(outerSVG,  {
    width: SIZE,
    height: SIZE,
    x: a.x,
    y: a.y
  });

  (0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(innerSVG, {
    width: SIZE,
    height: SIZE,
    x: 0,
    y: (SIZE * 0.05) * -1,
    viewBox: '0 0 1000 1000'
  });

  (0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(rect, {
    width: SIZE,
    height: SIZE,
    stroke: '#000',
    fill: '#ff0'
  });

  (0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(path, {
    d: D,
    strokeWidth: 50,
    stroke: '#000',
    fill: '#fff'
  });

  innerSVG.appendChild(path);
  outerSVG.appendChild(rect);
  outerSVG.appendChild(innerSVG);

  return outerSVG;
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderRect)
/* harmony export */ });
/* harmony import */ var _utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



/**
 * Create SVGRectElements from an annotation definition.
 * This is used for annotations of type `area` and `highlight`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement|SVGRectElement} A group of all rects to be rendered
 */
function renderRect(a) {
	if (a.type === 'highlight') {
		let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(group, {
			fill: (0,_utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__["default"])(a.color || '#ff0'),
			fillOpacity: 0.2
		});

		a.rectangles.forEach((r) => {
			group.appendChild(createRect(r));
		});

		return group;

	} else {
		let rect = createRect(a);
		(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(rect, {
			stroke: (0,_utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__["default"])(a.color || '#f00'),
			fill: 'none'
		});

		return rect;
	}
}

function createRect(r) {
	let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

	(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(rect, {
		x: r.x,
		y: r.y,
		width: r.width,
		height: r.height
	});

	return rect;
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderText)
/* harmony export */ });
/* harmony import */ var _utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



/**
 * Create SVGTextElement from an annotation definition.
 * This is used for anntations of type `textbox`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGTextElement} A text to be rendered
 */
function renderText(a) {
	var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	(0,_utils_setAttributes__WEBPACK_IMPORTED_MODULE_0__["default"])(text, {
		x: a.x,
		y: a.y + parseInt(a.size, 10),
		fill: (0,_utils_normalizeColor__WEBPACK_IMPORTED_MODULE_1__["default"])(a.color || '#000'),
		fontSize: a.size
	});
	text.innerHTML = a.content;

	return text;
}


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _pen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);

// this file must be a webpack thing -- i.e., this index.js file seems to be used as an aggregator for importing and then exporting all the exports from the other .js files in this 'UI' submodule















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    addEventListener: _event__WEBPACK_IMPORTED_MODULE_0__.addEventListener,
    removeEventListener: _event__WEBPACK_IMPORTED_MODULE_0__.removeEventListener,
    fireEvent: _event__WEBPACK_IMPORTED_MODULE_0__.fireEvent,
    disableEdit: _edit__WEBPACK_IMPORTED_MODULE_1__.disableEdit,
    enableEdit: _edit__WEBPACK_IMPORTED_MODULE_1__.enableEdit,
    disablePen: _pen__WEBPACK_IMPORTED_MODULE_2__.disablePen,
    enablePen: _pen__WEBPACK_IMPORTED_MODULE_2__.enablePen,
    /* setPen, */
    disablePoint: _point__WEBPACK_IMPORTED_MODULE_3__.disablePoint,
    enablePoint: _point__WEBPACK_IMPORTED_MODULE_3__.enablePoint,
    disableRect: _rect__WEBPACK_IMPORTED_MODULE_4__.disableRect,
    enableRect: _rect__WEBPACK_IMPORTED_MODULE_4__.enableRect,
    disableText: _text__WEBPACK_IMPORTED_MODULE_5__.disableText,
    enableText: _text__WEBPACK_IMPORTED_MODULE_5__.enableText,
    setText: _text__WEBPACK_IMPORTED_MODULE_5__.setText,
    createPage: _page__WEBPACK_IMPORTED_MODULE_6__.createPage,
    renderPage: _page__WEBPACK_IMPORTED_MODULE_6__.renderPage
});


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enableEdit": () => (/* binding */ enableEdit),
/* harmony export */   "disableEdit": () => (/* binding */ disableEdit)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _render_appendChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);








let _enabled = false;
let isDragging = false, overlay;
let dragOffsetX, dragOffsetY, dragStartX, dragStartY;
const OVERLAY_BORDER_SIZE = 3;

/**
 * Create an overlay for editing an annotation.
 *
 * @param {Element} target The annotation element to apply overlay for
 */
function createEditOverlay(target) {
	destroyEditOverlay();

	// create a div as overlay
	overlay = document.createElement('div');
	let anchor = document.createElement('a');
	let parentNode = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGContainer)(target).parentNode;
	let id = target.getAttribute('data-pdf-annotate-id');
	let rect = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getAnnotationRect)(target);
	let styleLeft = rect.left - OVERLAY_BORDER_SIZE;
	let styleTop = rect.top - OVERLAY_BORDER_SIZE;

	overlay.setAttribute('id', 'pdf-annotate-edit-overlay');
	overlay.setAttribute('data-target-id', id);
	overlay.style.boxSizing = 'content-box';
	overlay.style.position = 'absolute';
	overlay.style.top = `${styleTop}px`;
	overlay.style.left = `${styleLeft}px`;
	overlay.style.width = `${rect.width}px`;
	overlay.style.height = `${rect.height}px`;
	overlay.style.border = `${OVERLAY_BORDER_SIZE}px solid ${_utils__WEBPACK_IMPORTED_MODULE_3__.BORDER_COLOR}`;
	overlay.style.borderRadius = `${OVERLAY_BORDER_SIZE}px`;

	anchor.innerHTML = '×';
	anchor.setAttribute('href', 'javascript://');
	anchor.style.background = '#fff';
	anchor.style.borderRadius = '20px';
	anchor.style.border = '1px solid #bbb';
	anchor.style.color = '#bbb';
	anchor.style.fontSize = '16px';
	anchor.style.padding = '2px';
	anchor.style.textAlign = 'center';
	anchor.style.textDecoration = 'none';
	anchor.style.position = 'absolute';
	anchor.style.top = '-13px';
	anchor.style.right = '-13px';
	anchor.style.width = '25px';
	anchor.style.height = '25px';

	overlay.appendChild(anchor);
	parentNode.appendChild(overlay);
	document.addEventListener('click', handleDocumentClick);
	document.addEventListener('keyup', handleDocumentKeyup);
	document.addEventListener('pointerdown', handleDocumentPointerdown);
	anchor.addEventListener('click', deleteAnnotation);
	anchor.addEventListener('pointerover', () => {
		anchor.style.color = '#35A4DC';
		anchor.style.borderColor = '#999';
		anchor.style.boxShadow = '0 1px 1px #ccc';
	});
	anchor.addEventListener('pointerout', () => {
		anchor.style.color = '#bbb';
		anchor.style.borderColor = '#bbb';
		anchor.style.boxShadow = '';
	});
	overlay.addEventListener('pointerover', () => {
		if (!isDragging) {
			anchor.style.display = '';
		}
	});
	overlay.addEventListener('pointerout', () => {
		anchor.style.display = 'none';
	});
}

/**
 * Destroy the edit overlay if it exists.
 */
function destroyEditOverlay() {
	if (overlay) {
		overlay.parentNode.removeChild(overlay);
		overlay = null;
	}

	document.removeEventListener('click', handleDocumentClick);
	document.removeEventListener('keyup', handleDocumentKeyup);
	document.removeEventListener('pointerdown', handleDocumentPointerdown);
	document.removeEventListener('pointermove', handleDocumentPointermove);
	document.removeEventListener('pointerup', handleDocumentPointerup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();
}

/**
 * Delete currently selected annotation
 */
function deleteAnnotation() {
	if (!overlay) {
		return;
	}

	let annotationId = overlay.getAttribute('data-target-id');
	let nodes = document.querySelectorAll(`[data-pdf-annotate-id="${annotationId}"]`);
	let svg = overlay.parentNode.querySelector('svg.annotationLayer');
	let {
		documentId
	} = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getMetadata)(svg);

	[...nodes].forEach((n) => {
		n.parentNode.removeChild(n);
	});

	_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter().deleteAnnotation(documentId, annotationId);

	destroyEditOverlay();
}

/**
 * Handle document.click event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentClick(e) {
	if (!(0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGAtPoint)(e.clientX, e.clientY)) {
		return;
	}

	// Remove current overlay
	let overlay = document.getElementById('pdf-annotate-edit-overlay');
	if (overlay) {
		if (isDragging || e.target === overlay) {
			return;
		}

		destroyEditOverlay();
	}
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentKeyup(e) {
	if (overlay && e.keyCode === 46 &&
		e.target.nodeName.toLowerCase() !== 'textarea' &&
		e.target.nodeName.toLowerCase() !== 'input'
	) {
		deleteAnnotation();
	}
}

/**
 * Handle document.pointerdown event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentPointerdown(e) {
	if (e.target !== overlay) {
		return;
	}

	// Highlight and strikeout annotations are bound to text within the document.
	// It doesn't make sense to allow repositioning of these types of annotations.
	let annotationId = overlay.getAttribute('data-target-id');
	let target = document.querySelector(`[data-pdf-annotate-id="${annotationId}"]`);
	let type = target.getAttribute('data-pdf-annotate-type');

	if (type === 'highlight' || type === 'strikeout') {
		return;
	}

	isDragging = true;
	dragOffsetX = e.clientX;
	dragOffsetY = e.clientY;
	dragStartX = overlay.offsetLeft;
	dragStartY = overlay.offsetTop;

	overlay.style.background = 'rgba(255, 255, 255, 0.7)';
	overlay.style.cursor = 'move';
	overlay.querySelector('a').style.display = 'none';

	document.addEventListener('pointermove', handleDocumentPointermove);
	document.addEventListener('pointerup', handleDocumentPointerup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.disableUserSelect)();
}

/**
 * Handle document.pointermove event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentPointermove(e) {
	let annotationId = overlay.getAttribute('data-target-id');
	let parentNode = overlay.parentNode;
	let rect = parentNode.getBoundingClientRect();
	let y = (dragStartY + (e.clientY - dragOffsetY));
	let x = (dragStartX + (e.clientX - dragOffsetX));
	let minY = 0;
	let maxY = rect.height;
	let minX = 0;
	let maxX = rect.width;

	if (y > minY && y + overlay.offsetHeight < maxY) {
		overlay.style.top = `${y}px`;
	}

	if (x > minX && x + overlay.offsetWidth < maxX) {
		overlay.style.left = `${x}px`;
	}
}

/**
 * Handle document.pointerup event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentPointerup(e) {
	let annotationId = overlay.getAttribute('data-target-id');
	let target = document.querySelectorAll(`[data-pdf-annotate-id="${annotationId}"]`);
	let type = target[0].getAttribute('data-pdf-annotate-type');
	let svg = overlay.parentNode.querySelector('svg.annotationLayer');
	let {
		documentId
	} = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getMetadata)(svg);

	overlay.querySelector('a').style.display = '';

	function getDelta(propX, propY) {
		return calcDelta(parseInt(target[0].getAttribute(propX), 10), parseInt(target[0].getAttribute(propY), 10));
	}

	function calcDelta(x, y) {
		return {
			deltaX: OVERLAY_BORDER_SIZE + (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleDown)(svg, {
				x: overlay.offsetLeft
			}).x - x,
			deltaY: OVERLAY_BORDER_SIZE + (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleDown)(svg, {
				y: overlay.offsetTop
			}).y - y
		};
	}

	_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter()
		.getAnnotation(documentId, annotationId)
		.then((annotation) => {
			if (/(area|highlight|point|textbox)/.test(type)) {
				let {
					deltaX,
					deltaY
				} = getDelta('x', 'y');

				[...target].forEach((t, i) => {
					if (deltaY !== 0) {
						let modelY = parseInt(t.getAttribute('y'), 10) + deltaY;
						let viewY = modelY;

						if (type === 'textbox') {
							viewY += annotation.size;
						}

						if (type === 'point') {
							viewY = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleUp)(svg, {
								viewY
							}).viewY;
						}

						t.setAttribute('y', viewY);
						if (annotation.rectangles) {
							annotation.rectangles[i].y = modelY;
						} else if (annotation.y) {
							annotation.y = modelY;
						}
					}

					if (deltaX !== 0) {
						let modelX = parseInt(t.getAttribute('x'), 10) + deltaX;
						let viewX = modelX;

						if (type === 'point') {
							viewX = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleUp)(svg, {
								viewX
							}).viewX;
						}

						t.setAttribute('x', viewX);
						if (annotation.rectangles) {
							annotation.rectangles[i].x = modelX;
						} else if (annotation.x) {
							annotation.x = modelX;
						}
					}
				});
				// } else if (type === 'strikeout') {
				//   let { deltaX, deltaY } = getDelta('x1', 'y1');
				//   [...target].forEach(target, (t, i) => {
				//     if (deltaY !== 0) {
				//       t.setAttribute('y1', parseInt(t.getAttribute('y1'), 10) + deltaY);
				//       t.setAttribute('y2', parseInt(t.getAttribute('y2'), 10) + deltaY);
				//       annotation.rectangles[i].y = parseInt(t.getAttribute('y1'), 10);
				//     }
				//     if (deltaX !== 0) {
				//       t.setAttribute('x1', parseInt(t.getAttribute('x1'), 10) + deltaX);
				//       t.setAttribute('x2', parseInt(t.getAttribute('x2'), 10) + deltaX);
				//       annotation.rectangles[i].x = parseInt(t.getAttribute('x1'), 10);
				//     }
				//   });
			} else if (type === 'drawing') {
				let rect = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleDown)(svg, (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getAnnotationRect)(target[0]));
				let[originX, originY] = annotation.lines[0];
				let {
					deltaX,
					deltaY
				} = calcDelta(originX, originY);

				// origin isn't necessarily at 0/0 in relation to overlay x/y
				// adjust the difference between overlay and drawing coords
				deltaY += (originY - rect.top);
				deltaX += (originX - rect.left);

				annotation.lines.forEach((line, i) => {
					let[x, y] = annotation.lines[i];
					annotation.lines[i][0] = x + deltaX;
					annotation.lines[i][1] = y + deltaY;
				});

				target[0].parentNode.removeChild(target[0]);
				(0,_render_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, annotation);
			}

			_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter().editAnnotation(documentId, annotationId, annotation);
		});

	setTimeout(() => {
		isDragging = false;
	}, 0);

	overlay.style.background = '';
	overlay.style.cursor = '';

	document.removeEventListener('pointermove', handleDocumentPointermove);
	document.removeEventListener('pointerup', handleDocumentPointerup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();
}

/**
 * Handle annotation.click event
 *
 * @param {Element} e The annotation element that was clicked
 */
function handleAnnotationClick(target) {
	createEditOverlay(target);
}

/**
 * Enable edit mode behavior.
 */
function enableEdit() {
	if (_enabled) {
		return;
	}

	_enabled = true;
	(0,_event__WEBPACK_IMPORTED_MODULE_2__.addEventListener)('annotation:click', handleAnnotationClick);
};

/**
 * Disable edit mode behavior.
 */
function disableEdit() {
	destroyEditOverlay();

	if (!_enabled) {
		return;
	}

	_enabled = false;
	(0,_event__WEBPACK_IMPORTED_MODULE_2__.removeEventListener)('annotation:click', handleAnnotationClick);
};


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enablePen": () => (/* binding */ enablePen),
/* harmony export */   "disablePen": () => (/* binding */ disablePen)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _render_appendChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





let _enabled = false;
let _penSize;
let _penColor;
let _penMode;
let path;
let lines;

/**
 * Handle document.pointerdown event
 * UNLIKE 'rect.js' module, this does NOT create a temporary div overlay
 */
function handleDocumentPointerdown() {
	path = null;
	lines = [];

	document.addEventListener('pointermove', handleDocumentPointermove);
	document.addEventListener('pointerup', handleDocumentPointerup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.disableUserSelect)();
}

/**
 * Handle document.pointermove event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentPointermove(e) {
	savePoint(e.clientX, e.clientY);
}

/**
 * Handle document.pointerup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentPointerup(e) {
	console.log('What is path ?? ', path);

	let svg;
	if (lines.length > 1 && (svg = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGAtPoint)(e.clientX, e.clientY))) {
		let {
			documentId,
			pageNumber
		} = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getMetadata)(svg);
		console.log('lines: ', lines);

		_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter()
			.addAnnotation(documentId, pageNumber, {
				type: _penMode, // this affects how the svg element is rendered
				width: _penSize,
				color: _penColor,
				lines
			})
			.then((annotation) => {
				if (path) {
					svg.removeChild(path);
				}

				// render.appendChild() is the entry method to render the svg element on the parent svg for the applicable page
				(0,_render_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, annotation);
			});
	}

	document.removeEventListener('pointermove', handleDocumentPointermove);
	document.removeEventListener('pointerup', handleDocumentPointerup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();

	(0,_event__WEBPACK_IMPORTED_MODULE_2__.fireEvent)('resetToolbar');
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentKeyup(e) {
	// Cancel rect if Esc is pressed
	if (e.keyCode === 27) {
		lines = null;
		path.parentNode.removeChild(path);
		document.removeEventListener('pointermove', handleDocumentPointermove);
		document.removeEventListener('pointerup', handleDocumentPointerup);
		(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();
		(0,_event__WEBPACK_IMPORTED_MODULE_2__.fireEvent)('resetToolbar');
	}
}

/**
 * Save a point to the line being drawn.
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 */
function savePoint(x, y) {
	let svg = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGAtPoint)(x, y);
	if (!svg) {
		return;
	}

	let rect = svg.getBoundingClientRect();
	let point = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleDown)(svg, {
		x: x - rect.left,
		y: y - rect.top
	});

	if (!lines.length || lines.length === 0) {
		lines.push([point.x, point.y]);
	} else {
		if (_penMode === 'line') {
			lines[1] = [point.x, point.y];
		} else {
			lines.push([point.x, point.y]);
		}
	}

	if (lines.length <= 1) {
		return;
	}

	if (path) {
		svg.removeChild(path);
	}

	path = (0,_render_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, {
		type: _penMode,
		color: _penColor,
		width: _penSize,
		lines
	});
}

/**
 * Set the attributes of the pen.
 *
 * @param {Number} penSize The size of the lines drawn by the pen
 * @param {String} penColor The color of the lines drawn by the pen
 */
/* export function setPen(penSize = 1, penColor = '000000') {
	_penSize = parseInt(penSize, 10);
	_penColor = penColor;
} */

/**
 * Enable the pen behavior
 */
function enablePen(type) {
	// I added this block b/c am no longer using setPen() function immed above
	_penSize = 1;
	_penColor = /blue/.test(type) ? '#00f' : '#f00';
	_penMode = /freehand/.test(type) ? 'drawing' : 'line';

	if (_enabled) {
		return;
	}

	_enabled = true;
	document.addEventListener('pointerdown', handleDocumentPointerdown);
	document.addEventListener('keyup', handleDocumentKeyup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.disableUserSelect)();
}

/**
 * Disable the pen behavior
 */
function disablePen() {
	if (!_enabled) {
		return;
	}

	_enabled = false;
	document.removeEventListener('pointerdown', handleDocumentPointerdown);
	document.removeEventListener('keyup', handleDocumentKeyup);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();
}


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enablePoint": () => (/* binding */ enablePoint),
/* harmony export */   "disablePoint": () => (/* binding */ disablePoint)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _render_appendChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




let _enabled = false;
let input;

/**
 * Handle document.mouseup event
 *
 * @param {Event} The DOM event to be handled
 */
function handleDocumentMouseup(e) {
  if (input || !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.findSVGAtPoint)(e.clientX, e.clientY)) {
    return
  }
  
  input = document.createElement('input');
  input.setAttribute('id', 'pdf-annotate-point-input');
  input.setAttribute('placeholder', 'Enter comment');
  input.style.border = `3px solid ${_utils__WEBPACK_IMPORTED_MODULE_2__.BORDER_COLOR}`;
  input.style.borderRadius = '3px';
  input.style.position = 'absolute';
  input.style.top = `${e.clientY}px`;
  input.style.left = `${e.clientX}px`;

  input.addEventListener('blur', handleInputBlur);
  input.addEventListener('keyup', handleInputKeyup);

  document.body.appendChild(input);
  input.focus();
}

/**
 * Handle input.blur event
 */
function handleInputBlur() {
  savePoint();
}

/**
 * Handle input.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleInputKeyup(e) {
  if (e.keyCode === 27) {
    closeInput();
  } else if (e.keyCode === 13) {
    savePoint();
  }
}

/**
 * Save a new point annotation from input
 */
function savePoint() {
  if (input.value.trim().length > 0) {
    let clientX = parseInt(input.style.left, 10);
    let clientY = parseInt(input.style.top, 10);
    let content = input.value.trim();
    let svg = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.findSVGAtPoint)(clientX, clientY);
    if (!svg) {
      return;
    }

    let rect = svg.getBoundingClientRect();
    let { documentId, pageNumber } = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getMetadata)(svg);
    let annotation = Object.assign({
        type: 'point'
      }, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.scaleDown)(svg, {
        x: clientX - rect.left,
        y: clientY - rect.top
      })
    );

    _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter().addAnnotation(documentId, pageNumber, annotation)
      .then((annotation) => {
        _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter().addComment(
          documentId,
          annotation.uuid,
          content
        );

        (0,_render_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, annotation);
      });
  }

  closeInput();
}

/**
 * Close the input element
 */
function closeInput() {
  input.removeEventListener('blur', handleInputBlur);
  input.removeEventListener('keyup', handleInputKeyup);
  document.body.removeChild(input);
  input = null;
}

/**
 * Enable point annotation behavior
 */
function enablePoint() {
  if (_enabled) { return; }

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable point annotation behavior
 */
function disablePoint() {
  if (!_enabled) { return; }

  _enabled = false;
  document.removeEventListener('mouseup', handleDocumentMouseup);
}



/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enableRect": () => (/* binding */ enableRect),
/* harmony export */   "disableRect": () => (/* binding */ disableRect)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _render_appendChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





let _enabled = false;
let _type;
let _drawMode;
let _borderColor;
let overlay;
let originX;
let originY;

/**
 * Get the current window selection as rects
 *
 * @return {Array} An Array of rects
 */
function getSelectionRects() {
	try {
		let selection = window.getSelection();
		let range = selection.getRangeAt(0);
		let rects = range.getClientRects();

		if (rects.length > 0 &&
			rects[0].width > 0 &&
			rects[0].height > 0) {
			return rects;
		}
	} catch (e) {
		console.log('could NOT get selection\'s rects');
	}

	return null;
}

/**
 * Handle document.pointerdown event
 * This creates a temporary div overlay
 * This does NOT apply to either 'highlight' or 'strikeout.' HOW then do those 2 types work ??
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentPointerdown(e) {
	let svg;

	if (_drawMode !== 'area' || !(svg = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGAtPoint)(e.clientX, e.clientY))) {
		return; // bail
	}

	let rect = svg.getBoundingClientRect();

	// e.clientX && e.clientY returns position in the viewport (as opposed to in the page)
	originX = e.clientX;
	originY = e.clientY;
	console.log('origin e.clientX: ', e.clientX);
	console.log('origin e.clientY: ', e.clientY);

	overlay = document.createElement('div'); // temporary div
	overlay.style.position = 'absolute';
	overlay.style.left = `${originX - rect.left}px`;
	overlay.style.top = `${originY - rect.top}px`;
	overlay.style.border = `3px solid ${_utils__WEBPACK_IMPORTED_MODULE_3__.BORDER_COLOR}`;
	overlay.style.borderRadius = '3px';
	svg.parentNode.appendChild(overlay);

	// so pointermove method, as well, does NOT apply to either 'highlight' or 'strikeout'
	document.addEventListener('pointermove', handleDocumentPointermove);
	(0,_utils__WEBPACK_IMPORTED_MODULE_3__.disableUserSelect)();
}

/**
 * Handle document.pointermove event
 * This does NOT apply to either 'highlight' or 'strikeout.' HOW then do those 2 types work ??
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentPointermove(e) {
	// overlay.closest does NOT work -- WHY ??
	let svg = overlay.parentNode.querySelector('svg.annotationLayer');
	let rect = svg.getBoundingClientRect();

	let deltaX = (e.clientX - originX);
	let deltaY = (e.clientY - originY);
	let absDeltaX = Math.abs(deltaX);
	let absDeltaY = Math.abs(deltaY);
	let maxAbsDeltaX = Math.abs(originX - rect.left);
	let maxAbsDeltaY = Math.abs(originY - rect.top);

	// commented out original formulation
	/* if (originX + (e.clientX - originX) < rect.right) {
		overlay.style.width = `${e.clientX - originX}px`;
	}
	if (originY + (e.clientY - originY) < rect.bottom) {
		overlay.style.height = `${e.clientY - originY}px`;
	} */

	if (deltaX < 0) {
		overlay.style.left = Math.max(5, e.clientX - rect.left) + 'px';
		overlay.style.width = Math.min(
			(maxAbsDeltaX - 5),
			absDeltaX
		) + 'px';
	} else {
		overlay.style.width = absDeltaX + 'px';
	}

	if (deltaY < 0) {
		overlay.style.top = Math.max(5, e.clientY - rect.top) + 'px';
		overlay.style.height = Math.min(
			(maxAbsDeltaY - 5),
			absDeltaY
		) + 'px';
	} else {
		overlay.style.height = absDeltaY + 'px';
	}
}

/**
 * Handle document.pointerup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentPointerup(e) {
	let rects;

	if (_drawMode !== 'area' && (rects = getSelectionRects())) {
		let svg = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGAtPoint)(rects[0].left, rects[0].top);
		saveRect(
			_type,
			[...rects].map((r) => {
				return {
					top: r.top,
					left: r.left,
					width: r.width,
					height: r.height
				};
			})
		);

	} else if (_drawMode === 'area' && overlay) {
		let svg = overlay.parentNode.querySelector('svg.annotationLayer');
		let rect = svg.getBoundingClientRect();

		saveRect(
			_drawMode,
			[{
				top: parseInt(overlay.style.top, 10) + rect.top,
				left: parseInt(overlay.style.left, 10) + rect.left,
				width: parseInt(overlay.style.width, 10),
				height: parseInt(overlay.style.height, 10)
			}],
			_borderColor
		);

		overlay.parentNode.removeChild(overlay);
		overlay = null;

		document.removeEventListener('pointermove', handleDocumentPointermove);
		(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();
	}

	(0,_event__WEBPACK_IMPORTED_MODULE_2__.fireEvent)('resetToolbar');
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentKeyup(e) {
	// Cancel rect if Esc is pressed
	if (e.keyCode === 27) {
		let selection = window.getSelection();
		selection.removeAllRanges();
		if (overlay && overlay.parentNode) {
			overlay.parentNode.removeChild(overlay);
			overlay = null;
			document.removeEventListener('pointermove', handleDocumentPointermove);
		}
		(0,_utils__WEBPACK_IMPORTED_MODULE_3__.enableUserSelect)();
		(0,_event__WEBPACK_IMPORTED_MODULE_2__.fireEvent)('resetToolbar');
	}
}

/**
 * Save a rect annotation
 *
 * @param {String} type The type of rect (area, highlight, strikeout)
 * @param {Array} rects The rects to use for annotation
 * @param {String} color The color of the rects
 */
function saveRect(type, rects, color) {
	let svg = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.findSVGAtPoint)(rects[0].left, rects[0].top);
	let node;
	let annotation;

	if (!svg) {
		return;
	}

	let boundingRect = svg.getBoundingClientRect();

	if (type !== 'area' && !color) {
		if (type === 'highlight') {
			color = 'FFFF00';
		} else if (type === 'strikeout') {
			color = 'FF0000';
		}
	}

	// Initialize the annotation
	annotation = {
		type,
		color,
		rectangles: [...rects].map((r) => {
			let offset = 0;

			if (type === 'strikeout') {
				offset = r.height / 2;
			}

			return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.scaleDown)(svg, {
				y: (r.top + offset) - boundingRect.top,
				x: r.left - boundingRect.left,
				width: r.width,
				height: r.height
			});
		}).filter((r) => r.width > 0 && r.height > 0 && r.x > -1 && r.y > -1)
	};

	// Short circuit if no rectangles exist
	if (annotation.rectangles.length === 0) {
		return;
	}

	// Special treatment for area as it only supports a single rect
	if (type === 'area') {
		let rect = annotation.rectangles[0];
		delete annotation.rectangles;
		annotation.x = rect.x;
		annotation.y = rect.y;
		annotation.width = rect.width;
		annotation.height = rect.height;
	}

	let {
		documentId,
		pageNumber
	} = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getMetadata)(svg);

	// Add the annotation
	_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter()
		.addAnnotation(documentId, pageNumber, annotation)
		.then((annotation) => (0,_render_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, annotation));
}

/**
 * Enable rect behavior
 */
function enableRect(type) {
	_type = type;
	_drawMode = /^area/.test(type) ? 'area' : 'highlight-strikeout';
	_borderColor = /blue/.test(type) ? 'blue' : 'red';

	if (_enabled) {
		return;
	}

	_enabled = true;
	document.addEventListener('pointerup', handleDocumentPointerup);
	document.addEventListener('pointerdown', handleDocumentPointerdown);
	document.addEventListener('keyup', handleDocumentKeyup);
}

/**
 * Disable rect behavior
 */
function disableRect() {
	if (!_enabled) {
		return;
	}

	_enabled = false;
	document.removeEventListener('pointerup', handleDocumentPointerup);
	document.removeEventListener('pointerdown', handleDocumentPointerdown);
	document.removeEventListener('keyup', handleDocumentKeyup);
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setText": () => (/* binding */ setText),
/* harmony export */   "enableText": () => (/* binding */ enableText),
/* harmony export */   "disableText": () => (/* binding */ disableText)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _render_appendChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




let _enabled = false;
let input;
let viewerRectTop = document.getElementById('viewer').getBoundingClientRect().top;
console.log('viewerRectTop: ', viewerRectTop);

// since I've disabled the toolbar button that gives user the ability to set
// the variable for '_textSize', am locking it in here
let _textSize = 12;
let _fontFamily = 'Times new roman';

// textColor variable will be set depending on which toolbar button is clicked
// see enableText(type) below
let _textColor;

// set y-scroll variables
let initialInputY = 0;
let initialScrollElmY = 0;
let scrollElm = document.querySelector('#viewer');

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e) {
	if (input || !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.findSVGAtPoint)(e.clientX, e.clientY)) {
		return;
	}

	input = document.createElement('input');
	input.setAttribute('id', 'pdf-annotate-text-input');
	input.setAttribute('type', 'text');
	input.setAttribute('placeholder', 'Enter text');
	input.style.border = `3px solid ${_utils__WEBPACK_IMPORTED_MODULE_2__.BORDER_COLOR}`;
	input.style.borderRadius = '3px';
	input.style.position = 'absolute';

	// adjust input so that it resembles what will be saved as an svg
	// also, need to add in parent elm's scrollLeft since getBoundingClientRect()
	// only get position relative to viewport and thus leaves out parent's scroll --
	// this attempt commented out below is not good enough -- something's missing
	/* const relevantScrollParent = document.querySelector('.well');
	const scrollLeft = parseInt(relevantScrollParent.scrollLeft, 10);
	console.log('scrollLeft: ', scrollLeft);
	const relevantOffsetParent = document.querySelector('#main');
	const offsetLeft = parseInt(relevantOffsetParent.offsetLeft, 10);
	console.log('offsetLeft: ', offsetLeft); */

	input.style.top = `${e.clientY - 8}px`;
	input.style.left = `${e.clientX - 4}px`;
	input.style.fontFamily = `${_fontFamily}`;
	input.style.color = `${_textColor}`;
	input.style.lineHeight = '1.2';
	input.style.fontSize = '18px';
	input.style.backgroundColor = 'transparent';

	// add event listeners
	input.addEventListener('blur', handleInputBlur);
	input.addEventListener('keyup', handleInputKeyup);

	// append input to body and put focus on it
	document.body.appendChild(input);
	input.focus();

	// MINE: add scroll event listener on scroll element, which is #viewer
	/* console.log('parent scroll top: ', scrollElm.scrollTop);
	console.log('parent offset top: ', scrollElm.getBoundingClientRect().top); */
	initialInputY = parseInt(input.style.top, 10);
	initialScrollElmY = scrollElm.scrollTop;
	scrollElm.addEventListener('scroll', handleParentScroll, { passive: true });
}

/**
 * MINE: Handle parent.scroll event
 */
function handleParentScroll(e) {
	let deltaY = scrollElm.scrollTop - initialScrollElmY;
	input.style.top = `${initialInputY - deltaY}px`;
}

/**
 * Handle input.blur event
 */
function handleInputBlur() {
	saveText();
}

/**
 * Handle input.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleInputKeyup(e) {
	if (e.keyCode === 27) {
		closeInput();
	} else if (e.keyCode === 13) {
		saveText();
	}
}

/**
 * Save a text annotation from input
 */
function saveText() {
	if (input.value.trim().length > 0) {
		let clientX = parseInt(input.style.left, 10);
		let clientY = parseInt(input.style.top, 10);
		let svg = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.findSVGAtPoint)(clientX, clientY);
		if (!svg) {
			return;
		}
		console.log('svg: ', svg);

		let {
			documentId,
			pageNumber
		} = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getMetadata)(svg);
		let rect = svg.getBoundingClientRect();
		let annotation = Object.assign({
			type: 'textbox',
			size: _textSize,
			color: _textColor,
			content: input.value.trim()
		}, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.scaleDown)(svg, {
				x: clientX - rect.left,
				y: clientY - rect.top,
				width: input.offsetWidth,
				height: input.offsetHeight
			}));

		_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getStoreAdapter()
			.addAnnotation(documentId, pageNumber, annotation)
			.then((annotation) => {
				(0,_render_appendChild__WEBPACK_IMPORTED_MODULE_1__["default"])(svg, annotation);
			});
	}

	closeInput();
}

/**
 * Close the input
 */
function closeInput() {
	if (input) {
		input.removeEventListener('blur', handleInputBlur);
		input.removeEventListener('keyup', handleInputKeyup);
		document.body.removeChild(input);
		input = null;
	}
	scrollElm.removeEventListener('scroll', handleParentScroll);
}

/**
 * Set the text attributes
 *
 * @param {Number} textSize The size of the text
 * @param {String} textColor The color of the text
 */
function setText(textSize = 12, textColor = '000000') {
	_textSize = parseInt(textSize, 10);
	_textColor = textColor;
}

/**
 * Enable text behavior
 */
function enableText(type) {
	// I added this line so that textColor is set depending on which
	// toolbar button is clicked
	_textColor = /blue/.test(type) ? '#00f' : '#f00';

	if (_enabled) {
		return;
	}

	_enabled = true;
	document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable text behavior
 */
function disableText() {
	if (!_enabled) {
		return;
	}

	_enabled = false;
	document.removeEventListener('mouseup', handleDocumentMouseup);
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPage": () => (/* binding */ createPage),
/* harmony export */   "renderPage": () => (/* binding */ renderPage)
/* harmony export */ });
/* harmony import */ var _PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);



/* import renderScreenReaderHints from '../a11y/renderScreenReaderHints'; */


// Template for creating a new page
const PAGE_TEMPLATE = `
	<div style="visibility: hidden;" class="page" data-loaded="false">
		<div class="canvasWrapper">
			<canvas></canvas>
		</div>
		<svg class="annotationLayer"></svg>
		<!-- <div class="textLayer"></div> -->
	</div>
`;

/**
 * Create a new page element to be appended to the DOM.
 *
 * @param {Number} pageNumber The page number that is being created
 * @return {HTMLElement}
 */
function createPage(pageNumber) {
	let temp = document.createElement('div');
	temp.innerHTML = PAGE_TEMPLATE;

	let page = temp.children[0];
	console.log('page: ', page);
	let canvas = page.querySelector('canvas');

	page.setAttribute('id', `pageContainer${pageNumber}`);
	page.setAttribute('data-page-number', pageNumber);

	canvas.mozOpaque = true;
	canvas.setAttribute('id', `page${pageNumber}`);

	return page;
}

/**
 * Render a page element that has already been created.
 *
 * @param {Number} pageNumber The page number to be rendered
 * @param {Object} renderOptions The options for rendering
 * @return {Promise} Settled once rendering has completed
 *  A settled Promise will be either:
 *    - fulfilled: [pdfPage, annotations]
 *    - rejected: Error
 */
function renderPage(pageNumber, renderOptions) {
	let {
		documentId,
		pdfDocument,
		scale,
		rotate
	} = renderOptions;

	// Load the page and its annotations
	return Promise.all([
			pdfDocument.getPage(pageNumber),
			_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].getAnnotations(documentId, pageNumber)
		])
		.then(([pdfPage, annotations]) => {
			let page = document.getElementById(`pageContainer${pageNumber}`);
			let svg = page.querySelector('.annotationLayer');
			let canvas = page.querySelector('.canvasWrapper canvas');
			let canvasContext = canvas.getContext('2d', { alpha: false });

			// the viewport dimensions are embedded in the pdfPage itself that is retrieved via pdfDocument.getPage(pageNumber)
			// can I manipulate these dimensions before storing them in the 'viewport' variable ?? By adjusting the scale ??
			let viewport = pdfPage.getViewport(scale, rotate);
			let transform = scalePage(pageNumber, viewport, canvasContext);

			// Render the page
			return Promise.all([
					pdfPage.render({
						canvasContext,
						viewport,
						transform
					}),
					_PDFJSAnnotate__WEBPACK_IMPORTED_MODULE_0__["default"].render(svg, viewport, annotations)
				])
				/* .then(() => {
					// Text content is needed for a11y, but is also necessary for creating
					// highlight and strikeout annotations which require selecting text.
					return pdfPage.getTextContent({
							normalizeWhitespace: true
						})
						.then((textContent) => {
							return new Promise((resolve, reject) => {
								// Render text layer for a11y of text content
								let textLayer = page.querySelector(`.textLayer`);
								let textLayerFactory = new PDFJS.DefaultTextLayerFactory();
								let textLayerBuilder = textLayerFactory.createTextLayerBuilder(textLayer, pageNumber - 1, viewport);
								textLayerBuilder.setTextContent(textContent);
								textLayerBuilder.render();

								// Enable a11y for annotations
								// Timeout is needed to wait for `textLayerBuilder.render`
								setTimeout(() => {
									try {
										renderScreenReaderHints(annotations.annotations);
										resolve();
									} catch (e) {
										reject(e);
									}
								});
							});
						});
				}) */
				.then(() => {
					// Indicate that the page was loaded
					page.setAttribute('data-loaded', 'true');

					return [pdfPage, annotations];
				});
	});
}

/**
 * Scale the elements of a page.
 *
 * @param {Number} pageNumber The page number to be scaled
 * @param {Object} viewport The viewport of the PDF page (see pdfPage.getViewport(scale, rotate))
 * @param {Object} context The canvas context that the PDF page is rendered to
 * @return {Array} The transform data for rendering the PDF page
 */
function scalePage(pageNumber, viewport, context) {
	let page = document.getElementById(`pageContainer${pageNumber}`);
	let canvas = page.querySelector('.canvasWrapper canvas');
	let svg = page.querySelector('.annotationLayer');
	let wrapper = page.querySelector('.canvasWrapper');
	/* let textLayer = page.querySelector('.textLayer'); */
	let outputScale = getOutputScale(context);
	let transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
	let sfx = approximateFraction(outputScale.sx);
	let sfy = approximateFraction(outputScale.sy);

	// Adjust width/height for scale
	page.style.visibility = '';
	canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
	canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
	canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
	canvas.style.height = roundToDivide(viewport.height, sfx[1]) + 'px';
	svg.setAttribute('width', viewport.width);
	svg.setAttribute('height', viewport.height);
	svg.style.width = `${viewport.width}px`;
	svg.style.height = `${viewport.height}px`;
	page.style.width = `${viewport.width}px`;
	page.style.height = `${viewport.height}px`;
	wrapper.style.width = `${viewport.width}px`;
	wrapper.style.height = `${viewport.height}px`;
	/* textLayer.style.width = `${viewport.width}px`;
	textLayer.style.height = `${viewport.height}px`; */

	return transform;
}

/**
 * The following methods are taken from mozilla/pdf.js and as such fall under
 * the Apache License (http://www.apache.org/licenses/).
 *
 * Original source can be found at mozilla/pdf.js:
 * https://github.com/mozilla/pdf.js/blob/master/web/ui_utils.js
 */

/**
 * Approximates a float number as a fraction using Farey sequence (max order
 * of 8).
 *
 * @param {Number} x Positive float number
 * @return {Array} Estimated fraction: the first array item is a numerator,
 *                 the second one is a denominator.
 */
function approximateFraction(x) {
	// Fast path for int numbers or their inversions.
	if (Math.floor(x) === x) {
		return [x, 1];
	}

	const xinv = 1 / x;
	const limit = 8;
	if (xinv > limit) {
		return [1, limit];
	} else if (Math.floor(xinv) === xinv) {
		return [1, xinv];
	}

	const x_ = x > 1 ? xinv : x;

	// a/b and c/d are neighbours in Farey sequence.
	let a = 0,
		b = 1,
		c = 1,
		d = 1;

	// Limit search to order 8.
	while (true) {
		// Generating next term in sequence (order of q).
		let p = a + c,
			q = b + d;

		if (q > limit) {
			break;
		}

		if (x_ <= p / q) {
			c = p;
			d = q;
		} else {
			a = p;
			b = q;
		}
	}

	// Select closest of neighbours to x.
	if (x_ - a / b < c / d - x_) {
		return x_ === x ? [a, b] : [b, a];
	} else {
		return x_ === x ? [c, d] : [d, c];
	}
}

function getOutputScale(ctx) {
	let devicePixelRatio = window.devicePixelRatio || 1;
	let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
		ctx.mozBackingStorePixelRatio ||
		ctx.msBackingStorePixelRatio ||
		ctx.oBackingStorePixelRatio ||
		ctx.backingStorePixelRatio || 1;
	let pixelRatio = devicePixelRatio / backingStoreRatio;

	return {
		sx: pixelRatio,
		sy: pixelRatio,
		scaled: pixelRatio !== 1
	};
}

function roundToDivide(x, div) {
	let r = x % div;
	return r === 0 ? x : Math.round(x - r + div);
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_PDFJSAnnotate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


//***********************************************
// docs/main.js is the entry file for webpack
// docs/index.js is the resulting compiled file, which I rename as 'pdf-annotate-index' for use in exams_SAT
//
// Structure:
// 		div#content-wrapper       --> originally, position absolute and scroll element
//			div.pdfViewer#viewer  --> now, position absolute and scroll element
//				div.page
//					div.canvasWrapper
//					svg.annotationLayer(1)
//					div.textLayer
//
//	(1) pdfJS is supposed to create a div for the annotation layer (see pdf_viewer.js). But does pdfjs-annotate libe step in to create the layer as just an svg element ??
//
//***********************************************


// NOT using twitter for posting comments
/* import twitter from 'twitter-text'; */

// NOT using colorpicker
/* import initColorPicker from './shared/initColorPicker'; */

/* import PDFJSAnnotate from '../'; */
// above is NOT as good as import PDFJSAnnotate from '../src/PDFJSAnnotate.js', which rebuilds its submodules and, thus, incorporates any changes made in them
// also, the below (instead of "import * from") seems to be importing all the exports as a 'namespace'


const { UI } = _src_PDFJSAnnotate_js__WEBPACK_IMPORTED_MODULE_0__["default"];
// above is same as const UI = PDFJSAnnotate.UI

const tempTitleElm = document.querySelector('.delete.exam-title');
const documentId = tempTitleElm.textContent;

let PAGE_HEIGHT;
let RENDER_OPTIONS = {
	documentId: documentId,
	pdfDocument: null,
	scale: 1.6,
	rotate: 0
};

// Use LocalStorageAdapter to save and retrieve user's annotations
_src_PDFJSAnnotate_js__WEBPACK_IMPORTED_MODULE_0__["default"].setStoreAdapter(new _src_PDFJSAnnotate_js__WEBPACK_IMPORTED_MODULE_0__["default"].LocalStoreAdapter());

// PDFJS's worker is that library's CORE module (not its DISPLAY or VIEWER module)
// PDFJS's api (called pdfJS itself) is its DISPLAY module and gets loaded via a script tag on the html page
// older versions of PDFJS have a separate VIEWER module which also gets loaded via a script tage on the html page
/* PDFJS.workerSrc = './shared/pdf.worker.js'; */
/* PDFJS.workerSrc = '../pdf-assets/shared/pdf.worker.js'; */
PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.4.162/pdf.worker.min.js';


// Render stuff
let viewer = document.getElementById('viewer');
let NUM_PAGES = 0;
let CURRENT_PAGE = 1;
let createdPageElms;
let renderedPages = {};

// NOT using scrolling of viewer to navigate between pages
/* document.querySelector('.pdfViewer').addEventListener('scroll', function (e) {
	let visiblePageNum = Math.round(e.target.scrollTop / PAGE_HEIGHT) + 1;
	let visiblePage = document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');
	if (visiblePage) {
		// Prevent invoking UI.renderPage on the same page more than once
		if (!renderedPages[visiblePageNum]) {
			renderedPages[visiblePageNum] = true;
			setTimeout(function () {
				UI.renderPage(visiblePageNum, RENDER_OPTIONS);
			});
		}
	}
}); */

function render() {
	PDFJS.getDocument(RENDER_OPTIONS.documentId)
		.then((pdf) => {
			// store the pdf code generated by pdfJS libe in RENDER_OPTIONS object
			RENDER_OPTIONS.pdfDocument = pdf;

			viewer.innerHTML = '';
			NUM_PAGES = pdf.pdfInfo.numPages;

			// create a page element (which includes a canvas AND svg.annotationLayer) for each page
			// originally, a page element also included a div.textLayer, but I've removed it
			for (let i = 0; i < NUM_PAGES; i++) {
				let page = UI.createPage(i + 1);

				// but hide each page element that is NOT the 1st page
				if (i > 0) {
					page.classList.add('hidden');
				}

				// append each newly created page element to the viewer element
				viewer.appendChild(page);
			}

			// use PDFJSAnnotate's UI.renderPage() to create the svg.annotationLayer, BUT ONLY for the 1st page
			// n.b., PDFJSAnnotate is NOT using pdfJS's own annotationLayer (which is a div, NOT an svg)
			UI.renderPage(CURRENT_PAGE, RENDER_OPTIONS)
				.then(([pdfPage, annotations]) => {
					let viewport = pdfPage.getViewport(
						RENDER_OPTIONS.scale,
						RENDER_OPTIONS.rotate
					);
					/* console.log('viewport: ', viewport); */
					PAGE_HEIGHT = viewport.height;
				});

			// create an array to store references to the newly created page elements
			createdPageElms = Array.from(document.querySelectorAll('.page'));
		});
}
render();

// Nav button stuff
// this comes from my own 'pdf-page-script.js' (which was created using latest version of pdfJS)
(function () {
	// scroll up page
	function scrollUp(page) {
		viewer.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}

	// displays previous page
	const prevBtn = document.querySelector('.previous');
	function onPrevPage() {
		if (CURRENT_PAGE <= 1) {
			return;
		}
		CURRENT_PAGE--;
		createdPageElms[CURRENT_PAGE].classList.add('hidden');
		createdPageElms[CURRENT_PAGE - 1].classList.remove('hidden');
		if (!renderedPages[CURRENT_PAGE]) {
			renderedPages[CURRENT_PAGE] = true;
			UI.renderPage(CURRENT_PAGE, RENDER_OPTIONS);
		}
		scrollUp(createdPageElms[CURRENT_PAGE - 1]);
		nextBtn.removeAttribute('disabled');
		if (CURRENT_PAGE <= 1) {
			prevBtn.setAttribute('disabled', true);
		}
	}
	prevBtn.addEventListener('click', onPrevPage);

	// displays next page
	const nextBtn = document.querySelector('.next');
	function onNextPage() {
		if (CURRENT_PAGE >= NUM_PAGES) {
			return;
		}
		prevBtn.removeAttribute('disabled');
		CURRENT_PAGE++;
		createdPageElms[CURRENT_PAGE - 2].classList.add('hidden');
		createdPageElms[CURRENT_PAGE - 1].classList.remove('hidden');
		if (!renderedPages[CURRENT_PAGE]) {
			renderedPages[CURRENT_PAGE] = true;
			UI.renderPage(CURRENT_PAGE, RENDER_OPTIONS);
		}
		scrollUp(createdPageElms[CURRENT_PAGE - 1]);
		if (CURRENT_PAGE >= NUM_PAGES) {
			nextBtn.setAttribute('disabled', true);
		}
	}
	nextBtn.addEventListener('click', onNextPage);
})();

// Toolbar buttons
(function () {
	// always set initial tooltype state as 'none'
	// NO need to store tooltype state in localStorage b/c not persisting it after closing browser
	let tooltype = 'none';
	setActiveToolbarItem(tooltype);

	function setActiveToolbarItem(type, btn) {
		// when this function is invoked, the pre-existing state is 'tooltype'
		// the new state is 'type'
		console.log('preexisting state stored as tooltype: ', tooltype);
		console.log('new type passed as param: ', type);

		// turn off pre-existing button state
		let active = document.querySelector('.toolbar button.active');
		if (active) {
			active.classList.remove('active');

			switch (tooltype) {
			/* case 'cursor':
				UI.disableEdit();
				break; */
			case 'draw-red-line':
			case 'draw-blue-line':
			case 'draw-red-freehand':
			case 'draw-blue-freehand':
				UI.disablePen();
				break;
			case 'text-red':
			case 'text-blue':
				UI.disableText();
				break;
			/* case 'point':
				UI.disablePoint();
				break; */
			case 'area-red-border':
			case 'area-blue-border':
			/* case 'highlight':
			case 'strikeout': */
				UI.disableRect();
				break;
			}
		}

		// turn on current button state
		let button = btn || document.querySelector(`.toolbar button[data-tooltype=${type}]`);
		if (button) {
			button.classList.add('active');

			switch (type) {
			/* case 'cursor':
				UI.enableEdit();
				break; */
			// since NO LONGER using colorPicker and thicknessPicker for drawing, there is no need for setPen function (imported from UI.pen) anymore
			// instead, pass in type as a parameter to UI.enablePen just like what we already do for UI.enableRect(type) below
			case 'draw-red-line':
			case 'draw-blue-line':
			case 'draw-red-freehand':
			case 'draw-blue-freehand':
				UI.enablePen(type);
				break;
			case 'text-red':
			case 'text-blue':
				UI.enableText(type);
				break;
			/* case 'point':
				UI.enablePoint();
				break; */
			case 'area-red-border':
			case 'area-blue-border':
			/* case 'highlight':
			case 'strikeout': */
				UI.enableRect(type);
				break;
			}
		}

		// set passed in param ('type') to be the global variable ('tooltype')
		tooltype = type;
	}

	function handleToolbarClick(e) {
		const target = e.target;
		const type = e.target.getAttribute('data-tooltype');
		if (target.nodeName === 'BUTTON' && type) {
			console.log('handleToolbarClick type: ', type);

			// need to blur every button after it has been clicked; otherwise, it
			// will be affected by style imposed on all buttons by page-styles.css
			target.blur();

			if (type === 'page-clear' || type === tooltype) {
				// ensure that this clicked btn does NOT get activated, while
				// de-activating it if it is being re-clicked by user
				setActiveToolbarItem('none');
			} else {
				// normal behavior
				setActiveToolbarItem(type, target);
			}
		}
	}
	document.querySelector('.toolbar').addEventListener('click', handleToolbarClick);

	// a 'resetToolbar' event gets fired elsewhere whenever an annotation is created
	UI.addEventListener('resetToolbar', (e) => {
		// KEY: pass in preexisting 'tooltype' state so buttons (and their related listeners)
		// remain selected ('active') after drawing an annotation
		setActiveToolbarItem(tooltype);
	});
})();

// Text size stuff
/* (function () {
	let textSize;
	let textColor;

	function initText() {
		let size = document.querySelector('.toolbar .text-size');
		[8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].forEach((s) => {
			size.appendChild(new Option(s, s));
		});

		setText(
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/text/size`) || 14,
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/text/color`) || '#000000');

		initColorPicker(document.querySelector('.text-color'), textColor, function (value) {
			setText(textSize, value);
		});
	}

	function setText(size, color) {
		let modified = false;

		if (textSize !== size) {
			modified = true;
			textSize = size;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/text/size`, textSize);
			document.querySelector('.toolbar .text-size').value = textSize;
		}

		if (textColor !== color) {
			modified = true;
			textColor = color;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/text/color`, textColor);

			let selected = document.querySelector('.toolbar .text-color.color-selected');
			if (selected) {
				selected.classList.remove('color-selected');
				selected.removeAttribute('aria-selected');
			}

			selected = document.querySelector(`.toolbar .text-color[data-color="${color}"]`);
			if (selected) {
				selected.classList.add('color-selected');
				selected.setAttribute('aria-selected', true);
			}

		}

		if (modified) {
			UI.setText(textSize, textColor);
		}
	}

	function handleTextSizeChange(e) {
		setText(e.target.value, textColor);
	}

	document.querySelector('.toolbar .text-size').addEventListener('change', handleTextSizeChange);

	initText();
})(); */

// Pen size stuff
/* (function () {
	let penSize;
	let penColor;

	function initPen() {
		let size = document.querySelector('.toolbar .pen-size');
		for (let i = 0; i < 20; i++) {
			size.appendChild(new Option(i + 1, i + 1));
		}

		setPen(
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/pen/size`) || 1,
			localStorage.getItem(`${RENDER_OPTIONS.documentId}/pen/color`) || '#000000');

		initColorPicker(document.querySelector('.pen-color'), penColor, function (value) {
			setPen(penSize, value);
		});
	}

	function setPen(size, color) {
		let modified = false;

		if (penSize !== size) {
			modified = true;
			penSize = size;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/pen/size`, penSize);
			document.querySelector('.toolbar .pen-size').value = penSize;
		}

		if (penColor !== color) {
			modified = true;
			penColor = color;
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/pen/color`, penColor);

			let selected = document.querySelector('.toolbar .pen-color.color-selected');
			if (selected) {
				selected.classList.remove('color-selected');
				selected.removeAttribute('aria-selected');
			}

			selected = document.querySelector(`.toolbar .pen-color[data-color="${color}"]`);
			if (selected) {
				selected.classList.add('color-selected');
				selected.setAttribute('aria-selected', true);
			}
		}

		if (modified) {
			UI.setPen(penSize, penColor);
		}
	}

	function handlePenSizeChange(e) {
		setPen(e.target.value, penColor);
	}

	document.querySelector('.toolbar .pen-size').addEventListener('change', handlePenSizeChange);

	initPen();
})(); */

// Scale/rotate
/* (function () {
	function setScaleRotate(scale, rotate) {
		scale = parseFloat(scale, 10);
		rotate = parseInt(rotate, 10);

		if (RENDER_OPTIONS.scale !== scale || RENDER_OPTIONS.rotate !== rotate) {
			RENDER_OPTIONS.scale = scale;
			RENDER_OPTIONS.rotate = rotate;

			localStorage.setItem(`${RENDER_OPTIONS.documentId}/scale`, RENDER_OPTIONS.scale);
			localStorage.setItem(`${RENDER_OPTIONS.documentId}/rotate`, RENDER_OPTIONS.rotate % 360);

			render();
		}
	}

	function handleScaleChange(e) {
		setScaleRotate(e.target.value, RENDER_OPTIONS.rotate);
	}

	function handleRotateCWClick() {
		setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate + 90);
	}

	function handleRotateCCWClick() {
		setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate - 90);
	}

	document.querySelector('.toolbar select.scale').value = RENDER_OPTIONS.scale;
	document.querySelector('.toolbar select.scale').addEventListener('change', handleScaleChange);
	document.querySelector('.toolbar .rotate-ccw').addEventListener('click', handleRotateCCWClick);
	document.querySelector('.toolbar .rotate-cw').addEventListener('click', handleRotateCWClick);
})(); */

// Clear and page-clear toolbar button
(function () {
	/* function handleClearClick(e) {
		if (confirm('\nAre you sure you want to clear ALL annotations?')) {
			for (let i = 0; i < NUM_PAGES; i++) {
				document.querySelector(`div#pageContainer${i+1} svg.annotationLayer`).innerHTML = '';
			}

			localStorage.removeItem(`${RENDER_OPTIONS.documentId}/annotations`);
		}
	}
	document.querySelector('.toolbar .clear').addEventListener('click', handleClearClick); */

	function handlePageClearClick(e) {
		const page = document.querySelector('div.page:not(.hidden)');
		const annoLayer = page.querySelector('svg.annotationLayer');
		if (annoLayer && annoLayer.innerHTML.trim().length > 0) {
			if (confirm('\nRemove all the annotations from this page?')) {
				const num = page.getAttribute('data-page-number');
				annoLayer.innerHTML = '';
				removeFromStorage(num);
			}
		}
	}

	function removeFromStorage(num) {
		const clearedPageNum = parseInt(num, 10);
		const storedArray = JSON.parse(localStorage.getItem(`${RENDER_OPTIONS.documentId}/annotations`));
		const newArray = JSON.stringify(storedArray.filter((o) => o.page !== clearedPageNum));
		localStorage.setItem(`${RENDER_OPTIONS.documentId}/annotations`, newArray);
	}

	document.querySelector('.toolbar .page-clear').addEventListener('click', handlePageClearClick);
})();

// Comment stuff -- triggered by 'point' button
/* (function (window, document) {
	let commentList = document.querySelector('#comment-wrapper .comment-list-container');
	let commentForm = document.querySelector('#comment-wrapper .comment-list-form');
	let commentText = commentForm.querySelector('input[type="text"]');

	function supportsComments(target) {
		let type = target.getAttribute('data-pdf-annotate-type');
		return ['point', 'highlight', 'area'].indexOf(type) > -1;
	}

	function insertComment(comment) {
		let child = document.createElement('div');
		child.className = 'comment-list-item';
		child.innerHTML = twitter.autoLink(twitter.htmlEscape(comment.content));

		commentList.appendChild(child);
	}

	function handleAnnotationClick(target) {
		if (supportsComments(target)) {
			let documentId = target.parentNode.getAttribute('data-pdf-annotate-document');
			let annotationId = target.getAttribute('data-pdf-annotate-id');

			PDFJSAnnotate.getStoreAdapter().getComments(documentId, annotationId).then((comments) => {
				commentList.innerHTML = '';
				commentForm.style.display = '';
				commentText.focus();

				commentForm.onsubmit = function () {
					PDFJSAnnotate.getStoreAdapter().addComment(documentId, annotationId, commentText.value.trim())
					.then(insertComment)
					.then(() => {
						commentText.value = '';
						commentText.focus();
					});

					return false;
				};

				comments.forEach(insertComment);
			});
		}
	}

	function handleAnnotationBlur(target) {
		if (supportsComments(target)) {
			commentList.innerHTML = '';
			commentForm.style.display = 'none';
			commentForm.onsubmit = null;

			insertComment({
				content: 'No comments'
			});
		}
	}

	UI.addEventListener('annotation:click', handleAnnotationClick);
	UI.addEventListener('annotation:blur', handleAnnotationBlur);
})(window, document); */

})();

/******/ })()
;