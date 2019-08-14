import React from 'react';

export default function FormPrepend(props) {

	if (!props.prepend) {
		return null;
	}

	const onClick = props.onClick || null;

	return <span className="form-field-prepend" onClick={onClick}>{props.prepend}</span>;
}
