import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
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

export default class Select extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		append: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		async: PropTypes.bool,
		clearable: PropTypes.bool,
		creatable: PropTypes.bool,
		labelKey: PropTypes.string,
		loadOptions: PropTypes.func,
		multiple: PropTypes.bool,
		options: PropTypes.array,
		placeholder: PropTypes.string,
		prepend: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		resetValue: PropTypes.object,
		returnFields: PropTypes.oneOf(['value', 'label', 'all']),
		valueKey: PropTypes.string,
	}

	static defaultProps = {
		...defaultProps,
		append: '',
		async: false,
		clearable: false,
		creatable: false,
		labelKey: 'title',
		loadOptions: () => {},
		multiple: false,
		options: [],
		placeholder: 'Select...',
		prepend: '',
		resetValue: {},
		returnFields: 'value',
		value: null,
		valueKey: 'id',
	}

	handleChange = (field) => {
		const value = this.props.multiple ? field : field[this.props.valueKey];
		this.updateValue(value, field);
	}

	updateValue = (value, field) => {
		const response = field ? this.formatResponse(field) : value;
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, response);
		this.setState({ value });
	}

	clear = () => {
		const field = {
			[this.props.labelKey]: '',
			[this.props.valueKey]: '',
		};
		this.updateValue('', field);
	}

	formatResponse = (field) => {
		if (this.props.multiple) {
			return field && field.length > 0 ? field.map((o) => this.formatItem(o)) : [];
		}

		return this.formatItem(field);
	}

	formatItem = (field) => {
		switch (this.props.returnFields) {
			case 'label':
				return field[this.props.labelKey];
			case 'all':
				return field;
			default:
				return field[this.props.valueKey];
		}
	}

	render() {
		const {
			append,
			async,
			className,
			creatable,
			disabled,
			label,
			loadOptions,
			multiple,
			name,
			options,
			prepend,
			validation,
			wide,
			...rest,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;
		const ReactSelectComponent = creatable ? ReactSelect.Creatable : ReactSelect;

		return (
			<FormGroup {...this.props} type="select" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormPrepend {...this.props} />
					<FormField>
						{async ? (
							<ReactSelect.Async
								{...rest}
								disabled={disabled}
								loadOptions={loadOptions}
								multi={multiple}
								name={name}
								onChange={this.handleChange}
								openAfterFocus
								value={value}
							/>
						) : (
							<ReactSelectComponent
								{...rest}
								disabled={disabled}
								multi={multiple}
								name={name}
								onChange={this.handleChange}
								openAfterFocus
								options={options}
								value={value}
							/>
						)}
					</FormField>
					<FormAppend {...this.props} />
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}
}
