import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import * as BooksAPI from '../BooksAPI';
import SearchBooks from '../SearchBooks';
import { BOOK_MOCK, MY_BOOKS_MOCK, SEARCH_BOOKS_MOCK } from './constants';

Enzyme.configure({ adapter: new Adapter() });

it('should render a SearchBooks', () => {
  const wrapper = shallow(
    <SearchBooks myBooks={MY_BOOKS_MOCK} onCloseSearch={jest.fn()} onRefresh={jest.fn()} onLoading={jest.fn()} />
  );
  expect(wrapper).toMatchSnapshot();
});

it('should find some books', () => {
  const wrapper = shallow(
    <SearchBooks myBooks={MY_BOOKS_MOCK} onCloseSearch={jest.fn()} onRefresh={jest.fn()} onLoading={jest.fn()} />
  );

  // mock API
  const searchMock = jest.spyOn(BooksAPI, 'search');
  searchMock.mockImplementation(() => Promise.resolve(SEARCH_BOOKS_MOCK));

  expect(wrapper.state('lastRequest')).toEqual('');
  wrapper.instance().updateQuery({ target: { value: 'web' } });
  expect(wrapper.state('lastRequest')).not.toEqual('');

  // restore original implementation
  searchMock.mockRestore();
});

it('should refresh book data', () => {
  const onRefresh = jest.fn();
  const wrapper = shallow(
    <SearchBooks myBooks={MY_BOOKS_MOCK} onCloseSearch={jest.fn()} onRefresh={onRefresh} onLoading={jest.fn()} />
  );
  wrapper.instance().setState({ books: SEARCH_BOOKS_MOCK });

  // mock API
  const getMock = jest.spyOn(BooksAPI, 'get');
  getMock.mockImplementation(() => Promise.resolve(BOOK_MOCK));

  wrapper.instance().refreshBook('aaHXYmZLYNQC');
  expect(getMock).toHaveBeenCalled();
  // TODO: tem alguma forma fazer mock de um Promise e executar a arrow function 'resolve' original?

  // restore original implementation
  getMock.mockRestore();
});

it('should not find any book with informed query', () => {
  const wrapper = shallow(
    <SearchBooks myBooks={MY_BOOKS_MOCK} onCloseSearch={jest.fn()} onRefresh={jest.fn()} onLoading={jest.fn()} />
  );

  // mock API
  const searchMock = jest.spyOn(BooksAPI, 'search');
  searchMock.mockImplementation(() => Promise.resolve([]));

  wrapper.instance().updateQuery({ target: { value: 'aaaaaaa' } });
  expect(searchMock).toHaveBeenCalled();

  // restore original implementation
  searchMock.mockRestore();
});

it('should not find any book with empty query', () => {
  const wrapper = shallow(
    <SearchBooks myBooks={MY_BOOKS_MOCK} onCloseSearch={jest.fn()} onRefresh={jest.fn()} onLoading={jest.fn()} />
  );

  // mock API
  const searchMock = jest.spyOn(BooksAPI, 'search');
  searchMock.mockImplementation(() => Promise.resolve([]));

  wrapper.instance().updateQuery({ target: { value: '' } });
  expect(searchMock).not.toHaveBeenCalled();

  // restore original implementation
  searchMock.mockRestore();
});
