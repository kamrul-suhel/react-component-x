import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap as ReactGoogleMap, Marker } from "react-google-maps";

export default class GoogleMap extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		lat: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		lng: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
		styles: PropTypes.array,
		zoom: PropTypes.number,
	}

	static defaultProps = {
		className: '',
		lat: 0,
		lng: 0,
		styles: [],
		zoom: 15,
	}

	render() {
		const {
			className,
			styles,
			zoom,
		} = this.props;

		if (!this.props.lat || !this.props.lng) {
			return false;
		}

		const lat = parseFloat(this.props.lat);
		const lng = parseFloat(this.props.lng);

		const markers = [{
			position: {
				lat,
				lng,
			},
			key: 'address',
			defaultAnimation: 2,
		}];

		const SimpleMapExampleGoogleMap = withGoogleMap(props => (
			<ReactGoogleMap
				defaultZoom={zoom}
				defaultCenter={{ lat, lng }}
				defaultOptions={{
					styles,
					scrollwheel: false,
				}}
			>
				{props.markers.map(marker => (
					<Marker {...marker} />
				))}
			</ReactGoogleMap>
		));

		return (
			<div className={`map ${className}`}>
				<SimpleMapExampleGoogleMap
					containerElement={
						<div style={{ height: `100%` }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
					markers={markers}
				/>
			</div>
		);
	}
}
