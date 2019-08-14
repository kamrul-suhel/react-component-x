'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _enzyme = require('enzyme');

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [{ id: 'foo', title: 'Foo' }, { id: 'bar', title: 'Bar' }];

it('renders correctly', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Checkbox2.default, { name: 'options', value: 'bar', options: options })).toJSON();
	expect(tree).toMatchSnapshot();
});

it('selected value is correct', function () {
	var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_Checkbox2.default, { name: 'options', value: 'foo', options: options }));
	expect(checkbox.state().value).toEqual(['foo']);
});

it('multiple toggle test', function () {
	var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_Checkbox2.default, { name: 'options', value: 'foo', options: options }));
	expect(checkbox.state().value).toEqual(['foo']);
	checkbox.find('.option-input[value="bar"]').simulate('change', { target: { checked: true } });
	expect(checkbox.state().value).toEqual(['foo', 'bar']);
	checkbox.find('.option-input[value="foo"]').simulate('change', { target: { checked: false } });
	expect(checkbox.state().value).toEqual(['bar']);
	checkbox.find('.option-input[value="foo"]').simulate('change', { target: { checked: true } });
	expect(checkbox.state().value).toEqual(['bar', 'foo']);
});