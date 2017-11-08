(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.muhelm = factory(global.React));
}(this, (function (React) { 'use strict';

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











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function muhelm(wrappedComponent) {
  var mapMusToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

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
    inherits(_class, _React$Component);

    function _class(props) {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.done = _this.done.bind(_this);
      muSubscriber = function muSubscriber(node) {
        mapMusToProps(node, _this.done);
      };
      return _this;
    }

    createClass(_class, [{
      key: 'done',
      value: function done(data) {
        this.setState(data);
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement('wrappedComponent', _extends({}, this.props, this.state));
      }
    }]);
    return _class;
  }(React.Component);
}

return muhelm;

})));
