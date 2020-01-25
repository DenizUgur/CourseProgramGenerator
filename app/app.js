/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/stylesheets/main.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader!./src/stylesheets/main.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n}\n\n.page-content {\n  padding: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: sans-serif;\n  color: #525252;\n}\n\n.row > * {\n  margin-bottom: 5px;\n}\n\na {\n  text-decoration: none;\n  color: #cb3837;\n}\n\ntd {\n  text-align: center !important;\n}\n\n.mdl-chip {\n  margin: 5px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylesheets_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stylesheets/main.css */ "./src/stylesheets/main.css");
/* harmony import */ var _stylesheets_main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_main_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_context_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/context_menu.js */ "./src/helpers/context_menu.js");
/* harmony import */ var _helpers_external_links_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/external_links.js */ "./src/helpers/external_links.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _brain_process__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./brain/process */ "./src/brain/process.js");
 // Small helpers you might want to keep






const moment = __webpack_require__(/*! moment */ "moment");

moment.locale("tr");
jquery__WEBPACK_IMPORTED_MODULE_3___default()("#app").css("display", "block");
jquery__WEBPACK_IMPORTED_MODULE_3___default()("#courses_i").on("keypress", event => {
  jquery__WEBPACK_IMPORTED_MODULE_3___default()("#courses").empty();
  event.target.value.split(" ").forEach(i => {
    if (i.includes(".")) {
      var name = i.substring(0, i.indexOf("."));
      var parent = jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
        class: "mdl-chip mdl-chip--contact"
      });
      parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
        class: "mdl-chip__contact mdl-color--blue-500 mdl-color-text--white"
      }).html(name.toUpperCase()));
      parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
        class: "mdl-chip__text"
      }).html(i.substring(i.indexOf(".") + 1)));
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#courses").append(parent);
    }
  });
});
jquery__WEBPACK_IMPORTED_MODULE_3___default()("#uhours_i").on("keypress", event => {
  var hours = [];
  var weekdays = ["Mo", "Tu", "We", "Th", "Fr"];
  var input = event.target.value.split(" ");

  if (input.length % 2 == 0) {
    input.forEach((v, index) => {
      var i = v.substring(0, v.indexOf(","));
      var clock = v.substring(v.indexOf(",") + 1);
      var hi = hours.findIndex(vi => vi.i == i);

      if (hi == -1) {
        hours.push({
          i: i,
          clock: clock
        });
      } else {
        hours[hi].clock = hours[hi].clock + " " + clock;
      }
    });
  }

  jquery__WEBPACK_IMPORTED_MODULE_3___default()("#uhours").empty();
  hours.forEach(val => {
    var wi = weekdays[val.i - 1];
    var hs = val.clock;
    var parent = jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
      class: "mdl-chip mdl-chip--contact"
    });
    parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
      class: "mdl-chip__contact mdl-color--blue-500 mdl-color-text--white"
    }).html(wi.toUpperCase()));
    parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
      class: "mdl-chip__text"
    }).html(hs));
    jquery__WEBPACK_IMPORTED_MODULE_3___default()("#uhours").append(parent);
  });
});
jquery__WEBPACK_IMPORTED_MODULE_3___default()("#start").on("click", () => {
  if (jquery__WEBPACK_IMPORTED_MODULE_3___default()("#courses_i").val() != "") {
    Object(_brain_process__WEBPACK_IMPORTED_MODULE_4__["getWorld"])().then(world => {
      Object(_brain_process__WEBPACK_IMPORTED_MODULE_4__["getResult"])(world, jquery__WEBPACK_IMPORTED_MODULE_3___default()("#courses_i").val().trim().toUpperCase(), jquery__WEBPACK_IMPORTED_MODULE_3___default()("#uhours_i").val().trim()).then(tables => drawTable(tables));
    });
  } else {
    alert("Enter a course!");
  }
});

