import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BooksGrid from '../BooksGrid';
import { SEARCH_BOOKS_MOCK } from './constants';

Enzyme.configure({ adapter: new Adapter() });

it('should render a BooksGrid', () => {
  const wrapper = shallow(<BooksGrid books={SEARCH_BOOKS_MOCK} onRefresh={jest.fn()} onLoading={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});
