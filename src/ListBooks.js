import React from "react";
import PropTypes from "prop-types";

function ListBooks(props) {
  const { books, onUpdateShelf } = props;

  return (
    <div>
      <h2>ListBooks</h2>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
};

export default ListBooks;
