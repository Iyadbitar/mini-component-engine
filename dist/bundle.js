/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ComponentHandler = __webpack_require__(1);
	
	var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);
	
	var _appComponent = __webpack_require__(2);
	
	var _appComponent2 = _interopRequireDefault(_appComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var handler = new _ComponentHandler2.default();
	handler.render(_appComponent2.default, document.getElementById('app-wrapper')
	// const appComponent = new AppComponent();
	// const app2: new AppComponent();
	
	// appComponent.mountOn(document.getElementById('app-wrapper'));
	);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var instance = null;
	
	var ComponentHandler = function () {
	  function ComponentHandler() {
	    _classCallCheck(this, ComponentHandler);
	
	    this.components = {};
	
	    if (!instance) {
	      instance = this;
	    }
	    return instance;
	  }
	
	  _createClass(ComponentHandler, [{
	    key: 'bindComponentEvents',
	    value: function bindComponentEvents(componentInstance) {
	      componentInstance.eventsBindingList.forEach(function (bind) {
	        bind.element.addEventListener(bind.eventName, componentInstance[bind.functionName].bind(componentInstance));
	      });
	    }
	  }, {
	    key: 'setComponentProperties',
	    value: function setComponentProperties(componentInstance) {
	      Object.keys(componentInstance).forEach(function (key) {
	        componentInstance.activeTempate = componentInstance.templateString.replace(new RegExp('{' + key + '}', 'g'), componentInstance[key]);
	      }
	
	      // console.log(componentInstance.activeTempate)
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render(componentClass, mountingPoint) {
	      var component = new componentClass();
	
	      this.setComponentProperties(component);
	      component.setDomTree();
	      this.bindComponentEvents(component);
	
	      component.mountOn(mountingPoint);
	    }
	  }]);
	
	  return ComponentHandler;
	}();
	
	exports.default = ComponentHandler;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _class;
	
	var _core = __webpack_require__(3);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _appComponent = __webpack_require__(4);
	
	var _appComponent2 = _interopRequireDefault(_appComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AppComponent = (_dec = (0, _core2.default)({
	  selector: 'app',
	  template: __webpack_require__(4),
	  style: __webpack_require__(5)
	}), _dec(_class = function () {
	  function AppComponent() {
	    _classCallCheck(this, AppComponent);
	
	    this.title = 'Apppp!';
	
	    console.log('App component constructor ');
	  }
	
	  _createClass(AppComponent, [{
	    key: 'loadData',
	    value: function loadData() {
	      console.log('load');
	    }
	  }, {
	    key: 'clickme',
	    value: function clickme(event) {
	      console.log(this);
	      this.loadData();
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      console.log('will');
	      this.loadData();
	    }
	  }]);
	
	  return AppComponent;
	}()) || _class);
	exports.default = AppComponent;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function Component(config) {
	  return function (target) {
	    target.prototype.mountingPoint = null;
	    target.prototype.isMounted = false;
	    target.prototype.templateString = config.template;
	    target.prototype.activeTempate = '';
	    target.prototype.domTree = null;
	    target.prototype.eventsBindingList = [];
	    target.prototype.dataBindingList = [];
	
	    target.prototype.selector = config.selector;
	
	    target.prototype.setDomTree = function () {
	      target.domTree = document.createElement('div');
	      target.domTree.innerHTML = target.prototype.templateString;
	      var allowedEvents = ['onClick', 'onChange', 'onSubmit'];
	      allowedEvents.forEach(function (eventName) {
	        target.domTree.querySelectorAll('[' + eventName + ']').forEach(function (element) {
	          var functionName = element.attributes[eventName].value;
	          if (functionName.indexOf('{') > -1 && functionName.indexOf('}') > -1) {
	            functionName = functionName.replace(/[{}]/g, '');
	            element.removeAttribute(eventName);
	            if (target.prototype[functionName]) {
	              target.prototype.eventsBindingList.push({
	                eventName: eventName.replace(/^on/g, '').toLowerCase(),
	                functionName: functionName,
	                element: element
	              });
	            } else {
	              throw '"' + eventName + '" handler method "' + functionName + '" is not a memeber of ' + target.name + ' component';
	            }
	          }
	        });
	      });
	    };
	
	    // target.prototype.setDomTree();
	
	
	    target.prototype.setMountingPoint = function (domPoint) {
	      target.mountingPoint = domPoint;
	    };
	
	    target.prototype.mount = function () {
	      if (target.prototype.componentWillMount) {
	        target.prototype.componentWillMount();
	      }
	      console.log(target.domTree);
	      target.mountingPoint.appendChild(target.domTree);
	      target.isMounted = true;
	
	      if (target.prototype.componentDidMount) {
	        target.prototype.componentDidMount();
	      }
	    };
	
	    target.prototype.mountOn = function (domPoint) {
	      target.prototype.setMountingPoint.call(target, domPoint);
	      target.prototype.mount.call(target);
	    };
	
	    target.prototype.unmount = function () {
	      target.mountingPoint.innerHTML('');
	      target.isMounted = false;
	    };
	
	    target.prototype.render = function () {
	      console.log(target.prototype);
	    };
	  };
	}
	
	exports.default = Component;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div>{title}</div>\n<div>\n  <button onClick=\"{clickme}\">Click Me</button>\n</div>\n<div>\n  <button onClick=\"{clickme}\">Click Me again</button>\n</div>\n"

/***/ },
/* 5 */
/***/ function(module, exports) {



/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map