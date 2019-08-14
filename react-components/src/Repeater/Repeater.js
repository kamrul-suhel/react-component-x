import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RepeaterRow from './RepeaterRow';

export default class Repeater extends React.PureComponent {

	static propTypes = {
		addButton: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		addButtonPosition: PropTypes.oneOf(['top', 'bottom']),
		className: PropTypes.string,
		count: PropTypes.number,
		disabled: PropTypes.bool,
		min: PropTypes.number,
		max: PropTypes.number,
		name: PropTypes.string.isRequired,
		onRowAppend: PropTypes.func,
		onRowBefore: PropTypes.func,
		onChange: PropTypes.func,
		onRemoved: PropTypes.func,
		removeButton: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		title: PropTypes.string,
		value: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
		]),
		valueExtractor: PropTypes.object,
	}

	static defaultProps = {
		addButton: 'Add',
		addButtonPosition: 'bottom',
		className: '',
		count: 1,
		disabled: false,
		max: 0,
		min: 1,
		onChange: () => {},
		onRemoved: () => {},
		onRowAppend: null,
		onRowBefore: null,
		removeButton: 'Remove',
		title: '',
		value: [],
		valueExtractor: null,
	}

	constructor(props) {
		super(props);

		this.state = {
			options: {},
			presetValues: [],
		};
	}

	componentDidMount() {
		this.updateValue(_.values(this.props.value));
	}

	componentWillReceiveProps(nextProps) {
		// override state only if current props is empty but next props has value
		if (_.size(this.props.value) === 0 && _.size(nextProps.value) > 0) {
			this.updateValue(_.values(nextProps.value));
		}
	}

	updateValue = (value) => {
		this.setState({ presetValues: value });
		this.generateOptions(value);
	}

	generateOptions = (value) => {
		let options = {};
		const valueCount = _.size(value);
		const count = valueCount || this.props.count;

		for (let i = 0; i < count; i++) {
			const counter = i + 1;
			const option = {
				[counter]: {
					counter,
					id: (value[i] || {}).id || 0,
				},
			};
			options = _.assign({}, options, option);
		}

		this.setState(() => {
			return {
				options,
				count: this.props.count,
				optionId: count,
			};
		}, () => {
			this.props.onChange(this.props.name, this.state.options);
		});
	}

	handleChange = (counter, state) => {
		this.setState((prevState) => {
			return {
				options: {
					...prevState.options,
					[counter]: state,
				},
			};
		}, () => {
			this.props.onChange(this.props.name, this.state.options);
		});
	}

	canAddMore = () => {
		if (this.props.max > 0 && this.props.max <= _.size(this.state.options)) {
			return false;
		}

		return true;
	}

	remove = (counter) => {
		const options = _.pickBy(this.state.options, v => v.counter != counter);
		const removed = _.find(this.state.options, {'counter':counter});

		this.setState((prevState) => {
			return {
				options,
				count: prevState.count - 1,
			};
		}, () => {
			this.props.onChange(this.props.name, this.state.options);

      if(this.props.onRemoved){
  			this.props.onRemoved(removed);
      }
		});
	}

	add = () => {
		if (this.canAddMore()) {
			const optionId = this.state.optionId + 1;
			this.setState((prevState) => {
				return {
					optionId,
					count: prevState.count + 1,
					options: {
						...prevState.options,
						[optionId]: {
							counter: optionId,
							id: 0,
						},
					},
				};
			});
		}
	}

	renderAddButton = () => {
		if (this.props.disabled || !this.canAddMore()) {
			return false;
		}

		return (
			<span className="repeatable-row-add" onClick={this.add}>
				{this.props.addButton}
			</span>
		);
	}

	render() {
		const {
			addButtonPosition,
			children,
			className,
			disabled,
			min,
			onRowAppend,
			onRowBefore,
			removeButton,
			title,
			valueExtractor,
		} = this.props;
		const {
			options,
			presetValues,
		} = this.state;
		const disabledClass = disabled ? 'is-disabled' : '';
		const optionSize = _.size(options);

		return (
			<div className={`form-repeater ${disabledClass} ${className}`}>
				<div className="repeatable-label-wrapper">
					{title && <span className="repeatable-label">{title}</span>}
					{addButtonPosition === 'top' && this.renderAddButton()}
				</div>
				<div className="repeatable-wrapper">
					{options && _.map((options), (option) => {
						const rowValues = presetValues[option.counter - 1] || {};
						return (
							<RepeaterRow
								disabled={disabled}
								key={option.counter}
								min={min}
								onChange={this.handleChange}
								onRemove={this.remove}
								onRowAppend={onRowAppend}
								onRowBefore={onRowBefore}
								option={option}
								removeButton={removeButton}
								rowValues={rowValues}
								size={optionSize}
								valueExtractor={valueExtractor}
							>
								{children}
							</RepeaterRow>
						);
					})}
				</div>
				{addButtonPosition === 'bottom' && this.renderAddButton()}
			</div>
		);
	}

}
