import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, KeyboardAvoidingView, Text, TextInput } from 'react-native'
import StyledButton from './StyledButton'
import { getDeck, addCardToDeck } from '../utils/asyncStore'
import * as Colors from '../utils/colors'

const initialState = {
  question: '',
  answer: '',
}

class CardAdd extends Component {
  deck = {}
  state = { ...initialState }
  constructor(props) {
    super(props)

    this.deck = this.props.navigation.state.params

    this.submit = this.submit.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
    this.updateQuestion = this.updateQuestion.bind(this)
  }
  updateQuestion(question) {
    this.setState({
      question,
    })
  }
  updateAnswer(answer) {
    this.setState({
      answer,
    })
  }
  submit() {
    const { navigation } = this.props
    const { question, answer } = this.state
    const card = {
      question,
      answer,
    }

    if (question && question.trim() && answer && answer.trim()) {
      addCardToDeck(this.deck.title, card)
        .then(() => {
          getDeck(this.deck.title)
            .then(deck => {
              this.setState({ ...initialState })
              navigation.navigate('DeckView', deck)
            })
        })
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }>
        <Text style={ styles.label }>What is the Question?</Text>
        <TextInput
          placeholder="Enter the Question"
          style={styles.input}
          onChangeText={ this.updateQuestion }
          value={ this.state.question }
        />
        <Text style={ styles.label }>What is the Answer?</Text>
        <TextInput
          placeholder="Enter the Answer"
          style={styles.input}
          onChangeText={ this.updateAnswer }
          value={ this.state.answer }
        />
        <StyledButton text="Submit" onPress={ this.submit } />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 10,
    fontSize: 22,
  },
  input: {
    borderColor: Colors.DARKGREY,
    borderWidth: 1,
    height: 40,
    padding: 10,
    margin: 10,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
})

export default CardAdd