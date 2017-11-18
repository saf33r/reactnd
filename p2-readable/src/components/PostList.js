import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import Vote from './Vote'
import Controls from './Controls'

function PostList({ comments, posts, onUpVote, onDownVote, onEditPost, onDeletePost }) {
  return (
    <div className="container">
      <div className="column">
        {posts.map((post, index) => (
          <div key={post.id}>
            <Link to={`/category/${post.category}`}><span className="tag">{post.category}</span> </Link>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <span className="is-pulled-right">
              <TimeAgo date={post.timestamp} />
            </span>
            <br/>
            by {post.author}
            <span className="is-pulled-right">
              {comments[post.id] ? (comments[post.id].length || 0) : 0} Comments
            </span>
            <div className="is-clearfix">
              <div className="is-pulled-left">
                <Controls
                  onEdit={ e => onEditPost(post) }
                  onRemove={ e => ( window.confirm('Are you sure') ? onDeletePost(post.id) : () => {} )}
                />
              </div>
              <div className="is-pulled-right">
                <Vote
                  score={post.voteScore}
                  onUpVote={() => onUpVote(post.id)}
                  onDownVote={() => onDownVote(post.id)}
                />
              </div>
            </div>
            {(posts.length - 1) !== index && (
              <hr/>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array,
  comments: PropTypes.object,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onEditPost: PropTypes.func,
  onDeletePost: PropTypes.func,
}

PostList.defaultProps = {
  posts: [],
  comments: {},
  onUpVote: () => {},
  onDownVote: () => {},
  onEditPost: () => {},
  onDeletePost: () => {},
}

export default PostList