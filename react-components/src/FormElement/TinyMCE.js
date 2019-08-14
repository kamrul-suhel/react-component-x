import React from 'react';
import PropTypes from 'prop-types';
import ReactTinyMCE from 'react-tinymce';
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
	defaultValidation,
} from './core';

export default class TinyMCE extends FormElement {

	static propTypes = {
		...defaultPropTypes,
		height: PropTypes.number,
		onFileUpload: PropTypes.func,
		plugins: PropTypes.string,
		toolbar: PropTypes.string,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
	}

	static defaultProps = {
		...defaultProps,
		height: 200,
		plugins: '',
		toolbar: '',
		value: '',
	}

	constructor(props) {
		super(props);

		this.state = {
			key: 0,
			validation: defaultValidation,
			value: this.props.value,
		};
	}

	componentDidMount() {
		this.props.onChange(this.props.name, this.props.value);
	}

	componentWillReceiveProps(nextProps) {
		// override state only if current props is empty but next props has value
		if (!this.props.value && nextProps.value) {
			this.props.onChange(this.props.name, nextProps.value);
			this.setState({
				value: nextProps.value,
				key: this.state.key + 1,
			});
		}
	}

	handleChange = (event) => {
		const value = event.target.getContent();

		if (value) {
			this.validateOnUpdate(value);
			this.props.onChange(this.props.name, value);
			this.setState({ value });
		}
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
			height,
			value,
		} = this.props;
		const { valid, errors } = this.state.validation;
		const handleFilePicker = this.props.onFileUpload ? this.handleFilePicker : null;

		return (
			<FormGroup {...this.props} type="tinymce" valid={valid}>
				<FormLabel {...this.props} />
				<FormFieldWrapper>
					<input type="file" id="image-upload-tinymce" name="single-image" style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg" />
					<FormField>
						<ReactTinyMCE
							key={this.state.key}
							content={value}
							config={{
								height,
								browser_spellcheck: true,
								file_browser_callback_types: 'image',
								file_picker_callback: handleFilePicker,
								plugins: `autolink link image code lists print preview ${this.props.plugins}`,
								toolbar: `undo redo | bold italic | alignleft aligncenter alignright | numlist bullist | image | ${this.props.toolbar}`,
								relative_urls: false,
							}}
							onChange={this.handleChange}
						/>
					</FormField>
				</FormFieldWrapper>
			</FormGroup>
		);
	}

}
