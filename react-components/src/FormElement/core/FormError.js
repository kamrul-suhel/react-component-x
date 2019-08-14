import React from 'react';

export default function FormError(props) {

	if (props.valid || !props.errors || props.errors.length === 0) {
		return null;
	}

	return (
		<div className="form-field-error-wrapper">
			<ul>
				{props.errors.map((error, i) => <li key={`${props.name}error${i}`}>{error}</li>)}
			</ul>
		</div>
	);
}
