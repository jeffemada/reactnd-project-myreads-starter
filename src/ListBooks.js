import PropTypes from 'prop-types';
import React from 'react';
import AddBook from './AddBook';
import Bookshelf from './Bookshelf';
import { SHELVES } from './constants';

function ListBooks(props) {
  const { books, onRefresh } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {SHELVES.map((shelf) => (
          <Bookshelf
            key={shelf.id}
            shelf={shelf}
            books={books.filter((book) => book.shelf === shelf.id)}
            onRefresh={onRefresh}
          />
        ))}
      </div>
      <AddBook />
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default ListBooks;
