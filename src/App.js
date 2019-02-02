import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  /**
   * Método do ciclo de vida do React invocado logo após o componente ser montado.
   */
  componentDidMount() {
    this.getAllMyBooks();
  }

  /**
   * Retorna todos os meus livros.
   */
  getAllMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  };

  search = (query) => {
    BooksAPI.search(query).then((books) => {
      console.log('Search books', books);
    });
  };

  openSearch = () => {
    this.setState({ showSearchPage: true });
  };

  closeSearch = () => {
    this.setState({ showSearchPage: false });
  };

  /*
  TODO: tratamento de erros https://reactjs.org/docs/error-boundaries.html
  */

  render() {
    const { books } = this.state;
    console.log('App render');

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
