import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/dedupe'

function Sort({ active, options, sortBy, hidden }) {
  return ((!hidden && options && options.length) ? (
    <div className="field is-grouped">
      <p className="control">Sort by:</p>
      {options.map((option, id) => (
        <p className="control" key={option.id} onClick={() => sortBy(option.id)}>
          <button className={classNames({
            'button': true,
            'is-small': true,
            'is-outlined': true,
            'is-primary': (active === option.id),
          })}>{option.label}</button>
        </p>
      ))}
    </div>
  ) : null)
}

Sort.propType = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  sortBy: PropTypes.func,
  active: PropTypes.string,
  hidden: PropTypes.bool,
}

Sort.defaultProps = {
  options: [],
  sortBy: () => {},
  active: '',
  hidden: false,
}

export default Sort