import AsyncStorage from '@react-native-community/async-storage';

export const DECK_STORAGE_KEY = 'Mobileflashcard:deck'


export const fetchDecks = async () => {
    try {
      const jsonValue = JSON.stringify({decks:{deck1:[{'name':'hunain'}]}})
      await AsyncStorage.setItem(DECK_STORAGE_KEY, jsonValue)
    } catch(e) {
    //   console.log(e)
    }
    return (
        AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((data)=> (
            data === null
            ? AsyncStorage.setItem(DECK_STORAGE_KEY, jsonValue)
            : JSON.parse(data) 
        ))
    )
  }

export function saveDeck(deckName) {
    return (
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[deckName]:[]}))
        .then(
            AsyncStorage.getItem(DECK_STORAGE_KEY)
                .then(data=> console.log(data))
        )
    )
}