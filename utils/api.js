import AsyncStorage from '@react-native-community/async-storage';

export const DECK_STORAGE_KEY = 'Mobileflashcard:deck'

const intialObject = {
    decks:{
        deck1:{
            name:'Personal Deck',
            questions:[
                {
                    question:'What is your name?', 
                    answer: 'Hunain'
                },
                {
                    question:'What is my name?', 
                    answer: 'Hunain'
                }
            ]
        },
        deck2:{
            name:'My Deck',
            questions:[
                {
                    question:'What is your name?', 
                    answer: 'Hunain'
                },
                {
                    question:'What is my name?', 
                    answer: 'Hunain'
                },
                {
                    question:'What is your favorite fruit??', 
                    answer: 'Cherry'
                },
                {
                    question:'What do you want to eat?', 
                    answer: 'Anything'
                }
            ]
        }
    }
}
export const fetchDecks = async () => {
    AsyncStorage.clear()
    try {
      const jsonValue = JSON.stringify(intialObject)
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
        )
    )
}

export function addQuestion(question) {
    return(
        AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(data=>{
            let newData = data
            for (var key in newData) {
                if (newData[key].name === question.name) {
                  delete newData.key;
                }
                return newData
              }
            newData[question.name] = question
            
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, newData)
            .then(data=>console.log(data,'new Data'))
        })
    )
}