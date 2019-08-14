import PropTypes from 'prop-types';

const defaultPropTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.object,
		PropTypes.string,
	]),
	name: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	onChange: PropTypes.func,
	skipInitialOnChangeCall: PropTypes.bool,
	validation: PropTypes.string,
	wide: PropTypes.bool,
	withFloatingLabel: PropTypes.bool,
};

export default defaultPropTypes;
