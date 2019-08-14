import React from 'react';

export default function FormGroup(props) {
	const disabledClass = props.disabled ? ' is-disabled' : '';
	const validClass = (() => {
		switch (props.valid) {
			case true:
				return ' form-group-valid';
			case false:
				return ' form-group-invalid';
			default:
				return '';
		}
	})();
	const validationRequiredClass = props.validation ? ' form-group-validation-required' : '';
	const wideClass = props.wide ? ' form-group-wide' : '';
	const focusedClass = (props.withFloatingLabel && !!props.isFocused) ? ' is-focused' : '';
	const canFloatClass = props.withFloatingLabel ? ' can-float' : '';
	const shouldFloatClass = (props.withFloatingLabel && (!!props.value || !!props.isFocused)) ? ' should-float' : '';
	const className = props.className ? ` ${props.className}` : '';
	const extraClassName = props.extraClassName ? ` ${props.extraClassName}` : '';

	return (
		<div className={`form-group form-type-${props.type}${wideClass}${focusedClass}${canFloatClass}${shouldFloatClass}${extraClassName}${validationRequiredClass}${validClass}${disabledClass}${className}`}>
			{props.children}
		</div>
	);
}
