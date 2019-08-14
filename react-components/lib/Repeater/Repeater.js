'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _RepeaterRow = require('./RepeaterRow');

var _RepeaterRow2 = _interopRequireDefault(_RepeaterRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Repeater = (_temp = _class = function (_React$PureComponent) {
	_inherits(Repeater, _React$PureComponent);

	function Repeater(props) {
		_classCallCheck(this, Repeater);

		var _this = _possibleConstructorReturn(this, (Repeater.__proto__ || Object.getPrototypeOf(Repeater)).call(this, props));

		_this.updateValue = function (value) {
			_this.setState({ presetValues: value });
			_this.generateOptions(value);
		};

		_this.generateOptions = function (value) {
			var options = {};
			var valueCount = _lodash2.default.size(value);
			var count = valueCount || _this.props.count;

			for (var i = 0; i < count; i++) {
				var counter = i + 1;
				var option = _defineProperty({}, counter, {
					counter: counter,
					id: (value[i] || {}).id || 0
				});
				options = _lodash2.default.assign({}, options, option);
			}

			_this.setState(function () {
				return {
					options: options,
					count: _this.props.count,
					optionId: count
				};
			}, function () {
				_this.props.onChange(_this.props.name, _this.state.options);
			});
		};

		_this.handleChange = function (counter, state) {
			_this.setState(function (prevState) {
				return {
					options: _extends({}, prevState.options, _defineProperty({}, counter, state))
				};
			}, function () {
				_this.props.onChange(_this.props.name, _this.state.options);
			});
		};

		_this.canAddMore = function () {
			if (_this.props.max > 0 && _this.props.max <= _lodash2.default.size(_this.state.options)) {
				return false;
			}

			return true;
		};

		_this.remove = function (counter) {
			var options = _lodash2.default.pickBy(_this.state.options, function (v) {
				return v.counter != counter;
			});
			var removed = _lodash2.default.find(_this.state.options, { 'counter': counter });

			_this.setState(function (prevState) {
				return {
					options: options,
					count: prevState.count - 1
				};
			}, function () {
				_this.props.onChange(_this.props.name, _this.state.options);

				if (_this.props.onRemoved) {
					_this.props.onRemoved(removed);
				}
			});
		};

		_this.add = function () {
			if (_this.canAddMore()) {
				var optionId = _this.state.optionId + 1;
				_this.setState(function (prevState) {
					return {
						optionId: optionId,
						count: prevState.count + 1,
						options: _extends({}, prevState.options, _defineProperty({}, optionId, {
							counter: optionId,
							id: 0
						}))
					};
				});
			}
		};

		_this.renderAddButton = function () {
			if (_this.props.disabled || !_this.canAddMore()) {
				return false;
			}

			return _react2.default.createElement(
				'span',
				{ className: 'repeatable-row-add', onClick: _this.add },
				_this.props.addButton
			);
		};

		_this.state = {
			options: {},
			presetValues: []
		};
		return _this;
	}

	_createClass(Repeater, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.updateValue(_lodash2.default.values(this.props.value));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// override state only if current props is empty but next props has value
			if (_lodash2.default.size(this.props.value) === 0 && _lodash2.default.size(nextProps.value) > 0) {
				this.updateValue(_lodash2.default.values(nextProps.value));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    addButtonPosition = _props.addButtonPosition,
			    children = _props.children,
			    className = _props.className,
			    disabled = _props.disabled,
			    min = _props.min,
			    onRowAppend = _props.onRowAppend,
			    onRowBefore = _props.onRowBefore,
			    removeButton = _props.removeButton,
			    title = _props.title,
			    valueExtractor = _props.valueExtractor;
			var _state = this.state,
			    options = _state.options,
			    presetValues = _state.presetValues;

			var disabledClass = disabled ? 'is-disabled' : '';
			var optionSize = _lodash2.default.size(options);

			return _react2.default.createElement(
				'div',
				{ className: 'form-repeater ' + disabledClass + ' ' + className },
				_react2.default.createElement(
					'div',
					{ className: 'repeatable-label-wrapper' },
					title && _react2.default.createElement(
						'span',
						{ className: 'repeatable-label' },
						title
					),
					addButtonPosition === 'top' && this.renderAddButton()
				),
				_react2.default.createElement(
					'div',
					{ className: 'repeatable-wrapper' },
					options && _lodash2.default.map(options, function (option) {
						var rowValues = presetValues[option.counter - 1] || {};
						return _react2.default.createElement(
							_RepeaterRow2.default,
							{
								disabled: disabled,
								key: option.counter,
								min: min,
								onChange: _this2.handleChange,
								onRemove: _this2.remove,
								onRowAppend: onRowAppend,
								onRowBefore: onRowBefore,
								option: option,
								removeButton: removeButton,
								rowValues: rowValues,
								size: optionSize,
								valueExtractor: valueExtractor
							},
							children
						);
					})
				),
				addButtonPosition === 'bottom' && this.renderAddButton()
			);
		}
	}]);

	return Repeater;
}(_react2.default.PureComponent), _class.propTypes = {
	addButton: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	addButtonPosition: _propTypes2.default.oneOf(['top', 'bottom']),
	className: _propTypes2.default.string,
	count: _propTypes2.default.number,
	disabled: _propTypes2.default.bool,
	min: _propTypes2.default.number,
	max: _propTypes2.default.number,
	name: _propTypes2.default.string.isRequired,
	onRowAppend: _propTypes2.default.func,
	onRowBefore: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onRemoved: _propTypes2.default.func,
	removeButton: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	title: _propTypes2.default.string,
	value: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
	valueExtractor: _propTypes2.default.object
}, _class.defaultProps = {
	addButton: 'Add',
	addButtonPosition: 'bottom',
	className: '',
	count: 1,
	disabled: false,
	max: 0,
	min: 1,
	onChange: function onChange() {},
	onRemoved: function onRemoved() {},
	onRowAppend: null,
	onRowBefore: null,
	removeButton: 'Remove',
	title: '',
	value: [],
	valueExtractor: null
}, _temp);
exports.default = Repeater;