/*!
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
var $api = function (window) {
	var u = {};
	var isAndroid = (/android/gi).test(navigator.appVersion);
	var uzStorage = function () {
		var ls = window.localStorage;
		if (isAndroid) {
			ls = os.localStorage();
		}
		return ls;
	};

	function parseArguments(url, data, fnSuc, dataType) {
		if (typeof (data) == 'function') {
			dataType = fnSuc;
			fnSuc = data;
			data = undefined;
		}
		if (typeof (fnSuc) != 'function') {
			dataType = fnSuc;
			fnSuc = undefined;
		}
		return {
			url: url,
			data: data,
			fnSuc: fnSuc,
			dataType: dataType
		};
	}


	u.trim = function (str) {
		if (String.prototype.trim) {
			return str == null ? "" : String.prototype.trim.call(str);
		} else {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}
	};
	u.trimAll = function (str) {
		return str.replace(/\s*/g, '');
	};
	u.isElement = function (obj) {
		return !!(obj && obj.nodeType == 1);
	};
	u.isArray = function (obj) {
		if (Array.isArray) {
			return Array.isArray(obj);
		} else {
			return obj instanceof Array;
		}
	};
	u.isEmptyObject = function (obj) {
		if (JSON.stringify(obj) === '{}') {
			return true;
		}
		return false;
	};
	u.addEvt = function (el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.addEvt Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		if (el.addEventListener) {
			el.addEventListener(name, fn, useCapture);
		}
	};
	u.rmEvt = function (el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		if (el.removeEventListener) {
			el.removeEventListener(name, fn, useCapture);
		}
	};
	u.one = function (el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.one Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		var that = this;
		var cb = function () {
			fn && fn();
			that.rmEvt(el, name, cb, useCapture);
		};
		that.addEvt(el, name, cb, useCapture);
	};
	u.dom = function (el, selector) {
		if (arguments.length === 1 && typeof arguments[0] == 'string') {
			if (document.querySelector) {
				return document.querySelector(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelector) {
				return el.querySelector(selector);
			}
		}
	};
	u.domAll = function (el, selector) {
		if (arguments.length === 1 && typeof arguments[0] == 'string') {
			if (document.querySelectorAll) {
				return document.querySelectorAll(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelectorAll) {
				return el.querySelectorAll(selector);
			}
		}
	};
	u.byId = function (id) {
		return document.getElementById(id);
	};
	u.first = function (el, selector) {
		if (arguments.length === 1) {
			if (!u.isElement(el)) {
				console.warn('$api.first Function need el param, el param must be DOM Element');
				return;
			}
			return el.children[0];
		}
		if (arguments.length === 2) {
			return this.dom(el, selector + ':first-child');
		}
	};
	u.last = function (el, selector) {
		if (arguments.length === 1) {
			if (!u.isElement(el)) {
				console.warn('$api.last Function need el param, el param must be DOM Element');
				return;
			}
			var children = el.children;
			return children[children.length - 1];
		}
		if (arguments.length === 2) {
			return this.dom(el, selector + ':last-child');
		}
	};
	u.eq = function (el, index) {
		return this.dom(el, ':nth-child(' + index + ')');
	};
	u.not = function (el, selector) {
		return this.domAll(el, ':not(' + selector + ')');
	};
	u.prev = function (el) {
		if (!u.isElement(el)) {
			console.warn('$api.prev Function need el param, el param must be DOM Element');
			return;
		}
		var node = el.previousSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.previousSibling;
			return node;
		}
	};
	u.next = function (el) {
		if (!u.isElement(el)) {
			console.warn('$api.next Function need el param, el param must be DOM Element');
			return;
		}
		var node = el.nextSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.nextSibling;
			return node;
		}
	};
	u.closest = function (el, selector) {
		if (!u.isElement(el)) {
			console.warn('$api.closest Function need el param, el param must be DOM Element');
			return;
		}
		var doms, targetDom;
		var isSame = function (doms, el) {
			var i = 0,
				len = doms.length;
			for (i; i < len; i++) {
				if (doms[i].isEqualNode(el)) {
					return doms[i];
				}
			}
			return false;
		};
		var traversal = function (el, selector) {
			doms = u.domAll(el.parentNode, selector);
			targetDom = isSame(doms, el);
			while (!targetDom) {
				el = el.parentNode;
				if (el != null && el.nodeType == el.DOCUMENT_NODE) {
					return false;
				}
				traversal(el, selector);
			}

			return targetDom;
		};

		return traversal(el, selector);
	};
	u.contains = function (parent, el) {
		var mark = false;
		if (el === parent) {
			mark = true;
			return mark;
		} else {
			do {
				el = el.parentNode;
				if (el === parent) {
					mark = true;
					return mark;
				}
			} while (el === document.body || el === document.documentElement);

			return mark;
		}

	};
	u.remove = function (el) {
		if (el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	};
	u.attr = function (el, name, value) {
		if (!u.isElement(el)) {
			console.warn('$api.attr Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length == 2) {
			return el.getAttribute(name);
		} else if (arguments.length == 3) {
			el.setAttribute(name, value);
			return el;
		}
	};
	u.removeAttr = function (el, name) {
		if (!u.isElement(el)) {
			console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 2) {
			el.removeAttribute(name);
		}
	};
	u.hasCls = function (el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.hasCls Function need el param, el param must be DOM Element');
			return;
		}
		if (el.className.indexOf(cls) > -1) {
			return true;
		} else {
			return false;
		}
	};
	u.addCls = function (el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.addCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.add(cls);
		} else {
			var preCls = el.className;
			var newCls = preCls + ' ' + cls;
			el.className = newCls;
		}
		return el;
	};
	u.removeCls = function (el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.removeCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.remove(cls);
		} else {
			var preCls = el.className;
			var newCls = preCls.replace(cls, '');
			el.className = newCls;
		}
		return el;
	};
	u.toggleCls = function (el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.toggle(cls);
		} else {
			if (u.hasCls(el, cls)) {
				u.removeCls(el, cls);
			} else {
				u.addCls(el, cls);
			}
		}
		return el;
	};
	u.val = function (el, val) {
		if (!u.isElement(el)) {
			console.warn('$api.val Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			switch (el.tagName) {
				case 'SELECT':
					var value = el.options[el.selectedIndex].value;
					return value;
				case 'INPUT':
					return el.value;
				case 'TEXTAREA':
					return el.value;
			}
		}
		if (arguments.length === 2) {
			switch (el.tagName) {
				case 'SELECT':
					el.options[el.selectedIndex].value = val;
					return el;
				case 'INPUT':
					el.value = val;
					return el;
				case 'TEXTAREA':
					el.value = val;
					return el;
			}
		}

	};
	u.prepend = function (el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.prepend Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('afterbegin', html);
		return el;
	};
	u.append = function (el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.append Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('beforeend', html);
		return el;
	};
	u.before = function (el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.before Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('beforebegin', html);
		return el;
	};
	u.after = function (el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.after Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('afterend', html);
		return el;
	};
	u.html = function (el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.html Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			return el.innerHTML;
		} else if (arguments.length === 2) {
			el.innerHTML = html;
			return el;
		}
	};
	u.text = function (el, txt) {
		if (!u.isElement(el)) {
			console.warn('$api.text Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			return el.textContent;
		} else if (arguments.length === 2) {
			el.textContent = txt;
			return el;
		}
	};
	u.offset = function (el) {
		if (!u.isElement(el)) {
			console.warn('$api.offset Function need el param, el param must be DOM Element');
			return;
		}
		var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

		var rect = el.getBoundingClientRect();
		return {
			l: rect.left + sl,
			t: rect.top + st,
			w: el.offsetWidth,
			h: el.offsetHeight
		};
	};
	u.css = function (el, css) {
		if (!u.isElement(el)) {
			console.warn('$api.css Function need el param, el param must be DOM Element');
			return;
		}
		if (typeof css == 'string' && css.indexOf(':') > 0) {
			el.style && (el.style.cssText += ';' + css);
		}
	};
	u.cssVal = function (el, prop) {
		if (!u.isElement(el)) {
			console.warn('$api.cssVal Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 2) {
			var computedStyle = window.getComputedStyle(el, null);
			return computedStyle.getPropertyValue(prop);
		}
	};
	u.jsonToStr = function (json) {
		if (typeof json === 'object') {
			return JSON && JSON.stringify(json);
		}
	};
	u.strToJson = function (str) {
		if (typeof str === 'string') {
			return JSON && JSON.parse(str);
		}
	};
	u.setStorage = function (key, value) {
		if (arguments.length === 2) {
			var v = value;
			if (typeof v == 'object') {
				v = JSON.stringify(v);
				v = 'obj-' + v;
			} else {
				v = 'str-' + v;
			}
			var ls = uzStorage();
			if (ls) {
				ls.setItem(key, v);
			}
		}
	};
	u.getStorage = function (key) {
		var ls = uzStorage();
		if (ls) {
			var v = ls.getItem(key);
			if (!v) {
				return;
			}
			if (v.indexOf('obj-') === 0) {
				v = v.slice(4);
				return JSON.parse(v);
			} else if (v.indexOf('str-') === 0) {
				return v.slice(4);
			}
		}
	};
	u.rmStorage = function (key) {
		var ls = uzStorage();
		if (ls && key) {
			ls.removeItem(key);
		}
	};
	u.clearStorage = function () {
		var ls = uzStorage();
		if (ls) {
			ls.clear();
		}
	};

	/*by king*/
	u.fixIos7Bar = function (el) {
		if (!u.isElement(el)) {
			console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
			return;
		}
		var strDM = api.systemType;
		if (strDM == 'ios') {
			var strSV = api.systemVersion;
			var numSV = parseInt(strSV, 10);
			var fullScreen = api.fullScreen;
			var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
			if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
				el.style.paddingTop = '20px';
			}
		}
	};
	u.fixStatusBar = function (el) {
		if (!u.isElement(el)) {
			console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
			return;
		}
		var sysType = api.systemType;
		if (sysType == 'ios') {
			u.fixIos7Bar(el);
		} else if (sysType == 'android') {
			var ver = api.systemVersion;
			ver = parseFloat(ver);
			if (ver >= 4.4) {
				el.style.paddingTop = '25px';
			}
		}
	};
	u.toast = function (title, text, time) {
		var opts = {};
		var show = function (opts, time) {
			api.showProgress(opts);
			// setTimeout(function() {
			//     api.hideProgress();
			// }, time);
		};
		if (arguments.length === 1) {
			var time = time || 500;
			if (typeof title === 'number') {
				time = title;
			} else {
				opts.title = title + '';
			}
			show(opts, time);
		} else if (arguments.length === 2) {
			var time = time || 500;
			var text = text;
			if (typeof text === "number") {
				var tmp = text;
				time = tmp;
				text = null;
			}
			if (title) {
				opts.title = title;
			}
			if (text) {
				opts.text = text;
			}
			show(opts, time);
		}
		if (title) {
			opts.title = title;
		}
		if (text) {
			opts.text = text;
		}
		time = time || 500;
		show(opts, time);
	};

	u.topTips = function (msg) {
		var topTips = u.dom(".topTips");
		if (topTips) {
			u.removeCls(topTips, "aui-hide");
			u.dom(topTips, ".content").innerHTML = msg;
		} else {
			var tips = document.createElement("div");
			tips.className = "topTips";
			tips.innerHTML = '<div class="content">' + msg + '</div>';
			u.dom("#app").appendChild(tips);
		}
		setTimeout(function () {
			u.addCls(u.dom(".topTips"), "aui-hide");
		}, 1500)
	};

	u.tips = function (_type, _msg) {
		// tips
		api.openFrame({
			name: "tips_frm",
			url: "widget://html/z_tips.html",
			pageParam: {
				type: _type || "info",
				text: _msg || ""
			},
			animation: {
				type: "movein",
				subType: "from_bottom"
			}
		});
		setTimeout(function () {
			api.closeFrame({
				name: "tips_frm",
				animation: {
					type: "push",
					subType: "from_bottom"
				}
			})
		}, 1500)
	};

	u.tipInfo = function (msg) {
		u.tips("info", msg);
	};

	u.tipSuccess = function (msg) {
		u.tips("success", msg);
	};

	u.tipFail = function (msg) {
		u.tips("fail", msg)
	};

	u.alert = function (_options) {
		api.execScript({
			name: api.winName,
			script: '(function(){var mask=document.querySelector(".winmask");if(mask){return;}mask = document.createElement("div");mask.className="winmask";document.body.appendChild(mask);})()'
		});
		var alertdiv = document.createElement("div");
		alertdiv.className = "alertdiv";
		alertdiv.innerHTML = '<div class="content">' + '<div class="head color-main">' + (_options.title || "") + '</div>' + '<div class="body">' + (_options.msg || "") + '</div>' + '<div class="foot">' + '<div class="cancel">否</div>' + '<div class="ok">是</div>' + '</div>' + '</div>';
		u.dom("#app").appendChild(alertdiv);

		u.addEvt(u.dom(alertdiv, ".cancel"), "tap", function () {
			if (_options.cancel && typeof _options.cancel == "function") {
				_options.cancel();
			}
			api.execScript({
				name: api.winName,
				script: '(function(){var mask=document.querySelector(".winmask");if(mask){document.body.removeChild(mask);}})()'
			});
			u.dom("#app").removeChild(alertdiv);
		});

		u.addEvt(u.dom(alertdiv, ".ok"), "tap", function () {
			if (_options.ok && typeof _options.ok == "function") {
				_options.ok();
			}
			api.execScript({
				name: api.winName,
				script: '(function(){var mask=document.querySelector(".winmask");if(mask){document.body.removeChild(mask);}})()'
			});
			u.dom("#app").removeChild(alertdiv);

		});

		// api.openFrame({
		//     name: "alert_frm",
		//     url: "widget://html/z_alert.html",
		//     pageParam: {
		//         frameName: api.frameName,
		//         title: _options.title || "",
		//         msg: _options.msg || "",
		//         cancel: _options.cancel,
		//         ok: _options.ok
		//             // cancel: (typeof _options.cancel == "function") ? _options.cancel : "",
		//             // ok: (typeof _options.ok == "function") ? _options.ok : ""
		//     }
		// });
	};

	//一个按钮的弹框
	u.alert1 = function (_options) {
		api.execScript({
			name: api.winName,
			script: '(function(){var mask=document.querySelector(".winmask");if(mask){return;}mask = document.createElement("div");mask.className="winmask";document.body.appendChild(mask);})()'
		});
		var alertdiv = document.createElement("div");
		alertdiv.className = "alertdiv";
		alertdiv.innerHTML = '<div class="content">' + '<div class="head color-main">' + (_options.title || "") + '</div>' + '<div class="body">' + (_options.msg || "") + '</div>' + '<div class="foot">' + '<div class="ok">确定</div>' + '</div>' + '</div>';
		u.dom("#app").appendChild(alertdiv);

		u.addEvt(u.dom(alertdiv, ".ok"), "tap", function () {
			if (_options.ok && typeof _options.ok == "function") {
				_options.ok();
			}
			api.execScript({
				name: api.winName,
				script: '(function(){var mask=document.querySelector(".winmask");if(mask){document.body.removeChild(mask);}})()'
			});
			u.dom("#app").removeChild(alertdiv);
		});
	};

	u.get = function (_options) {
		// api.cancelAjax({
		// 	tag: _options.url
		// });
		_options.params.r = Math.random();
		api.ajax({ //192.168.1.137:8080
			// tag: _options.url,
			url: _options.url, //+ "
			method: 'get',
			timeout: 300,
			cache: true,
			data: {
				values: _options.params
			},
			dataType: 'json'
		}, function (ret, err) {
			if (ret) {
				if (ret.code == "000000") {
					if (_options.success && typeof _options.success == "function") {
						_options.success(ret.info);
					}
				} else {
					if (_options.error && typeof _options.error == "function") {
						_options.error(ret.info);
					}
				}
				u.hideTopLoading();
			} else {
				if (_options.error && typeof _options.error == "function") {
					_options.error(err);
				}
				u.hideTopLoading();
				api.refreshHeaderLoadDone();
			}
		});
		// require.ensure(["../../components/vue-resource.js", "Vue"], function () {
		//     var vueResource = require("../../components/vue-resource");
		//     var Vue = require("Vue");
		//     vueResource.install(Vue);
		//     Vue.http.get(_options.url, {
		//         params: _options.params
		//     }, {
		//         // use before callback
		//         before: function (request) {
		//             // abort previous request, if exists
		//             if (this.previousRequest) {
		//                 this.previousRequest.abort();
		//                 api.refreshHeaderLoadDone();
		//             }
		//             // set previous request on Vue instance
		//             this.previousRequest = request;
		//         },
		//         emulateJSON: true
		//     }).then(function (response) {
		//         var body = response.body;
		//         var code = body.code;
		//         if (code == "000000") {
		//             if (_options.success && typeof _options.success == "function") {
		//                 _options.success(body.info);
		//             }
		//         }
		//         if (code == "100001") {
		//             //u.tipFail(body.msg);
		//             if (_options.error && typeof _options.error == "function") {
		//                 _options.error(body);
		//             }
		//         }
		//         u.hideTopLoading();
		//     }, function (response) {
		//         var body = response.body;
		//         if (_options.error && typeof _options.error == "function") {
		//             _options.error(body);
		//         }
		//         u.hideTopLoading();
		//         api.refreshHeaderLoadDone();
		//     });
		// })
	};
    u.getfree = function (_options) {
        api.ajax({ //192.168.1.137:8080
            url: _options.url,
            method: 'get',
            timeout: 300,
            data: {
                values: _options.params
            },
            dataType: 'json'
        }, function (ret, err) {
            if (ret) {
                if (ret.data) {
                    if (_options.success && typeof _options.success == "function") {
                        _options.success(ret.data);
                    }
                } else {
                    if (_options.error && typeof _options.error == "function") {
                        _options.error(ret.data);
                    }
                }
            } else {
                if (_options.error && typeof _options.error == "function") {
                    _options.error(err);
                }
            }
        });
    };
	u.ajax = function (_options) {
		api.ajax({ //192.168.1.137:8080
			url: _options.url,
			method: _options.method || 'get',
			timeout: 300,
			data: {
				values: _options.params
			},
			dataType: 'json'
		}, function (ret, err) {
			if (ret) {
				if (_options.success && typeof _options.success == "function") {
					_options.success(ret);
				}
			} else {
				if (_options.error && typeof _options.error == "function") {
					_options.error(err);
				}
			}
		});
	}
	u.post = function (_options) {
		api.ajax({ //192.168.1.137:8080
			url: _options.url,
			method: 'post',
			timeout: 300,
			data: {
				values: _options.params
			},
			dataType: 'json'
		}, function (ret, err) {
			if (ret) {
				if (ret.code == "000000") {
					if (_options.success && typeof _options.success == "function") {
						_options.success(ret.info);
					}
				} else {
					if (_options.error && typeof _options.error == "function") {
						_options.error(ret);
					}
				}
			} else {
				if (_options.error && typeof _options.error == "function") {
					_options.error(err);
				}
			}
		});
		// require.ensure(["../../components/vue-resource.js", "Vue"], function () {
		//     var vueResource = require("../../components/vue-resource");
		//     var Vue = require("Vue");
		//     vueResource.install(Vue);
		//     Vue.http.post(_options.url, _options.params, {
		//         // use before callback
		//         before: function (request) {
		//             // abort previous request, if exists
		//             if (this.previousRequest) {
		//                 this.previousRequest.abort();
		//                 api.refreshHeaderLoadDone();
		//             }
		//             // set previous request on Vue instance
		//             this.previousRequest = request;
		//         },
		//         emulateJSON: true
		//     }).then(function (response) {
		//         var body = response.body;
		//         var code = body.code;
		//         if (code == "000000") {
		//             if (_options.success && typeof _options.success == "function") {
		//                 _options.success(body.info);
		//             }
		//         }
		//         if (code == "100001") {
		//             if (_options.error && typeof _options.error == "function") {
		//                 _options.error(body);
		//             }
		//         }
		//     }, function (response) {
		//         var body = response.body;
		//         if (_options.error && typeof _options.error == "function") {
		//             _options.error(body);
		//         }
		//     });
		// })
	}

	u.postForCrawler = function (_options) {
		_options.method = "post";
		u.ajax(_options);
		// require.ensure(["../../components/vue-resource.js", "Vue"], function () {
		//     var vueResource = require("../../components/vue-resource");
		//     var Vue = require("Vue");
		//     vueResource.install(Vue);
		//     Vue.http.post(_options.url, _options.params, {
		//         // use before callback
		//         before: function (request) {
		//             // abort previous request, if exists
		//             if (this.previousRequest) {
		//                 this.previousRequest.abort();
		//                 api.refreshHeaderLoadDone();
		//             }
		//             // set previous request on Vue instance
		//             this.previousRequest = request;
		//         },
		//         emulateJSON: true
		//     }).then(function (response) {
		//         var body = response.body;
		//         var code = body.code;
		//         if (_options.success && typeof _options.success == "function") {
		//             _options.success(body);
		//         }
		//     }, function (response) {
		//         var body = response.body;
		//         if (_options.error && typeof _options.error == "function") {
		//             _options.error(body);
		//         }
		//     });
		// })
	}

	u.showBottomLoading = function () {
		var bottomLoading = u.dom(".bottom-loading");
		if (bottomLoading) {
			u.removeCls(bottomLoading, "fadeout");
		} else {
			var bottom = document.createElement("div");
			bottom.className = "bottom-loading";
			bottom.innerHTML = '<span></span> <span></span> <span></span> <span></span> <span></span>';
			u.dom("#app").appendChild(bottom);
		}
	};

	u.hideBottomLoading = function (_callBack) {
		var bottomLoading = u.dom(".bottom-loading");
		if (bottomLoading) {
			u.addCls(bottomLoading, "fadeout");
		}
	};

	u.hideTopLoading = function (_callBack) {
		var topLoading = u.dom(".top-loading");
		if (topLoading) {
			u.addCls(topLoading, "fadeout");
			u.dom("#app").removeChild(topLoading);
		}
	};
	u.assign = function (target) {
		//Objecttarget
		var output = Object(target);
		for (var idx = 1, l = arguments.length; idx < l; idx++) {
			var source = arguments[idx];
			//undefinednull
			if (source !== undefined && source !== null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						output[key] = source[key];
					}
				}
			}
		}
		return output;
	};

	/**
	 * 
	 * @param {String} _s_url 
	 * @param {Object} _o_data 
	 * @param {Function} _fn_callback 
	 */
	u.setPullTopRefresh = function (_fn_callback) {
		api.setRefreshHeaderInfo({
			visible: true,
			bgColor: '#fff',
			textColor: '#ccc',
			textDown: '下拉刷新',
			textUp: '释放加载数据',
			showTime: true
		}, function (ret, err) {
			if (typeof _fn_callback == "function") {
				_fn_callback()
			}
		});
	};
	//私信加载更多
	u.setPullTopRefreshMsg = function (_fn_callback) {
		api.setRefreshHeaderInfo({
			visible: true,
			bgColor: '#fff',
			textColor: '#ccc',
			textDown: '下拉加载历史信息',
			textUp: '释放历史信息',
			showTime: true
		}, function (ret, err) {
			if (typeof _fn_callback == "function") {
				_fn_callback()
			}
		});
	};

	var pullFlag = true;
	u.setPullBottomRefresh = function (_fn_callback) {
		api.addEventListener({
			name: 'scrolltobottom',
			extra: {
				threshold: 100 //0
			}
		}, function (ret, err) {
			if (pullFlag) {
				pullFlag = false;
				setTimeout(function () {
					pullFlag = true;
				}, 1500);
				u.showBottomLoading();
				if (typeof _fn_callback == "function") {
					_fn_callback()
				}
			}
		});
	};

	u.getStorageData = function (url) {
		var cache_data = u.getStorage("cache_data") || {};
		return cache_data[url];
	};

	u.setStorageData = function (url, data) {
		var cache_data = u.getStorage("cache_data") || {};
		cache_data[url] = data;
		u.setStorage("cache_data", cache_data);
	};

	/**
	 * 获取帖子浏览历史
	 */
	u.getArticleHistory = function () {
		return u.getStorage("articles") || [];
	};

	/**
	 * 帖子加入浏览历史
	 */
	u.setArticleHistory = function (article) {
		var articles = u.getStorage("articles") || [];
		for (var i in articles) {
			if (articles[i].articleId == article.articleId) {
				articles.splice(i, 1);
				break;
			}
		}
		articles.unshift(article);
		articles = articles.slice(0, 20);
		u.setStorage("articles", articles);
	}

	u.showEmptyTips = function (parantDom, _tips) {
		var emptyTips = u.dom(".emptyTips");
		var tips = _tips || '';
		if (emptyTips) {
			emptyTips.innerHTML = tips;
		} else {
			var tipsNode = document.createElment("div");
			tipsNode.className = "emptyTips";
			parantDom.appendChild(tipsNode);
		}
	};

	u.hideEmptyTips = function () {
		var emptyTips = u.dom(".emptyTips");
		if (emptyTips) {
			emptyTips.parentNode.remove(emptyTips);
		}
	};

	u.formatDate = function (date, fmt) {
		date = date || new Date();
		fmt = fmt || "yyyy-MM-dd hh:mm:ss";
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};

	var User = function (userId, userName, userLogo, userSign) {
			this.userId = userId || "";
			this.userName = userName || "昵称";
			this.userLogo = userLogo || "../img/avatar.png";
			this.userSign = userSign || "编辑个性签名！";
			return this;
		}
		/**
		 * 获取用户信息
		 * @param needLogin 是否必须登录
		 * @return User
		 */
	u.getUserInfo = function (needLogin) {
		needLogin = needLogin && true;
		var info = u.getStorage("uinfo");
		if (!info) {
			if (!needLogin) {
				return new User();
			} else {
				//必须登录，打开登录窗
				api.openWin({
					name: "login_win",
					url: "widget://html/login_win.html"
				});
				api.addEventListener({
					name: "refreshUserInfo"
				}, function (ret, err) {
					// api.openFrame({
					//     name: api.frameName,
					//     reload: true
					// });
				})
				return;
			}
		} else {
			return info;
		}

	};

	/**
	 * 获取用户 ID
	 */
	u.getUserId = function (needLogin) {
		var info = u.getUserInfo(needLogin);
		if (info) {
			return info.userId;
		}
		return info;
	};

	u.showLoading = function (msg, autoHide) {
		msg = msg || "";
		api.openFrame({
			name: "loading_frm",
			url: "widget://html/z_loading.html",
			pageParam: {
				text: msg || ""
			},
			reload: true,
			animation: {
				type: "movein",
				subType: "from_bottom"
			}
		});
		if (autoHide) {
			setTimeout(function () {
				u.hideLoading();
			}, 1500);
		}
	}

	u.hideLoading = function () {
			api.closeFrame({
				name: "loading_frm",
				animation: {
					type: "push",
					subType: "from_bottom"
				}
			})
		}
		/*end*/
	window.$api = u;
	return u;
};

module.exports = $api(window);