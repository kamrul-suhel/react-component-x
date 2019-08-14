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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = (_temp = _class = function (_React$PureComponent) {
	_inherits(Form, _React$PureComponent);

	function Form(props) {
		var _this2 = this;

		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

		_this.validate = function () {
			var valid = true;

			_this.fields.forEach(function (field) {
				var validation = field.validate && field.validate();

				if (validation && !validation.valid) {
					valid = false;
				}
			});

			return valid;
		};

		_this.submit = function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
				var _this$props, loader, onSubmit, onValidationError, valid;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:

								if (event) {
									event.preventDefault();
								}

								// if form is loading prevent submitting the form again

								if (!_this.state.showLoader) {
									_context.next = 3;
									break;
								}

								return _context.abrupt('return', false);

							case 3:
								_this$props = _this.props, loader = _this$props.loader, onSubmit = _this$props.onSubmit, onValidationError = _this$props.onValidationError;
								valid = _this.validate();

								if (!valid) {
									_context.next = 11;
									break;
								}

								if (loader) {
									_this.showLoader();
								}

								if (!onSubmit) {
									_context.next = 10;
									break;
								}

								_context.next = 10;
								return onSubmit();

							case 10:
								return _context.abrupt('return', true);

							case 11:

								if (onValidationError) {
									onValidationError();
								}

								return _context.abrupt('return', false);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2);
			}));

			return function (_x) {
				return _ref.apply(this, arguments);
			};
		}();

		_this.hideLoader = function () {
			return _this.setState({ showLoader: false });
		};

		_this.showLoader = function () {
			return _this.setState({ showLoader: true });
		};

		_this.renderFormBefore = function () {
			if (!_this.props.formBefore) {
				return null;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'form-before-wrapper' },
				_this.props.formBefore
			);
		};

		_this.renderFormAfter = function () {
			if (!_this.props.formAfter) {
				return null;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'form-after-wrapper' },
				_this.props.formAfter
			);
		};

		_this.renderChildren = function (children) {
			return _react2.default.Children.map(children, function (child) {
				if (!child || !child.props) {
					return child;
				}

				// run the same function until get the input
				if (child.props.children) {
					var newChildren = _this.renderChildren(child.props.children);
					return _extends({}, child, {
						props: _extends({}, child.props, {
							children: newChildren
						})
					});
				}

				// return if validation is not required
				if (!child.props.validation) {
					return child;
				}

				return _this.renderChild(child);
			});
		};

		_this.state = {
			showLoader: false
		};
		return _this;
	}

	_createClass(Form, [{
		key: 'renderChild',
		value: function renderChild(child) {
			var _this3 = this;

			return _react2.default.cloneElement(child, {
				ref: function ref(node) {
					// Keep your own reference
					if (node) {
						_this3.fields.push(node);
					}

					// Call the original ref, if any
					var ref = child.ref;

					if (typeof ref === 'function') {
						ref(node);
					}
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var wideClass = this.props.wide ? ' form-wide' : '';
			var formAfterClass = this.props.formAfter ? ' form-render-after' : '';
			var formBeforeClass = this.props.formBefore ? ' form-render-before' : '';
			var loadingClass = this.state.showLoader ? ' form-loading' : '';
			var className = this.props.className ? ' ' + this.props.className : '';

			// clear fields array
			this.fields = [];

			return _react2.default.createElement(
				'div',
				{ className: 'form-wrapper' + wideClass + formBeforeClass + formAfterClass + loadingClass + className },
				this.renderFormBefore(),
				_react2.default.createElement(
					'div',
					{ className: 'form-outer' },
					_react2.default.createElement(
						'form',
						{ className: 'form', onSubmit: this.submit },
						this.renderChildren(this.props.children)
					)
				),
				this.renderFormAfter()
			);
		}
	}]);

	return Form;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	formAfter: _propTypes2.default.element,
	formBefore: _propTypes2.default.element,
	loader: _propTypes2.default.bool,
	onSubmit: _propTypes2.default.func,
	onValidationError: _propTypes2.default.func,
	wide: _propTypes2.default.bool
}, _class.defaultProps = {
	children: [],
	className: '',
	formAfter: null,
	formBefore: null,
	loader: false,
	wide: false
}, _temp);
exports.default = Form;