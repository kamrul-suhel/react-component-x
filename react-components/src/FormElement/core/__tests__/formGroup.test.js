import React from 'react';
import renderer from 'react-test-renderer';
import FormGroup from '../FormGroup';

it('renders correctly', () => {
	const tree = renderer.create(<FormGroup type="checkbox" disabled valid validation wide className="custom-class-name" />).toJSON();
	expect(tree).toMatchSnapshot();
});
