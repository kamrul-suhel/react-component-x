'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultValidation = require('./defaultValidation');

var _defaultValidation2 = _interopRequireDefault(_defaultValidation);

var _validation = require('../../validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormElement = function (_React$PureComponent) {
	_inherits(FormElement, _React$PureComponent);

	function FormElement(props) {
		_classCallCheck(this, FormElement);

		var _this = _possibleConstructorReturn(this, (FormElement.__proto__ || Object.getPrototypeOf(FormElement)).call(this, props));

		_this.setValidationMessage = function (validation) {
			return _this.setState({ validation: validation });
		};

		_this.setFocus = function (isFocused) {
			if (_this.props.withFloatingLabel) {
				_this.setState({ isFocused: isFocused });
			}
		};

		_this.updateValue = function (value) {
			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, value);
			_this.setState({ value: value });
		};

		_this.clear = function () {
			return _this.updateValue('');
		};

		_this.clearValidation = function () {
			return _this.setValidationMessage(_defaultValidation2.default);
		};

		_this.validate = function () {
			var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			if (!_this.props.validation) {
				return _defaultValidation2.default;
			}

			var validatingValue = args.value !== undefined ? args.value : _this.state.value;
			var label = _this.props.label || _this.props.name;
			var validation = (0, _validation2.default)(validatingValue, _this.props.validation, label);

			if (args.ignoreErrors && validation.valid === false) {
				_this.clearValidation();
			} else {
				_this.setValidationMessage(validation);
			}

			return validation;
		};

		_this.validateOnUpdate = function (value) {
			var validation = _this.state.validation;


			if (validation.valid === false) {
				_this.clearValidation();
			}

			if (_this.props.validation) {
				_this.validate({ value: value, ignoreErrors: true });
			}
		};

		_this.handleChange = function (value) {
			_this.updateValue(value);
		};

		_this.state = {
			isFocused: false,
			validation: _defaultValidation2.default
		};
		return _this;
	}

	_createClass(FormElement, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!this.props.skipInitialOnChangeCall) {
				this.updateValue(this.props.value);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_.isEqual(this.props.value, nextProps.value)) {
				this.updateValue(nextProps.value);
			}
		}

		// validate check if the value is valid within the given validation props
		// args.value can be used instaed this.state.value as by that point this.setState() does not update the state and we want to work with the current value not the old state
		// args.ignoreErrors ignores all error and sets the validation to undefined,
		// this args.ignoreErrors is only for each keystroke, on form submission the error shows

	}]);

	return FormElement;
}(_react2.default.PureComponent);

exports.default = FormElement;