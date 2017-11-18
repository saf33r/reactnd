// https://github.com/udacity/reactnd-project-readable-starter

const api = "http://localhost:5001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const headersContentType = {
  ...headers,
  'Content-Type': 'application/json'
}

const toJson = (res) => res.json()

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(toJson)

export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(toJson)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(toJson)
    .then(posts => posts.filter(post => !post.deleted))

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(toJson)
    .then((res) => {
      if (!res || !res.id) {
        throw Error('Post not found')
      }
      return res
    })

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: headersContentType
  })

export const postPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify(post)
  }).then(toJson)

export const postVote = (id, direction = 'upVote') =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify({
      option: direction
    })
  }).then(toJson)

export const getPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(toJson)

export const postComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify(comment)
  }).then(toJson)

export const putPost = (id, post) => 
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: headersContentType,
    body: JSON.stringify(post)
  }).then(toJson)

export const putComment = (id, comment) => 
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: headersContentType,
    body: JSON.stringify(comment)
  }).then(toJson)

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: headersContentType
  }).then(toJson)

export const commentVote = (id, direction = 'upVote') =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify({
      option: direction
    })
  }).then(toJson)