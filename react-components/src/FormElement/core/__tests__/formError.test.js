import React from 'react';
import renderer from 'react-test-renderer';
import FormError from '../FormError';

it('renders correctly', () => {
	const tree = renderer.create(<FormError valid={false} errors={['Something went wrong']} />).toJSON();
	expect(tree).toMatchSnapshot();
});
