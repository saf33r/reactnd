import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import Sort from './Sort'
import {
  fetchPostByCategories,
  sortPosts,
  fetchPosts,
  votePost,
  editPostForm,
  deletePost,
} from '../actions'

class PostsContainer extends Component {
  componentWillMount() {
    const { fetchPostByCategories, fetchPosts, category } = this.props
    if (category) {
      fetchPostByCategories(category)
    } else {
      fetchPosts()
    }
  }
  componentWillReceiveProps(nextProps) {
    const { fetchPostByCategories, category } = this.props
    if (category && (nextProps.category !== category)) {
      fetchPostByCategories(nextProps.category)
    }
  }
  render() {
    // filte down to the category when we have it
    const category = this.props.category
    let posts = (this.props.posts || []).filter((post) => {
      return category ? post.category === category : true
    })

    return (posts ? (
      <div>
        <div className="container">
          <div className="column">
            <Sort
              options={[
                { id: 'timestamp', label: 'Date' },
                { id: 'voteScore', label: 'Votes' }
              ]}
              active={this.props.miscellaneous.postsOrder}
              sortBy={this.props.sortPosts}
            />
          </div>
        </div>
        <PostList
          posts={posts}
          comments={this.props.comments}
          onEditPost={this.props.editPostForm}
          onDeletePost={this.props.removePost}
          onUpVote={this.props.upVotePost}
          onDownVote={this.props.downVotePost} />
      </div>
    ) : (
      <div className="container">
        <div className="column">
          This category has no Posts
        </div>
      </div>
    ))
  }
}

function mapStateToProps({ comments, posts, miscellaneous }, { match }) {
  const { category } = match.params
  return {
    category,
    comments,
    posts,
    miscellaneous,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPostByCategories: (category) => dispatch(fetchPostByCategories(category)),
    sortPosts: (key) => dispatch(sortPosts(key)),
    upVotePost: (postId) => dispatch(votePost(postId, 'upVote')),
    downVotePost: (postId) => dispatch(votePost(postId, 'downVote')),
    editPostForm: (post) => dispatch(editPostForm(post)),
    removePost: (postId) => dispatch(deletePost(postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsContainer)