'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _FormError = require('../FormError');

var _FormError2 = _interopRequireDefault(_FormError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders correctly', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_FormError2.default, { valid: false, errors: ['Something went wrong'] })).toJSON();
	expect(tree).toMatchSnapshot();
});