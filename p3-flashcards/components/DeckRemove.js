import React, { Component } from 'react'
import { Alert, TouchableOpacity, StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { removeDeck } from '../utils/asyncStore'

class DeckRemove extends Component {

  constructor(props) {
    super(props)

    this.remove = this.remove.bind(this)
  }

  remove() {
    const { title, onRemove } = this.props

    Alert.alert(`Remove '${ title }' Deck?`, null, [{
        text: 'Cancel',
        onPress: () => false,
        style: 'cancel',
      }, {
        text: 'OK',
        onPress: () => {
          removeDeck(title)

          if (onRemove && typeof onRemove === 'function') {
            onRemove(title)
          }
        },
      }]
    )
  }

  render() {
    const { styles, size } = this.props

    return (
      <TouchableOpacity style={ (styles || {}) } onPress={ this.remove }>
        <FontAwesome name='trash' size={ (size || 22) } />
      </TouchableOpacity>
    )
  }

}

export default DeckRemove