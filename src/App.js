import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import AddBook from './AddBook';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { SHELVES } from './constants';
import './App.css';

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
        {this.state.showSearchPage ? (
          <SearchBooks myBooks={books} onCloseSearch={this.closeSearch} onRefresh={this.getAllMyBooks} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {SHELVES.map((shelf) => (
                <Bookshelf
                  key={shelf.id}
                  shelf={shelf}
                  books={books.filter((book) => book.shelf === shelf.id)}
                  onRefresh={this.getAllMyBooks}
                />
              ))}
            </div>
            <AddBook onOpenSearch={this.openSearch} />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
