import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Checkbox from '../Checkbox';

const options = [
	{ id: 'foo', title: 'Foo' },
	{ id: 'bar', title: 'Bar' },
];

it('renders correctly', () => {
	const tree = renderer.create(<Checkbox name="options" value="bar" options={options} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('selected value is correct', () => {
	const checkbox = mount(<Checkbox name="options" value="foo" options={options} />);
	expect(checkbox.state().value).toEqual(['foo']);
});

it('multiple toggle test', () => {
	const checkbox = mount(<Checkbox name="options" value="foo" options={options} />);
	expect(checkbox.state().value).toEqual(['foo']);
	checkbox.find('.option-input[value="bar"]').simulate('change', { target: { checked: true } });
	expect(checkbox.state().value).toEqual(['foo', 'bar']);
	checkbox.find('.option-input[value="foo"]').simulate('change', { target: { checked: false } });
	expect(checkbox.state().value).toEqual(['bar']);
	checkbox.find('.option-input[value="foo"]').simulate('change', { target: { checked: true } });
	expect(checkbox.state().value).toEqual(['bar', 'foo']);
});
