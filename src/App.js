import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Spinner from 'react-spinkit';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

/**
 * @description Representa a aplicação.
 * @constructor
 * @param {Object} props
 */
class BooksApp extends Component {
  state = { books: [], loading: false };

  /**
   * @description Método do ciclo de vida do React invocado logo após o componente ser montado.
   */
  componentDidMount() {
    this.toggleLoading();
    this.getAllMyBooks();
  }

  /**
   * @description Retorna todos os livros que estão na estante.
   */
  getAllMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      try {
        this.setState(() => ({ books: books }));
      } finally {
        this.toggleLoading();
      }
    });
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
      <div className="app">
        {loading && <Spinner className="spinner" name="line-spin-fade-loader" fadeIn="none" color="#60ac5d" />}
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              myBooks={books}
              onCloseSearch={this.closeSearch}
              onRefresh={this.getAllMyBooks}
              onLoading={this.toggleLoading}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <ListBooks books={books} onRefresh={this.getAllMyBooks} onLoading={this.toggleLoading} />}
        />
      </div>
    );
  }
}

export default BooksApp;
