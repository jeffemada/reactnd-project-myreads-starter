import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function ListBooks(props) {
  const { books, onRefresh } = props;

  return (
    <ol className="books-grid">
      {books.map((book) => (
        <Book key={book.id} book={book} onRefresh={onRefresh} />
      ))}
    </ol>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default ListBooks;
