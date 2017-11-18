import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchPost,
  deleteComment,
  voteComment,
  sortComments,
  votePost,
  deletePost,
  editCommentForm,
  commentNewForm,
  editPostForm,
} from '../actions'
import Loading from 'react-loading'
import Post from './Post'
import Sort from './Sort'
import Comments from './Comments'
import LayoutWrapper from './LayoutWrapper'
import CommentEditorContainer from './CommentEditorContainer'

class PostDetailContainer extends Component {
  componentWillMount() {
    const { id, fetchPost, post } = this.props
    if (!post) {
      fetchPost(id)
    }
  }

  render() {
    const {
      id,
      miscellaneous,
      comments,
      post,
      editCommentForm,
      editPostForm,
      removeComment,
      upVoteComment,
      downVoteComment,
      upVotePost,
      downVotePost,
      removePost,
      commentNewForm,
    } = this.props

    return (
      <div>
        {(miscellaneous && miscellaneous.postNotFound === id && (
          <Redirect to="/404" />
        ))}
        {post ? (
          <Post
            post={post}
            commentsCount={comments.length}
            onUpVote={upVotePost}
            onDownVote={downVotePost}
            onEditPost={editPostForm}
            onDeletePost={removePost}
          >
            <LayoutWrapper section={true} container={true}>
                <Comments
                  comments={comments}
                  onEdit={editCommentForm}
                  onRemove={removeComment}
                  upVote={upVoteComment}
                  downVote={downVoteComment}
                >
                  <div className="columns">
                    <div className="column is-10">
                      <Sort
                        options={[
                          { id: 'timestamp', label: 'Date' },
                          { id: 'voteScore', label: 'Votes' }
                        ]}
                        active={this.props.miscellaneous.commentsOrder}
                        sortBy={(key) => this.props.sortComments(post.id, key)}
                        hidden={!comments || !comments.length}
                      />
                    </div>
                    <div className="column is-2">
                      <button className="button is-small is-pulled-right" onClick={commentNewForm}>New Comment</button>
                    </div>
                  </div>
                </Comments>
                <CommentEditorContainer postId={post.id} />
            </LayoutWrapper>
          </Post>
        ) : (
          <Loading delay={200} type='bubbles' color='#00d1b2' className='loading' />
        )}
      </div>
    )
  }
}

function mapStateToProps ({ categories, comment, comments, posts, miscellaneous }, { match }) {
  const { id } = match.params
  return {
    id,
    categories,
    comments: comments[id] || [],
    post: posts.filter(post => (post.id === id))[0],
    miscellaneous,
  }
}

function mapDispatchToProps (dispatch, { match }) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    editPostForm: (post) => dispatch(editPostForm(post)),
    editCommentForm: (comment) => dispatch(editCommentForm(comment)),
    removeComment: (commentId) => dispatch(deleteComment(commentId)),
    upVoteComment: (commentId) => dispatch(voteComment(commentId, 'upVote')),
    downVoteComment: (commentId) => dispatch(voteComment(commentId, 'downVote')),
    sortComments: (postId, key) => dispatch(sortComments(postId, key)),
    upVotePost: (postId) => dispatch(votePost(postId, 'upVote')),
    downVotePost: (postId) => dispatch(votePost(postId, 'downVote')),
    removePost: (postId) => dispatch(deletePost(postId)),
    commentNewForm: () => dispatch(commentNewForm()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer)