webpackJsonp([31],{

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

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(270)

	/* template */
	var __vue_template__ = __webpack_require__(277)
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
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/js/app/general-head.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-a3e0da20", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-a3e0da20", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] general-head.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 270:
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
	    'general-head': __webpack_require__(271)
	  },
	  data: function data() {
	    return {
	      name: api.pageParam.item.name,
	      pre: api.pageParam.item.pre
	    };
	  }
	};

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(272)

	/* script */
	__vue_exports__ = __webpack_require__(274)

	/* template */
	var __vue_template__ = __webpack_require__(275)
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
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/componets/general-head.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0cba2a97", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0cba2a97", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] general-head.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(273);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(89)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0cba2a97!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./general-head.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0cba2a97!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./general-head.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(88)();
	// imports


	// module
	exports.push([module.id, "\n.aui-bar {\n  padding-top: 0.5rem !important;\n  overflow-y: hidden;\n}\n#left-icon {\n  width: 1.2rem;\n  height: 1.2rem;\n}\n#name {\n  font-size: 1.1rem;\n}\n#pre {\n  font-size: 0.9rem;\n}\n", ""]);

	// exports


/***/ },

/***/ 274:
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

	exports.default = {
	  props: ['name', 'pre'],
	  data: function data() {
	    return {};
	  },

	  methods: {
	    goBack: function goBack() {
	      api.historyBack(function (ret, err) {
	        if (!ret.status) {
	          api.closeWin();
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    var key = api.pageParam.item.key;
	    var h = $api.dom('header').offsetHeight;
	    api.openFrame({
	      name: key,
	      url: '../html/' + key + '.html',
	      rect: {
	        x: 0,
	        y: h,
	        w: 'auto',
	        h: 'auto'
	      },
	      pageParam: { name: key, h: h },
	      bounces: true
	    });
	  }
	};

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('header', {
	    staticClass: "aui-bar aui-bar-nav"
	  }, [_c('div', {
	    staticClass: "aui-pull-left aui-btn",
	    on: {
	      "click": _vm.goBack
	    }
	  }, [_c('img', {
	    attrs: {
	      "id": "left-icon",
	      "src": __webpack_require__(276)
	    }
	  }), _vm._v(" "), _c('span', {
	    attrs: {
	      "id": "pre"
	    }
	  }, [_vm._v(_vm._s(_vm.pre))])]), _vm._v(" "), _c('div', {
	    staticClass: "aui-title",
	    attrs: {
	      "id": "name"
	    }
	  }, [_vm._v(_vm._s(_vm.name))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0cba2a97", module.exports)
	  }
	}

/***/ },

/***/ 276:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('body', [_c('general-head', {
	    attrs: {
	      "name": _vm.name,
	      "pre": _vm.pre
	    }
	  })], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-a3e0da20", module.exports)
	  }
	}

/***/ }

});