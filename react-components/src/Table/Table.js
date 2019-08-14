import React from 'react';
import PropTypes from 'prop-types';
import { NoResults } from '../';

export default class Table extends React.PureComponent {

	static propTypes = {
		children: PropTypes.array.isRequired,
		className: PropTypes.string,
		footer: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.element,
		]),
		freezeHeaderColumn: PropTypes.bool,
		headers: PropTypes.array.isRequired,
		icon: PropTypes.string,
		sort: PropTypes.object,
		total: PropTypes.number,
		totalLabel: PropTypes.string,
	}

	static defaultProps = {
		children: [],
		className: '',
		freezeHeaderColumn: false,
		sort: {
			by: null,
			columns: [],
			dir: 'ASC',
			onSort: null,
		},
		total: 0,
		totalLabel: 'Total',
	}

	constructor(props) {
		super(props);

		this.state = {
			sortBy: this.props.sort.by,
			sortDir: this.props.sort.dir,
		};
	}

	onSortChange = () => {
		this.props.sort.onSort(this.state.sortBy, this.state.sortDir);
	}

	handleSort = (sortBy) => {
		if (sortBy === this.state.sortBy) {
			this.setState({ sortDir: this.state.sortDir === 'ASC' ? 'DESC' : 'ASC' }, this.onSortChange);
		} else {
			this.setState({
				sortBy,
				sortDir: 'ASC',
			}, this.onSortChange);
		}
	}

	renderIcon = () => {
		if (!this.props.icon) {
			return false;
		}

		return (
			<div className="triangle-wrapper">
				<div className="triangle-overlay"><i className={this.props.icon} /></div>
			</div>
		);
	}

	renderCount = () => {
		if (!this.props.total) {
			return false;
		}

		return (
			<div className="count-wrapper">
				<span>{this.props.totalLabel}: <span className="count">{this.props.total}</span></span>
			</div>
		);
	}

	render() {
		const {
			actions,
			className,
			footer,
			freezeHeaderColumn,
			headers,
			icon,
			sort,
		} = this.props;
		const isSortable = !!(sort.columns.length > 0 && sort.onSort);
		const sortableClass = isSortable ? 'is-sortable' : '';
		const hasIconClass = !freezeHeaderColumn && icon ? 'has-icon' : '';
		const freezeColumnClass = freezeHeaderColumn ? 'freeze-header-column' : '';

		if (this.props.children.length === 0) {
			return <NoResults content="No data available." />;
		}

		return (
			<div className={`table ${hasIconClass} ${sortableClass} ${freezeColumnClass} ${className}`}>

				<div className="table-inner">
					{this.renderIcon()}
					{this.renderCount()}
					<table>
						<thead>
							<tr>
								{headers.map((header, i) => {
									const emptyClass = !header ? 'is-empty' : '';
									const sortColumnKey = sort.columns[i];
									const isHeaderSortable = !!(isSortable && !!sortColumnKey);
									const headerSortableClass = isHeaderSortable ? 'header-is-sortable' : '';
									const headerSortClass = (isHeaderSortable && this.state.sortBy === sortColumnKey) ? (this.state.sortDir === 'ASC' ? 'sorted-asc' : 'sorted-desc') : '';
									const onClick = isHeaderSortable ? () => this.handleSort(sortColumnKey) : null;

									return (
										<th className={`${emptyClass} ${headerSortableClass} ${headerSortClass}`} key={`th${i}`} onClick={onClick}>
											{header}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{this.props.children}
						</tbody>
					</table>
				</div>

				{!!footer &&
					<div className="table-footer">
						<div className="table-footer-inner">
							{footer}
						</div>
					</div>
				}

				{!!actions &&
					<div className="table-actions">
						{actions}
					</div>
				}
			</div>
		);
	}

}
