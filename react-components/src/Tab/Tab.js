import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Tab extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		children: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.func,
		]).isRequired,
		onTabSelect: PropTypes.func,
		renderHeaderItem: PropTypes.func,
		selectedIndex: PropTypes.number,
	}

	static defaultProps = {
		className: '',
		onTabSelect: undefined,
		renderHeaderItem: null,
		selectedIndex: 0,
	}

	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: this.props.selectedIndex,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.selectedIndex !== prevProps.selectedIndex && this.props.selectedIndex !== prevState.selectedIndex) {
			this.handleTabSelect(this.props.selectedIndex);
		}
	}

	flattenTabs = () => {
		const children = this.formatTabData(this.props.children);
		return !_.isArray(children) ? [children] : _.flatten(children);
	}

	formatTabData = (grandChild, index = 0) => {

		if (_.isArray(grandChild)) {
			return grandChild.map((child, i) => this.formatTabData(child, index + i));
		}

		return grandChild;
	}

	handleTabSelect = (selectedIndex) => {

		// callback on tab select
		// sends the new index and the prevIndex as params
		if (this.props.onTabSelect) {
			this.props.onTabSelect(selectedIndex, this.state.selectedIndex);
		}

		this.setState({ selectedIndex });
	}

	renderHeaderItem = (tab, index) => {
		if (this.props.renderHeaderItem) {
			return this.props.renderHeaderItem(tab, index);
		}

		return (tab.props || {}).title;
	}

	renderTabHeader = (tab, index) => {
		const isSelected = index === this.state.selectedIndex;
		const selectedClass = isSelected ? 'is-selected' : '';

		return (
			<li
				className={`tab-header-item ${selectedClass}`}
				key={`tabHeader${index}`}
				onClick={() => this.handleTabSelect(index)}
			>
				{this.renderHeaderItem(tab, index)}
			</li>
		);
	}

	renderTabHeaders = (tabs) => {
		const tabHeaderContent = tabs.map(this.renderTabHeader);

		return (
			<div className="tab-header-wrapper">
				<ul>
					{tabHeaderContent}
				</ul>
			</div>
		);
	}

	renderSelectedTabContent = (tabs) => {
		const { selectedIndex } = this.state;
		const selectedTab = tabs[selectedIndex] || null;

		return (
			<div className="tab-content-wrapper">
				{selectedTab}
			</div>
		);
	}

	render() {
		const {
			className,
		} = this.props;

		const {
			selectedIndex,
		} = this.state;

		const tabs = this.flattenTabs();

		return (
			<div className={`tab selected-${selectedIndex} ${className}`}>
				{this.renderTabHeaders(tabs)}
				{this.renderSelectedTabContent(tabs)}
			</div>
		);
	}

}
