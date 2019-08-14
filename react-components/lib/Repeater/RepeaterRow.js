'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_React$PureComponent) {
	_inherits(Loader, _React$PureComponent);

	_createClass(Loader, null, [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(nextProps, prevState) {
			if (nextProps.option.id !== prevState.id) {
				return {
					id: nextProps.option.id
				};
			}

			return null;
		}
	}]);

	function Loader(props) {
		_classCallCheck(this, Loader);

		var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));

		_this.handleChange = function (name, value) {
			_this.setState(_defineProperty({}, name, value), _this.handleUpdateParent);
		};

		_this.handleUpdateParent = function () {
			_this.props.onChange(_this.state.counter, _this.state);
		};

		_this.handleRemove = function () {
			return _this.props.onRemove(_this.state.counter);
		};

		_this.renderRowPrepend = function () {
			var _this$props = _this.props,
			    onRowBefore = _this$props.onRowBefore,
			    option = _this$props.option;


			if (!onRowBefore) {
				return null;
			}

			var element = onRowBefore(option);
			return _this.renderChild(option, element);
		};

		_this.renderRowAppend = function () {
			var _this$props2 = _this.props,
			    onRowAppend = _this$props2.onRowAppend,
			    option = _this$props2.option;


			if (!onRowAppend) {
				return null;
			}

			var element = onRowAppend(option);
			return _this.renderChild(option, element);
		};

		_this.renderChildren = function (children) {
			var option = _this.props.option;

			return _react2.default.Children.map(children, function (child) {

				// run the same function until get the input
				if (child.props.children) {
					var newChildren = _this.renderChildren(child.props.children);
					return _extends({}, child, {
						props: _extends({}, child.props, {
							children: newChildren
						})
					});
				}

				return _this.renderChild(option, child);
			});
		};

		_this.renderChild = function (option, element) {
			if (!element) {
				return element;
			}

			var _this$props3 = _this.props,
			    rowValues = _this$props3.rowValues,
			    valueExtractor = _this$props3.valueExtractor;


			var childValue = null;
			if (!_lodash2.default.isEmpty(rowValues)) {
				var childName = valueExtractor ? valueExtractor[element.props.name] : element.props.name;
				childValue = rowValues[childName];
			}

			// this lets users to pass extra props down to the children
			// e.g. passing title="row.sub_title" will send the current iteration object's sub_title as title prop
			var customProps = {};
			_lodash2.default.map(element.props, function (val, key) {
				if (typeof val === 'string' && val.indexOf('row.') !== -1) {
					customProps[key] = rowValues[val.replace('row.', '')];
				}
			});

			return _react2.default.cloneElement(element, _extends({
				onChange: _this.handleChange,
				value: childValue
			}, customProps));
		};

		_this.renderRemoveButton = function () {
			if (_this.props.disabled || _this.props.size === _this.props.min) {
				return false;
			}

			return _react2.default.createElement(
				'span',
				{ className: 'repeatable-row-remove', onClick: _this.handleRemove },
				_this.props.removeButton
			);
		};

		_this.handleUpdateParent = _lodash2.default.debounce(_this.handleUpdateParent, 120);

		_this.state = _this.props.option;
		return _this;
	}

	// REVIEW: Couldnt make it work as <Select /> or another component which waits async for options wont be displayed on the first time,
	// as by that point reducer is empty, and shouldComponentUpdate block from rerendering. Maybe passing a resolve function to repeater
	// could fix this issue
	// shouldComponentUpdate(nextProps) {
	// 	const rowValuesChanged = !_.isEqual(this.props.rowValues, nextProps.rowValues);
	// 	const optionChanged = !_.isEqual(this.props.option, nextProps.option);
	// 	const sizeChanged = nextProps.size < 3;
	//
	// 	return optionChanged || sizeChanged || rowValuesChanged;
	// }

	_createClass(Loader, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'repeatable-row' },
				this.renderRowPrepend(),
				this.renderChildren(this.props.children),
				this.renderRowAppend(),
				this.renderRemoveButton()
			);
		}
	}]);

	return Loader;
}(_react2.default.PureComponent);

exports.default = Loader;