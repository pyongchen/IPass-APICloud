webpackJsonp([1],{

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(76)

	/* template */
	var __vue_template__ = __webpack_require__(82)
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
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/js/app/activity/header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-794cfcdc", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-794cfcdc", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 76:
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
	    name: 'activity-main',
	    url: '../html/' + 'activity-main' + '.html',
	    rect: {
	      x: 0,
	      y: headerH,
	      w: 'auto',
	      h: api.winHeight - headerH - footerH
	    },
	    pageParam: { name: name },
	    bounces: true
	  });
	}
	exports.default = {
	  components: {
	    'activity-header': __webpack_require__(77)
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
	      name: 'activity-header',
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

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(78)

	/* template */
	var __vue_template__ = __webpack_require__(81)
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
	__vue_options__.__file = "/Users/yong/Documents/IPASS/API_Cloud/src/src/componets/activity/header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-315f748b", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-315f748b", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(79);

	var _activitySelect = __webpack_require__(80);

	var _activitySelect2 = _interopRequireDefault(_activitySelect);

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
	      data: _activitySelect2.default
	    };
	  },

	  methods: {
	    showSelect: function showSelect(index) {
	      var name = _activitySelect2.default[index].key;
	      var h = window.offsetH;
	      api.openFrame({
	        name: 'activity-header-' + name,
	        url: '../html/activity-header-' + name + '.html',
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
	        name: 'activity-header-' + _activitySelect2.default[index].key
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
	      name: 'choose'
	    }, function (ret, err) {
	      var val = ret.value,
	          index = 0;
	      switch (val.key) {
	        case 'time':
	          //            alert(val.first + '|' + val.second);
	          index = 0;
	          break;
	        case 'location':
	          index = 1;
	          break;
	        case 'type':
	          //            alert(val.type);
	          index = 2;
	          break;
	        case 'select':
	          //            alert(val.select);
	          index = 3;
	          break;
	      }
	      _this.restore(index);
	    });
	  }
	};

/***/ },

/***/ 79:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 80:
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = [{ 'key': "time", "val": "时间" }, { 'key': "location", "val": "地区" }, { 'key': "type", "val": "类型" }, { 'key': "select", "val": "筛选" }];

/***/ },

/***/ 81:
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
	     require("vue-hot-reload-api").rerender("data-v-315f748b", module.exports)
	  }
	}

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('body', [_c('activity-header')], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-794cfcdc", module.exports)
	  }
	}

/***/ }

});