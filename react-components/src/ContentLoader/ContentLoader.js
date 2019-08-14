import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Filter, Loader, NoResults, Pagination } from '../';

export default class ContentLoader extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		data: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.bool,
			PropTypes.number,
			PropTypes.object,
			PropTypes.string,
		]),
		filter: PropTypes.object,
		forceRefresh: PropTypes.bool,
		isLoading: PropTypes.bool,
		loader: PropTypes.element,
		noResults: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
			PropTypes.element,
		]),
		pagination: PropTypes.object,
	}

	static defaultProps = {
		className: '',
		data: null,
		filter: null,
		forceRefresh: false,
		isLoading: true,
		loader: null,
		noResults: 'No data available',
		pagination: null,
	}

	renderFilters = () => {
		const { filter } = this.props;

		if (!filter) {
			return null;
		}

		return (
			<Filter
				filters={filter.filters}
				onSubmit={filter.onSubmit}
				onUpdate={filter.onUpdate}
			/>
		);
	}

	renderPagination = () => {
		const { isLoading, pagination } = this.props;

		if (!pagination) {
			return null;
		}

		return (
			<Pagination
				currentPage={pagination.currentPage}
				onPageChange={pagination.onPageChange}
				perPage={pagination.perPage}
				totalItems={pagination.total}
			/>
		);
	}

	renderContent = () => {
		const {
			data,
			forceRefresh,
			isLoading,
			loader,
			noResults,
		} = this.props;
		const hasData = _.isArray(data) ? data.length > 0 : !!data;

		// return the content if loading is finished or hasData
		if (!isLoading || (!forceRefresh && hasData)) {
			if (hasData) {
				return this.props.children;
			}
			if (typeof noResults === 'string') {
				return <NoResults content={noResults} />;
			}

			return noResults;

		// return loader while fetching
		} else if (isLoading) {
			if (!loader) {
				return <Loader />;
			}
			return loader;
		}

		// return error message if fetch wasnt successful
		return <div><p>Something went wrong, please try again later.</p></div>;
	}

	render() {
		return (
			<React.Fragment>
				{this.renderFilters()}
				{this.renderContent()}
				{this.renderPagination()}
			</React.Fragment>
		);
	}
}
