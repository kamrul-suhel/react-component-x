'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

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

var DatePicker = (_temp = _class = function (_FormElement) {
	_inherits(DatePicker, _FormElement);

	function DatePicker(props) {
		_classCallCheck(this, DatePicker);

		var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

		_this.handleFocus = function (focusedInput) {
			_this.setState({ focusedInput: focusedInput || 'endDate' });
		};

		_this.updateValue = function (value) {
			value = value ? (0, _moment2.default)(value, 'YYYY-MM-DD HH:mm:ss') : null;
			var response = value ? (0, _moment2.default)(value).format(_this.props.returnFormat) : null;
			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, response);
			_this.setState({ value: value });
		};

		_this.openDatePicker = function () {
			_this.refDatePicker && _this.refDatePicker.setOpen(true);
		};

		_this.closeDatePicker = function () {
			_this.refDatePicker && _this.refDatePicker.setOpen(false);
		};

		_this.handleClickOutside = function () {
			if (_this.refDatePicker) {
				_this.refDatePicker.cancelFocusInput();
				_this.refDatePicker.setOpen(false);
			}
		};

		_this.renderCustomInput = function () {
			var formattedDate = _this.state.value ? (0, _moment2.default)(_this.state.value).format(_this.props.dateFormat) : _this.props.placeholder;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('input', { type: 'text', value: formattedDate, readOnly: true })
			);
		};

		_this.today = (0, _moment2.default)();

		_this.state = {
			minDate: _this.props.futureOnly ? _this.today : _this.props.minDate,
			maxDate: _this.props.pastOnly ? _this.today : _this.props.maxDate,
			validation: _core.defaultValidation,
			focusedInput: 'startDate'
		};
		return _this;
	}

	_createClass(DatePicker, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    clearable = _props.clearable,
			    dateFormat = _props.dateFormat,
			    placeholder = _props.placeholder,
			    showMonthSelect = _props.showMonthSelect,
			    showYearSelect = _props.showYearSelect,
			    rest = _objectWithoutProperties(_props, ['clearable', 'dateFormat', 'placeholder', 'showMonthSelect', 'showYearSelect']);

			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;

			var customInput = this.renderCustomInput();

			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'datepicker', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(_core.FormPrepend, _extends({}, this.props, { onClick: this.openDatePicker })),
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(
							_reactDatepicker2.default,
							_extends({}, rest, {
								customInput: customInput,
								isClearable: clearable,
								maxDate: this.state.maxDate,
								minDate: this.state.minDate,
								onChange: this.handleChange,
								onClickOutside: this.handleClickOutside,
								placeholderText: placeholder,
								ref: function ref(_ref) {
									return _this2.refDatePicker = _ref;
								},
								selected: value,
								showMonthDropdown: showMonthSelect,
								showYearDropdown: showYearSelect
							}),
							this.props.children
						)
					),
					_react2.default.createElement(_core.FormAppend, _extends({}, this.props, { onClick: this.openDatePicker }))
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return DatePicker;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	append: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	clearable: _propTypes2.default.bool,
	dateFormat: _propTypes2.default.string,
	dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']),
	futureOnly: _propTypes2.default.bool,
	inline: _propTypes2.default.bool,
	locale: _propTypes2.default.string,
	maxDate: _propTypes2.default.object,
	minDate: _propTypes2.default.object,
	pastOnly: _propTypes2.default.bool,
	placeholder: _propTypes2.default.string,
	prepend: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	returnFormat: _propTypes2.default.string,
	scrollableYearDropdown: _propTypes2.default.bool,
	showMonthSelect: _propTypes2.default.bool,
	showYearSelect: _propTypes2.default.bool,
	value: _propTypes2.default.string,
	yearDropdownItemNumber: _propTypes2.default.number
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	append: '',
	clearable: false,
	dateFormat: 'Do MMMM YYYY',
	dropdownMode: 'scroll',
	futureOnly: false,
	inline: false,
	locale: 'en-gb',
	maxDate: undefined,
	minDate: undefined,
	pastOnly: false,
	placeholder: '',
	prepend: '',
	returnFormat: 'YYYY-MM-DD HH:mm:ss',
	scrollableYearDropdown: true,
	showMonthSelect: false,
	showYearSelect: false,
	value: null,
	yearDropdownItemNumber: 100
}), _temp);
exports.default = DatePicker;