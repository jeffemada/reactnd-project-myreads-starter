import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Book from '../Book';

Enzyme.configure({ adapter: new Adapter() });

it('should render a Book', () => {
  const book = {
    title: 'Pro React',
    authors: ['Cassio de Sousa Antonio'],
    imageLinks: {
      thumbnail:
        'http://books.google.com/books/content?id=PKpPCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    id: 'PKpPCwAAQBAJ',
    shelf: 'wantToRead'
  };
  const wrapper = shallow(<Book book={book} onRefresh={jest.fn()} onLoading={jest.fn()} />);
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
