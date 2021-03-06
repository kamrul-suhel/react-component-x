"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FormLabel;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormLabel(props) {
	if (!props.label) {
		return null;
	}

	return _react2.default.createElement(
		"span",
		{ className: "form-label" },
		props.label
	);
}