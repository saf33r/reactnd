import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import Controls from './Controls'
import Vote from './Vote'

function Comments({ onEdit, onRemove, comments, children, upVote, downVote }) {
  return (
    <div className="columns">
      <div className="column">
        <br/>
        <h5 className="title is-5">
          Comments
          <small style={{ color: '#aaa', fontSize: '75%', marginLeft: '0.5em' }}>
            ({ comments.length || 0 })
          </small>
        </h5>
        {children}
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} onRemove={onRemove}>
            <div className="is-pulled-left">
              <Controls
                onEdit={e => onEdit(comment)}
                onRemove={e => ( window.confirm('Are you sure') ? onRemove(comment.id) : () => {} )}
              />
            </div>
            <div className="is-pulled-right">
            <Vote
                score={comment.voteScore}
                onUpVote={() => upVote(comment.id)}
                onDownVote={() => downVote(comment.id)} />
            </div>
          </Comment>
        ))}
      </div>
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
}

Comments.defaultProps = {
  comments: [],
  onRemove: () => {},
  onEdit: () => {},
  upVote: () => {},
  downVote: () => {}
}

export default Comments