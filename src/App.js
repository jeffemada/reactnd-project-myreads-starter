import React from 'react';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import { SHELVES } from './constants';
import './App.css';

class BooksApp extends React.Component {
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

  render() {
    const { books } = this.state;
    console.log('App render');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
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
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
