import React from 'react';
import PropTypes from 'prop-types';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import _ from 'lodash';
import {
	FormElement,
	FormError,
	FormField,
	FormFieldWrapper,
	FormGroup,
	FormLabel,
	defaultPropTypes,
	defaultProps,
} from './core';

export default class RichText extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		onFileUpload: PropTypes.func,
		toolbarCustomButtons: PropTypes.array,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
	}

	static defaultProps = {
		...defaultProps,
		toolbarCustomButtons: null,
		value: '',
	}

	componentDidMount() {
		const value = this.formatValueProp(this.props.value);
		this.updateValue(value, this.props.value);
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.value, nextProps.value)) {
			const value = this.formatValueProp(nextProps.value);
			this.updateValue(value, nextProps.value);
		}
	}

	formatValueProp = (value) => {
		if (!value) {
			return null;
		}

		return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(value)));
	}

	handleChange = (editorContent) => {
		const value = draftToHtml(convertToRaw(editorContent.getCurrentContent()));

		if (value) {
			this.updateValue(editorContent, value);
		}
	}

	updateValue = (value = '', returnValue) => {
		this.validateOnUpdate(value);
		this.props.onChange(this.props.name, returnValue);
		this.setState({ value });
	}

	handleFilePicker = (callback, value, meta) => {
		if (meta.filetype == 'image') {
			const input = document.getElementById('image-upload-tinymce');
			input.click();

			input.onchange = async () => {
				const file = input.files[0];
				const reader = new FileReader();

				const formData = new FormData();
				file && formData.append('file', file);

				const response = await this.props.onFileUpload(formData);

				if (response && response.data) {
					reader.onload = (e) => {
						const img = new Image();
						img.src = response.data.src;

						callback(response.data.src, {
							alt: file.name,
						});

						const delay = _.debounce(this.handleChange, 10000);

						delay();
					};

					reader.readAsDataURL(file);
				}
			};
		}
	}

	render() {
		const {
			toolbarCustomButtons,
		} = this.props;
		const { value } = this.state;
		const { valid, errors } = this.state.validation;
		const handleFilePicker = this.props.onFileUpload ? this.handleFilePicker : null;

		return (
			<FormGroup {...this.props} type="richtext" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<FormField>
						<Editor
							toolbarCustomButtons={toolbarCustomButtons}
							editorState={value}
							onEditorStateChange={this.handleChange}
						/>
					</FormField>
				</FormFieldWrapper>
				<FormError {...this.props} valid={valid} errors={errors} />
			</FormGroup>
		);
	}

}
