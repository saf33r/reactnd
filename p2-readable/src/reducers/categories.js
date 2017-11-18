import {
  RECIEVE_CATEGORIES,
} from '../actions'

export default function categories(state = [], action) {
  switch(action.type) {
    case RECIEVE_CATEGORIES:
      state = action.categories || []
      return state
    default:
      return state
  }
}