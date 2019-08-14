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

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUpload = (_temp2 = _class = function (_FormElement) {
	_inherits(FileUpload, _FormElement);

	function FileUpload() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, FileUpload);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call.apply(_ref, [this].concat(args))), _this), _this.updateValue = function () {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var newValue = value || [];
			newValue = _lodash2.default.isArray(newValue) ? newValue : [newValue];
			var response = _this.props.multiple ? newValue : newValue[0];
			_this.validateOnUpdate(value);
			_this.props.onChange(_this.props.name, response);
			_this.setState({ value: newValue });
		}, _this.clear = function () {
			_this.updateValue([]);
		}, _this.deleteFile = function (fileName) {
			var value = _this.state.value && _this.state.value.filter(function (file) {
				return file.name != fileName;
			});
			_this.updateValue(value);
		}, _this.renderButtonText = function () {
			var value = _this.state.value;
			var children = _this.props.children;


			if (typeof value === 'string') {
				return value;
			}

			var fileCount = value ? value.length : 0;

			if (children) {
				return children;
			}

			if (fileCount === 1) {
				var file = _this.state.value[0];
				return file && file.name;
			}

			if (fileCount > 1) {
				return fileCount + ' files selected';
			}

			return _this.props.placeholder;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(FileUpload, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    accept = _props.accept,
			    clearable = _props.clearable,
			    disabled = _props.disabled,
			    multiple = _props.multiple,
			    onReset = _props.onReset,
			    wide = _props.wide;
			var value = this.state.value;
			var _state$validation = this.state.validation,
			    valid = _state$validation.valid,
			    errors = _state$validation.errors;


			return _react2.default.createElement(
				_core.FormGroup,
				_extends({}, this.props, { type: 'upload', valid: valid }),
				_react2.default.createElement(_core.FormLabel, this.props),
				_react2.default.createElement(
					_core.FormFieldWrapper,
					null,
					_react2.default.createElement(_core.FormPrepend, this.props),
					_react2.default.createElement(
						_core.FormField,
						null,
						_react2.default.createElement(
							_reactDropzone2.default,
							{
								className: 'file-upload',
								style: {},
								accept: accept,
								onDrop: this.handleChange,
								multiple: multiple
							},
							_react2.default.createElement(
								'span',
								{ className: 'file-name' },
								this.renderButtonText()
							)
						),
						clearable && value && value.length > 0 && _react2.default.createElement('span', { className: 'form-field-reset', onClick: this.clear })
					),
					_react2.default.createElement(_core.FormAppend, this.props)
				),
				_react2.default.createElement(_core.FormError, _extends({}, this.props, { valid: valid, errors: errors }))
			);
		}
	}]);

	return FileUpload;
}(_core.FormElement), _class.propTypes = _extends({}, _core.defaultPropTypes, {
	accept: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
	append: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	clearable: _propTypes2.default.bool,
	maxSize: _propTypes2.default.number,
	multiple: _propTypes2.default.bool,
	onReset: _propTypes2.default.func,
	placeholder: _propTypes2.default.string,
	prepend: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.string]),
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object])
}), _class.defaultProps = _extends({}, _core.defaultProps, {
	accept: '.jpg,.png,.pdf',
	append: '',
	clearable: false,
	multiple: false,
	placeholder: 'Select file',
	prepend: '',
	value: []
}), _temp2);
exports.default = FileUpload;