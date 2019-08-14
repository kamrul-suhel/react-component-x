"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FormError;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormError(props) {

	if (props.valid || !props.errors || props.errors.length === 0) {
		return null;
	}

	return _react2.default.createElement(
		"div",
		{ className: "form-field-error-wrapper" },
		_react2.default.createElement(
			"ul",
			null,
			props.errors.map(function (error, i) {
				return _react2.default.createElement(
					"li",
					{ key: props.name + "error" + i },
					error
				);
			})
		)
	);
}