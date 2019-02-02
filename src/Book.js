import React from 'react';
import PropTypes from 'prop-types';
import ChangeBookshelf from './ChangeBookshelf';
import * as BooksAPI from './BooksAPI';

function Book(props) {
  const { onRefresh, book } = props;

  /**
   * Altera o livro de preteleira.
   * @param {string} shelfId - identificador da pratelira selecionada
   */
  const updateBookshelf = (shelfId) => {
    BooksAPI.update(book, shelfId).then(() => {
      onRefresh();
    });
  };

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}
          />
          <ChangeBookshelf currentShelf={book.shelf} onUpdateBookshelf={updateBookshelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default Book;
