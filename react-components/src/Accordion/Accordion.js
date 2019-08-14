import React from 'react';
import PropTypes from 'prop-types';

export default class Accordion extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		closeable: PropTypes.bool,
		disabled: PropTypes.bool,
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.func,
			PropTypes.string,
		]).isRequired,
		open: PropTypes.bool,
		title: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.func,
			PropTypes.string,
		]).isRequired,
		onOpen: PropTypes.func
	}

	static defaultProps = {
		className: '',
		closeable: true,
		disabled: false,
		open: false,
	}

	constructor(props) {
		super(props);

		this.state = {
			open: this.props.open,
		};

		this.open = false;
		this.heightChecked = false;
		this.initHeight = 0;
		this.timeout;
	}

	handleClick = () => {
		if (this.props.disabled) {
			return false;
		}

		if (this.state.open) {
			this.props.closeable && this.toggle();
		} else {
			this.toggle();
			
			if(this.props.onOpen) {
				this.props.onOpen();
			}
		}

		// this.slideToggle();
	}

	toggle = () => {
		this.setState({ open: !this.state.open });
	}

	open = () => {
		this.setState({ open: true });
	}

	close = () => {
		this.setState({ open: false });
	}

	// getHeight = () => {
	// 	if (this.heightChecked) {
	// 		return this.initHeight;
	// 	}

	// 	const el = this.refAccordionBody;
	// 	const parent = this.refs.accordion;
	// 	this.heightChecked = true;

	// 	if (this.open) {
	// 		this.initHeight = el.offsetHeight;
	// 		return this.initHeight;
	// 	}

	// 	parent.style.position = 'relative';
	// 	el.style.display = 'block';
	// 	el.style.visibility = 'hidden';
	// 	el.style.position = 'absolute';
	// 	this.initHeight = el.offsetHeight;
	// 	parent.style.position = null;
	// 	el.style.display = null;
	// 	el.style.visibility = null;
	// 	el.style.position = null;
	// 	return this.initHeight;
	// }

	// sleep = (ms) => {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// }

	// slideToggle = async () => {
	// 	const el = this.refAccordionBody;
	// 	const elMaxHeight = this.getHeight();

	// 	const clearStyles = () => {
	// 		el.style.overflowY = null;
	// 		el.style.transition = null;
	// 	}

	// 	const setupStyles = () => {
	// 		el.style.overflowY = 'hidden';
	// 		el.style.transition = 'all 300ms ease-in-out';
	// 	}

	// 	setupStyles();
	// 	await this.sleep(10);

	// 	this.open = !this.open;
	// 	clearTimeout(this.timeout);

	// 	if (this.open) {
	// 		el.style.display = 'block';
	// 		el.style.maxHeight = 0;
	// 		this.timeout = setTimeout(() => {
	// 			el.style.maxHeight = `${elMaxHeight}px`;
	// 		}, 50);
	// 		this.timeout = setTimeout(() => {
	// 			clearStyles();
	// 		}, 350);
	// 	} else {
	// 		el.style.maxHeight = '0';
	// 		this.timeout = setTimeout(() => {
	// 			clearStyles();
	// 			el.style.display = 'none';
	// 		}, 300);
	// 	}
	// }

	render() {
		const {
			className,
			children,
			title
		} = this.props;

		const openClass = this.state.open ? 'is-active' : '';
		const disabledClass = this.props.disabled ? 'is-disabled' : '';

		return (
			<div className={`accordion-item ${disabledClass} ${openClass} ${className}`}>
				{!!title && <div className="accordion-header" onClick={this.handleClick}>{title}</div>}
				{!!this.state.open &&
					<div className="accordion-body" ref={ref => this.refAccordionBody = ref}>{children}</div>
				}
			</div>
		);
	}

}
