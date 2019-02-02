import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';

function Bookshelf(props) {
  const { shelf, books, onRefresh } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ListBooks books={books} onRefresh={onRefresh} />
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
