import React from "react";
import PropTypes from "prop-types";
import ListBooks from "./ListBooks";

function Bookshelf(props) {
  const { title, books, onUpdateShelf } = props;

  return (
    <div>
      <h1>Bookshelf</h1>
      <ListBooks books={books} onUpdateShelf={onUpdateShelf} />
    </div>
  );
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
};

export default Bookshelf;
