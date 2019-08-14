import React from 'react';
import PropTypes from 'prop-types';

export default class Tooltip extends React.PureComponent {
	static propTypes = {
		icon: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		message: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
	}

	render() {
		const {
			icon,
			message,
		} = this.props;

		if (!message) {
			return null;
		}

		return (
			<span className="tooltip">
				<span className="tooltip-icon">{icon}</span>
				<div className="tooltip-message">
					{message}
				</div>
			</span>
		);
	}
}
