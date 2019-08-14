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

export default class MultiSelect extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		clearable: PropTypes.bool,
		labelKey: PropTypes.string,
		onAdd: PropTypes.func,
		onRemove: PropTypes.func,
		options: PropTypes.array,
		value: PropTypes.array,
		valueKey: PropTypes.string,
	}

	static defaultProps = {
		...defaultProps,
		clearable: true,
		labelKey: 'title',
		options: [],
		value: [],
		valueKey: 'id',
	}

	componentDidMount() {
		const value = this.formatValue(this.props.value);
		this.updateValue(value);
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.value, nextProps.value)) {
			const value = this.formatValue(nextProps.value);
			this.updateValue(value);
		}
	}

	formatValue(value) {
		if (this.props.clearable) {
			return value;
		}

		return value.map((option) => {
			return {
				...option,
				clearable: false,
			};
		});
	}

	updateValue = (value = []) => {
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, value);
		this.setState({ value });
	}

	addItem = (option) => {
		const selectedOption = _.filter(this.props.options, v => v[this.props.valueKey] == option[this.props.valueKey]);
		const newOption = _.merge({}, _.head(selectedOption), { new: true });
		const oldOptions = this.state.value || [];

		if (!this.props.onAdd) {
			const selectedOptions = oldOptions.concat([newOption]);
			this.updateValue(selectedOptions);
		} else {
			this.props.onAdd([newOption]).then((result) => {
				const selectedOptions = oldOptions.concat(result);
				this.updateValue(selectedOptions);
			}).catch(error => false);
		}
	}

	removeItem = (option) => {
		// cant remove clearable false items
		if (!this.props.clearable && option.clearable === false) {
			return false;
		}

		const selectedValues = _.filter(this.state.value, v => v[this.props.valueKey] != option[this.props.valueKey]);

		if (this.props.onRemove) {
			this.props.onRemove();
		}

		this.updateValue(selectedValues);
	}

	renderAvailableOptions = () => {
		const { name, options } = this.props;

		const list = options && options.map((option) => {
			if (!option[this.props.valueKey]) {
				return false;
			}

			const isSelected = _.find(this.state.value, v => v[this.props.valueKey] == option[this.props.valueKey]);
			const selectedClass = isSelected ? 'is-selected' : '';
			const clearableClass = isSelected && !this.props.clearable && isSelected.clearable === false ? 'hidden' : '';
			const onClickFn = !isSelected ? () => this.addItem(option) : null;
			return (
				<li key={`multiSelectAvailableOption${name}${option[this.props.valueKey]}`}>
					<span className={`option ${clearableClass} ${selectedClass}`} onClick={onClickFn}>{option[this.props.labelKey]}</span>
				</li>
			);
		});

		return (
			<div className="list-wrapper option-available">
				<ul>
					{list}
				</ul>
			</div>
		);
	}

	renderSelectedOptions = () => {
		const { name } = this.props;
		const { value } = this.state;

		const list = value && value.map((option) => {
			if (!option[this.props.valueKey]) {
				return false;
			}

			const lockedClass = option.clearable === false ? 'is-locked' : '';
			const newClass = option.new === true ? 'is-new' : '';

			return (
				<li key={`multiSelectSelectedOption${name}${option[this.props.valueKey]}`}>
					<span className={`option ${lockedClass} ${newClass}`} onClick={() => this.removeItem(option)}>{option[this.props.labelKey]}</span>
				</li>
			);
		});

		return (
			<div className="list-wrapper option-selected">
				<ul>
					{list}
				</ul>
			</div>
		);
	}

	renderLabel = () => {
		const { label } = this.props;

		if (typeof label === 'string') {
			return <FormLabel label={label} />;
		}

		return label.map((labelItem, i) => <FormLabel key={`multiSelectLabel${i}`} label={labelItem} />);
	}

	render() {
		const { valid, errors } = this.state.validation;

		return (
			<FormGroup {...this.props} type="multi-select" valid={valid}>
				<div className="form-label-wrapper">
					{this.renderLabel()}
				</div>
				<FormFieldWrapper>
					{this.renderAvailableOptions()}
					<div className="separator">
						<i className="ion-arrow-swap" />
					</div>
					{this.renderSelectedOptions()}
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}

}
