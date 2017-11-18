import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Button } from 'react-native'
import StyledButton from './StyledButton'
import * as Colors from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

class Quiz extends Component {

  deck = {}
  count = 0

  state = {
    score: 0,
    currentQuestion: 0,
    showQuestion: true,
  }

  constructor(props) {
    super(props)

    // extract the data
    const deck = props.navigation.state.params
    const { title, questions } = deck

    // set data
    this.deck = deck
    this.count = questions ? (questions.length || 0) : 0

    // bind
    this.correct = this.correct.bind(this)
    this.incorrect = this.incorrect.bind(this)
    this.backToDeck = this.backToDeck.bind(this)
    this.renderScore = this.renderScore.bind(this)
    this.restartQuiz = this.restartQuiz.bind(this)
    this.goToCardAdd = this.goToCardAdd.bind(this)
    this.answerAction = this.answerAction.bind(this)
    this.calculateScore = this.calculateScore.bind(this)
    this.renderNoQuestions = this.renderNoQuestions.bind(this)
    this.haveAnotherQuestion = this.haveAnotherQuestion.bind(this)
    this.toggleQuestionAnswer = this.toggleQuestionAnswer.bind(this)
    this.renderQuestionOrAnswer = this.renderQuestionOrAnswer.bind(this)

    // clear old notification as they are doing a quiz now
    clearLocalNotification()
  }

  answerAction(type) {
    let scoreModifier = (type === 'correct') ? 1 : 0

    this.setState((prevState, props) => ({
      score: (prevState.score + scoreModifier),
      currentQuestion: prevState.currentQuestion + 1,
    }))
  }

  correct() {
    return this.answerAction('correct')
  }

  incorrect() {
    return this.answerAction('incorrect')
  }

  restartQuiz() {
    this.setState((prevState, props) => ({
      score: 0,
      currentQuestion: 0,
      showQuestion: true,
    }))
  }

  backToDeck() {
    this.props.navigation.navigate('DeckView', this.deck)
  }

  goToCardAdd() {
    this.props.navigation.navigate('CardAdd', this.deck)
  }

  toggleQuestionAnswer() {
    this.setState((prevState, props) => ({
      showQuestion: !prevState.showQuestion,
    }))
  }

  calculateScore() {
    setLocalNotification()
    return ( this.state.score / this.count ) * 100
  }

  haveAnotherQuestion() {
    const { questions } = this.deck
    const { currentQuestion } = this.state

    return (
      typeof questions[currentQuestion] === 'object' && questions[currentQuestion]
    )
  }

  renderQuestionOrAnswer() {
    const count = this.count
    const { questions } = this.deck
    const { showQuestion, currentQuestion } = this.state
    const { question, answer } = questions[currentQuestion]

    return (
      <View style={ styles.container }>
        <View style={ styles.containerCounter }>
          <Text style={ styles.counter }>{ this.state.currentQuestion + 1 } / { this.count }</Text>
        </View>
        <View style={ styles.containerQa }>
          <Text style={ styles.text }>{ showQuestion ? question : answer }</Text>
          <Button onPress={ this.toggleQuestionAnswer } title={ `View ${ showQuestion ? 'Answer' : 'Question' }` } />
        </View>
        <View style={ styles.containerActions }>
          <StyledButton text="Correct" onPress={ this.correct } customStyles={{
            container: { backgroundColor: Colors.GREEN }
          }} />
          <StyledButton text="Incorrect" onPress={ this.incorrect } customStyles={{
            container: { backgroundColor: Colors.RED }
          }} />
        </View>
      </View>
    )
  }

  renderScore() {
    return (
      <View style={ styles.container }>
        <View style={ styles.containerQa }>
          <Text style={ styles.text }>Score: { this.calculateScore() }</Text>
        </View>
        <View style={ styles.containerActions }>
          <StyledButton text="Restart Quiz" onPress={ this.restartQuiz } />
          <StyledButton text="Back to Deck" onPress={ this.backToDeck } />
        </View>
      </View>
    )
  }

  renderNoQuestions() {
    return (
      <View style={ styles.container }>
        <View style={ styles.containerQa }>
          <Text style={ styles.text }>This Deck has no question Cards.</Text>
          <StyledButton text="Add Card" onPress={ this.goToCardAdd } />
        </View>
      </View>
    )
  }

  render() {
    const count = this.count
    const haveAnotherQuestion = this.haveAnotherQuestion()

    return (
      haveAnotherQuestion
        ? this.renderQuestionOrAnswer()
        : ( count ? this.renderScore() : this.renderNoQuestions() )
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCounter: {
    // 
  },
  counter: {
    padding: 10,
  },
  containerQa: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    padding: 10,
  },
  containerActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Quiz