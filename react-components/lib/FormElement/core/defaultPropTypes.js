'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPropTypes = {
	className: _propTypes2.default.string,
	disabled: _propTypes2.default.bool,
	label: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	name: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	onChange: _propTypes2.default.func,
	skipInitialOnChangeCall: _propTypes2.default.bool,
	validation: _propTypes2.default.string,
	wide: _propTypes2.default.bool,
	withFloatingLabel: _propTypes2.default.bool
};

exports.default = defaultPropTypes;