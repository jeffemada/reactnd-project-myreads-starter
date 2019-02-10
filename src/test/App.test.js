import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import * as BooksAPI from '../BooksAPI';
import { MY_BOOKS_MOCK } from './constants';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.createElement('root')
  );
});

it('should return all books that are on the bookshelf', () => {
  const wrapper = shallow(<App />);

  // mock API
  const getAllMock = jest.spyOn(BooksAPI, 'getAll');
  getAllMock.mockImplementation(() => Promise.resolve(MY_BOOKS_MOCK));

  wrapper.instance().getAllMyBooks();
  expect(getAllMock).toHaveBeenCalled();

  // restore original implementation
  getAllMock.mockRestore();
});
