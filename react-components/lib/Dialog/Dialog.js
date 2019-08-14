'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dialogRoot = document.body;

var Dialog = (_temp = _class = function (_React$PureComponent) {
	_inherits(Dialog, _React$PureComponent);

	function Dialog(props) {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

		_this.open = function () {
			_this.setState({ open: true });

			if (_this.props.children) {
				dialogRoot.appendChild(_this.el);
			}
		};

		_this.close = function () {
			_this.setState({ open: false });
			_this.props.onClose && _this.props.onClose();

			if (_this.props.children) {
				_this.el.parentNode && _this.el.parentNode.removeChild(_this.el);
			}
		};

		_this.renderDialog = function () {
			var _this$props = _this.props,
			    buttons = _this$props.buttons,
			    closeOnOverlayClick = _this$props.closeOnOverlayClick,
			    content = _this$props.content,
			    showCloseButton = _this$props.showCloseButton,
			    title = _this$props.title;


			var handleOverlayClick = closeOnOverlayClick ? _this.close : null;

			var dialog = [_react2.default.createElement('div', { key: 'dialogOverlay', className: 'dialog-overlay', onClick: handleOverlayClick }), _react2.default.createElement(
				'div',
				{ key: 'dialogContent', className: 'dialog ' + _this.props.className },
				_react2.default.createElement(
					'div',
					{ className: 'dialog-content' },
					!!title && _react2.default.createElement(
						'div',
						{ className: 'dialog-header' },
						showCloseButton && _react2.default.createElement(
							'div',
							{ className: 'dialog-close-wrapper' },
							_react2.default.createElement(
								'button',
								{ className: 'dialog-close', onClick: _this.close },
								'\xD7'
							)
						),
						title && _react2.default.createElement(
							'div',
							{ className: 'dialog-title' },
							title
						)
					),
					!!content && _react2.default.createElement(
						'div',
						{ className: 'dialog-body' },
						content
					),
					!!buttons && _react2.default.createElement(
						'div',
						{ className: 'dialog-footer' },
						buttons.map(function (button) {
							// if button key is cancel then use the close method
							var onClick = button.key === 'cancel' ? _this.close : button.props.onClick;
							return _react2.default.cloneElement(button, { onClick: onClick });
						})
					)
				)
			)];

			return _reactDom2.default.createPortal(dialog, _this.el);
		};

		_this.el = document.createElement('div');
		_this.el.className = 'dialog-wrapper';

		_this.state = {
			open: false
		};
		return _this;
	}

	_createClass(Dialog, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (!this.props.children) {
				dialogRoot.appendChild(this.el);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (!this.props.children) {
				this.el.parentNode && this.el.parentNode.removeChild(this.el);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (!this.props.children) {
				return this.renderDialog();
			}

			var childrenWithProps = _react2.default.Children.map(this.props.children, function (child) {
				return _react2.default.cloneElement(child, { onClick: _this2.open });
			});
			var dialog = this.state.open ? this.renderDialog() : null;

			return [childrenWithProps, dialog];
		}
	}]);

	return Dialog;
}(_react2.default.PureComponent), _class.propTypes = {
	buttons: _propTypes2.default.array,
	children: _propTypes2.default.element,
	className: _propTypes2.default.string,
	closeOnOverlayClick: _propTypes2.default.bool,
	content: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.object]),
	onClose: _propTypes2.default.func,
	showCloseButton: _propTypes2.default.bool,
	title: _propTypes2.default.string
}, _class.defaultProps = {
	buttons: null,
	className: '',
	closeOnOverlayClick: true,
	content: '',
	onClose: null,
	showCloseButton: true,
	title: ''
}, _temp);
exports.default = Dialog;