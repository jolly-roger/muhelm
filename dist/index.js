(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.muhelm = {}),global.React));
}(this, (function (exports,React) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var SOURCE_NODES = ['script', 'link'];

function muhelm(WrappedComponent) {
  var mapMusToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () /* node, done */{};

  var muObserver = void 0;
  var muSubscriber = function muSubscriber() {};

  if (typeof MutationObserver !== 'undefined') {
    muObserver = new MutationObserver(function (mus) {
      mus.forEach(function (mu) {
        mu.addedNodes.forEach(function (node) {
          muSubscriber(node);
        });
      });
    });

    muObserver.observe(document.head, { childList: true });
  }

  return function (_React$Component) {
    inherits(_class2, _React$Component);

    function _class2(props) {
      classCallCheck(this, _class2);

      var _this = possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

      _this.done = function (data) {
        if (data) {
          _this.setState(data);
        }
      };

      muSubscriber = function muSubscriber(node) {
        mapMusToProps(node, _this.done);
      };
      return _this;
    }

    createClass(_class2, [{
      key: 'render',
      value: function render() {
        var passThroughProps = objectWithoutProperties(this.props, []);

        return React.createElement(WrappedComponent, _extends({}, passThroughProps, this.state));
      }
    }]);
    return _class2;
  }(React.Component);
}

function muhelmLoads(WrappedComponent) {
  var mapLoadsToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () /* loadedSourceId */{};

  return muhelm(WrappedComponent, function (node, done) {
    if (SOURCE_NODES.indexOf(node.TagName.toLowerCase()) > -1) {
      node.addEventListener('load', function () {
        done(mapLoadsToProps(node.id));
      });
    }
  });
}

exports.muhelm = muhelm;
exports.muhelmLoads = muhelmLoads;

Object.defineProperty(exports, '__esModule', { value: true });

})));
