import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import * as Colors from '../utils/colors'
import DeckList from './DeckList'
import DeckNew from './DeckNew'
import TabIcon from './TabIcon'
import DeckView from './DeckView'
import CardAdd from './CardAdd'
import Quiz from './Quiz'

const headerStyleConfiguration = {
  paddingTop: 20,
  paddingBottom: 20,
  height: Constants.statusBarHeight,
  backgroundColor: Colors.WHITE,
}

export default StackNavigator({
  Home: {
    screen: TabNavigator({
      DeckList: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => <TabIcon tintColor={ tintColor } name='list' />,
        }
      },
      DeckNew: {
        screen: DeckNew,
        navigationOptions: {
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ tintColor }) => <TabIcon tintColor={ tintColor } name='plus' />,
        }
      },
    }, {
      animationEnabled: true,
      tabBarPosition: 'bottom',
      initialRouteName: 'DeckList',
      tabBarOptions: {
        padding: 5,
        activeTintColor: Colors.WHITE,
        activeBackgroundColor: Colors.BLUE,
        labelStyle: {
          paddingBottom: 5,
        },
        style: {
          backgroundColor: Colors.WHITE,
        },
      },
    }),
    navigationOptions: {
      title: ' ',
      headerStyle: headerStyleConfiguration,
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck',
      headerStyle: headerStyleConfiguration,
    },
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      title: 'Add Card',
      headerStyle: headerStyleConfiguration,
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerStyle: headerStyleConfiguration,
    },
  },
})