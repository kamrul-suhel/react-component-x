import React from 'react';
import PropTypes from 'prop-types';

export default class Loader extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		loadingText: PropTypes.string,
	}

	static defaultProps = {
		className: '',
		loadingText: 'Loading...',
	}

	render() {
		const {
			className,
			loadingText,
		} = this.props;

		return (
			<div className={`loader ${className}`}>
				{loadingText && <span className="loading-text">{loadingText}</span>}
			</div>
		);
	}
}
