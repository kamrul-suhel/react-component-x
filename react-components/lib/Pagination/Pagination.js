'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = (_temp = _class = function (_React$PureComponent) {
	_inherits(Pagination, _React$PureComponent);

	function Pagination(props) {
		_classCallCheck(this, Pagination);

		var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			pager: {}
		};
		return _this;
	}

	_createClass(Pagination, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setPage(this.props.currentPage, this.props, true);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.totalItems !== nextProps.totalItems) {
				this.setPage(nextProps.currentPage, nextProps, true);
			}

			if (this.props.currentPage !== nextProps.currentPage) {
				this.setPage(nextProps.currentPage, nextProps, true);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var pager = this.state.pager;

			var disabledPrevPageClass = pager.currentPage === 1 ? 'disabled' : '';
			var disabledNextPageClass = pager.currentPage === pager.totalPages ? 'disabled' : '';

			return _react2.default.createElement(
				'div',
				{ className: 'content-pagination page-count-' + pager.totalPages + ' current-page-' + pager.currentPage },
				_react2.default.createElement(
					'ul',
					null,
					_react2.default.createElement(
						'li',
						{ className: 'content-pagination-nav-first ' + disabledPrevPageClass },
						_react2.default.createElement(
							'a',
							{ onClick: function onClick() {
									return _this2.setPage(1);
								} },
							'First'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'content-pagination-nav-prev ' + disabledPrevPageClass },
						_react2.default.createElement(
							'a',
							{ onClick: function onClick() {
									return _this2.setPage(pager.currentPage - 1);
								} },
							'Previous'
						)
					),
					pager.pages && pager.pages.map(function (page, index) {
						return _react2.default.createElement(
							'li',
							{ key: index, className: pager.currentPage === page ? 'active' : '' },
							_react2.default.createElement(
								'a',
								{ onClick: function onClick() {
										return _this2.setPage(page);
									} },
								page
							)
						);
					}),
					_react2.default.createElement(
						'li',
						{ className: 'content-pagination-nav-next ' + disabledNextPageClass },
						_react2.default.createElement(
							'a',
							{ onClick: function onClick() {
									return _this2.setPage(pager.currentPage + 1);
								} },
							'Next'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: 'content-pagination-nav-last ' + disabledNextPageClass },
						_react2.default.createElement(
							'a',
							{ onClick: function onClick() {
									return _this2.setPage(pager.totalPages);
								} },
							'Last'
						)
					)
				)
			);
		}
	}]);

	return Pagination;
}(_react2.default.PureComponent), _class.propTypes = {
	currentPage: _propTypes2.default.number,
	perPage: _propTypes2.default.number,
	totalItems: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	onPageChange: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
	currentPage: 1,
	perPage: 20
}, _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.setPage = function (page, nextProps, init) {
		var pager = _this3.state.pager;


		if (!init && (page < 1 || page > pager.totalPages || page === pager.currentPage)) {
			return false;
		}

		var props = nextProps || _this3.props;
		var totalItems = props.totalItems,
		    perPage = props.perPage;
		// get new pager object for specified page

		var newPager = _this3.getPager(totalItems, page, perPage);

		// update state
		_this3.setState({ pager: newPager });

		// call change page function in parent component
		if (!(init && page === 1)) {
			props.onPageChange(page);
		}

		return page;
	};

	this.getPager = function () {
		var totalItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
		var currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
		var perPage = arguments[2];


		// calculate total pages
		var totalPages = Math.ceil(totalItems / perPage);

		var startPage = void 0;
		var endPage = void 0;

		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}

		// calculate start and end item indexes
		var startIndex = (currentPage - 1) * perPage;
		var endIndex = Math.min(startIndex + (perPage - 1), totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		var pages = _lodash2.default.range(startPage, endPage + 1);

		// return object with all pager properties required by the view
		return {
			totalItems: totalItems,
			currentPage: currentPage,
			perPage: perPage,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages
		};
	};
}, _temp);
exports.default = Pagination;