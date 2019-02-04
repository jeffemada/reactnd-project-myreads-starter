import PropTypes from 'prop-types';
import React from 'react';
import BooksGrid from './BooksGrid';

/**
 * @description Representa uma prateleira.
 * @constructor
 * @param {Object} props
 */
function Bookshelf(props) {
  const { shelf, books, onRefresh } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books} onRefresh={onRefresh} />
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default Bookshelf;
