'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = (_temp = _class = function (_React$PureComponent) {
	_inherits(Filter, _React$PureComponent);

	function Filter(props) {
		_classCallCheck(this, Filter);

		var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

		_this.update = function () {
			var urlParam = '';

			// generate the urlParam from the state
			_lodash2.default.map(_this.state, function (val, key) {
				if (val === null || val === '' || val === undefined || val === 'all') {
					return false;
				}

				urlParam = urlParam + '&' + key + '=' + val;
			});

			// if the new urlParam is the same as the cached one return
			if (_this.urlParam === urlParam) {
				return false;
			}

			_this.urlParam = urlParam;
			_this.props.onUpdate && _this.props.onUpdate(1, urlParam);
		};

		_this.handleSelectChange = function (name, value) {
			_this.setState(function () {
				return _defineProperty({}, name, value);
			}, function () {
				_this.update();
			});
		};

		_this.handleInputChange = function (name, value) {
			// dont search if the search string is less than minSearchLength character long
			if (value && value.length > 0 && value.length < _this.props.minSearchLength) {
				return false;
			}

			_this.setState(_defineProperty({}, name, value));

			// clear timeout
			clearTimeout(_this.searchUpdateTimer);

			// only search if user stopped typing for a bit
			_this.searchUpdateTimer = setTimeout(function () {
				_this.update();
			}, 300);
		};

		_this.handleSubmit = function () {
			_this.props.onSubmit(1, _this.urlParam);
		};

		_this.renderSubmitButton = function () {
			if (_this.props.submitButton) {
				return _react2.default.Children.map(_this.props.submitButton, function (child) {
					return _react2.default.cloneElement(child, {
						onClick: _this.handleSubmit
					});
				});
			}

			return _react2.default.createElement(
				'span',
				{ className: 'button filter-button', onClick: _this.handleSubmit },
				'Search'
			);
		};

		_this.renderFilter = function (filter) {
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'select';

			switch (type) {
				case 'text':
					{
						var placeholder = filter.placeholder || 'Search...';
						return _react2.default.createElement(_2.TextInput, {
							className: 'filter-' + filter.key,
							key: 'filter' + filter.key,
							label: filter.label,
							name: filter.key,
							onChange: _this.handleInputChange,
							placeholder: placeholder
						});
					}
				case 'datepicker':
					{
						return _react2.default.createElement(_2.DatePicker, {
							className: 'filter-' + filter.key,
							key: 'filter' + filter.key,
							label: filter.label,
							name: filter.key,
							onChange: _this.handleInputChange,
							value: filter.default || null
						});
					}
				default:
					{
						// hide filter if options are empty
						if (!filter.options) {
							return false;
						}

						// add Show All as the first option
						var options = [{ id: 'all', title: 'Show All' }].concat(filter.options);
						var defaultValue = filter.default !== null ? filter.default : 'all';

						return _react2.default.createElement(_2.Select, {
							className: 'filter-' + filter.key,
							key: 'filter' + filter.key,
							label: filter.label,
							name: filter.key,
							onChange: _this.handleSelectChange,
							options: options,
							resetValue: { id: 'all', title: 'Show All' },
							value: defaultValue
						});
					}
			}
		};

		_this.renderFilters = function () {
			var filters = _this.props.filters;


			if (!filters) {
				return null;
			}

			return filters.map(function (filter) {
				var type = filter.key === 'search' ? 'text' : filter.type;
				return _this.renderFilter(filter, type);
			});
		};

		_this.urlParam = '';
		_this.searchUpdateTimer;
		return _this;
	}

	// handle dropdown change


	// handle search input change


	_createClass(Filter, [{
		key: 'render',
		value: function render() {
			var className = this.props.className;


			return _react2.default.createElement(
				'div',
				{ className: 'content-filter ' + className },
				this.renderFilters(),
				this.props.onSubmit && this.renderSubmitButton()
			);
		}
	}]);

	return Filter;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	filters: _propTypes2.default.array.isRequired,
	minSearchLength: _propTypes2.default.number,
	onSubmit: _propTypes2.default.func,
	onUpdate: _propTypes2.default.func
}, _class.defaultProps = {
	className: '',
	filters: [],
	minSearchLength: 3
}, _temp);
exports.default = Filter;