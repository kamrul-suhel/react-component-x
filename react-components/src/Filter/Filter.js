import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DatePicker, Select, TextInput } from '../';

export default class Filter extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		filters: PropTypes.array.isRequired,
		minSearchLength: PropTypes.number,
		onSubmit: PropTypes.func,
		onUpdate: PropTypes.func,
	}

	static defaultProps = {
		className: '',
		filters: [],
		minSearchLength: 3,
	}

	constructor(props) {
		super(props);

		this.urlParam = '';
		this.searchUpdateTimer;
	}

	update = () => {
		let urlParam = '';

		// generate the urlParam from the state
		_.map(this.state, (val, key) => {
			if (val === null || val === '' || val === undefined || val === 'all') {
				return false;
			}

			urlParam = `${urlParam}&${key}=${val}`;
		});

		// if the new urlParam is the same as the cached one return
		if (this.urlParam === urlParam) {
			return false;
		}

		this.urlParam = urlParam;
		this.props.onUpdate && this.props.onUpdate(1, urlParam);
	}

	// handle dropdown change
	handleSelectChange = (name, value) => {
		this.setState(() => {
			return {
				[name]: value,
			};
		}, () => {
			this.update();
		});
	}

	// handle search input change
	handleInputChange = (name, value) => {
		// dont search if the search string is less than minSearchLength character long
		if (value && value.length > 0 && value.length < this.props.minSearchLength) {
			return false;
		}

		this.setState({ [name]: value });

		// clear timeout
		clearTimeout(this.searchUpdateTimer);

		// only search if user stopped typing for a bit
		this.searchUpdateTimer = setTimeout(() => {
			this.update();
		}, 300);
	}

	handleSubmit = () => {
		this.props.onSubmit(1, this.urlParam);
	}

	renderSubmitButton = () => {
		if (this.props.submitButton) {
			return React.Children.map(this.props.submitButton, child => React.cloneElement(child, {
				onClick: this.handleSubmit,
			}));
		}

		return <span className="button filter-button" onClick={this.handleSubmit}>Search</span>;
	}

	renderFilter = (filter, type = 'select') => {
		switch (type) {
			case 'text': {
				const placeholder = filter.placeholder || 'Search...';
				return (
					<TextInput
						className={`filter-${filter.key}`}
						key={`filter${filter.key}`}
						label={filter.label}
						name={filter.key}
						onChange={this.handleInputChange}
						placeholder={placeholder}
					/>
				);
			}
			case 'datepicker': {
				return (
					<DatePicker
						className={`filter-${filter.key}`}
						key={`filter${filter.key}`}
						label={filter.label}
						name={filter.key}
						onChange={this.handleInputChange}
						value={filter.default || null}
					/>
				);
			}
			default: {
				// hide filter if options are empty
				if (!filter.options) {
					return false;
				}

				// add Show All as the first option
				const options = [{ id: 'all', title: 'Show All' }].concat(filter.options);
				const defaultValue = filter.default !== null ? filter.default : 'all';

				return (
					<Select
						className={`filter-${filter.key}`}
						key={`filter${filter.key}`}
						label={filter.label}
						name={filter.key}
						onChange={this.handleSelectChange}
						options={options}
						resetValue={{ id: 'all', title: 'Show All' }}
						value={defaultValue}
					/>
				);
			}
		}
	}

	renderFilters = () => {
		const { filters } = this.props;

		if (!filters) {
			return null;
		}

		return filters.map((filter) => {
			const type = filter.key === 'search' ? 'text' : filter.type;
			return this.renderFilter(filter, type);
		});
	}

	render() {
		const {
			className,
		} = this.props;

		return (
			<div className={`content-filter ${className}`}>
				{this.renderFilters()}
				{this.props.onSubmit && this.renderSubmitButton()}
			</div>
		);
	}

}
