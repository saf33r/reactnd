import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView } from 'react-native'
import { getDecks } from '../utils/asyncStore'
import * as Colors from '../utils/colors'
import DecksListItem from './DeckListItem'

class DecksList extends Component {
  state = {
    decks: {}
  }
  constructor(props) {
    super(props)

    this.goToDeck = this.goToDeck.bind(this)
    this.fetchDecks = this.fetchDecks.bind(this)
  }
  componentWillMount() {
    this.fetchDecks()
  }
  componentWillUpdate() {
    this.fetchDecks()
  }
  fetchDecks() {
    getDecks()
      .then(decks => this.setState({
        decks
      }))
  }
  goToDeck(deck) {
    this.props.navigation.navigate('DeckView', deck)
  }
  render() {
    const { decks } = this.state
    return (
      <ScrollView style={styles.container}>
        { Object.keys(decks).map((deckName) => (
          <DecksListItem key={deckName} {...decks[deckName]} clickHandler={() => (
            this.goToDeck(decks[deckName])
          ) } />
        )) }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7.5,
    paddingBottom: 7.5,
  },
})

export default DecksList