function drawTable(tables) {
  jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout__tab").each(i => {
    if (i == 0) {
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout__tab-panel:eq(" + i + ")").toggleClass("is-active");
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout__tab:eq(" + i + ")").toggleClass("is-active");
    } else if (i == 1) {
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout__tab-panel:eq(" + i + ")").toggleClass("is-active");
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout__tab:eq(" + i + ")").toggleClass("is-active");
    }

    jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout__tab:eq(" + i + ")").removeClass("hidden");
  });
  jquery__WEBPACK_IMPORTED_MODULE_3___default()("#mprogram").empty();

  for (var i = 0; i < 5 * 11; i++) jquery__WEBPACK_IMPORTED_MODULE_3___default()("#mprogram").append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<div>"));

  jquery__WEBPACK_IMPORTED_MODULE_3___default()("#alternatives tbody").empty();
  jquery__WEBPACK_IMPORTED_MODULE_3___default()("#mainlist tbody").empty();
  var pluss = [];
  var m_plus_s = tables[0].concat(tables[1]);
  m_plus_s.sort((x, y) => x[0] + x[3] < y[0] + y[3] ? -1 : 1).forEach(c => {
    var parent = jquery__WEBPACK_IMPORTED_MODULE_3___default()("<tr>");
    c.forEach((cc, i) => {
      if (i == 3) cc = moment.weekdays(true)[cc - 1];
      parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<td>").html(cc));
    });
    jquery__WEBPACK_IMPORTED_MODULE_3___default()("#mainlist tbody").append(parent);
  });
  m_plus_s.forEach(c => {
    var start = Number.parseInt(c[4].split(":")[0]);
    var end = Number.parseInt(c[5].split(":")[0]);

    if (end - 1 > start) {
      for (var i = 1; i < end - start; i++) {
        var nc = [...c];
        nc[4] = start + i + ":40";
        nc.push(true); // tells that this object doesn't need a name

        pluss.push(nc);
      }
    }
  });
  m_plus_s.concat(pluss).forEach(c => {
    var parent = jquery__WEBPACK_IMPORTED_MODULE_3___default()("<div>", {
      class: "accent-color-" + (m_plus_s.findIndex(el => el[0] == c[0]) + 1) + "-gradient"
    });
    var start = Number.parseInt(c[4].split(":")[0]);
    var indexday = start - 8 + (Number.parseInt(c[4].split(":")[1]) < 30 ? 1 : 0);
    var index = c[3] - 1 + indexday * 5;
    var class_name;

    if (c.length <= 6) {
      class_name = c[1].indexOf(",") > 0 ? c[1].substring(0, c[1].indexOf(",")) : c[1];
      class_name = c[0] + "." + class_name;
    } else {
      class_name = "";
    }

    parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<span>", {
      class: "name"
    }).text(class_name));
    jquery__WEBPACK_IMPORTED_MODULE_3___default()("#mprogram > div:eq(" + index + ")").append(parent);
  });
  tables[2].forEach(c => {
    var parent = jquery__WEBPACK_IMPORTED_MODULE_3___default()("<tr>");
    c.forEach((cc, i) => {
      if (i == 3) cc = moment.weekdays(true)[cc - 1];
      parent.append(jquery__WEBPACK_IMPORTED_MODULE_3___default()("<td>").html(cc));
    });
    jquery__WEBPACK_IMPORTED_MODULE_3___default()("#alternatives tbody").append(parent);
  });
  jquery__WEBPACK_IMPORTED_MODULE_3___default()("#errors").html(tables[4].join("</br>"));
  jquery__WEBPACK_IMPORTED_MODULE_3___default()(".mdl-layout-title").text("Course Program Generator (" + tables[3] + " Credits)");
}

/***/ }),

/***/ "./src/brain/process.js":
/*!******************************!*\
  !*** ./src/brain/process.js ***!
  \******************************/
/*! exports provided: getWorld, getResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorld", function() { return getWorld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResult", function() { return getResult; });
const XLSX = __webpack_require__(/*! xlsx */ "xlsx");

const moment = __webpack_require__(/*! moment */ "moment");

const path = __webpack_require__(/*! path */ "path");

const fs = __webpack_require__(/*! fs */ "fs");

