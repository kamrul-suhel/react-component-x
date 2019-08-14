import React from 'react';

export default function FormAppend(props) {

	if (!props.append) {
		return null;
	}

	const onClick = props.onClick || null;

	return <span className="form-field-append" onClick={onClick}>{props.append}</span>;
}
