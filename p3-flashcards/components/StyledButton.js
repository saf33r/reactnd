import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as Colors from '../utils/colors'

const customStyle = (label, customStyles) => {
  // get the style and convert to StyleSheet if not
  let customStyle
  if (customStyles && typeof customStyles[label] !== 'undefined') {
    customStyle = customStyles[label]
    if (typeof customStyle !== 'number') {
      customStyle = StyleSheet.create({
        [label]: { ...customStyle },
      })[label]
    }
  }

  // default style
  const defaultStyle = styles[label]

  // merge the styles
  return (customStyle) ? [defaultStyle, customStyle] : defaultStyle
}

const StyledButton = ({ text, onPress, customStyles }) =>
  <TouchableOpacity style={ customStyle('container', customStyles) } onPress={ onPress }>
    <Text style={ customStyle('text', customStyles) }>{ text }</Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 60,
    marginBottom: 10,
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: Colors.WHITE,
  },
})

export default StyledButton