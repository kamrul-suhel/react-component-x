"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FormAppend;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormAppend(props) {

	if (!props.append) {
		return null;
	}

	var onClick = props.onClick || null;

	return _react2.default.createElement(
		"span",
		{ className: "form-field-append", onClick: onClick },
		props.append
	);
}