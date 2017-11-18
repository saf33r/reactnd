import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

function Categories({ categories, children }) {
  return (
    <div className="container">
      <div className="column">
        <div className="field is-grouped">
          {children}
          {categories.map(({ path, name }) => (
            <p className="control" key={path}>
              <NavLink
                exact
                to={`/category/${path}`}
                className='button is-outlined'
                activeClassName='is-primary'>{name}</NavLink>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.array
}

Categories.defaultProps = {
  categories: []
}

export default Categories