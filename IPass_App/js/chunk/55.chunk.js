webpackJsonp([55],{

/***/ 88:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 374:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(375)

	/* template */
	var __vue_template__ = __webpack_require__(382)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/js/app/setting.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5daba1d5", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5daba1d5", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] setting.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 375:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//

	exports.default = {
	  components: {
	    'setting-main': __webpack_require__(376)
	  }
	};

/***/ },

/***/ 376:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(377)

	/* script */
	__vue_exports__ = __webpack_require__(379)

	/* template */
	var __vue_template__ = __webpack_require__(380)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/componets/setting.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1c4c9dce", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1c4c9dce", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] setting.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 377:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(378);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(89)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1c4c9dce!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./setting.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1c4c9dce!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./setting.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(88)();
	// imports


	// module
	exports.push([module.id, "\n#right-icon {\n  width: 1rem;\n  height: 1rem;\n}\n#logout {\n  width: 100%;\n  height: 2rem;\n  text-align: center;\n  padding-top: 0.3rem;\n  margin-top: 1rem;\n  background-color: #d2d5d5;\n  font-size: 1rem;\n}\n", ""]);

	// exports


/***/ },

/***/ 379:
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  data: function data() {
	    return {
	      settings: {
	        security: '账号与安全',
	        message: '新消息通知',
	        help: '帮助反馈',
	        us: '关于IPass'
	      }
	    };
	  },

	  methods: {
	    changeSetting: function changeSetting(key, val) {
	      alert(key + '|' + val);
	    }
	  }
	};

/***/ },

/***/ 380:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "aui-content aui-margin-b-15 aui-margin-t-20"
	  }, [_c('ul', {
	    staticClass: "aui-list aui-list-in"
	  }, _vm._l((_vm.settings), function(val, key) {
	    return _c('li', {
	      staticClass: "aui-list-item",
	      on: {
	        "click": function($event) {
	          _vm.changeSetting(key, val)
	        }
	      }
	    }, [_c('div', {
	      staticClass: "aui-list-item-inner"
	    }, [_c('div', {
	      staticClass: "aui-list-item-title"
	    }, [_vm._v(_vm._s(val))]), _vm._v(" "), _vm._m(0, true)])])
	  })), _vm._v(" "), _c('div', {
	    attrs: {
	      "id": "logout"
	    }
	  }, [_vm._v("\n    退出登录\n  ")])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "aui-list-item-right"
	  }, [_c('img', {
	    attrs: {
	      "src": __webpack_require__(381),
	      "id": "right-icon"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1c4c9dce", module.exports)
	  }
	}

/***/ },

/***/ 381:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('body', [_c('setting-main')], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5daba1d5", module.exports)
	  }
	}

/***/ }

});