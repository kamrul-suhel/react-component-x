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

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = (_temp = _class = function (_React$PureComponent) {
	_inherits(Table, _React$PureComponent);

	function Table(props) {
		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

		_this.onSortChange = function () {
			_this.props.sort.onSort(_this.state.sortBy, _this.state.sortDir);
		};

		_this.handleSort = function (sortBy) {
			if (sortBy === _this.state.sortBy) {
				_this.setState({ sortDir: _this.state.sortDir === 'ASC' ? 'DESC' : 'ASC' }, _this.onSortChange);
			} else {
				_this.setState({
					sortBy: sortBy,
					sortDir: 'ASC'
				}, _this.onSortChange);
			}
		};

		_this.renderIcon = function () {
			if (!_this.props.icon) {
				return false;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'triangle-wrapper' },
				_react2.default.createElement(
					'div',
					{ className: 'triangle-overlay' },
					_react2.default.createElement('i', { className: _this.props.icon })
				)
			);
		};

		_this.renderCount = function () {
			if (!_this.props.total) {
				return false;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'count-wrapper' },
				_react2.default.createElement(
					'span',
					null,
					_this.props.totalLabel,
					': ',
					_react2.default.createElement(
						'span',
						{ className: 'count' },
						_this.props.total
					)
				)
			);
		};

		_this.state = {
			sortBy: _this.props.sort.by,
			sortDir: _this.props.sort.dir
		};
		return _this;
	}

	_createClass(Table, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    actions = _props.actions,
			    className = _props.className,
			    footer = _props.footer,
			    freezeHeaderColumn = _props.freezeHeaderColumn,
			    headers = _props.headers,
			    icon = _props.icon,
			    sort = _props.sort;

			var isSortable = !!(sort.columns.length > 0 && sort.onSort);
			var sortableClass = isSortable ? 'is-sortable' : '';
			var hasIconClass = !freezeHeaderColumn && icon ? 'has-icon' : '';
			var freezeColumnClass = freezeHeaderColumn ? 'freeze-header-column' : '';

			if (this.props.children.length === 0) {
				return _react2.default.createElement(_.NoResults, { content: 'No data available.' });
			}

			return _react2.default.createElement(
				'div',
				{ className: 'table ' + hasIconClass + ' ' + sortableClass + ' ' + freezeColumnClass + ' ' + className },
				_react2.default.createElement(
					'div',
					{ className: 'table-inner' },
					this.renderIcon(),
					this.renderCount(),
					_react2.default.createElement(
						'table',
						null,
						_react2.default.createElement(
							'thead',
							null,
							_react2.default.createElement(
								'tr',
								null,
								headers.map(function (header, i) {
									var emptyClass = !header ? 'is-empty' : '';
									var sortColumnKey = sort.columns[i];
									var isHeaderSortable = !!(isSortable && !!sortColumnKey);
									var headerSortableClass = isHeaderSortable ? 'header-is-sortable' : '';
									var headerSortClass = isHeaderSortable && _this2.state.sortBy === sortColumnKey ? _this2.state.sortDir === 'ASC' ? 'sorted-asc' : 'sorted-desc' : '';
									var onClick = isHeaderSortable ? function () {
										return _this2.handleSort(sortColumnKey);
									} : null;

									return _react2.default.createElement(
										'th',
										{ className: emptyClass + ' ' + headerSortableClass + ' ' + headerSortClass, key: 'th' + i, onClick: onClick },
										header
									);
								})
							)
						),
						_react2.default.createElement(
							'tbody',
							null,
							this.props.children
						)
					)
				),
				!!footer && _react2.default.createElement(
					'div',
					{ className: 'table-footer' },
					_react2.default.createElement(
						'div',
						{ className: 'table-footer-inner' },
						footer
					)
				),
				!!actions && _react2.default.createElement(
					'div',
					{ className: 'table-actions' },
					actions
				)
			);
		}
	}]);

	return Table;
}(_react2.default.PureComponent), _class.propTypes = {
	children: _propTypes2.default.array.isRequired,
	className: _propTypes2.default.string,
	footer: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element]),
	freezeHeaderColumn: _propTypes2.default.bool,
	headers: _propTypes2.default.array.isRequired,
	icon: _propTypes2.default.string,
	sort: _propTypes2.default.object,
	total: _propTypes2.default.number,
	totalLabel: _propTypes2.default.string
}, _class.defaultProps = {
	children: [],
	className: '',
	freezeHeaderColumn: false,
	sort: {
		by: null,
		columns: [],
		dir: 'ASC',
		onSort: null
	},
	total: 0,
	totalLabel: 'Total'
}, _temp);
exports.default = Table;