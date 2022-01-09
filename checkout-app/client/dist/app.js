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
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.formOneSubmission = _this.formOneSubmission.bind(_assertThisInitialized(_this));
    _this.formTwoSubmission = _this.formTwoSubmission.bind(_assertThisInitialized(_this));
    _this.formThreeSubmission = _this.formThreeSubmission.bind(_assertThisInitialized(_this));
    _this.formFourSubmission = _this.formFourSubmission.bind(_assertThisInitialized(_this));
    _this.deleteDatabase = _this.deleteDatabase.bind(_assertThisInitialized(_this));
    _this.state = {
      updatingId: 0,
      pageDisplayed: 0,
      // Login
      loginName: '',
      loginEmail: '',
      loginPassword: '',
      // Address
      addressOne: '',
      addressTwo: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
      addressPhone: '',
      // Billing
      billingZip: '',
      billingCVV: '',
      billingCC: '',
      // Purchased
      purchased: false
    };
    return _this;
  }

  _createClass(App, [{
    key: "deleteDatabase",
    value: function deleteDatabase() {
      var config = {
        method: 'POST',
        url: 'http://localhost:3000/delete'
      };
      return axios(config).then(function (results) {
        console.log(results.data);
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(incomingPage) {
      var status = true;

      if (incomingPage === 2) {
        status = this.formOneSubmission();
      } else if (incomingPage === 3) {
        status = this.formTwoSubmission();
      } else if (incomingPage === 4) {
        status = this.formThreeSubmission();
      } else if (incomingPage === 5) {
        status = this.formFourSubmission();
      }

      if (!status) {
        return;
      } else {
        this.setState({
          pageDisplayed: incomingPage
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var _this2 = this;

      // console.log(event.target.id, event.target.value)
      var incomingInputName = event.target.id;
      var incomingValue = event.target.value;
      console.log(incomingInputName, incomingValue);
      var update = new Object();
      update[incomingInputName] = incomingValue;
      this.setState(function (prevState) {
        return update;
      }, function () {
        console.log(_this2.state);
      });
    }
  }, {
    key: "formOneSubmission",
    value: function formOneSubmission() {
      var _this3 = this;

      var username = this.state.loginName;
      var password = this.state.loginPassword;
      var email = this.state.loginEmail;

      if (username === '') {
        alert('Missing Name');
        return false;
      }

      if (password === '') {
        alert('Missing Password');
        return false;
      }

      if (email === '') {
        alert('Missing Email');
        return false;
      }

      console.log(username);
      var config = {
        'url': "http://localhost:3000/new",
        'method': 'POST',
        data: {
          username: username,
          password: password,
          email: email
        }
      };
      return axios(config).then(function (results) {
        // // Mongo/Mongoose
        // console.log(`here-> ` + results.data)
        // this.setState({updatingId: results.data});
        // mySql raw
        console.log("here-> " + results.data.insertId);

        _this3.setState({
          updatingId: results.data.insertId
        }); // Sequelize
        // console.log(`here-> ` + results.data.id);
        // this.setState({ updatingId: results.data.id });

      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "formTwoSubmission",
    value: function formTwoSubmission() {
      var _this$state = this.state,
          addressOne = _this$state.addressOne,
          addressTwo = _this$state.addressTwo,
          addressCity = _this$state.addressCity,
          addressState = _this$state.addressState,
          addressZip = _this$state.addressZip,
          addressPhone = _this$state.addressPhone,
          updatingId = _this$state.updatingId;

      if (addressOne === '' || addressCity === '' || addressState === '' || addressZip === '' || addressPhone === '') {
        alert('Missing Fields');
        return false;
      }

      var config = {
        'url': "http://localhost:3000/updateAddress",
        'method': 'POST',
        data: {
          addressOne: addressOne,
          addressTwo: addressTwo,
          addressCity: addressCity,
          addressState: addressState,
          addressZip: addressZip,
          addressPhone: addressPhone,
          updatingId: updatingId
        }
      };
      return axios(config).then(function (results) {
        console.log(results.data);
      });
    }
  }, {
    key: "formThreeSubmission",
    value: function formThreeSubmission() {
      var _this$state2 = this.state,
          billingCC = _this$state2.billingCC,
          billingCVV = _this$state2.billingCVV,
          billingZip = _this$state2.billingZip,
          updatingId = _this$state2.updatingId;

      if (billingCC === '' || billingCVV === '' || billingZip === '') {
        alert('Missing Fields!');
        return false;
      }

      var config = {
        'url': "http://localhost:3000/updateBilling",
        'method': 'POST',
        data: {
          billingCC: billingCC,
          billingCVV: billingCVV,
          billingZip: billingZip,
          updatingId: updatingId
        }
      };
      return axios(config).then(function (results) {
        console.log(results);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "formFourSubmission",
    value: function formFourSubmission() {
      var _this$state3 = this.state,
          purchased = _this$state3.purchased,
          updatingId = _this$state3.updatingId;
      var config = {
        'url': "http://localhost:3000/completePurchase",
        'method': 'POST',
        data: {
          purchased: true,
          updatingId: updatingId
        }
      };
      return axios(config).then(function (results) {
        console.log(results);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          pageDisplayed = _this$state4.pageDisplayed,
          name = _this$state4.name;
      var handleClick = this.handleClick,
          handleChange = this.handleChange,
          deleteDatabase = this.deleteDatabase;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(FormOne, {
        handleChange: handleChange,
        pageDisplayed: pageDisplayed,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(FormTwo, {
        pageDisplayed: pageDisplayed,
        handleChange: handleChange,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(FormThree, {
        pageDisplayed: pageDisplayed,
        handleChange: handleChange,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(ConfirmationPage, {
        all: this.state,
        pageDisplayed: pageDisplayed,
        handleChange: handleChange,
        handleClick: handleClick
      }), /*#__PURE__*/React.createElement(Delete, {
        "delete": deleteDatabase
      }));
    }
  }]);

  return App;
}(React.Component);

var Delete = function Delete(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "button",
    value: "reset database",
    onClick: props["delete"]
  }));
};

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
    autocomplete: "off",
    className: "form-input",
    type: "text",
    placeholder: "name",
    id: "loginName",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "e-mail",
    id: "loginEmail",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    id: "loginPassword",
    type: "text",
    placeholder: "password",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-buttons"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Back",
    onClick: function onClick() {
      props.handleClick(0);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    onClick: function onClick() {
      props.handleClick(2);
    },
    value: "Next"
  })))) : null;
};

var FormTwo = function FormTwo(props) {
  return props.pageDisplayed === 2 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Ship To..."), /*#__PURE__*/React.createElement("form", {
    className: "input-form"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "line one",
    id: "addressOne",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "line two",
    id: "addressTwo",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "City",
    id: "addressCity",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "State",
    id: "addressState",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "Zip Code",
    id: "addressZip",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "Phone Number",
    id: "addressPhone",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Back",
    onClick: function onClick() {
      props.handleClick(1);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Next",
    onClick: function onClick() {
      props.handleClick(3);
    }
  })))) : null;
};

var FormThree = function FormThree(props) {
  return props.pageDisplayed === 3 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Your Payment Information"), /*#__PURE__*/React.createElement("form", {
    className: "input-form"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "CC#",
    id: "billingCC",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "CVV",
    id: "billingCVV",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autocomplete: "off",
    type: "text",
    placeholder: "Billing Zip Code",
    id: "billingZip",
    onChange: props.handleChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-buttons"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Back",
    onClick: function onClick() {
      props.handleClick(2);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Next",
    onClick: function onClick() {
      props.handleClick(4);
    }
  })))) : null;
};

var ConfirmationPage = function ConfirmationPage(props) {
  return props.pageDisplayed === 4 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Confirmation!"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "User"), /*#__PURE__*/React.createElement("div", {
    className: "confirmation-details"
  }, /*#__PURE__*/React.createElement("p", null, "User: ", props.all.loginName), /*#__PURE__*/React.createElement("p", null, "Email: ", props.all.loginEmail), /*#__PURE__*/React.createElement("p", null, "Password: ", props.all.loginPassword))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Address"), /*#__PURE__*/React.createElement("div", {
    className: "confirmation-details"
  }, /*#__PURE__*/React.createElement("p", null, "Line 1: ", props.all.addressOne), /*#__PURE__*/React.createElement("p", null, props.all.addressTwo), /*#__PURE__*/React.createElement("p", null, "City: ", props.all.addressCity), /*#__PURE__*/React.createElement("p", null, "State: ", props.all.addressState), /*#__PURE__*/React.createElement("p", null, "Zip: ", props.all.addressZip), /*#__PURE__*/React.createElement("p", null, "Phone: ", props.all.addressPhone))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Payment Details"), /*#__PURE__*/React.createElement("div", {
    className: "confirmation-details cc-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-details"
  }, /*#__PURE__*/React.createElement("h5", null, "CC Number: "), /*#__PURE__*/React.createElement("p", null, props.all.billingCC.replace(/[0-9]/g, function (match, index, originalString) {
    return index < 12 ? '*' : match;
  }))), /*#__PURE__*/React.createElement("div", {
    className: "inline-details"
  }, /*#__PURE__*/React.createElement("h5", null, "CVV: "), /*#__PURE__*/React.createElement("p", null, props.all.billingCVV), /*#__PURE__*/React.createElement("h5", null, "Billing Zip: "), /*#__PURE__*/React.createElement("p", null, props.all.billingZip)))), /*#__PURE__*/React.createElement("div", {
    className: "form-buttons"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Back",
    onClick: function onClick() {
      props.handleClick(3);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-button",
    type: "button",
    value: "Complete Purchase",
    onClick: function onClick() {
      props.handleClick(5);
    }
  }))) : null;
};

var domContainer = document.querySelector('#root');
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), domContainer);