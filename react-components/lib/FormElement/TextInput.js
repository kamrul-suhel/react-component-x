'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = (_temp2 = _class = function (_FormElement) {
	_inherits(TextInput, _FormElement);

	function TextInput() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, TextInput);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call.apply(_ref, [this].concat(args))), _this), _this.onFocus = function () {
			return _this.setFocus(true);
		}, _this.onBlur = function () {
			return _this.setFocus(false);
		}, _this.handleChange = function (event) {
			_this.updateValue(event.target.value);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(TextInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    autoComplete = _props.autoComplete,
			    autoFocus = _props.autoFocus,
			    disabled = _props.disabled,
			    name = _props.name,
			    onReset = _props.onReset,
			    placeholder = _props.placeholder,
			    textarea = _props.textarea,
			    type = _props.type;
			var _state = this.state,
			    isFocused = _state.isFocused,
			    value = _state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;

			var FieldTag = textarea ? 'textarea' : 'input';

			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, {
					type: 'input',
					valid: valid,
					isFocused: isFocused,
					value: value
				}),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(_core.FormPrepend, this.props),
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(FieldTag, {
							autoComplete: autoComplete,
							autoFocus: autoFocus,
							disabled: disabled,
							name: name,
							onBlur: this.onBlur,
							onChange: this.handleChange,
							onFocus: this.onFocus,
							placeholder: placeholder,
							rows: 1,
							type: type,
							value: value || ''
						}),
						onReset && _react2.default.createElement('span', { className: 'form-field-reset', onClick: onReset })
					),
					_react2.default.createElement(_core.FormAppend, this.props)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return TextInput;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	append: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	autoComplete: _propTypes2.default.string,
	autoFocus: _propTypes2.default.bool,
	onReset: _propTypes2.default.func,
	placeholder: _propTypes2.default.string,
	prepend: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	textarea: _propTypes2.default.bool,
	type: _propTypes2.default.string,
	value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	append: '',
	autoComplete: 'on',
	autoFocus: false,
	placeholder: '',
	prepend: '',
	textarea: false,
	type: 'text',
	value: ''
}), _temp2);
exports.default = TextInput;