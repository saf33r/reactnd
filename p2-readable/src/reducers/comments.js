import {
  NEW_COMMENT,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT,
  VOTE_COMMENT_SUCCESS,
  RECIEVE_COMMENTS,
  SORT_COMMENTS,
} from '../actions'

export default function comments(state = {}, action) {
  switch(action.type) {
    case NEW_COMMENT:
      state = {
        ...state,
        [action.comment.parentId]: [...state[action.comment.parentId], action.comment]
      }
      return state
    case DELETE_COMMENT_SUCCESS:
      state = {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].filter(
          comment => comment.id !== action.comment.id
        )
      }
      return state
    case UPDATE_COMMENT:
    case VOTE_COMMENT_SUCCESS:
      state = {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].map(comment => {
          if (comment.id === action.comment.id) {
            return action.comment
          } else {
            return comment
          }
        })
      }
      return state
    case RECIEVE_COMMENTS:
      state = {
        ...state,
        [action.id]: [...action.comments]
      }
      return state
    case SORT_COMMENTS:
      state = {
        ...state,
        [action.postId]: [...state[action.postId].sort((a, b) => b[action.key] - a[action.key])]
      }
      return state
    default:
      return state
  }
}