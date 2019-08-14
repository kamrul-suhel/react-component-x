import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		formAfter: PropTypes.element,
		formBefore: PropTypes.element,
		loader: PropTypes.bool,
		onSubmit: PropTypes.func,
		onValidationError: PropTypes.func,
		wide: PropTypes.bool,
	}

	static defaultProps = {
		children: [],
		className: '',
		formAfter: null,
		formBefore: null,
		loader: false,
		wide: false,
	}

	constructor(props) {
		super(props);

		this.state = {
			showLoader: false,
		};
	}

	validate = () => {
		let valid = true;

		this.fields.forEach((field) => {
			const validation = field.validate && field.validate();

			if (validation && !validation.valid) {
				valid = false;
			}
		});

		return valid;
	}

	submit = async (event) => {

		if (event) {
			event.preventDefault();
		}

		// if form is loading prevent submitting the form again
		if (this.state.showLoader) {
			return false;
		}

		const {
			loader,
			onSubmit,
			onValidationError,
		} = this.props;

		const valid = this.validate();

		if (valid) {
			if (loader) {
				this.showLoader();
			}

			if (onSubmit) {
				await onSubmit();
			}
			return true;
		}

		if (onValidationError) {
			onValidationError();
		}

		return false;

	}

	hideLoader = () => this.setState({ showLoader: false });

	showLoader = () => this.setState({ showLoader: true });

	renderFormBefore = () => {
		if (!this.props.formBefore) {
			return null;
		}

		return (
			<div className="form-before-wrapper">
				{this.props.formBefore}
			</div>
		);
	}

	renderFormAfter = () => {
		if (!this.props.formAfter) {
			return null;
		}

		return (
			<div className="form-after-wrapper">
				{this.props.formAfter}
			</div>
		);
	}

	renderChild(child) {
		return React.cloneElement(child, {
			ref: (node) => {
				// Keep your own reference
				if (node) {
					this.fields.push(node);
				}

				// Call the original ref, if any
				const { ref } = child;
				if (typeof ref === 'function') {
					ref(node);
				}
			},
		});
	}

	renderChildren = children => React.Children.map(children, (child) => {
		if (!child || !child.props) {
			return child;
		}

		// run the same function until get the input
		if (child.props.children) {
			const newChildren = this.renderChildren(child.props.children);
			return {
				...child,
				props: {
					...child.props,
					children: newChildren,
				},
			};
		}

		// return if validation is not required
		if (!child.props.validation) {
			return child;
		}

		return this.renderChild(child);
	})

	render() {
		const wideClass = this.props.wide ? ' form-wide' : '';
		const formAfterClass = this.props.formAfter ? ' form-render-after' : '';
		const formBeforeClass = this.props.formBefore ? ' form-render-before' : '';
		const loadingClass = this.state.showLoader ? ' form-loading' : '';
		const className = this.props.className ? ` ${this.props.className}` : '';

		// clear fields array
		this.fields = [];

		return (
			<div className={`form-wrapper${wideClass}${formBeforeClass}${formAfterClass}${loadingClass}${className}`}>
				{this.renderFormBefore()}
				<div className="form-outer">
					<form className="form" onSubmit={this.submit}>
						{this.renderChildren(this.props.children)}
					</form>
				</div>
				{this.renderFormAfter()}
			</div>
		);
	}

}
