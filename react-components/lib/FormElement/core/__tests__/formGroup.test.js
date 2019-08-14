'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _FormGroup = require('../FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders correctly', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_FormGroup2.default, { type: 'checkbox', disabled: true, valid: true, validation: true, wide: true, className: 'custom-class-name' })).toJSON();
	expect(tree).toMatchSnapshot();
});