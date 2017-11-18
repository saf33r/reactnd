import {
  NEW_POST_ERROR,
  UPDATE_POST_ERROR,
  SORT_COMMENTS,
  SORT_POSTS,
  RECIEVE_POST_ERROR,
  DELETE_POST_SUCCESS,
  UPDATE_POST_VALUE,
  UPDATE_COMMENT_VALUE,
  COMMENT_FORM_RESET,
  NEW_COMMENT_ERROR,
  UPDATE_COMMENT_ERROR,
  NEW_COMMENT,
  NEW_POST_SUCCESS,
  NEW_POST_FORM,
  COMMENT_NEW_FORM,
  POST_EDIT_FORM,
  COMMENT_EDIT_FORM,
  UPDATE_POST,
  UPDATE_COMMENT,
  CLOSE_MODAL,
} from '../actions'

const blankCommentForm = {
  author: '',
  body: '',
}

const blankPostForm = {
  title: '',
  body: '',
  author: '',
  category: '',
}

const initialMiscellaneousState = {
  postsOrder: 'voteScore',
  commentsOrder: 'voteScore',
  postNotFound: false,
  commentForm: { ...blankCommentForm },
  commentFormError: '',
  postForm: { ...blankPostForm },
  postFormError: '',
  modalComment: false,
  modalPost: false,
}

export default function miscellaneous(state = initialMiscellaneousState, action) {
  switch(action.type) {
    case NEW_POST_ERROR:
    case UPDATE_POST_ERROR:
      state = { ...state, postFormError: action.error }
      return state
    case SORT_COMMENTS:
      state = { ...state, commentsOrder: action.key }
      return state
    case SORT_POSTS:
      state = { ...state, postsOrder: action.key }
      return state
    case RECIEVE_POST_ERROR:
    case DELETE_POST_SUCCESS:
      state = { ...state, postNotFound: action.id }
      return state
    case UPDATE_POST_VALUE:
      state = { ...state, postForm: { ...state.postForm, [action.key]: action.value } }
      return state
    case UPDATE_COMMENT_VALUE:
      state = { ...state, commentForm: { ...state.commentForm, [action.key]: action.value } }
      return state
    case COMMENT_FORM_RESET:
      state = { ...state, commentForm: { ...blankCommentForm }, commentFormError: '' }
      return state
    case NEW_COMMENT_ERROR:
    case UPDATE_COMMENT_ERROR:
        state = { ...state, commentFormError: action.error }
        return state
    case NEW_COMMENT:
      state = {
        ...state,
        commentForm: { ...blankCommentForm },
        commentFormError: '',
        modalComment: false
      }
      return state
    case NEW_POST_SUCCESS:
      state = {
        ...state,
        postForm: { ...blankPostForm },
        postFormError: '',
        modalPost: false,
      }
      return state
    case NEW_POST_FORM:
      state = {
        ...state,
        postForm: { ...blankPostForm },
        postFormError: '',
        modalPost: action.postId,
      }
      return state
    case COMMENT_NEW_FORM:
      state = {
        ...state,
        commentForm: { ...blankCommentForm },
        commentFormError: '',
        modalComment: action.commentId
      }
      return state
    case POST_EDIT_FORM:
      state = {
        ...state,
        postForm: { ...blankPostForm, ...action.post },
        postFormError: '',
        modalPost: action.post.id
      }
      return state
    case COMMENT_EDIT_FORM:
      state = {
        ...state,
        commentForm: { ...blankCommentForm, ...action.comment },
        commentFormError: '',
        modalComment: action.comment.id
      }
      return state
    case UPDATE_POST:
    case UPDATE_COMMENT:
    case CLOSE_MODAL:
      state = {
        ...state,
        modalComment: false,
        modalPost: false,
      }
      return state
    default:
      return state
  }
}