let directoryPath = path.join(__dirname, "bin");
var worksheet = null;
var errors = [];
function getWorld() {
  var world = [];
  return new Promise((resolve, reject) => {
    if (false) {}

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        log("Catalogs must be placed in 'bin' folder");
        reject();
      }

      files.forEach(function (file) {
        if (file == ".DS_Store") return false;
        var workbook = XLSX.readFile(path.join(directoryPath, file));
        var data = workbook.SheetNames[0];
        worksheet = workbook.Sheets[data];

        for (var ii = 2; cell(0, ii) != undefined; ii++) {
          var course = {
            name: null,
            credits: null,
            class: null,
            teacher: null,
            corequisite: null,
            hours: []
          };
          course.name = cell(0, ii) + "." + cell(1, ii);
          course.credits = parseInt(cell(5, ii));
          course.class = cell(2, ii);
          course.teacher = cell(3, ii).lowerCaseAllWordsExceptFirstLetters(); //corequisite

          if (cell(4, ii) && cell(4, ii) != "-") {
            course.corequisite = [];

            if (cell(4, ii).indexOf(" ve ") != -1) {
              course.corequisite = cell(4, ii).split(" ve ");
            } else {
              course.corequisite = cell(4, ii).split(" and ");
            }

            course.corequisite = course.corequisite.map(item => {
              return item.replace(" ", ".");
            });
          } //hours


          var hours = cell(6, ii).split("\n");

          for (var hour in hours) {
            if (hours[hour] == "") continue;

            try {
              var hourOBJ = parseHourOBJ(hours[hour]);
              if (course.hours.length > 0 && isEqual(hourOBJ, course.hours[course.hours.length - 1])) continue;
              course.hours.push(hourOBJ);
            } catch (ex) {
              continue;
            }
          }

          world.push(course);
        }
      });
      resolve(world);
    });
  });
}
function getResult(world, input, unavailable_hours = "") {
  return new Promise((resolve, reject) => {
    var found = [];
    var result = [];
    errors = [];
    unavailable_hours = unavailable_hours.split(" ");
    input = input.split(" ");
    unavailable_hours.forEach(function (el, i) {
      if (i % 2 == 1) {
        result.push({
          name: null,
          class: null,
          hours: [[moment(unavailable_hours[i - 1], "d,HH:mm").valueOf(), moment(el, "d,HH:mm").valueOf()]]
        });
      }
    }); //Show if anything is not found in the world

    input.forEach(function (el) {
      var f = false;
      world.forEach(function (eli) {
        if (el == eli.name) f = true;
      });
      if (!f) log(el + " not found.");
    }); //Sort so that it is guarenteed that A section will be recommended first

    world.sort((x, y) => x.class < y.class ? -1 : 1); //Populate found

    input.forEach(function (el, i) {
      world.forEach(function (eli) {
        if (eli.name == el.toUpperCase()) {
          found.push(eli);

          if (eli.corequisite) {
            eli.corequisite.forEach(function (elii) {
              world.forEach(function (eliii) {
                if (eliii.name.replace(".", "") == elii || eliii.name == elii) {
                  found.push(eliii);
                }
              });
            });
          }
        }
      });
    }); //Populate qualifiers with candidates.

    var qualifiers = [];
    found.forEach(function (currentCourse) {
      var qualifierOBJ = {
        name: currentCourse.name,
        selected: null,
        collidesWith: [],
        candidates: [currentCourse],
        alternatives: []
      };
      var s = qualifiers.findIndex(q => {
        return q.name == currentCourse.name;
      });

      if (s != -1) {
        qualifiers[s].candidates.push(currentCourse);
      } else {
        qualifiers.push(qualifierOBJ);
      }
    }); //Create beautiful result

    qualifiers.forEach((qu, i) => {
      try {
        qu.candidates.forEach(quc => {
          var eligible = true; //Check if it collides with unavailable hours

          result.forEach(res => {
            res.hours.forEach(U => {
              quc.hours.forEach(I => {
                if (isColliding(U, I)) eligible = false;
              });
            });
          });

          if (eligible) {
            //Try to fit on the first try
            //If it fails gather which courses it collides with
            qualifiers.forEach((qi, iii) => {
              if (qi.selected) {
                qi.selected.hours.forEach(U => {
                  quc.hours.forEach(I => {
                    if (isColliding(U, I)) {
                      if (qualifiers[i].collidesWith.findIndex(ci => {
                        return ci.name == qi.name;
                      }) == -1) {
                        qualifiers[i].collidesWith.push(qi);
                      }

                      eligible = false;
                    }
                  });
                });
              } //If failed, lastly try to change the classes that it collides with their candidates


              if (!eligible && iii == qualifiers.length - 1) {
                try {
                  qu.collidesWith.forEach(col => {
                    log(quc.name + "." + quc.class + " collides with " + col.name + "." + col.selected.class);

                    if (col.candidates.length > 1) {
                      log("Trying to change " + col.name + " with a different class");
                      col.candidates.forEach(colcan => {
                        if (col.selected.class != colcan.class) {
                          var inner_eligible = true;
                          qualifiers.forEach(qi => {
                            if (qi.selected) {
                              qi.selected.hours.forEach(U => {
                                colcan.hours.forEach(I => {
                                  if (isColliding(U, I)) {
                                    inner_eligible = false;
                                  }
                                });
                              });
                            }
                          });

                          if (inner_eligible) {
                            //Okay so, we can move colliding class to another
                            //But if we assume the new class in place
                            //Can we place current class into the new place (quc)
                            //First find index of col on qualifier and change class
                            //But save original class
                            var original_index = qualifiers.findIndex(fi => {
                              return fi.name == col.name;
                            });
                            var original_selected = col.selected;
                            qualifiers[original_index].selected = colcan; //Check if quc or colcan collides with unavailable hours

                            result.forEach(res => {
                              res.hours.forEach(U => {
                                quc.hours.forEach(I => {
                                  if (isColliding(U, I)) inner_eligible = false;
                                });
                                colcan.hours.forEach(I => {
                                  if (isColliding(U, I)) inner_eligible = false;
                                });
                              });
                            }); //Test for other courses

                            qualifiers.forEach(qi => {
                              if (qi.selected) {
                                qi.selected.hours.forEach(U => {
                                  quc.hours.forEach(I => {
                                    if (isColliding(U, I)) {
                                      inner_eligible = false;
                                    }
                                  });
                                });
                              }
                            });

                            if (inner_eligible) {
                              log("Wuhuu, we can change it with " + colcan.name + "." + colcan.class);
                              log();
                              eligible = true;
                              throw BreakException;
                            } else {
                              qualifiers[original_index].selected = original_selected;
                            }
                          }
                        }
                      });
                    } else {
                      log("There is nothing we can do!");
                      throw BreakException;
                    }

                    log("Failed!\n");
                  });
                } catch (ex) {}
              }
            });
          }

          if (eligible) {
            if (!qualifiers[i].selected) qualifiers[i].selected = quc;
            throw BreakException;
          }
        });
      } catch (ex) {}
    }); //Corequisite check, if fails remove all parent and children.

    qualifiers.forEach(function (q, i) {
      if (q.selected && q.selected.corequisite) {
        var parents = q.selected.corequisite;
        var eligible = false;
        parents.forEach(function (p) {
          qualifiers.forEach(function (qf) {
            if (qf.selected) {
              if (p == qf.name.replace(".", "") || p == qf.name) eligible = true;
            }
          });
        });

        if (!eligible) {
          qualifiers[i].selected = null;
        }
      }
    }); //Add alternative classes

    var alternatives = [];
    var table = [];
    var excess = [];
    qualifiers.forEach(q => {
      q.candidates.forEach(qc => {
        var eligible = true;

        try {
          qualifiers.forEach(iq => {
            //Has selected course
            if (iq.selected) {
              iq.selected.hours.forEach(U => {
                qc.hours.forEach(I => {
                  if (iq.name == qc.name && isEqual(U, I)) {
                    //Check if same name and same hours
                    eligible = iq.selected.class != qc.class;
                  } else if (!isColliding(U, I)) {
                    //Check if it collides with any other courses
                    eligible = true;
                  } else {
                    eligible = false;
                  }

                  result.forEach(res => {
                    res.hours.forEach(U => {
                      qc.hours.forEach(I => {
                        if (isColliding(U, I)) eligible = false;
                      });
                    });
                  });
                  if (!eligible) throw BreakException();
                });
              });
            }
          });
        } catch (ex) {}

        if (eligible) {
          alternatives.push([qc.name, qc.class, qc.teacher, moment(qc.hours[0][0]).day(), moment(qc.hours[0][0]).format("HH:mm"), moment(qc.hours[0][1]).format("HH:mm")]);
        }
      });
    });
    qualifiers.forEach(q => {
      if (q.selected) result.push(q.selected);
    }); //Print results

    var total_credits = 0;
    result.forEach(function (el) {
      if (el.name) {
        table.push([el.name, el.class, el.teacher, moment(el.hours[0][0]).day(), moment(el.hours[0][0]).format("HH:mm"), moment(el.hours[0][1]).format("HH:mm")]);
        total_credits += el.credits;
      }

      if (el.hours.length > 1) {
        if (el.name) {
          excess.push([el.name, el.class, el.teacher, moment(el.hours[1][0]).day(), moment(el.hours[1][0]).format("HH:mm"), moment(el.hours[1][1]).format("HH:mm")]);
        }
      }
    }); //Check if anything has failed

    input.forEach(function (eli) {
      var f = false;
      result.forEach(function (el) {
        if (eli == el.name) f = true;
      });
      if (!f) log(eli + " is impossible to fit to your importance order.");
    });
    resolve([table, excess, alternatives, total_credits, errors]);
  });
}

