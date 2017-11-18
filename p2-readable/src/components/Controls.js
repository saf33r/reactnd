import React from 'react'
import PropTypes from 'prop-types'

function Controls({ onEdit, onRemove }) {
  return (
    <div className="field is-grouped">
      <p className="control">
        <button className="button is-small" onClick={onEdit}>Edit</button>
      </p>
      <p className="control">
        <button className="button is-small" onClick={onRemove}>Remove</button>
      </p>
    </div>
  )
}

Controls.propTypes = {
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
}

Controls.defaultProps = {
  onEdit: () => {},
  onRemove: () => {}
}

export default Controls