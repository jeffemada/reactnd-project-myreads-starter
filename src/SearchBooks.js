import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = { books: [] };

  /**
   * Atualiza as prateleiras dos livros que já estão na minha estante.
   * @param {Array} books - lista de livros retornados na pesquisa
   */
  updateBookshelfOfMyBooks = (books) => {
    const { myBooks } = this.props;

    if (myBooks && myBooks.length > 0) {
      myBooks.forEach((myBook) => {
        const book = books.find((book) => book.id === myBook.id);

        // se encontrou livro, atualiza a prateleira
        if (book) {
          book.shelf = myBook.shelf;
        }
      });
    }
  };

  /**
   * Ouvinte do evento de mudança no campo de pesquisa.
   * @param {Event} event - evento
   */
  searchBooks = (event) => {
    const query = event.target.value;

    if (query) {
      BooksAPI.search(query).then((books) => {
        if (Array.isArray(books) && books.length > 0) {
          this.updateBookshelfOfMyBooks(books);
          this.setState(() => ({ books: books }));
        }
      });
    } else if (this.state.books.length > 0) {
      // TODO bug ao remover query rapidamente, não limpa
      this.setState(() => ({ books: [] }));
    }
  };

  /*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
  */

  render() {
    const { books } = this.state;
    const { onCloseSearch, onRefresh } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={onCloseSearch}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <form>
              <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={books} onRefresh={onRefresh} />
        </div>
      </div>
    );
  }
}

SearchBooks.proptypes = {
  onCloseSearch: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default SearchBooks;
