import React from 'react';
import renderer from 'react-test-renderer';
import FormPrepend from '../FormPrepend';

it('renders correctly', () => {
	const tree = renderer.create(<FormPrepend />).toJSON();
	expect(tree).toMatchSnapshot();
});
