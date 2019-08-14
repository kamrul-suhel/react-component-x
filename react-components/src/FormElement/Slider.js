import React from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';
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

export default class Slider extends FormElement {
	static propTypes = {
		...defaultPropTypes,
		append: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		max: PropTypes.number,
		min: PropTypes.number,
		prepend: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		step: PropTypes.number,
		value: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.number,
			PropTypes.string,
		]),
		withBars: PropTypes.bool,
	}

	static defaultProps = {
		...defaultProps,
		append: '',
		max: 10,
		min: 1,
		prepend: '',
		step: 1,
		value: 0,
		withBars: true,
	}

	render() {
		const {
			disabled,
			max,
			min,
			step,
			withBars,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;

		return (
			<FormGroup {...this.props} type="slider" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormPrepend {...this.props} />
					<FormField>
						<ReactSlider
							disabled={disabled}
							handleActiveClassName="is-active"
							max={max}
							min={min}
							onChange={this.handleChange}
							snapDragDisabled={false}
							step={step}
							value={value}
							withBars={withBars}
						>
							{this.props.children}
						</ReactSlider>
					</FormField>
					<FormAppend {...this.props} />
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}
}
