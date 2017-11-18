import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostsForm extends Component {

  constructor(props) {
    super(props)

    this.handleBlankCategory.bind(this)
  }

  componentWillMount() {
    this.handleBlankCategory()
  }

  handleBlankCategory() {
    // new posts + no category = first category
    const {
      isEditing,
      category,
      categories,
      onUpdateValue,
    } = this.props

    if (!isEditing && !category && categories[0] && categories[0].path) {
      onUpdateValue('category', categories[0].path);
    }
  }

  render() {

    const {
      title,
      body,
      author,
      category,
      onUpdateValue,
      isEditing,
      onStore,
      categories,
      error,
    } = this.props

    return (
      <article className="media">
        <div className="media-content">
          {(error && (
            <div className="notification is-danger">{error}</div>
          ))}
          <div className="field">
            <p className="control">
              <input
                className="input"
                placeholder="Title..."
                value={title}
                onChange={(e) => onUpdateValue('title', e.target.value)} />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Body..."
                value={body}
                onChange={(e) => onUpdateValue('body', e.target.value)}></textarea>
            </p>
          </div>
          { isEditing ? null : (
          <div className="field">
            <p className="control">
              <input
                className="input"
                placeholder="Your name..."
                value={author}
                onChange={(e) => onUpdateValue('author', e.target.value)} />
            </p>
          </div>
          ) }
          <div className="field">
            <div className="select">
              <select value={category} onChange={(e) => onUpdateValue('category', e.target.value)}>
                {categories.map(item => (
                  <option key={item.path} value={item.path}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field is-grouped">
            <p className="control">
              <button className="button" onClick={onStore}>Submit</button>
            </p>
          </div>
        </div>
      </article>
    )

  }
}

PostsForm.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  isEditing: PropTypes.bool,
  onUpdateValue: PropTypes.func,
  onStore: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  error: PropTypes.string,
}

PostsForm.defaultProps = {
  title: '',
  body: '',
  author: '',
  category: '',
  isEditing: false,
  onUpdateValue: () => {},
  onStore: () => {},
  categories: [],
  error: '',
}

export default PostsForm