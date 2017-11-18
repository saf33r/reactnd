import React from 'react'
import PropTypes from 'prop-types'

export function SectionWrapper({ children }) {
  return (
    <section>
      {children}
    </section>
  )
}

export function ContainerWrapper({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  )
}

export function ColumnsWrapper({ children }) {
  return (
    <div className="columns">
      {children}
    </div>
  )
}

export function LayoutWrapper({ br, section, container, columns, children }) {
  // what we'll send back
  let response = children

  // wrap in columns
  if (columns) {
    response = ColumnsWrapper({ children: response })
  }

    // wrap in container
  if (container) {
    response = ContainerWrapper({ children: response })
  }

  // wrap in section
  if (section) {
    response = SectionWrapper({ children: response })
  }

  return response
}

LayoutWrapper.propTypes = {
  section: PropTypes.bool,
  container: PropTypes.bool,
  columns: PropTypes.bool,
}

LayoutWrapper.defaultProps = {
  section: false,
  container: false,
  columns: false
}

export default LayoutWrapper