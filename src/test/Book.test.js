import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Book from '../Book';
import { BOOK_MOCK } from './constants';

Enzyme.configure({ adapter: new Adapter() });

it('should render a Book', () => {
  const wrapper = shallow(<Book book={BOOK_MOCK} onRefresh={jest.fn()} onLoading={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});

it('should render a Book without authors and imageLinks', () => {
  const book = {
    title: 'Pro React',
    id: 'PKpPCwAAQBAJ'
  };
  const wrapper = shallow(<Book book={book} onRefresh={jest.fn()} onLoading={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});

// TODO: How can I call the method 'updateBookshelf' of the Stateless Component 'Book'?
