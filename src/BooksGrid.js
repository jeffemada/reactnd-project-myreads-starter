import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

function BooksGrid(props) {
  const { books, onRefresh } = props;

  return (
    <ol className="books-grid">
      {books.map((book) => (
        <Book key={book.id} book={book} onRefresh={onRefresh} />
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default BooksGrid;
