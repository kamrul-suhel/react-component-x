import React from 'react';
import renderer from 'react-test-renderer';
import FormAppend from '../FormAppend';

it('renders correctly', () => {
	const tree = renderer.create(<FormAppend />).toJSON();
	expect(tree).toMatchSnapshot();
});
