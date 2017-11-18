import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import CommentsForm from './CommentsForm'
import {
  closeModal,
  postComment,
  putComment,
  updateCommentValue,
  resetCommentForm,
} from '../actions'

class CommentEditorContainer extends Component {

  constructor(props) {
    super(props)

    this.formCommentStructure.bind(this)
  }

  formCommentStructure(postId) {
    const {
      storeComment,
      updateComment,
      resetCommentForm,
      updateCommentValue,
      miscellaneous,
    } = this.props

    const {
      commentForm,
      modalComment,
      commentFormError,
    } = miscellaneous

    return {
      ...commentForm,
      error: commentFormError,
      onStore: () => {
        if (commentForm && commentForm.id) {
          updateComment(commentForm)
        } else {
          storeComment({ ...commentForm, parentId: postId })
        }
      },
      onReset: resetCommentForm,
      onUpdateValue: updateCommentValue,
      isEditing: (modalComment !== 'new')
    }
  }

  render() {

    const {
      closeModal,
      miscellaneous,
      postId,
    } = this.props

    return (
      (miscellaneous.modalComment) ? (
        <Modal isActive={true} onClose={closeModal}>
          <CommentsForm {...this.formCommentStructure(postId)} />
        </Modal>
      ) : null
    )

  }

}

function mapStateToProps ({ miscellaneous }, { match }) {
  const { id } = match.params
  return {
    postId: id,
    miscellaneous,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => dispatch(closeModal()),
    storeComment: (comment) => dispatch(postComment(comment)),
    updateComment: (comment) => dispatch(putComment(comment)),
    updateCommentValue: (key, value) => dispatch(updateCommentValue(key, value)),
    resetCommentForm: () => dispatch(resetCommentForm()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentEditorContainer))