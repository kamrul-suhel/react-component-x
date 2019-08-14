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

var _reactGoogleMaps = require('react-google-maps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleMap = (_temp = _class = function (_React$PureComponent) {
	_inherits(GoogleMap, _React$PureComponent);

	function GoogleMap() {
		_classCallCheck(this, GoogleMap);

		return _possibleConstructorReturn(this, (GoogleMap.__proto__ || Object.getPrototypeOf(GoogleMap)).apply(this, arguments));
	}

	_createClass(GoogleMap, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    styles = _props.styles,
			    zoom = _props.zoom;


			if (!this.props.lat || !this.props.lng) {
				return false;
			}

			var lat = parseFloat(this.props.lat);
			var lng = parseFloat(this.props.lng);

			var markers = [{
				position: {
					lat: lat,
					lng: lng
				},
				key: 'address',
				defaultAnimation: 2
			}];

			var SimpleMapExampleGoogleMap = (0, _reactGoogleMaps.withGoogleMap)(function (props) {
				return _react2.default.createElement(
					_reactGoogleMaps.GoogleMap,
					{
						defaultZoom: zoom,
						defaultCenter: { lat: lat, lng: lng },
						defaultOptions: {
							styles: styles,
							scrollwheel: false
						}
					},
					props.markers.map(function (marker) {
						return _react2.default.createElement(_reactGoogleMaps.Marker, marker);
					})
				);
			});

			return _react2.default.createElement(
				'div',
				{ className: 'map ' + className },
				_react2.default.createElement(SimpleMapExampleGoogleMap, {
					containerElement: _react2.default.createElement('div', { style: { height: '100%' } }),
					mapElement: _react2.default.createElement('div', { style: { height: '100%' } }),
					markers: markers
				})
			);
		}
	}]);

	return GoogleMap;
}(_react2.default.PureComponent), _class.propTypes = {
	className: _propTypes2.default.string,
	lat: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	lng: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	styles: _propTypes2.default.array,
	zoom: _propTypes2.default.number
}, _class.defaultProps = {
	className: '',
	lat: 0,
	lng: 0,
	styles: [],
	zoom: 15
}, _temp);
exports.default = GoogleMap;