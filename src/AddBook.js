import React from 'react';
import PropTypes from 'prop-types';

function AddBook(props) {
  const { onOpenSearch } = props;

  return (
    <div className="open-search">
      <button onClick={onOpenSearch}>Add a book</button>
    </div>
  );
}

AddBook.propTypes = {
  onOpenSearch: PropTypes.func.isRequired
};

export default AddBook;
