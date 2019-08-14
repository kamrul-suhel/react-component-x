import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Pagination extends React.PureComponent {

	static propTypes = {
		currentPage: PropTypes.number,
		perPage: PropTypes.number,
		totalItems: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		onPageChange: PropTypes.func.isRequired,
	}

	static defaultProps = {
		currentPage: 1,
		perPage: 20,
	}

	constructor(props) {
		super(props);

		this.state = {
			pager: {},
		};
	}

	componentWillMount() {
		this.setPage(this.props.currentPage, this.props, true);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.totalItems !== nextProps.totalItems) {
			this.setPage(nextProps.currentPage, nextProps, true);
		}

		if (this.props.currentPage !== nextProps.currentPage) {
			this.setPage(nextProps.currentPage, nextProps, true);
		}
	}

	setPage = (page, nextProps, init) => {
		const { pager } = this.state;

		if (!init && ((page < 1 || page > pager.totalPages) || (page === pager.currentPage))) {
			return false;
		}

		const props = nextProps || this.props;
		const { totalItems, perPage } = props;
		// get new pager object for specified page
		const newPager = this.getPager(totalItems, page, perPage);

		// update state
		this.setState({ pager: newPager });

		// call change page function in parent component
		if (!(init && page === 1)) {
			props.onPageChange(page);
		}

		return page;
	}

	getPager = (totalItems = 1, currentPage = 1, perPage) => {

		// calculate total pages
		const totalPages = Math.ceil(totalItems / perPage);

		let startPage;
		let endPage;

		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}

		// calculate start and end item indexes
		const startIndex = (currentPage - 1) * perPage;
		const endIndex = Math.min(startIndex + (perPage - 1), totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		const pages = _.range(startPage, endPage + 1);

		// return object with all pager properties required by the view
		return {
			totalItems,
			currentPage,
			perPage,
			totalPages,
			startPage,
			endPage,
			startIndex,
			endIndex,
			pages,
		};
	}

	render() {
		const { pager } = this.state;
		const disabledPrevPageClass = pager.currentPage === 1 ? 'disabled' : '';
		const disabledNextPageClass = pager.currentPage === pager.totalPages ? 'disabled' : '';

		return (
			<div className={`content-pagination page-count-${pager.totalPages} current-page-${pager.currentPage}`}>
				<ul>
					<li className={`content-pagination-nav-first ${disabledPrevPageClass}`}>
						<a onClick={() => this.setPage(1)}>First</a>
					</li>
					<li className={`content-pagination-nav-prev ${disabledPrevPageClass}`}>
						<a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
					</li>
					{pager.pages && pager.pages.map((page, index) =>
						<li key={index} className={pager.currentPage === page ? 'active' : ''}>
							<a onClick={() => this.setPage(page)}>{page}</a>
						</li>
					)}
					<li className={`content-pagination-nav-next ${disabledNextPageClass}`}>
						<a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
					</li>
					<li className={`content-pagination-nav-last ${disabledNextPageClass}`}>
						<a onClick={() => this.setPage(pager.totalPages)}>Last</a>
					</li>
				</ul>
			</div>
		);
	}

}
