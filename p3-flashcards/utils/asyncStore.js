import { AsyncStorage } from 'react-native'

export const getDeck = (title) =>
  AsyncStorage.getItem(title)
    .then(result => JSON.parse(result))

export const getDecks = () => 
  AsyncStorage
    .getAllKeys()
    .then(keys => 
      AsyncStorage
        .multiGet(keys)
        .then(stores => 
          (!stores || !stores.length) ? [] : stores.map((result, i, store) => JSON.parse(store[i][1]))
        )
    )

export const saveDeckTitle = (title, questions = []) =>
  AsyncStorage.setItem(title, JSON.stringify({
    title,
    questions,
  }))

export const addCardToDeck = (title, card = { question: '', answer: '' }) =>
  getDeck(title)
    .then((deck) => 
      AsyncStorage.mergeItem(title, JSON.stringify({
        questions: deck.questions.concat(card),
      }))
    )

export const removeDeck = (title, onError) => 
  AsyncStorage.removeItem(title, onError)