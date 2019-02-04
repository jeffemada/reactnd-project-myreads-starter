import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
  state = {
    books: []
  };

  /**
   * @description Método do ciclo de vida do React invocado logo após o componente ser montado.
   */
  componentDidMount() {
    this.getAllMyBooks();
  }

  /**
   * @description Retorna todos os livros que estão na estante.
   */
  getAllMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  };

  /*
  TODO: tratamento de erros https://reactjs.org/docs/error-boundaries.html
  */

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => <SearchBooks myBooks={books} onCloseSearch={this.closeSearch} onRefresh={this.getAllMyBooks} />}
        />
        <Route exact path="/" render={() => <ListBooks books={books} onRefresh={this.getAllMyBooks} />} />
      </div>
    );
  }
}

export default BooksApp;
