import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import LayoutWrapper from './LayoutWrapper'
import Vote from '../components/Vote'
import Controls from '../components/Controls'

function Post({ commentsCount, post, children, onUpVote, onDownVote, onEditPost, onDeletePost }) {
  return (
    <div>
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <LayoutWrapper container={true} columns={true}>
            <div className="column is-10">
              <h1 className="title">{ post.title }</h1>
              <h2 className="subtitle">by { post.author }</h2>
            </div>
            <div className="column is-2">
              <TimeAgo date={post.timestamp} className="is-pulled-right" />
              <br/>
              <div className="is-pulled-right">{ commentsCount } Comments</div>
            </div>
          </LayoutWrapper>
          <LayoutWrapper container={true} columns={true}>
            <div className="column is-12">
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
          </LayoutWrapper>
        </div>
      </section>
      <LayoutWrapper section={true} container={true}>
        <br/>
        <div className="columns">
          <div className="column">
            <Link to={`/category/${post.category}`}><span className="tag">{post.category}</span> </Link>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <p>{ post.body }</p>
          </div>
        </div>
      </LayoutWrapper>
      {children}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  commentsCount: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onEditPost: PropTypes.func,
  onDeletePost: PropTypes.func,
}

Post.defaultProps = {
  post: {},
  commentsCount: 0,
  onUpVote: () => {},
  onDownVote: () => {},
  onEditPost: () => {},
  onDeletePost: () => {},
}

export default Post