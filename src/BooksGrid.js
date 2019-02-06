import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

/**
 * @description Representa uma lista de livros.
 * @constructor
 * @param {Object} props
 */
function BooksGrid(props) {
  const { books, onRefresh, onLoading } = props;

  return (
    <ol className="books-grid">
      {books.map((book) => (
        <Book key={book.id} book={book} onRefresh={onRefresh} onLoading={onLoading} />
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired
};

export default BooksGrid;
