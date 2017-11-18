import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

function Comment(props) {
  const { comment, children } = props
  const { id, author, body, timestamp } = comment

  return (
    <article className="media" key={id}>
      <div className="media-content">
        <div className="content">
          <strong>{author}</strong>
          <TimeAgo date={timestamp} className="is-pulled-right" />
          <p>{body}</p>
          {children}
        </div>
      </div>
    </article>
  )
}

Comment.propType = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.string,
  })
  
}

Comment.defaultProps = {
  comment: {}
}

export default Comment