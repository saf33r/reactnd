import React from 'react'
import PropTypes from 'prop-types'

function Vote({ score, onDownVote, onUpVote }) {
  return(
    <div className="field is-grouped">
      <p className="control">
        {score}
      </p>
      <p className="control">
        <button className="button is-small" onClick={onDownVote}>-</button>
      </p>
      <p className="control">
        <button className="button is-small" onClick={onUpVote}>+</button>
      </p>
    </div>
  )
}

Vote.propType = {
  score: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
}

Vote.defaultProps = {
  score: 0,
  onUpVote: () => {},
  onDownVote: () => {},
}

export default Vote