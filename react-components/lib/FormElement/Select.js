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

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = (_temp2 = _class = function (_FormElement) {
	_inherits(Select, _FormElement);

	function Select() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Select);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (field) {
			var value = _this.props.multiple ? field : field[_this.props.valueKey];
			_this.updateValue(value, field);
		}, _this.updateValue = function (value, field) {
			var response = field ? _this.formatResponse(field) : value;
			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, response);
			_this.setState({ value: value });
		}, _this.clear = function () {
			var _field;

			var field = (_field = {}, _defineProperty(_field, _this.props.labelKey, ''), _defineProperty(_field, _this.props.valueKey, ''), _field);
			_this.updateValue('', field);
		}, _this.formatResponse = function (field) {
			if (_this.props.multiple) {
				return field && field.length > 0 ? field.map(function (o) {
					return _this.formatItem(o);
				}) : [];
			}

			return _this.formatItem(field);
		}, _this.formatItem = function (field) {
			switch (_this.props.returnFields) {
				case 'label':
					return field[_this.props.labelKey];
				case 'all':
					return field;
				default:
					return field[_this.props.valueKey];
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Select, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    append = _props.append,
			    async = _props.async,
			    className = _props.className,
			    creatable = _props.creatable,
			    disabled = _props.disabled,
			    label = _props.label,
			    loadOptions = _props.loadOptions,
			    multiple = _props.multiple,
			    name = _props.name,
			    options = _props.options,
			    prepend = _props.prepend,
			    validation = _props.validation,
			    wide = _props.wide,
			    rest = _objectWithoutProperties(_props, ['append', 'async', 'className', 'creatable', 'disabled', 'label', 'loadOptions', 'multiple', 'name', 'options', 'prepend', 'validation', 'wide']);

			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;

			var ReactSelectComponent = creatable ? _reactSelect2.default.Creatable : _reactSelect2.default;

			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'select', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(_core.FormPrepend, this.props),
					_react2.default.createElement(
						_core.FormField,
						null,
						async ? _react2.default.createElement(_reactSelect2.default.Async, _extends({}, rest, {
							disabled: disabled,
							loadOptions: loadOptions,
							multi: multiple,
							name: name,
							onChange: this.handleChange,
							openAfterFocus: true,
							value: value
						})) : _react2.default.createElement(ReactSelectComponent, _extends({}, rest, {
							disabled: disabled,
							multi: multiple,
							name: name,
							onChange: this.handleChange,
							openAfterFocus: true,
							options: options,
							value: value
						}))
					),
					_react2.default.createElement(_core.FormAppend, this.props)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return Select;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	append: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	async: _propTypes2.default.bool,
	clearable: _propTypes2.default.bool,
	creatable: _propTypes2.default.bool,
	labelKey: _propTypes2.default.string,
	loadOptions: _propTypes2.default.func,
	multiple: _propTypes2.default.bool,
	options: _propTypes2.default.array,
	placeholder: _propTypes2.default.string,
	prepend: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	resetValue: _propTypes2.default.object,
	returnFields: _propTypes2.default.oneOf(['value', 'label', 'all']),
	valueKey: _propTypes2.default.string
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	append: '',
	async: false,
	clearable: false,
	creatable: false,
	labelKey: 'title',
	loadOptions: function loadOptions() {},
	multiple: false,
	options: [],
	placeholder: 'Select...',
	prepend: '',
	resetValue: {},
	returnFields: 'value',
	value: null,
	valueKey: 'id'
}), _temp2);
exports.default = Select;