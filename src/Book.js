import PropTypes from 'prop-types';
import React from 'react';
import * as BooksAPI from './BooksAPI';
import ChangeBookshelf from './ChangeBookshelf';

function Book(props) {
  const { onRefresh, book } = props;

  /**
   * Altera o livro de prateleira.
   * @param {string} shelfId - identificador da pratelira selecionada
   */
  const updateBookshelf = (shelfId) => {
    BooksAPI.update(book, shelfId).then(() => {
      onRefresh(book.id);
    });
  };

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={
              book.imageLinks && {
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }
            }
          />
          <ChangeBookshelf currentShelf={book.shelf ? book.shelf : 'none'} onUpdateBookshelf={updateBookshelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default Book;
