webpackJsonp([43],{

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(326)

	/* template */
	var __vue_template__ = __webpack_require__(332)
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
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/js/app/rank/header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-07b97a56", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-07b97a56", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//

	var headerH = void 0,
	    footerH = void 0;
	function openMain() {
	  api.openFrame({
	    name: 'rank-main',
	    url: '../html/' + 'rank-main' + '.html',
	    rect: {
	      x: 0,
	      y: headerH,
	      w: 'auto',
	      h: api.winHeight - headerH - footerH
	    },
	    hScrollBarEnabled: false,
	    pageParam: { name: name },
	    bounces: true
	  });
	}
	exports.default = {
	  components: {
	    'rank-header': __webpack_require__(327)
	  },
	  data: function data() {
	    return {
	      msg: '12321'
	    };
	  },

	  methods: {},
	  mounted: function mounted() {
	    headerH = api.pageParam.headerH + $api.dom('#search').offsetHeight;
	    footerH = api.pageParam.footerH;
	    window.offsetH = headerH;

	    api.setFrameAttr({
	      name: 'rank-header',
	      rect: {
	        x: 0,
	        y: api.pageParam.headerH,
	        w: 'auto',
	        h: $api.dom('#search').offsetHeight
	      }
	    });
	    openMain();
	  }
	};

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(328)

	/* template */
	var __vue_template__ = __webpack_require__(331)
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
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/componets/rank/header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-49839a4e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-49839a4e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(329);

	var _rankSelect = __webpack_require__(330);

	var _rankSelect2 = _interopRequireDefault(_rankSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	  props: [''],
	  data: function data() {
	    return {
	      data: _rankSelect2.default
	    };
	  },

	  methods: {
	    showSelect: function showSelect(index) {
	      var name = _rankSelect2.default[index].key;
	      var h = window.offsetH;
	      api.openFrame({
	        name: 'rank-header-' + name,
	        url: '../html/rank-header-' + name + '.html',
	        rect: {
	          x: 0,
	          y: h,
	          w: 'auto',
	          h: '200'
	        }
	      });
	    },
	    hideSelect: function hideSelect(index) {
	      api.closeFrame({
	        name: 'rank-header-' + _rankSelect2.default[index].key
	      });
	    },

	    // 将筛选导航条的上下图标回位
	    restore: function restore(index) {
	      var icons = $api.domAll('.aui-iconfont');
	      $api.removeCls(icons[index], 'aui-icon-down');
	    },
	    select: function select(index) {
	      var icons = $api.domAll('.aui-iconfont');
	      if ($api.hasCls(icons[index], 'aui-icon-down')) {
	        $api.removeCls(icons[index], 'aui-icon-down');
	        $api.addCls(icons[index], 'aui-icon-up');
	        this.hideSelect(index);
	      } else {
	        for (var i = 0; i < icons.length; i++) {
	          $api.removeCls(icons[i], 'aui-icon-down');
	          this.hideSelect(i);
	        }
	        $api.addCls(icons[index], 'aui-icon-down');
	        this.showSelect(index);
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    api.addEventListener({
	      name: 'rank'
	    }, function (ret, err) {
	      var val = ret.value;
	      //        alert(val.index + '|' + val.key + '|' + val.type);
	      _this.restore(val.index);
	    });
	  }
	};

/***/ },

/***/ 329:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 330:
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = [{ key: "location", val: "地区" }, { key: "distance", val: "距离" }, { key: "level", val: "等级" }, { key: "select", val: "筛选" }];

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "search"
	    }
	  }, [_c('div', {
	    staticClass: "aui-bar aui-bar-btn aui-bar-btn-full"
	  }, _vm._l((_vm.data), function(sel, i) {
	    return _c('div', {
	      staticClass: "aui-bar-btn-item",
	      on: {
	        "click": function($event) {
	          _vm.select(i)
	        }
	      }
	    }, [_c('span', [_vm._v(_vm._s(sel.val))]), _vm._v(" "), _c('i', {
	      staticClass: "aui-iconfont aui-icon-top"
	    })])
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-49839a4e", module.exports)
	  }
	}

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('body', [_c('rank-header')], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-07b97a56", module.exports)
	  }
	}

/***/ }

});