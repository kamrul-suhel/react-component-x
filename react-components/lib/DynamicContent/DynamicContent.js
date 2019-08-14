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

var DynamicContent = (_temp2 = _class = function (_React$PureComponent) {
	_inherits(DynamicContent, _React$PureComponent);

	function DynamicContent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DynamicContent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DynamicContent.__proto__ || Object.getPrototypeOf(DynamicContent)).call.apply(_ref, [this].concat(args))), _this), _this.renderFilters = function () {
			var _this$props = _this.props,
			    collection = _this$props.collection,
			    filter = _this$props.filter;


			if (!filter || !collection.fetched) {
				return false;
			}

			return _react2.default.createElement(_2.Filter, { filters: filter.filters, onUpdate: filter.onUpdate });
		}, _this.renderPagination = function () {
			var _this$props2 = _this.props,
			    collection = _this$props2.collection,
			    pagination = _this$props2.pagination;


			if (!pagination || !collection.fetched || !collection.count) {
				return false;
			}

			return _react2.default.createElement(_2.Pagination, { currentPage: pagination.currentPage, totalItems: collection.count, perPage: pagination.perPage, onPageChange: pagination.onPageChange });
		}, _this.renderContent = function () {
			var _this$props3 = _this.props,
			    collection = _this$props3.collection,
			    fetched = _this$props3.fetched,
			    fetching = _this$props3.fetching;
			// return loader while fetching

			if (fetching || collection.fetching) {
				return _react2.default.createElement(_2.Loader, null);
				// return the content once fetched
			} else if (fetched || collection.fetched && !collection.error) {
				if (_lodash2.default.isEmpty(collection) || collection.count > 0 || _lodash2.default.size(collection.data) > 0 || _lodash2.default.size(collection.entities) > 0) {
					// if (_.size(collection.data) > 0 || _.size(collection.entities) > 0) {
					return _this.props.children;
				} else {
					if (typeof _this.props.notFound === 'string') {
						return _react2.default.createElement(_2.NoResults, { content: _this.props.notFound });
					} else {
						return _this.props.notFound;
					}
				}
				// return error message if fetch wasnt successful
			} else {
				return _react2.default.createElement(_2.NoResults, { content: collection.error });
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DynamicContent, [{
		key: 'render',
		value: function render() {
			var className = this.props.className;


			return _react2.default.createElement(
				'div',
				{ className: 'dynamic-content ' + className },
				this.renderFilters(),
				this.renderContent(),
				this.renderPagination()
			);
		}
	}]);

	return DynamicContent;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	collection: _propTypes2.default.object.isRequired,
	fetched: _propTypes2.default.bool,
	fetching: _propTypes2.default.bool,
	filter: _propTypes2.default.object,
	notFound: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
	onPageChange: _propTypes2.default.func,
	pagination: _propTypes2.default.object
}, _class.defaultProps = {
	className: '',
	collection: {},
	fetched: false,
	fetching: false,
	filter: null,
	notFound: 'No data available',
	pagination: null
}, _temp2);
exports.default = DynamicContent;