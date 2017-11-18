import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, withRouter } from 'react-router-dom'
import Categories from './components/Categories'
import PostDetailContainer from './components/PostDetailContainer'
import PostsContainer from './components/PostsContainer'
import PostEditorContainer from './components/PostEditorContainer'
import ErrorContainer from './components/ErrorContainer'
import {
  fetchCategories,
  newPostForm,
} from './actions'

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories()
  }
  render() {
    return (
      <div>
        {/* Menu */}
        <Categories categories={this.props.categories}>
          <p className="control">
            <button className="button is-outlined" onClick={this.props.newPostForm}>New Post</button>
          </p>
          <p className="control">
            <NavLink exact to="/" className="button is-outlined" activeClassName="is-primary">Home</NavLink>
          </p>
        </Categories>

        {/* Routes */}
        <Route exact path="/" component={PostsContainer} />
        <Route exact path="/category/:category" component={PostsContainer} />
        <Route exact path="/post/:id" component={PostDetailContainer} />
        <Route exact path="/404" component={ErrorContainer} />

        {/* Modals */}
        <PostEditorContainer />

      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    newPostForm: () => dispatch(newPostForm()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))