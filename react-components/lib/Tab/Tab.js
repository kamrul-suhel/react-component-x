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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = (_temp = _class = function (_React$PureComponent) {
	_inherits(Tab, _React$PureComponent);

	function Tab(props) {
		_classCallCheck(this, Tab);

		var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

		_this.flattenTabs = function () {
			var children = _this.formatTabData(_this.props.children);
			return !_lodash2.default.isArray(children) ? [children] : _lodash2.default.flatten(children);
		};

		_this.formatTabData = function (grandChild) {
			var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


			if (_lodash2.default.isArray(grandChild)) {
				return grandChild.map(function (child, i) {
					return _this.formatTabData(child, index + i);
				});
			}

			return grandChild;
		};

		_this.handleTabSelect = function (selectedIndex) {

			// callback on tab select
			// sends the new index and the prevIndex as params
			if (_this.props.onTabSelect) {
				_this.props.onTabSelect(selectedIndex, _this.state.selectedIndex);
			}

			_this.setState({ selectedIndex: selectedIndex });
		};

		_this.renderHeaderItem = function (tab, index) {
			if (_this.props.renderHeaderItem) {
				return _this.props.renderHeaderItem(tab, index);
			}

			return (tab.props || {}).title;
		};

		_this.renderTabHeader = function (tab, index) {
			var isSelected = index === _this.state.selectedIndex;
			var selectedClass = isSelected ? 'is-selected' : '';

			return _react2.default.createElement(
				'li',
				{
					className: 'tab-header-item ' + selectedClass,
					key: 'tabHeader' + index,
					onClick: function onClick() {
						return _this.handleTabSelect(index);
					}
				},
				_this.renderHeaderItem(tab, index)
			);
		};

		_this.renderTabHeaders = function (tabs) {
			var tabHeaderContent = tabs.map(_this.renderTabHeader);

			return _react2.default.createElement(
				'div',
				{ className: 'tab-header-wrapper' },
				_react2.default.createElement(
					'ul',
					null,
					tabHeaderContent
				)
			);
		};

		_this.renderSelectedTabContent = function (tabs) {
			var selectedIndex = _this.state.selectedIndex;

			var selectedTab = tabs[selectedIndex] || null;

			return _react2.default.createElement(
				'div',
				{ className: 'tab-content-wrapper' },
				selectedTab
			);
		};

		_this.state = {
			selectedIndex: _this.props.selectedIndex
		};
		return _this;
	}

	_createClass(Tab, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (this.props.selectedIndex !== prevProps.selectedIndex && this.props.selectedIndex !== prevState.selectedIndex) {
				this.handleTabSelect(this.props.selectedIndex);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var className = this.props.className;
			var selectedIndex = this.state.selectedIndex;


			var tabs = this.flattenTabs();

			return _react2.default.createElement(
				'div',
				{ className: 'tab selected-' + selectedIndex + ' ' + className },
				this.renderTabHeaders(tabs),
				this.renderSelectedTabContent(tabs)
			);
		}
	}]);

	return Tab;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.func]).isRequired,
	onTabSelect: _propTypes2.default.func,
	renderHeaderItem: _propTypes2.default.func,
	selectedIndex: _propTypes2.default.number
}, _class.defaultProps = {
	className: '',
	onTabSelect: undefined,
	renderHeaderItem: null,
	selectedIndex: 0
}, _temp);
exports.default = Tab;