import PropTypes from 'prop-types';
import React from 'react';
import AddBook from './AddBook';
import Bookshelf from './Bookshelf';
import { SHELVES } from './constants';

/**
 * @description Representa a listagem dos livros por prateleiras.
 * @constructor
 * @param {Object} props
 */
function ListBooks(props) {
  const { books, onRefresh, onLoading } = props;

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
            onLoading={onLoading}
          />
        ))}
      </div>
      <AddBook />
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired
};

export default ListBooks;
