"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FormPrepend;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormPrepend(props) {

	if (!props.prepend) {
		return null;
	}

	var onClick = props.onClick || null;

	return _react2.default.createElement(
		"span",
		{ className: "form-field-prepend", onClick: onClick },
		props.prepend
	);
}