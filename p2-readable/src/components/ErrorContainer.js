import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LayoutWrapper from './LayoutWrapper'

function ErrorContainer({ error }) {
  return (
    <section className="hero is-danger is-bold">
      <div className="hero-body">
        <LayoutWrapper container={true} columns={true}>
          <div className="column is-10">
            <h1 className="title">{ error }</h1>
            <h2 className="subtitle">
              <br/>
              <Link to='/'>Return to the Homepage</Link>
            </h2>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  )
}

function mapStateToProps ({ miscellaneous }, { match }) {
  let errors = {
    '/404': '404 - Page Not Found',
    '/500': '500 - Internal Server Error',
  }

  return {
    error: (errors[match.path] || 'Internal Server Error')
  }
}

export default connect(
  mapStateToProps
)(ErrorContainer)