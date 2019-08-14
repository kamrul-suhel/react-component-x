'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelect = (_temp2 = _class = function (_FormElement) {
	_inherits(MultiSelect, _FormElement);

	function MultiSelect() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, MultiSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call.apply(_ref, [this].concat(args))), _this), _this.updateValue = function () {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, value);
			_this.setState({ value: value });
		}, _this.addItem = function (option) {
			var selectedOption = _lodash2.default.filter(_this.props.options, function (v) {
				return v[_this.props.valueKey] == option[_this.props.valueKey];
			});
			var newOption = _lodash2.default.merge({}, _lodash2.default.head(selectedOption), { new: true });
			var oldOptions = _this.state.value || [];

			if (!_this.props.onAdd) {
				var selectedOptions = oldOptions.concat([newOption]);
				_this.updateValue(selectedOptions);
			} else {
				_this.props.onAdd([newOption]).then(function (result) {
					var selectedOptions = oldOptions.concat(result);
					_this.updateValue(selectedOptions);
				}).catch(function (error) {
					return false;
				});
			}
		}, _this.removeItem = function (option) {
			// cant remove clearable false items
			if (!_this.props.clearable && option.clearable === false) {
				return false;
			}

			var selectedValues = _lodash2.default.filter(_this.state.value, function (v) {
				return v[_this.props.valueKey] != option[_this.props.valueKey];
			});

			if (_this.props.onRemove) {
				_this.props.onRemove();
			}

			_this.updateValue(selectedValues);
		}, _this.renderAvailableOptions = function () {
			var _this$props = _this.props,
			    name = _this$props.name,
			    options = _this$props.options;


			var list = options && options.map(function (option) {
				if (!option[_this.props.valueKey]) {
					return false;
				}

				var isSelected = _lodash2.default.find(_this.state.value, function (v) {
					return v[_this.props.valueKey] == option[_this.props.valueKey];
				});
				var selectedClass = isSelected ? 'is-selected' : '';
				var clearableClass = isSelected && !_this.props.clearable && isSelected.clearable === false ? 'hidden' : '';
				var onClickFn = !isSelected ? function () {
					return _this.addItem(option);
				} : null;
				return _react2.default.createElement(
					'li',
					{ key: 'multiSelectAvailableOption' + name + option[_this.props.valueKey] },
					_react2.default.createElement(
						'span',
						{ className: 'option ' + clearableClass + ' ' + selectedClass, onClick: onClickFn },
						option[_this.props.labelKey]
					)
				);
			});

			return _react2.default.createElement(
				'div',
				{ className: 'list-wrapper option-available' },
				_react2.default.createElement(
					'ul',
					null,
					list
				)
			);
		}, _this.renderSelectedOptions = function () {
			var name = _this.props.name;
			var value = _this.state.value;


			var list = value && value.map(function (option) {
				if (!option[_this.props.valueKey]) {
					return false;
				}

				var lockedClass = option.clearable === false ? 'is-locked' : '';
				var newClass = option.new === true ? 'is-new' : '';

				return _react2.default.createElement(
					'li',
					{ key: 'multiSelectSelectedOption' + name + option[_this.props.valueKey] },
					_react2.default.createElement(
						'span',
						{ className: 'option ' + lockedClass + ' ' + newClass, onClick: function onClick() {
								return _this.removeItem(option);
							} },
						option[_this.props.labelKey]
					)
				);
			});

			return _react2.default.createElement(
				'div',
				{ className: 'list-wrapper option-selected' },
				_react2.default.createElement(
					'ul',
					null,
					list
				)
			);
		}, _this.renderLabel = function () {
			var label = _this.props.label;


			if (typeof label === 'string') {
				return _react2.default.createElement(_core.FormLabel, { label: label });
			}

			return label.map(function (labelItem, i) {
				return _react2.default.createElement(_core.FormLabel, { key: 'multiSelectLabel' + i, label: labelItem });
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(MultiSelect, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var value = this.formatValue(this.props.value);
			this.updateValue(value);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_lodash2.default.isEqual(this.props.value, nextProps.value)) {
				var value = this.formatValue(nextProps.value);
				this.updateValue(value);
			}
		}
	}, {
		key: 'formatValue',
		value: function formatValue(value) {
			if (this.props.clearable) {
				return value;
			}

			return value.map(function (option) {
				return _extends({}, option, {
					clearable: false
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;


			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'multi-select', valid: valid }),
				_react2.default.createElement(
					'div',
					{ className: 'form-label-wrapper' },
					this.renderLabel()
				),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					this.renderAvailableOptions(),
					_react2.default.createElement(
						'div',
						{ className: 'separator' },
						_react2.default.createElement('i', { className: 'ion-arrow-swap' })
					),
					this.renderSelectedOptions()
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return MultiSelect;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	clearable: _propTypes2.default.bool,
	labelKey: _propTypes2.default.string,
	onAdd: _propTypes2.default.func,
	onRemove: _propTypes2.default.func,
	options: _propTypes2.default.array,
	value: _propTypes2.default.array,
	valueKey: _propTypes2.default.string
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	clearable: true,
	labelKey: 'title',
	options: [],
	value: [],
	valueKey: 'id'
}), _temp2);
exports.default = MultiSelect;