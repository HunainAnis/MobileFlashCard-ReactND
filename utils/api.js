import AsyncStorage from '@react-native-community/async-storage';
import { Permissions, Constants } from 'react-native-unimodules'
// import { Notifications } from 'expo'
// import * as Notifications from 'expo-notifications';
import { Notifications } from 'expo'
import { Platform } from 'react-native';

export const DECK_STORAGE_KEY = 'Mobileflashcard:deck'
export const QUIZ_STORAGE_KEY = 'Mobileflashcard:quiz'
export const NOTIFICATION_KEY = 'Mobileflashcard:notification'

const intialObject = {
    React: {
      name: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      name: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
export const fetchDecks = async () => {
    // AsyncStorage.clear()
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

export function fetchQuizDetails() {
    return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
        .then(data=> (
            data !== null && JSON.parse(data)
        ))
}

export function storeQuiz(key) {
    return AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(key))
    .then(clearLocalNotification())
}

export function saveDeck(key, deckDetails) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[key]:deckDetails}))

}

export function addQuestion(key,question) {
    return(
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[key]:question}))
    )
}

export function removeQuiz (key) {
    return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data))
    })
    .catch(err=>console.log(err))
} 

export function removeDeck (key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    }
    )
    .catch(err=>console.log(err))
} 

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync())
      .then(console.log('Notifications cleared'))
  }
  
  function createNotification() {
    return {
      title: 'Take a Quiz',
      body: "👋 Don't forget to take your at least one quiz today!",
      ios: {
        sound: true
      },
      android: {
        channelId: 'LocalNotification',
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  }
  
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data)=> {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status })=> {
              if(Constants.isDevice && status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                if(Platform.OS === 'android') {
                    Notifications.createChannelAndroidAsync(
                        'localNotification',
                        {
                            name: 'localNotification',
                            sound: true,
                            priority: 'high',
                            sticky: false,
                            vibrate: true
                        }
                        )
                    }
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(19)
                    tomorrow.setMinutes(0)

                // if user don't take a single quiz, will be notified at 7 PM
                    Notifications.scheduleLocalNotificationAsync(
                      createNotification(),
                      {
                        time: tomorrow,
                        repeat: 'day'
                      }
                    )
  
                // AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }