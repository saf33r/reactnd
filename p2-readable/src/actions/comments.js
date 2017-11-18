import * as uuidv4 from 'uuid/v4'
import * as Api from '../api'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const requestComments = () => ({
  type: REQUEST_COMMENTS
})

export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const recieveComments = (id, comments) => ({
  type: RECIEVE_COMMENTS,
  id,
  comments
})

export const RECIEVE_COMMENTS_ERROR = 'RECIEVE_COMMENTS_ERROR';
export const recieveCommentsError = (error) => ({
  type: RECIEVE_COMMENTS_ERROR,
  error
})

export const SORT_COMMENTS = 'SORT_COMMENTS'
export const sortComments = (postId, key) => ({
  type: SORT_COMMENTS,
  postId,
  key
})

export const NEW_COMMENT = 'NEW_COMMENT'
export const newCommentSuccess = (comment) => ({
  type: NEW_COMMENT,
  comment
})

export const NEW_COMMENT_ERROR = 'NEW_COMMENT_ERROR'
export const newCommentError = (error) => ({
  type: NEW_COMMENT_ERROR,
  error
})

export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const updateCommentSuccess = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

export const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR'
export const updateCommentError = (error) => ({
  type: UPDATE_COMMENT_ERROR,
  error
})

export const UPDATE_COMMENT_VALUE = 'UPDATE_COMMENT_VALUE'
export const updateCommentValue = (key, value) => ({
  type: UPDATE_COMMENT_VALUE,
  key,
  value
})

export const COMMENT_FORM_RESET = 'COMMENT_FORM_RESET'
export const resetCommentForm = () => ({
  type: COMMENT_FORM_RESET
})

export const COMMENT_NEW_FORM = 'COMMENT_NEW_FORM'
export const commentNewForm = () => ({
  type: COMMENT_NEW_FORM,
  commentId: 'new'
})

export const COMMENT_EDIT_FORM = 'COMMENT_EDIT_FORM'
export const editCommentForm = (comment) => ({
  type: COMMENT_EDIT_FORM,
  comment
})

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const deleteCommentSuccess = (comment) => ({
  type: DELETE_COMMENT_SUCCESS,
  comment
})

export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR'
export const deleteCommentError = (error) => ({
  type: DELETE_COMMENT_ERROR,
  error
})

export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'
export const voteCommentSuccess = (comment) => ({
  type: VOTE_COMMENT_SUCCESS,
  comment
})

export const VOTE_COMMENT_ERROR = 'VOTE_COMMENT_ERROR'
export const voteCommentError = (error) => ({
  type: VOTE_COMMENT_ERROR,
  error
})

export function fetchPostComments(id) {
  return function(dispatch) {
    dispatch(requestComments())
    return Api.getPostComments(id)
              .then(
                (comments) => dispatch(recieveComments(id, comments)),
                (error) => dispatch(recieveCommentsError(error))
              )
  }
}

export function postComment({ author, body, parentId }) {
  return function(dispatch) {
    // create the extra data that's needed
    const payload = {
      id: uuidv4(),
      timestamp: Date.now(),
      body,
      author,
      parentId
    }

    // ensure each item has a value before submitting
    let isValid = (
      body.trim().length &&
      author.trim().length
    )

    if (!isValid) {
      dispatch(newCommentError('All fields are required, please check and try again.'))
    } else {
      // call the API
      return Api.postComment(payload)
                .then(
                  (comment) => dispatch(newCommentSuccess(comment)),
                  (error) => dispatch(newCommentError(error))
                )
    }
  }
}

export function putComment({ id, body, timestamp }) {
  return function(dispatch) {
    const payload = {
      timestamp,
      body
    }

    // ensure each item has a value before submitting
    let isValid = (
      body.trim().length
    )

    if (!isValid) {
      dispatch(updateCommentError('All fields are required, please check and try again.'))
    } else {
      return Api.putComment(id, payload)
                .then(
                  (comment) => dispatch(updateCommentSuccess(comment)),
                  (error) => dispatch(updateCommentError(error))
                )
    }
  }
}

export function deleteComment(id) {
  return function(dispatch) {
    return Api.deleteComment(id)
              .then(
                (comment) => dispatch(deleteCommentSuccess(comment)),
                (error) => dispatch(deleteCommentError(error))
              )
  }
}

export function voteComment(id, direction) {
  return function(dispatch, getState) {
    return Api.commentVote(id, direction)
      .then(
        (comment) => {
          dispatch(voteCommentSuccess(comment))
          return comment
        },
        (error) => dispatch(voteCommentError(error))
      )
      .then(
        (comment) => {
          dispatch(sortComments(comment.parentId, getState().miscellaneous.commentsOrder))
          return comment
        }
      )
  }
}