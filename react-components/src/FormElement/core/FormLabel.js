import React from 'react';

export default function FormLabel(props) {
	if (!props.label) {
		return null;
	}

	return <span className="form-label">{props.label}</span>;
}
