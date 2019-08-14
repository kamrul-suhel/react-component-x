import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
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

export default class FileUpload extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		accept: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.string,
		]),
		append: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		clearable: PropTypes.bool,
		maxSize: PropTypes.number,
		multiple: PropTypes.bool,
		onReset: PropTypes.func,
		placeholder: PropTypes.string,
		prepend: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.object,
			PropTypes.string,
		]),
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.object,
		]),
	}

	static defaultProps = {
		...defaultProps,
		accept: '.jpg,.png,.pdf',
		append: '',
		clearable: false,
		multiple: false,
		placeholder: 'Select file',
		prepend: '',
		value: [],
	}

	updateValue = (value = []) => {
		let newValue = value || [];
		newValue = _.isArray(newValue) ? newValue : [newValue];
		const response = this.props.multiple ? newValue : newValue[0];
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, response);
		this.setState({ value: newValue });
	}

	clear = () => {
		this.updateValue([]);
	}

	deleteFile = (fileName) => {
		const value = this.state.value && this.state.value.filter(file => file.name != fileName);
		this.updateValue(value);
	}

	renderButtonText = () => {
		const { value } = this.state;
		const { children } = this.props;

		if (typeof value === 'string') {
			return value;
		}

		const fileCount = value ? value.length : 0;

    if(children) {
      return children
    }

		if (fileCount === 1) {
			const file = this.state.value[0];
			return file && file.name;
		}

		if (fileCount > 1) {
			return `${fileCount} files selected`;
		}

		return this.props.placeholder;
	}

	render() {
		const {
			accept,
			clearable,
			disabled,
			multiple,
			onReset,
			wide,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;

		return (
			<FormGroup {...this.props} type="upload" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormPrepend {...this.props} />
					<FormField>
						<Dropzone
							className="file-upload"
							style={{}}
							accept={accept}
							onDrop={this.handleChange}
							multiple={multiple}
						>
							<span className="file-name">{this.renderButtonText()}</span>
						</Dropzone>
						{clearable && value && value.length > 0 && <span className="form-field-reset" onClick={this.clear} />}
					</FormField>
					<FormAppend {...this.props} />
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
				{/*
					<ul className="selected-files">
						{this.state.value.map((file, i) =>
							<li key={`file_${i}${file.name}`}>
								<div className="file-icon-wrapper">
									<div className="file-icon" style={{ backgroundImage: `url(${file.preview})` }}/>
									<div className="file-meta">
										<a href={file.preview} target="_blank" className="file-name">{file.name}</a>
										<span className="file-size">{fn.bytesToSize(file.size)}</span>
									</div>
									<span onClick={this.deleteFile}><i className="button-icon ion-trash-b" /></span>
								</div>
							</li>
						)}
					</ul>
				*/}
			</FormGroup>
		);
	}

}
