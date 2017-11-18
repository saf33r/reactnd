import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import * as Colors from '../utils/colors'

function DecksListItem({ title, questions, clickHandler }) {
  const count = questions ? (questions.length || 0) : 0
  return (
    <TouchableOpacity onPress={clickHandler} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{ count } Card{ count > 1 ? 's' : '' }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7.5,
    marginBottom: 7.5,
    marginLeft: 15,
    marginRight: 15,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  countContainer: {
    justifyContent: 'center',
  },
  count: {
    fontSize: 20,
    color: Colors.GREY,
    textAlign: 'center',
  },
})

export default DecksListItem