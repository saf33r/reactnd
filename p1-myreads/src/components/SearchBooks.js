import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

function SearchBooks({ books, query, onSearch, onShelfChange }) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={e => onSearch(e.target.value)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book
                book={book} 
                onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

SearchBooks.propTypes = {
  books: PropTypes.array,
  query: PropTypes.string,
  onSearch: PropTypes.func,
  onShelfChange: PropTypes.func
}

SearchBooks.defaultProps = {
  books: [],
  query: '',
  onSearch: () => {}
}

export default SearchBooks