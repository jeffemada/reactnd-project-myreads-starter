import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SearchBooks from '../SearchBooks';

Enzyme.configure({ adapter: new Adapter() });

const myBooks = [
  {
    title: 'Human Factors and Web Development',
    authors: ['Julie Ratner'],
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=sKvi5fVL-uAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=sKvi5fVL-uAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    id: 'sKvi5fVL-uAC',
    shelf: 'read'
  },
  {
    title: 'Pro React',
    authors: ['Cassio de Sousa Antonio'],
    imageLinks: {
      thumbnail:
        'http://books.google.com/books/content?id=PKpPCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    id: 'PKpPCwAAQBAJ',
    shelf: 'wantToRead'
  }
];

it('should render a SearchBooks', () => {
  const wrapper = shallow(
    <SearchBooks myBooks={myBooks} onCloseSearch={jest.fn()} onRefresh={jest.fn()} onLoading={jest.fn()} />
  );
  expect(wrapper).toMatchSnapshot();
});

it('should search books', () => {
  const wrapper = shallow(
    <SearchBooks myBooks={myBooks} onCloseSearch={jest.fn()} onRefresh={jest.fn()} onLoading={jest.fn()} />
  );
  expect(wrapper.state('lastRequest')).toEqual('');
  wrapper.instance().updateQuery({ target: { value: 'web' } });
  expect(wrapper.state('lastRequest')).toBeDefined();
});
