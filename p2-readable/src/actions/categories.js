import * as Api from '../api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const requestCategories = () => ({
  type: REQUEST_CATEGORIES
})

export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const recieveCategories = (categories) => ({
  type: RECIEVE_CATEGORIES,
  categories
})

export const RECIEVE_CATEGORIES_ERROR = 'RECIEVE_CATEGORIES_ERROR';
export const recieveCategoriesError = (error) => ({
  type: RECIEVE_CATEGORIES_ERROR,
  error
})

export function fetchCategories() {
  return function(dispatch) {
    // update state to say we are fetching categories
    dispatch(requestCategories());

    // call the API
    return Api.getCategories()
            .then(
              (data) => dispatch(recieveCategories(data.categories || [])),
              (error) => dispatch(recieveCategoriesError(error))
            )
  }
}