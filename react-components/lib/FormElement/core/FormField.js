"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FormField;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormField(props) {
	return _react2.default.createElement(
		"div",
		{ className: "form-field" },
		props.children
	);
}