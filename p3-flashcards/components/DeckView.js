import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import StyledButton from './StyledButton'
import DeckRemove  from './DeckRemove'
import * as Colors from '../utils/colors'

function DeckView({ navigation }) {
  const deck = navigation.state.params
  const { title, questions } = deck
  const count = questions ? (questions.length || 0) : 0

  const deckNavigator = (path) => (
    navigation.navigate(path, deck)
  )

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ title }</Text>
      <Text style={ styles.counter }>{ count } Card{ count > 1 ? 's' : '' }</Text>
      <StyledButton text="Add Card" onPress={ () => deckNavigator('CardAdd') } />
      <StyledButton text="Start Quiz" onPress={ () => deckNavigator('Quiz') } />
      <DeckRemove title={ deck.title } styles={ styles.removeDeck } size={ 22 } onRemove={ () => deckNavigator('Home') } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    marginBottom: 0,
  },
  counter: {
    fontSize: 22,
    marginBottom: 20,
  },
  removeDeck: {
    marginTop: 20,
  },
})

export default DeckView