import React from 'react';
import PropTypes from 'prop-types';
import ReactTimePicker from 'rc-time-picker';
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
} from './core';

export default class TimePicker extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		append: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		minuteStep: PropTypes.number,
		placeholder: PropTypes.string,
		prepend: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		showHour: PropTypes.bool,
		showMinute: PropTypes.bool,
		showSecond: PropTypes.bool,
		value: PropTypes.string,
	}

	static defaultProps = {
		...defaultProps,
		append: '',
		minuteStep: 5,
		placeholder: '',
		prepend: '',
		showHour: true,
		showMinute: true,
		showSecond: false,
	}

	formatResponse = (value) => {
		if (!value) {
			return null;
		}

		if (this.props.showSecond) {
			return value.format('HH:mm:ss');
		}

		// set seconds to 00 if showSecond is false
		return `${value.format('HH:mm')}:00`;
	}

	updateValue = (value) => {
		value = value ? moment(value, 'HH:mm:ss') : null;
		const response = this.formatResponse(value);
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, response);
		this.setState({ value });
	}

	render() {
		const {
			append,
			className,
			disabled,
			label,
			name,
			prepend,
			validation,
			wide,
			...rest,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;

		return (
			<FormGroup {...this.props} type="timepicker" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormPrepend {...this.props} />
					<FormField>
						<ReactTimePicker
							{...rest}
							allowEmpty={false}
							disabled={disabled}
							onChange={this.handleChange}
							value={value}
						/>
					</FormField>
					<FormAppend {...this.props} />
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}
}
