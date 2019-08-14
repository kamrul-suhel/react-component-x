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

var _rcTimePicker = require('rc-time-picker');

var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePicker = (_temp2 = _class = function (_FormElement) {
	_inherits(TimePicker, _FormElement);

	function TimePicker() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, TimePicker);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.formatResponse = function (value) {
			if (!value) {
				return null;
			}

			if (_this.props.showSecond) {
				return value.format('HH:mm:ss');
			}

			// set seconds to 00 if showSecond is false
			return value.format('HH:mm') + ':00';
		}, _this.updateValue = function (value) {
			value = value ? (0, _moment2.default)(value, 'HH:mm:ss') : null;
			var response = _this.formatResponse(value);
			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, response);
			_this.setState({ value: value });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(TimePicker, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    append = _props.append,
			    className = _props.className,
			    disabled = _props.disabled,
			    label = _props.label,
			    name = _props.name,
			    prepend = _props.prepend,
			    validation = _props.validation,
			    wide = _props.wide,
			    rest = _objectWithoutProperties(_props, ['append', 'className', 'disabled', 'label', 'name', 'prepend', 'validation', 'wide']);

			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;


			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'timepicker', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(_core.FormPrepend, this.props),
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(_rcTimePicker2.default, _extends({}, rest, {
							allowEmpty: false,
							disabled: disabled,
							onChange: this.handleChange,
							value: value
						}))
					),
					_react2.default.createElement(_core.FormAppend, this.props)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return TimePicker;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	append: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	minuteStep: _propTypes2.default.number,
	placeholder: _propTypes2.default.string,
	prepend: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	showHour: _propTypes2.default.bool,
	showMinute: _propTypes2.default.bool,
	showSecond: _propTypes2.default.bool,
	value: _propTypes2.default.string
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	append: '',
	minuteStep: 5,
	placeholder: '',
	prepend: '',
	showHour: true,
	showMinute: true,
	showSecond: false
}), _temp2);
exports.default = TimePicker;