import * as uuidv4 from 'uuid/v4'
import * as Api from '../api'
import { fetchPostComments } from './comments'

export const NEW_POST_FORM = 'NEW_POST_FORM'
export const newPostForm = () => ({
  type: NEW_POST_FORM,
  postId: 'new',
})

export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'
export const createPostSuccess = (post) => ({
  type: NEW_POST_SUCCESS,
  post
})

export const NEW_POST_ERROR = 'NEW_POST_ERROR'
export const createPostError = (error) => ({
  type: NEW_POST_ERROR,
  error
})

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const requestPosts = () => ({
  type: REQUEST_POSTS
})

export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const recievePosts = (posts) => ({
  type: RECIEVE_POSTS,
  posts
})

export const RECIEVE_POSTS_ERROR = 'RECIEVE_POSTS_ERROR';
export const recievePostsError = (error) => ({
  type: RECIEVE_POSTS_ERROR,
  error
})

export const SORT_POSTS = 'SORT_POSTS'
export const sortPosts = (key) => ({
  type: SORT_POSTS,
  key
})

export const REQUEST_POST = 'REQUEST_POST'
export const requestPost = () => ({
  type: REQUEST_POST
})

export const RECIEVE_POST = 'RECIEVE_POST'
export const recievePost = (post) => ({
  type: RECIEVE_POST,
  post
})

export const RECIEVE_POST_ERROR = 'RECIEVE_POST_ERROR';
export const recievePostError = (id, error) => ({
  type: RECIEVE_POST_ERROR,
  id,
  error
})

export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'
export const votePostSuccess = (post) => ({
  type: VOTE_POST_SUCCESS,
  post
})

export const VOTE_POST_ERROR = 'VOTE_POST_ERROR'
export const votePostError = (error) => ({
  type: VOTE_POST_ERROR,
  error
})

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const deletePostSuccess = (id) => ({
  type: DELETE_POST_SUCCESS,
  id
})

export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'
export const deletePostError = (error) => ({
  type: DELETE_POST_ERROR,
  error
})

export const UPDATE_POST = 'UPDATE_POST'
export const updatePostSuccess = (post) => ({
  type: UPDATE_POST,
  post
})

export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR'
export const updatePostError = (error) => ({
  type: UPDATE_POST_ERROR,
  error
})

export const UPDATE_POST_VALUE = 'UPDATE_POST_VALUE'
export const updatePostValue = (key, value) => ({
  type: UPDATE_POST_VALUE,
  key,
  value
})

export const POST_EDIT_FORM = 'POST_EDIT_FORM'
export const editPostForm = (post) => ({
  type: POST_EDIT_FORM,
  post
})

export function createPost({ author, title, body, category }) {
  return function(dispatch) {
    const payload = {
      id: uuidv4(),
      timestamp: Date.now(),
      author,
      title,
      body,
      category,
    }
  
    // ensure each item has a value before submitting
    let isValid = (
      title.trim().length &&
      body.trim().length &&
      author.trim().length &&
      category.trim().length
    )

    if (!isValid) {
      dispatch(createPostError('All fields are required, please check and try again.'))
    } else {
      return Api.postPost(payload)
        .then(
          (post) => dispatch(createPostSuccess(post)),
          (error) => dispatch(createPostError(error))
        )
    }
  }
}

export function putPost({ id, title, body, category }) {
  return function(dispatch) {
    const payload = {
      title,
      body,
      category,
    }
  
    // ensure each item has a value before submitting
    let isValid = (
      title.trim().length &&
      body.trim().length &&
      category.trim().length
    )

    if (!isValid) {
      dispatch(updatePostError('All fields are required, please check and try again.'))
    } else {
      return Api.putPost(id, payload)
                .then(
                  (post) => dispatch(updatePostSuccess(post)),
                  (error) => dispatch(updatePostError(error))
                )
    }
  }
}

export function fetchPosts() {
  return function(dispatch, getState) {
    // update state to say we are fetching posts
    dispatch(requestPosts());

    // call the API
    return Api.getPosts()
            .then(
              (posts) => {
                posts.map(post => dispatch(fetchPostComments(post.id)))
                dispatch(recievePosts(posts))
              },
              (error) => dispatch(recievePostsError(error))
            )
            .then(
              (posts) => {
                dispatch(sortPosts(getState().miscellaneous.postsOrder))
                return posts
              }
            )
  }
}

export function fetchPostByCategories(category) {
  return function(dispatch, getState) {
    // update state to say we are fetching posts
    dispatch(requestPosts());

    // call the API
    return Api.getCategoryPosts(category)
            .then(
              (posts) => {
                posts.map(post => dispatch(fetchPostComments(post.id)))
                dispatch(recievePosts(posts))
              },
              (error) => dispatch(recievePostsError(error))
            )
            .then(
              (posts) => {
                dispatch(sortPosts(getState().miscellaneous.postsOrder))
                return posts
              }
            )
  }
}

export function fetchPost(id) {
  return function(dispatch) {
    // update state to say we are fetching a post
    dispatch(requestPost());

    // call the API
    return Api.getPost(id)
            .then(
              (post) => {
                dispatch(fetchPostComments(post.id))
                dispatch(recievePost(post))
              },
              (error) => dispatch(recievePostError(id, error))
            )
  }
}

export function deletePost(id) {
  return function(dispatch) {
    return Api.deletePost(id)
              .then(
                () => dispatch(deletePostSuccess(id)),
                (error) => dispatch(deletePostError(error))
              )
  }
}

export function votePost(id, direction) {
  return function(dispatch, getState) {
    return Api.postVote(id, direction)
      .then(
        (post) => {
          dispatch(votePostSuccess(post))
          return post
        },
        (error) => dispatch(votePostError(error))
      )
      .then(
        (post) => {
          dispatch(sortPosts(getState().miscellaneous.postsOrder))
          return post
        }
      )
  }
}