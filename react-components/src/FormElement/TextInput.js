import React from 'react';
import PropTypes from 'prop-types';
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

export default class TextInput extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		append: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		autoComplete: PropTypes.string,
		autoFocus: PropTypes.bool,
		onReset: PropTypes.func,
		placeholder: PropTypes.string,
		prepend: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		textarea: PropTypes.bool,
		type: PropTypes.string,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),
	}

	static defaultProps = {
		...defaultProps,
		append: '',
		autoComplete: 'on',
		autoFocus: false,
		placeholder: '',
		prepend: '',
		textarea: false,
		type: 'text',
		value: '',
	}

	onFocus = () => this.setFocus(true);

	onBlur = () => this.setFocus(false);

	handleChange = (event) => {
		this.updateValue(event.target.value);
	}

	render() {
		const {
			autoComplete,
			autoFocus,
			disabled,
			name,
			onReset,
			placeholder,
			textarea,
			type,
		} = this.props;
		const { isFocused, value } = this.state;
		const { valid, errors } = this.state.validation;
		const FieldTag = textarea ? 'textarea' : 'input';

		return (
			<FormGroup
				{...this.props}
				type="input"
				valid={valid}
				isFocused={isFocused}
				value={value}
			>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormPrepend {...this.props} />
					<FormField>
						<FieldTag
							autoComplete={autoComplete}
							autoFocus={autoFocus}
							disabled={disabled}
							name={name}
							onBlur={this.onBlur}
							onChange={this.handleChange}
							onFocus={this.onFocus}
							placeholder={placeholder}
							rows={1}
							type={type}
							value={value || ''}
						/>
						{onReset && <span className="form-field-reset" onClick={onReset} />}
					</FormField>
					<FormAppend {...this.props} />
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}

}
