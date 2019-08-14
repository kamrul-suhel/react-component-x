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

var _reactSlider = require('react-slider');

var _reactSlider2 = _interopRequireDefault(_reactSlider);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = (_temp = _class = function (_FormElement) {
	_inherits(Slider, _FormElement);

	function Slider() {
		_classCallCheck(this, Slider);

		return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
	}

	_createClass(Slider, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    disabled = _props.disabled,
			    max = _props.max,
			    min = _props.min,
			    step = _props.step,
			    withBars = _props.withBars;
			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;


			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'slider', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(_core.FormPrepend, this.props),
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(
							_reactSlider2.default,
							{
								disabled: disabled,
								handleActiveClassName: 'is-active',
								max: max,
								min: min,
								onChange: this.handleChange,
								snapDragDisabled: false,
								step: step,
								value: value,
								withBars: withBars
							},
							this.props.children
						)
					),
					_react2.default.createElement(_core.FormAppend, this.props)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return Slider;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	append: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	max: _propTypes2.default.number,
	min: _propTypes2.default.number,
	prepend: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	step: _propTypes2.default.number,
	value: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.number, _propTypes2.default.string]),
	withBars: _propTypes2.default.bool
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	append: '',
	max: 10,
	min: 1,
	prepend: '',
	step: 1,
	value: 0,
	withBars: true
}), _temp);
exports.default = Slider;