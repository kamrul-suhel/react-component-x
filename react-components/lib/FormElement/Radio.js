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

var Radio = (_temp2 = _class = function (_FormElement) {
	_inherits(Radio, _FormElement);

	function Radio() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Radio);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Radio.__proto__ || Object.getPrototypeOf(Radio)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
			var value = event.target.checked ? event.currentTarget.value : 0;
			_this.updateValue(value);
		}, _this.updateValue = function () {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, value);
			_this.setState({ value: value });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Radio, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    disabled = _props.disabled,
			    labelKey = _props.labelKey,
			    layout = _props.layout,
			    name = _props.name,
			    options = _props.options,
			    styled = _props.styled,
			    valueKey = _props.valueKey;
			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;

			var sizeClass = _lodash2.default.size(options) > 1 ? 'has-multiple-options' : 'has-single-option';
			var styledClass = styled ? 'form-styled' : 'form-unstyled';

			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'radio', valid: valid, extraClassName: styledClass + ' ' + sizeClass }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(
						'div',
						{ className: 'form-options form-options-layout-' + layout },
						options && options.map(function (option) {
							var key = '' + name + (option[labelKey] || '') + option[valueKey];
							var checked = value == option[valueKey];
							var selectedClass = checked ? 'is-selected' : '';

							return _react2.default.createElement(
								'div',
								{ key: key, className: 'form-option form-option-radio ' + selectedClass },
								_react2.default.createElement(
									'label',
									{ className: 'form-option-inner' },
									_react2.default.createElement('input', {
										checked: checked,
										className: 'option-input',
										disabled: disabled,
										name: name,
										onChange: _this2.handleChange,
										type: 'radio',
										value: option[valueKey]
									}),
									option[labelKey] && _react2.default.createElement(
										'span',
										{ className: 'option-label' },
										option[labelKey]
									)
								)
							);
						})
					)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return Radio;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	forcePropsToValue: _propTypes2.default.bool,
	labelKey: _propTypes2.default.string,
	layout: _propTypes2.default.oneOf(['horizontal', 'vertical']),
	options: _propTypes2.default.array,
	styled: _propTypes2.default.bool,
	value: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.number, _propTypes2.default.string]),
	valueKey: _propTypes2.default.string
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	forcePropsToValue: false,
	labelKey: 'title',
	layout: 'horizontal',
	options: [],
	styled: false,
	value: '',
	valueKey: 'id'
}), _temp2);
exports.default = Radio;