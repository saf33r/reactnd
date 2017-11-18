import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/dedupe'

function Modal({ isActive, onClose, children }) {
  return (
    <div className={classNames({ 'modal': true, 'is-active': isActive })}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">{children}</div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  )
}

Modal.propTypes = {
  isActive: PropTypes.bool,
  onClose: PropTypes.func
}

Modal.defaultProps = {
  isActive: false,
  onClick: () => {},
}

export default Modal