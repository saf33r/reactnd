import { combineReducers } from 'redux'
import miscellaneous from './miscellaneous'
import categories from './categories'
import posts from './posts'
import comments from './comments'

export default combineReducers({
  categories,
  comments,
  posts,
  miscellaneous,
})