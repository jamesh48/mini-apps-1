'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.formOneSubmission = _this.formOneSubmission.bind(_assertThisInitialized(_this));
    _this.state = {
      pageDisplayed: 0
    };
    return _this;
  }

  _createClass(App, [{
    key: "handleClick",
    value: function handleClick(incomingPage) {
      var _this2 = this;

      this.setState({
        pageDisplayed: incomingPage
      }, function () {
        _this2.formOneSubmission();
      });
    }
  }, {
    key: "formOneSubmission",
    value: function formOneSubmission() {
      var config = {
        'url': "http://localhost:3000/form",
        'method': 'POST'
      };
      return axios(config).then(function (results) {
        console.log(results.data);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pageDisplayed = this.state.pageDisplayed;
      var handleClick = this.handleClick;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(FormOne, {
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(FormTwo, {
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(FormThree, {
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(ConfirmationPage, {
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }));
    }
  }]);

  return App;
}(React.Component);

var Button = function Button(props) {
  return props.pageDisplayed === 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    onClick: function onClick() {
      props.handleClick(1);
    },
    type: "button",
    id: "0",
    value: "Start Checkout"
  })) : null;
};

var FormOne = function FormOne(props) {
  return props.pageDisplayed === 1 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Your Information:"), /*#__PURE__*/React.createElement("form", {
    className: "input-form"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "name"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "e-mail"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "button",
    onClick: function onClick() {
      props.handleClick(2);
    },
    value: "Next"
  }))) : null;
};

var FormTwo = function FormTwo(props) {
  return props.pageDisplayed === 2 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Ship To..."), /*#__PURE__*/React.createElement("form", {
    className: "input-form"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "line one"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "line two"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "City"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "State"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "Zip Code"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "Phone Number"
  }), /*#__PURE__*/React.createElement("input", {
    type: "button",
    onClick: function onClick() {
      props.handleClick(3);
    },
    value: "Next"
  }))) : null;
};

var FormThree = function FormThree(props) {
  return props.pageDisplayed === 3 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Your Payment Information"), /*#__PURE__*/React.createElement("form", {
    className: "input-form"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "CC#"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "CVV"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "text",
    placeholder: "Billing Zip Code"
  }), /*#__PURE__*/React.createElement("input", {
    type: "button",
    value: "Next",
    onClick: function onClick() {
      props.handleClick(4);
    }
  }))) : null;
};

var ConfirmationPage = function ConfirmationPage(props) {
  return props.pageDisplayed === 4 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Confirmation!")) : null;
};

var domContainer = document.querySelector('#root');
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), domContainer);