function isColliding(a, b) {
  return a[0] <= b[0] && b[0] <= a[1] || b[0] <= a[0] && a[0] <= b[1];
}

String.prototype.lowerCaseAllWordsExceptFirstLetters = function () {
  var arr = this.split(" ");
  arr.forEach(function (word, i) {
    arr[i] = word.charAt(0) + word.slice(1).toLowerCase();
  });
  return arr.join(" ");
};

function cell(i, ii) {
  var read_cell = ["A", "B", "C", "G", "I", "F", "L"];
  var desired_cell = worksheet[read_cell[i] + ii];
  return desired_cell ? desired_cell.v : undefined;
}

function isEqual(a, b) {
  if (a == undefined || b == undefined) return false;
  return a[0] == b[0] && a[1] == b[1];
}

function parseHourOBJ(origin) {
  moment.locale("tr");
  var hourOBJ = [null, null];
  var day = origin.split(" | ")[0];
  hourOBJ[0] = origin.split(" | ")[1].split(" - ")[0].trim();
  hourOBJ[1] = origin.split(" | ")[1].split(" - ")[1].trim();
  day = moment.weekdays(true).indexOf(day);
  hourOBJ[0] = moment("1," + hourOBJ[0], "d,HH:mm").add(day, "d").valueOf();
  hourOBJ[1] = moment("1," + hourOBJ[1], "d,HH:mm").add(day, "d").valueOf();
  return hourOBJ;
}

