import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import PostsForm from './PostsForm'
import {
  createPost,
  closeModal,
  newPostForm,
  updatePostValue,
  putPost,
} from '../actions'

class PostEditorContainer extends Component {

  constructor(props) {
    super(props)

    this.formPostStructure.bind(this)
  }

  formPostStructure() {
    const {
      createPost,
      updatePost,
      updatePostValue,
      miscellaneous,
      categories,
    } = this.props

    const {
      postForm,
      modalPost,
      postFormError,
    } = miscellaneous;

    return {
      ...postForm,
      error: postFormError,
      categories,
      onStore: () => {
        if (postForm && postForm.id) {
          updatePost(postForm)
        } else {
          createPost(postForm)
        }
      },
      onUpdateValue: updatePostValue,
      isEditing: (modalPost !== 'new')
    }
  }

  render() {
    const {
      closeModal,
      miscellaneous,
    } = this.props

    const {
      modalPost,
    } = miscellaneous

    return (
      ((modalPost) ? (
        <Modal isActive={true} onClose={closeModal}>
          <PostsForm {...this.formPostStructure()} />
        </Modal>
      ) : null)
    )
  }

}

function mapStateToProps ({ categories, miscellaneous }) {
  return {
    categories,
    miscellaneous
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newPostForm: () => dispatch(newPostForm()),
    closeModal: () => dispatch(closeModal()),
    updatePostValue: (key, value) => dispatch(updatePostValue(key, value)),
    createPost: (post) => dispatch(createPost(post)),
    updatePost: (post) => dispatch(putPost(post)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEditorContainer))