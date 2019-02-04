import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description Representa a adição de livros.
 * @constructor
 * @param {Object} props
 */
function AddBook(props) {
  return (
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  );
}

export default AddBook;
