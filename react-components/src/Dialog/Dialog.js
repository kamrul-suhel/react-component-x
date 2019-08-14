import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const dialogRoot = document.body;

export default class Dialog extends React.PureComponent {

	static propTypes = {
		buttons: PropTypes.array,
		children: PropTypes.element,
		className: PropTypes.string,
		closeOnOverlayClick: PropTypes.bool,
		content: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string,
			PropTypes.object,
		]),
		onClose: PropTypes.func,
		showCloseButton: PropTypes.bool,
		title: PropTypes.string,
	}

	static defaultProps = {
		buttons: null,
		className: '',
		closeOnOverlayClick: true,
		content: '',
		onClose: null,
		showCloseButton: true,
		title: '',
	}

	constructor(props) {
		super(props);
		this.el = document.createElement('div');
		this.el.className = 'dialog-wrapper';

		this.state = {
			open: false,
		};
	}

	componentWillMount() {
		if (!this.props.children) {
			dialogRoot.appendChild(this.el);
		}
	}

	componentWillUnmount() {
		if (!this.props.children) {
			this.el.parentNode && this.el.parentNode.removeChild(this.el);
		}
	}

	open = () => {
		this.setState({ open: true });

		if (this.props.children) {
			dialogRoot.appendChild(this.el);
		}
	}

	close = () => {
		this.setState({ open: false });
		this.props.onClose && this.props.onClose();

		if (this.props.children) {
			this.el.parentNode && this.el.parentNode.removeChild(this.el);
		}
	}

	renderDialog = () => {
		const {
			buttons,
			closeOnOverlayClick,
			content,
			showCloseButton,
			title,
		} = this.props;

		const handleOverlayClick = closeOnOverlayClick ? this.close : null;

		const dialog = [
			<div key="dialogOverlay" className="dialog-overlay" onClick={handleOverlayClick} />,
			<div key="dialogContent" className={`dialog ${this.props.className}`}>
				<div className="dialog-content">
					{!!title &&
						<div className="dialog-header">
							{showCloseButton &&
								<div className="dialog-close-wrapper">
									<button className="dialog-close" onClick={this.close}>×</button>
								</div>
							}
							{title && <div className="dialog-title">{title}</div>}
						</div>
					}

					{!!content &&
						<div className="dialog-body">
							{content}
						</div>
					}

					{!!buttons &&
						<div className="dialog-footer">
							{buttons.map((button) => {
								// if button key is cancel then use the close method
								const onClick = button.key === 'cancel' ? this.close : button.props.onClick;
								return React.cloneElement(button, { onClick });
							})}
						</div>
					}
				</div>
			</div>,
		];

		return ReactDOM.createPortal(
			dialog,
			this.el,
		);
	}

	render() {
		if (!this.props.children) {
			return this.renderDialog();
		}

		const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, { onClick: this.open }));
		const dialog = this.state.open ? this.renderDialog() : null;

		return [
			childrenWithProps,
			dialog,
		];
	}

}
