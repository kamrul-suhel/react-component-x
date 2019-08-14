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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Accordion = (_temp = _class = function (_React$PureComponent) {
	_inherits(Accordion, _React$PureComponent);

	function Accordion(props) {
		_classCallCheck(this, Accordion);

		var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

		_this.handleClick = function () {
			if (_this.props.disabled) {
				return false;
			}

			if (_this.state.open) {
				_this.props.closeable && _this.toggle();
			} else {
				_this.toggle();

				if (_this.props.onOpen) {
					_this.props.onOpen();
				}
			}

			// this.slideToggle();
		};

		_this.toggle = function () {
			_this.setState({ open: !_this.state.open });
		};

		_this.open = function () {
			_this.setState({ open: true });
		};

		_this.close = function () {
			_this.setState({ open: false });
		};

		_this.state = {
			open: _this.props.open
		};

		_this.open = false;
		_this.heightChecked = false;
		_this.initHeight = 0;
		_this.timeout;
		return _this;
	}

	_createClass(Accordion, [{
		key: 'render',


		// getHeight = () => {
		// 	if (this.heightChecked) {
		// 		return this.initHeight;
		// 	}

		// 	const el = this.refAccordionBody;
		// 	const parent = this.refs.accordion;
		// 	this.heightChecked = true;

		// 	if (this.open) {
		// 		this.initHeight = el.offsetHeight;
		// 		return this.initHeight;
		// 	}

		// 	parent.style.position = 'relative';
		// 	el.style.display = 'block';
		// 	el.style.visibility = 'hidden';
		// 	el.style.position = 'absolute';
		// 	this.initHeight = el.offsetHeight;
		// 	parent.style.position = null;
		// 	el.style.display = null;
		// 	el.style.visibility = null;
		// 	el.style.position = null;
		// 	return this.initHeight;
		// }

		// sleep = (ms) => {
		// 	return new Promise(resolve => setTimeout(resolve, ms));
		// }

		// slideToggle = async () => {
		// 	const el = this.refAccordionBody;
		// 	const elMaxHeight = this.getHeight();

		// 	const clearStyles = () => {
		// 		el.style.overflowY = null;
		// 		el.style.transition = null;
		// 	}

		// 	const setupStyles = () => {
		// 		el.style.overflowY = 'hidden';
		// 		el.style.transition = 'all 300ms ease-in-out';
		// 	}

		// 	setupStyles();
		// 	await this.sleep(10);

		// 	this.open = !this.open;
		// 	clearTimeout(this.timeout);

		// 	if (this.open) {
		// 		el.style.display = 'block';
		// 		el.style.maxHeight = 0;
		// 		this.timeout = setTimeout(() => {
		// 			el.style.maxHeight = `${elMaxHeight}px`;
		// 		}, 50);
		// 		this.timeout = setTimeout(() => {
		// 			clearStyles();
		// 		}, 350);
		// 	} else {
		// 		el.style.maxHeight = '0';
		// 		this.timeout = setTimeout(() => {
		// 			clearStyles();
		// 			el.style.display = 'none';
		// 		}, 300);
		// 	}
		// }

		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    children = _props.children,
			    title = _props.title;


			var openClass = this.state.open ? 'is-active' : '';
			var disabledClass = this.props.disabled ? 'is-disabled' : '';

			return _react2.default.createElement(
				'div',
				{ className: 'accordion-item ' + disabledClass + ' ' + openClass + ' ' + className },
				!!title && _react2.default.createElement(
					'div',
					{ className: 'accordion-header', onClick: this.handleClick },
					title
				),
				!!this.state.open && _react2.default.createElement(
					'div',
					{ className: 'accordion-body', ref: function ref(_ref) {
							return _this2.refAccordionBody = _ref;
						} },
					children
				)
			);
		}
	}]);

	return Accordion;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	closeable: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.string]).isRequired,
	open: _propTypes2.default.bool,
	title: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.string]).isRequired,
	onOpen: _propTypes2.default.func
}, _class.defaultProps = {
	className: '',
	closeable: true,
	disabled: false,
	open: false
}, _temp);
exports.default = Accordion;