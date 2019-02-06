import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';

/**
 * @description Representa a pesquisa de livros.
 * @constructor
 */
class SearchBooks extends Component {
  static proptypes = {
    onCloseSearch: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

  state = { books: [], lastRequest: '', loading: false };

  /**
   * @description Reconsulta o livro.
   * @param {Object} bookId - identificador livro
   */
  refreshBook = (bookId) => {
    const { onRefresh } = this.props;

    BooksAPI.get(bookId).then((book) => {
      this.setState((currentState) => {
        currentState.books.find((b) => b.id === bookId).shelf = book.shelf;
        return { book: currentState.books };
      });
    });
    // callback para reconsultar os livros da estante
    onRefresh();
  };

  /**
   * @description Atualiza as prateleiras dos livros que já estão na minha estante.
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
   * @description Ouvinte do evento de mudança no campo de pesquisa.
   * @param {Event} event - evento
   */
  updateQuery = (event) => {
    const query = event.target.value;
    const requestId = Math.random()
      .toString(36)
      .substr(-8);
    this.setState(() => ({ lastRequest: requestId }));
    this.searchBooks(query, requestId);
  };

  /**
   * @description Limpa a lista de livros pesquisados.
   */
  clearBooks = () => {
    this.setState(() => ({ books: [] }));
  };

  /**
   * @description Pesquisa os livros que atendem o filtro 'query'.
   * @param query - filtro informado. O arquivo 'SEARCH_TERMS.md' possue uma
   * lista de termos de pesquisa que podem ser usados como filtro.
   * @param requestId - identificar da requisição
   */
  searchBooks = (query, requestId) => {
    if (query) {
      this.toggleLoading();
      BooksAPI.search(query).then((books) => {
        try {
          // Verifica se é a ultima requisição realizada, caso contrário descarta o retorno
          if (requestId === this.state.lastRequest) {
            if (Array.isArray(books) && books.length > 0) {
              this.updateBookshelfOfMyBooks(books);
              this.setState(() => ({ books: books }));
            } else {
              this.clearBooks();
            }
          }
        } finally {
          this.toggleLoading();
        }
      });
    } else {
      this.clearBooks();
    }
  };

  /**
   * @description Alterna entre exibir e não exibir o spinner de processamento.
   */
  toggleLoading = () => {
    this.setState((currentState) => ({ loading: !currentState.loading }));
  };

  render() {
    const { books, loading } = this.state;

    return (
      <div className="search-books">
        {loading && <Spinner className="spinner" name="line-spin-fade-loader" fadeIn="none" color="#60ac5d" />}
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.updateQuery} />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={books} onRefresh={this.refreshBook} />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
