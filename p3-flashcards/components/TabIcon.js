import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const TabIcon = ({ tintColor, name, size = 22 }) => 
  <FontAwesome style={{ color: tintColor, marginTop: 5, }} name={ name } size={ size } />

export default TabIcon