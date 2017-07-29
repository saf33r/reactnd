import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import debounce from 'lodash.debounce'
import uniqby from 'lodash.uniqby'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends Component {

  searchDebounce = 250 // in ms

  state = {
    books: [],
    query: '',
    search: []
  }

  constructor(props) {
    super(props)

    this.fetchBooks = this.fetchBooks.bind(this)
    this.findBooks = debounce(this.findBooks, this.searchDebounce).bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.updateQueryState = this.updateQueryState.bind(this)
    this.updateSearchState = this.updateSearchState.bind(this)
    this.updateLocalBook = this.updateLocalBook.bind(this)
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks() {
    return BooksAPI.getAll().then(books => {
      this.setState({ books })
      return books
    })
  }

  findBooks(query, maxResults = 20) {
    if (query) {
      BooksAPI.search(query, maxResults).then(this.updateSearchState)
    } else {
      this.updateSearchState()
    }
  }

  updateBook(book, shelf) {
    BooksAPI
      .update(book, shelf)
      .then(() => this.updateLocalBook(book, shelf))
  }

  updateQueryState(query) {
    this.setState({ query })
  }

  updateSearchState(data) {
    // check for a value and whether this is a object
    if (data && typeof data === 'object' && data.books) {
      return this.updateSearchState(data.books)
    }

    // set the state
    let search = (data instanceof Array) ? uniqby(data, 'id') : []
    this.setState({ search })
  }

  updateLocalBook(book, shelf) {
    this.setState((nextState) => {
      // filter book function
      let filterBook = (b) => (b.id !== book.id)

      // book with new 'shelf' value
      let updatedBook = Object.assign({}, book, { shelf })

      // update books
      nextState.books = nextState.books
                          .filter(filterBook)
                          .concat(updatedBook)

      // update search
      if (nextState.search && nextState.search.length) {
        let bookPosition = nextState.search.indexOf(book)
        nextState.search = nextState.search.filter(filterBook)
        nextState.search.splice(bookPosition, 0, updatedBook)
      }

      // send back the state
      return nextState
    })
  }

  render() {

    const { books, query, search } = this.state

    return (
      <div className="app">

        <Route path="/search" render={() => (
          <SearchBooks 
            books={search}
            query={query}
            onSearch={(query, maxResults) => {
              this.updateQueryState(query)
              this.findBooks(query, maxResults)
            }}
            onShelfChange={this.updateBook} />
        )} />

        <Route exact path="/" render={() => (
          <ListBooks 
            title="MyReads"
            books={books}
            onShelfChange={this.updateBook} />
        )} />

      </div>
    )
  }
}

export default BooksApp
