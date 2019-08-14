'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentLoader = (_temp2 = _class = function (_React$PureComponent) {
	_inherits(ContentLoader, _React$PureComponent);

	function ContentLoader() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ContentLoader);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentLoader.__proto__ || Object.getPrototypeOf(ContentLoader)).call.apply(_ref, [this].concat(args))), _this), _this.renderFilters = function () {
			var filter = _this.props.filter;


			if (!filter) {
				return null;
			}

			return _react2.default.createElement(_2.Filter, {
				filters: filter.filters,
				onSubmit: filter.onSubmit,
				onUpdate: filter.onUpdate
			});
		}, _this.renderPagination = function () {
			var _this$props = _this.props,
			    isLoading = _this$props.isLoading,
			    pagination = _this$props.pagination;


			if (!pagination) {
				return null;
			}

			return _react2.default.createElement(_2.Pagination, {
				currentPage: pagination.currentPage,
				onPageChange: pagination.onPageChange,
				perPage: pagination.perPage,
				totalItems: pagination.total
			});
		}, _this.renderContent = function () {
			var _this$props2 = _this.props,
			    data = _this$props2.data,
			    forceRefresh = _this$props2.forceRefresh,
			    isLoading = _this$props2.isLoading,
			    loader = _this$props2.loader,
			    noResults = _this$props2.noResults;

			var hasData = _lodash2.default.isArray(data) ? data.length > 0 : !!data;

			// return the content if loading is finished or hasData
			if (!isLoading || !forceRefresh && hasData) {
				if (hasData) {
					return _this.props.children;
				}
				if (typeof noResults === 'string') {
					return _react2.default.createElement(_2.NoResults, { content: noResults });
				}

				return noResults;

				// return loader while fetching
			} else if (isLoading) {
				if (!loader) {
					return _react2.default.createElement(_2.Loader, null);
				}
				return loader;
			}

			// return error message if fetch wasnt successful
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Something went wrong, please try again later.'
				)
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ContentLoader, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_react2.default.Fragment,
				null,
				this.renderFilters(),
				this.renderContent(),
				this.renderPagination()
			);
		}
	}]);

	return ContentLoader;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.object, _propTypes2.default.string]),
	filter: _propTypes2.default.object,
	forceRefresh: _propTypes2.default.bool,
	isLoading: _propTypes2.default.bool,
	loader: _propTypes2.default.element,
	noResults: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.element]),
	pagination: _propTypes2.default.object
}, _class.defaultProps = {
	className: '',
	data: null,
	filter: null,
	forceRefresh: false,
	isLoading: true,
	loader: null,
	noResults: 'No data available',
	pagination: null
}, _temp2);
exports.default = ContentLoader;