function log(msg) {
  errors.push(msg);
}

/***/ }),

/***/ "./src/helpers/context_menu.js":
/*!*************************************!*\
  !*** ./src/helpers/context_menu.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

const Menu = electron__WEBPACK_IMPORTED_MODULE_0__["remote"].Menu;
const MenuItem = electron__WEBPACK_IMPORTED_MODULE_0__["remote"].MenuItem;

const isAnyTextSelected = () => {
  return window.getSelection().toString() !== "";
};

const cut = new MenuItem({
  label: "Cut",
  click: () => {
    document.execCommand("cut");
  }
});
const copy = new MenuItem({
  label: "Copy",
  click: () => {
    document.execCommand("copy");
  }
});
const paste = new MenuItem({
  label: "Paste",
  click: () => {
    document.execCommand("paste");
  }
});
const normalMenu = new Menu();
normalMenu.append(copy);
const textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);
document.addEventListener("contextmenu", event => {
  switch (event.target.nodeName) {
    case "TEXTAREA":
    case "INPUT":
      event.preventDefault();
      textEditingMenu.popup(electron__WEBPACK_IMPORTED_MODULE_0__["remote"].getCurrentWindow());
      break;

    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(electron__WEBPACK_IMPORTED_MODULE_0__["remote"].getCurrentWindow());
      }

  }
}, false);

/***/ }),

/***/ "./src/helpers/external_links.js":
/*!***************************************!*\
  !*** ./src/helpers/external_links.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// Convenient way for opening links in external browser, not in the app.
// Useful especially if you have a lot of links to deal with.
//
// Usage:
//
// Every link with class ".js-external-link" will be opened in external browser.
// <a class="js-external-link" href="http://google.com">google</a>
//
// The same behaviour for many links can be achieved by adding
// this class to any parent tag of an anchor tag.
// <p class="js-external-link">
//    <a href="http://google.com">google</a>
//    <a href="http://bing.com">bing</a>
// </p>


const supportExternalLinks = event => {
  let href;
  let isExternal = false;

  const checkDomElement = element => {
    if (element.nodeName === "A") {
      href = element.getAttribute("href");
    }

    if (element.classList.contains("js-external-link")) {
      isExternal = true;
    }

    if (href && isExternal) {
      electron__WEBPACK_IMPORTED_MODULE_0__["shell"].openExternal(href);
      event.preventDefault();
    } else if (element.parentElement) {
      checkDomElement(element.parentElement);
    }
  };

  checkDomElement(event.target);
};

document.addEventListener("click", supportExternalLinks, false);

/***/ }),

/***/ "./src/stylesheets/main.css":
/*!**********************************!*\
  !*** ./src/stylesheets/main.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./main.css */ "./node_modules/css-loader/index.js!./src/stylesheets/main.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("xlsx");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map