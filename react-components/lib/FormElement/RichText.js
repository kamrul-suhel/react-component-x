'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _reactDraftWysiwyg = require('react-draft-wysiwyg');

var _draftjsToHtml = require('draftjs-to-html');

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichText = (_temp2 = _class = function (_FormElement) {
	_inherits(RichText, _FormElement);

	function RichText() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		_classCallCheck(this, RichText);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichText.__proto__ || Object.getPrototypeOf(RichText)).call.apply(_ref, [this].concat(args))), _this), _this.formatValueProp = function (value) {
			if (!value) {
				return null;
			}

			return _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromBlockArray((0, _draftJs.convertFromHTML)(value)));
		}, _this.handleChange = function (editorContent) {
			var value = (0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(editorContent.getCurrentContent()));

			if (value) {
				_this.updateValue(editorContent, value);
			}
		}, _this.updateValue = function () {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var returnValue = arguments[1];

			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, returnValue);
			_this.setState({ value: value });
		}, _this.handleFilePicker = function (callback, value, meta) {
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
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(RichText, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var value = this.formatValueProp(this.props.value);
			this.updateValue(value, this.props.value);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_lodash2.default.isEqual(this.props.value, nextProps.value)) {
				var value = this.formatValueProp(nextProps.value);
				this.updateValue(value, nextProps.value);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var toolbarCustomButtons = this.props.toolbarCustomButtons;
			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;

			var handleFilePicker = this.props.onFileUpload ? this.handleFilePicker : null;

			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'richtext', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(_reactDraftWysiwyg.Editor, {
							toolbarCustomButtons: toolbarCustomButtons,
							editorState: value,
							onEditorStateChange: this.handleChange
						})
					)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return RichText;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	onFileUpload: _propTypes2.default.func,
	toolbarCustomButtons: _propTypes2.default.array,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	toolbarCustomButtons: null,
	value: ''
}), _temp2);
exports.default = RichText;