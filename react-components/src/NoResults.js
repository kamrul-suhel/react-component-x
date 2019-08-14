import React from 'react';
import PropTypes from 'prop-types';

export default class NoResults extends React.PureComponent {

	static propTypes = {
		content: PropTypes.string,
	}

	static defaultProps = {
		content: '',
	}

	render() {
		return (
			<div className="no-results">
				<p>{this.props.content}</p>
			</div>
		);
	}
}
