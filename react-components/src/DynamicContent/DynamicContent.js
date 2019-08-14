import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Filter, Loader, NoResults, Pagination } from '../';

export default class DynamicContent extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		collection: PropTypes.object.isRequired,
		fetched: PropTypes.bool,
		fetching: PropTypes.bool,
		filter: PropTypes.object,
		notFound: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
		]),
		onPageChange: PropTypes.func,
		pagination: PropTypes.object,
	}

	static defaultProps = {
		className: '',
		collection: {},
		fetched: false,
		fetching: false,
		filter: null,
		notFound: 'No data available',
		pagination: null,
	}

	renderFilters = () => {
		const { collection, filter } = this.props;

		if (!filter || !collection.fetched) {
			return false;
		}

		return <Filter filters={filter.filters} onUpdate={filter.onUpdate} />;
	}

	renderPagination = () => {
		const { collection, pagination } = this.props;

		if (!pagination || !collection.fetched || !collection.count) {
			return false;
		}

		return <Pagination currentPage={pagination.currentPage} totalItems={collection.count} perPage={pagination.perPage} onPageChange={pagination.onPageChange} />;
	}

	renderContent = () => {
		const { collection, fetched, fetching } = this.props;
		// return loader while fetching
		if (fetching || collection.fetching) {
			return <Loader />;
		// return the content once fetched
		} else if (fetched || (collection.fetched && !collection.error)) {
			if (_.isEmpty(collection) || (collection.count > 0 || (_.size(collection.data) > 0 || _.size(collection.entities) > 0))) {
			// if (_.size(collection.data) > 0 || _.size(collection.entities) > 0) {
				return this.props.children;
			} else {
				if (typeof this.props.notFound === 'string') {
					return <NoResults content={this.props.notFound} />;
				} else {
					return this.props.notFound;
				}
			}
		// return error message if fetch wasnt successful
		} else {
			return <NoResults content={collection.error} />;
		}
	}

	render() {
		const { className } = this.props;

		return (
			<div className={`dynamic-content ${className}`}>
				{this.renderFilters()}
				{this.renderContent()}
				{this.renderPagination()}
			</div>
		);
	}
}
