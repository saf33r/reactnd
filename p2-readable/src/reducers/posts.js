import {
  DELETE_POST_SUCCESS,
  NEW_POST_SUCCESS,
  RECIEVE_POST,
  RECIEVE_POSTS,
  SORT_POSTS,
  UPDATE_POST,
  VOTE_POST_SUCCESS,
} from '../actions'

export default function posts(state = [], action) {
  switch(action.type) {
    case DELETE_POST_SUCCESS:
      state = state.filter(post => (post.id !== action.id))
      return state
    case NEW_POST_SUCCESS:
    case RECIEVE_POST:
      state = [...state, action.post]
      return state
    case RECIEVE_POSTS:
      state = action.posts
      return state
    case SORT_POSTS:
      state = [...state.sort((a, b) => b[action.key] - a[action.key])]
      return state
    case UPDATE_POST:
    case VOTE_POST_SUCCESS:
      state = state.map((post) => {
        return (post.id === action.post.id) ? action.post : post
      })
      return state
    default:
      return state
  }
}