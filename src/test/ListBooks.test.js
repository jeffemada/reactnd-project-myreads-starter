import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ListBooks from '../ListBooks';
import { MY_BOOKS_MOCK } from './constants';

Enzyme.configure({ adapter: new Adapter() });

it('should render a ListBooks', () => {
  const wrapper = shallow(<ListBooks books={MY_BOOKS_MOCK} onRefresh={jest.fn()} onLoading={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});
