

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Loader extends React.PureComponent {

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.option.id !== prevState.id) {
			return {
				id: nextProps.option.id,
			};
		}

		return null;
	}

	constructor(props) {
		super(props);

		this.handleUpdateParent = _.debounce(this.handleUpdateParent, 120);

		this.state = this.props.option;
	}

	// REVIEW: Couldnt make it work as <Select /> or another component which waits async for options wont be displayed on the first time,
	// as by that point reducer is empty, and shouldComponentUpdate block from rerendering. Maybe passing a resolve function to repeater
	// could fix this issue
	// shouldComponentUpdate(nextProps) {
	// 	const rowValuesChanged = !_.isEqual(this.props.rowValues, nextProps.rowValues);
	// 	const optionChanged = !_.isEqual(this.props.option, nextProps.option);
	// 	const sizeChanged = nextProps.size < 3;
	//
	// 	return optionChanged || sizeChanged || rowValuesChanged;
	// }

	handleChange = (name, value) => {
		this.setState({
			[name]: value,
		}, this.handleUpdateParent);
	}

	handleUpdateParent = () => {
		this.props.onChange(this.state.counter, this.state);
	}

	handleRemove = () => this.props.onRemove(this.state.counter);

	renderRowPrepend = () => {
		const {
			onRowBefore,
			option,
		} = this.props;

		if (!onRowBefore) {
			return null;
		}

		const element = onRowBefore(option);
		return this.renderChild(option, element);
	}

	renderRowAppend = () => {
		const {
			onRowAppend,
			option,
		} = this.props;

		if (!onRowAppend) {
			return null;
		}

		const element = onRowAppend(option);
		return this.renderChild(option, element);
	}

	renderChildren = (children) => {
		const { option } = this.props;
		return React.Children.map(children, (child) => {

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

			return this.renderChild(option, child);
		});
	}

	renderChild = (option, element) => {
		if (!element) {
			return element;
		}

		const {
			rowValues,
			valueExtractor,
		} = this.props;

		let childValue = null;
		if (!_.isEmpty(rowValues)) {
			const childName = valueExtractor ? valueExtractor[element.props.name] : element.props.name;
			childValue = rowValues[childName];
		}

		// this lets users to pass extra props down to the children
		// e.g. passing title="row.sub_title" will send the current iteration object's sub_title as title prop
		const customProps = {};
		_.map(element.props, (val, key) => {
			if (typeof val === 'string' && val.indexOf('row.') !== -1) {
				customProps[key] = rowValues[val.replace('row.', '')];
			}
		});

		return React.cloneElement(element, {
			onChange: this.handleChange,
			value: childValue,
			...customProps,
		});
	}

	renderRemoveButton = () => {
		if (this.props.disabled || this.props.size === this.props.min) {
			return false;
		}

		return (
			<span className="repeatable-row-remove" onClick={this.handleRemove}>
				{this.props.removeButton}
			</span>
		);
	}

	render() {
		return (
			<div className="repeatable-row">
				{this.renderRowPrepend()}
				{this.renderChildren(this.props.children)}
				{this.renderRowAppend()}
				{this.renderRemoveButton()}
			</div>
		);
	}

}
