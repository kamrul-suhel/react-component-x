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

export default class Radio extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		forcePropsToValue: PropTypes.bool,
		labelKey: PropTypes.string,
		layout: PropTypes.oneOf([
			'horizontal',
			'vertical',
		]),
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
		forcePropsToValue: false,
		labelKey: 'title',
		layout: 'horizontal',
		options: [],
		styled: false,
		value: '',
		valueKey: 'id',
	}

	handleChange = (event) => {
		const value = event.target.checked ? event.currentTarget.value : 0;
		this.updateValue(value);
	}

	updateValue = (value = '') => {
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, value);
		this.setState({ value });
	}

	render() {
		const {
			disabled,
			labelKey,
			layout,
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
			<FormGroup {...this.props} type="radio" valid={valid} extraClassName={`${styledClass} ${sizeClass}`}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<div className={`form-options form-options-layout-${layout}`}>
						{options && options.map((option) => {
							const key = `${name}${option[labelKey] || ''}${option[valueKey]}`;
							const checked = value == option[valueKey];
							const selectedClass = checked ? 'is-selected' : '';

							return (
								<div key={key} className={`form-option form-option-radio ${selectedClass}`}>
									<label className="form-option-inner">
										<input
											checked={checked}
											className="option-input"
											disabled={disabled}
											name={name}
											onChange={this.handleChange}
											type="radio"
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
