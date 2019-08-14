'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FormGroup;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormGroup(props) {
	var disabledClass = props.disabled ? ' is-disabled' : '';
	var validClass = function () {
		switch (props.valid) {
			case true:
				return ' form-group-valid';
			case false:
				return ' form-group-invalid';
			default:
				return '';
		}
	}();
	var validationRequiredClass = props.validation ? ' form-group-validation-required' : '';
	var wideClass = props.wide ? ' form-group-wide' : '';
	var focusedClass = props.withFloatingLabel && !!props.isFocused ? ' is-focused' : '';
	var canFloatClass = props.withFloatingLabel ? ' can-float' : '';
	var shouldFloatClass = props.withFloatingLabel && (!!props.value || !!props.isFocused) ? ' should-float' : '';
	var className = props.className ? ' ' + props.className : '';
	var extraClassName = props.extraClassName ? ' ' + props.extraClassName : '';

	return _react2.default.createElement(
		'div',
		{ className: 'form-group form-type-' + props.type + wideClass + focusedClass + canFloatClass + shouldFloatClass + extraClassName + validationRequiredClass + validClass + disabledClass + className },
		props.children
	);
}