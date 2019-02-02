import PropTypes from 'prop-types';
import React from 'react';
import { SHELVES } from './constants';

function ChangeBookshelf(props) {
  const { currentShelf, onUpdateBookshelf } = props;

  /**
   * Ouvinte do evento de mudança na seleção de prateleiras.
   * @param {Event} event - evento
   */
  const change = (event) => {
    const shelfId = event.target.value;
    onUpdateBookshelf(shelfId);
  };

  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={change}>
        <option value="move" disabled>
          Move to...
        </option>
        {SHELVES.map((shelf) => (
          <option key={shelf.id} value={shelf.id}>
            {shelf.title}
          </option>
        ))}
        <option value="none">None</option>
      </select>
    </div>
  );
}

ChangeBookshelf.propTypes = {
  currentShelf: PropTypes.string.isRequired,
  onUpdateBookshelf: PropTypes.func.isRequired
};

export default ChangeBookshelf;
