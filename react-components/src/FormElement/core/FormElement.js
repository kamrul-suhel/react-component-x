import React from 'react';
import defaultValidation from './defaultValidation';
import validate from '../../validation';

export default class FormElement extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			isFocused: false,
			validation: defaultValidation,
		};
	}

	componentDidMount() {
		if (!this.props.skipInitialOnChangeCall) {
			this.updateValue(this.props.value);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.value, nextProps.value)) {
			this.updateValue(nextProps.value);
		}
	}

	setValidationMessage = validation => this.setState({ validation });

	setFocus = (isFocused) => {
		if (this.props.withFloatingLabel) {
			this.setState({ isFocused });
		}
	}

	updateValue = (value) => {
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, value);
		this.setState({ value });
	}

	clear = () => this.updateValue('');

	clearValidation = () => this.setValidationMessage(defaultValidation);

	// validate check if the value is valid within the given validation props
	// args.value can be used instaed this.state.value as by that point this.setState() does not update the state and we want to work with the current value not the old state
	// args.ignoreErrors ignores all error and sets the validation to undefined,
	// this args.ignoreErrors is only for each keystroke, on form submission the error shows
	validate = (args = {}) => {
		if (!this.props.validation) {
			return defaultValidation;
		}

		const validatingValue = args.value !== undefined ? args.value : this.state.value;
		const label = this.props.label || this.props.name;
		const validation = validate(validatingValue, this.props.validation, label);

		if (args.ignoreErrors && validation.valid === false) {
			this.clearValidation();
		} else {
			this.setValidationMessage(validation);
		}

		return validation;
	}

	validateOnUpdate = (value) => {
		const { validation } = this.state;

		if (validation.valid === false) {
			this.clearValidation();
		}

		if (this.props.validation) {
			this.validate({ value, ignoreErrors: true });
		}
	}

	handleChange = (value) => {
		this.updateValue(value);
	}

}
