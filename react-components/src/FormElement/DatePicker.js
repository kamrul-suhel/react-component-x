import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';
import {
	FormAppend,
	FormElement,
	FormError,
	FormField,
	FormFieldWrapper,
	FormGroup,
	FormLabel,
	FormPrepend,
	defaultPropTypes,
	defaultProps,
	defaultValidation,
} from './core';

export default class DatePicker extends FormElement {
	static propTypes = {
		...defaultPropTypes,
		append: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		clearable: PropTypes.bool,
		dateFormat: PropTypes.string,
		dropdownMode: PropTypes.oneOf(['scroll', 'select']),
		futureOnly: PropTypes.bool,
		inline: PropTypes.bool,
		locale: PropTypes.string,
		maxDate: PropTypes.object,
		minDate: PropTypes.object,
		pastOnly: PropTypes.bool,
		placeholder: PropTypes.string,
		prepend: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		returnFormat: PropTypes.string,
		scrollableYearDropdown: PropTypes.bool,
		showMonthSelect: PropTypes.bool,
		showYearSelect: PropTypes.bool,
		value: PropTypes.string,
		yearDropdownItemNumber: PropTypes.number,
	}

	static defaultProps = {
		...defaultProps,
		append: '',
		clearable: false,
		dateFormat: 'Do MMMM YYYY',
		dropdownMode: 'scroll',
		futureOnly: false,
		inline: false,
		locale: 'en-gb',
		maxDate: undefined,
		minDate: undefined,
		pastOnly: false,
		placeholder: '',
		prepend: '',
		returnFormat: 'YYYY-MM-DD HH:mm:ss',
		scrollableYearDropdown: true,
		showMonthSelect: false,
		showYearSelect: false,
		value: null,
		yearDropdownItemNumber: 100,
	}

	constructor(props) {
		super(props);

		this.today = moment();

		this.state = {
			minDate: this.props.futureOnly ? this.today : this.props.minDate,
			maxDate: this.props.pastOnly ? this.today : this.props.maxDate,
			validation: defaultValidation,
			focusedInput: 'startDate',
		};
	}

	handleFocus = (focusedInput) => {
		this.setState({ focusedInput: focusedInput || 'endDate' });
	}

	updateValue = (value) => {
		value = value ? moment(value, 'YYYY-MM-DD HH:mm:ss') : null;
		const response = value ? moment(value).format(this.props.returnFormat) : null;
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, response);
		this.setState({ value });
	}

	openDatePicker = () => {
		this.refDatePicker && this.refDatePicker.setOpen(true);
	}

	closeDatePicker = () => {
		this.refDatePicker && this.refDatePicker.setOpen(false);
	}

	handleClickOutside = () => {
		if (this.refDatePicker) {
			this.refDatePicker.cancelFocusInput();
			this.refDatePicker.setOpen(false);
		}
	}

	renderCustomInput = () => {
		const formattedDate = this.state.value ? moment(this.state.value).format(this.props.dateFormat) : this.props.placeholder;
		return (
			<div>
				<input type="text" value={formattedDate} readOnly />
			</div>
		);
	}

	render() {
		const {
			clearable,
			dateFormat,
			placeholder,
			showMonthSelect,
			showYearSelect,
			...rest,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;
		const customInput = this.renderCustomInput();

		return (
			<FormGroup {...this.props} type="datepicker" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormPrepend {...this.props} onClick={this.openDatePicker} />
					<FormField>
						<ReactDatePicker
							{...rest}
							customInput={customInput}
							isClearable={clearable}
							maxDate={this.state.maxDate}
							minDate={this.state.minDate}
							onChange={this.handleChange}
							onClickOutside={this.handleClickOutside}
							placeholderText={placeholder}
							ref={ref => this.refDatePicker = ref}
							selected={value}
							showMonthDropdown={showMonthSelect}
							showYearDropdown={showYearSelect}
						>
							{this.props.children}
						</ReactDatePicker>
					</FormField>
					<FormAppend {...this.props} onClick={this.openDatePicker} />
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}
}
