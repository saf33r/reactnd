import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Navigation from './Navigation'

export default class Main extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Navigation />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
