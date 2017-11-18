import React from 'react'
import PropTypes from 'prop-types'

function CommentsForm({ body, author, onStore, onReset, onUpdateValue, isEditing, error }) {
  return (
    <article className="media">
      <div className="media-content">
        {(error && (
          <div className="notification is-danger">{error}</div>
        ))}
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Add a comment..."
              value={body}
              onChange={(e) => onUpdateValue('body', e.target.value)}></textarea>
          </p>
        </div>
        { isEditing ? null : (
        <div className="field">
          <p className="control">
            <input
              className="input"
              placeholder="Your name..."
              value={author}
              onChange={(e) => onUpdateValue('author', e.target.value)} />
          </p>
        </div>
        ) }
        <div className="field is-grouped">
          <p className="control">
            <button className="button" onClick={onStore}>Submit</button>
          </p>
          <p className="control">
            <button className="button" onClick={onReset}>Reset</button>
          </p>
        </div>
      </div>
    </article>
  )
}

CommentsForm.propTypes = {
  author: PropTypes.string,
  body: PropTypes.string,
  isEditing: PropTypes.bool,
  onUpdateValue: PropTypes.func,
  onStore: PropTypes.func,
  onReset: PropTypes.func,
  error: PropTypes.string,
}

CommentsForm.defaultProps = {
  author: '',
  body: '',
  isEditing: false,
  error: '',
  onUpdateValue: () => {},
  onStore: () => {},
  onReset: () => {}
}

export default CommentsForm