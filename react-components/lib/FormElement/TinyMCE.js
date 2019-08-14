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

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TinyMCE = (_temp = _class = function (_FormElement) {
	_inherits(TinyMCE, _FormElement);

	function TinyMCE(props) {
		var _this2 = this;

		_classCallCheck(this, TinyMCE);

		var _this = _possibleConstructorReturn(this, (TinyMCE.__proto__ || Object.getPrototypeOf(TinyMCE)).call(this, props));

		_this.handleChange = function (event) {
			var value = event.target.getContent();

			if (value) {
				_this.validateOnUpdate(value);
				_this.props.onChange(_this.props.name, value);
				_this.setState({ value: value });
			}
		};

		_this.handleFilePicker = function (callback, value, meta) {

			if (meta.filetype == 'image') {

				var input = document.getElementById('image-upload-tinymce');
				input.click();

				input.onchange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
					var file, reader, formData, response;
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									file = input.files[0];
									reader = new FileReader();
									formData = new FormData();

									file && formData.append('file', file);

									_context.next = 6;
									return _this.props.onFileUpload(formData);

								case 6:
									response = _context.sent;


									if (response && response.data) {
										reader.onload = function (e) {
											var img = new Image();
											img.src = response.data.src;

											callback(response.data.src, {
												alt: file.name
											});

											var delay = _lodash2.default.debounce(_this.handleChange, 10000);

											delay();
										};

										reader.readAsDataURL(file);
									}

								case 8:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}));
			}
		};

		_this.state = {
			key: 0,
			validation: _core.defaultValidation,
			value: _this.props.value
		};
		return _this;
	}

	_createClass(TinyMCE, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onChange(this.props.name, this.props.value);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// override state only if current props is empty but next props has value
			if (!this.props.value && nextProps.value) {
				this.props.onChange(this.props.name, nextProps.value);
				this.setState({
					value: nextProps.value,
					key: this.state.key + 1
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    height = _props.height,
			    value = _props.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;

			var handleFilePicker = this.props.onFileUpload ? this.handleFilePicker : null;

			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'tinymce', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement('input', { type: 'file', id: 'image-upload-tinymce', name: 'single-image', style: { display: 'none' }, accept: 'image/png, image/gif, image/jpeg, image/jpg, image/svg' }),
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(_reactTinymce2.default, {
							key: this.state.key,
							content: value,
							config: {
								height: height,
								browser_spellcheck: true,
								file_browser_callback_types: 'image',
								file_picker_callback: handleFilePicker,
								plugins: 'autolink link image code lists print preview ' + this.props.plugins,
								toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | numlist bullist | image | ' + this.props.toolbar,
								relative_urls: false
							},
							onChange: this.handleChange
						})
					)
				)
			);
		}
	}]);

	return TinyMCE;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	height: _propTypes2.default.number,
	onFileUpload: _propTypes2.default.func,
	plugins: _propTypes2.default.string,
	toolbar: _propTypes2.default.string,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	height: 200,
	plugins: '',
	toolbar: '',
	value: ''
}), _temp);
exports.default = TinyMCE;