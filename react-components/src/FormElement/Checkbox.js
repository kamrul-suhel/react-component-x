import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
	FormElement,
	FormError,
	FormFieldWrapper,
	FormGroup,
	FormLabel,
	defaultPropTypes,
	defaultProps,
} from './core';

export default class Checkbox extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		labelKey: PropTypes.string,
		options: PropTypes.array,
		styled: PropTypes.bool,
		value: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.number,
			PropTypes.string,
		]),
		valueKey: PropTypes.string,
	}

	static defaultProps = {
		...defaultProps,
		labelKey: 'title',
		options: [{ id: 1 }],
		styled: false,
		value: [],
		valueKey: 'id',
	}

	handleChange = (event) => {
		let value = event.target.checked ? event.currentTarget.value : 0;

		if (value) {
			if (this.props.options.length > 1) {
				value = _.uniq([...this.state.value, value]);
			}
		} else {
			value = this.state.value.filter(val => val != event.currentTarget.value);
		}

		this.updateValue(value);
	}

	updateValue = (value = []) => {
		const stringValue = value ? value.toString() : '';
		if (_.isArray(value)) {
			value = value.map(val => val && val.toString());
		} else {
			value = typeof value === 'string' ? [value] : [stringValue];
		}

		// return string if only one option is available else array
		const returnValue = this.props.options.length === 1 ? stringValue : value;

		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, returnValue);
		this.setState({ value });
	}

	render() {
		const {
			disabled,
			labelKey,
			name,
			options,
			styled,
			valueKey,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;
		const sizeClass = _.size(options) > 1 ? 'has-multiple-options' : 'has-single-option';
		const styledClass = styled ? 'form-styled' : 'form-unstyled';

		return (
			<FormGroup {...this.props} type="checkbox" valid={valid} extraClassName={`${styledClass} ${sizeClass}`}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<div className="form-options">
						{options && options.map((option) => {
							const key = `${name}${option[labelKey] || ''}${option[valueKey]}`;
							const checked = _.includes(value, option[valueKey].toString());
							const selectedClass = checked ? 'is-selected' : '';

							return (
								<div key={key} className={`form-option form-option-checkbox ${selectedClass}`}>
									<label className="form-option-inner">
										<input
											checked={checked}
											className="option-input"
											disabled={disabled}
											name={name}
											onChange={this.handleChange}
											type="checkbox"
											value={option[valueKey]}
										/>
										{option[labelKey] && <span className="option-label">{option[labelKey]}</span>}
									</label>
								</div>
							);
						})}
					</div>
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}

}
