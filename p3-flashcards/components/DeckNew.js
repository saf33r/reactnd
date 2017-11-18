import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, KeyboardAvoidingView, Text, TextInput } from 'react-native'
import { getDeck, saveDeckTitle } from '../utils/asyncStore'
import StyledButton from './StyledButton'
import * as Colors from '../utils/colors'

const initialState = {
  title: '',
}

class DeckNew extends Component {
  state = { ...initialState }
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }
  updateTitle(title) {
    this.setState({
      title
    })
  }
  submit() {
    const { title } = this.state
    const { navigation } = this.props

    if (title && title.trim()) {
      saveDeckTitle(title)
        .then(() => {
          getDeck(title)
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
        <Text style={ styles.label }>What is the title of your new deck?</Text>
        <TextInput
          placeholder='Enter the title for your new deck'
          style={ styles.input }
          onChangeText={ this.updateTitle }
          value={ this.state.title }
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

export default DeckNew