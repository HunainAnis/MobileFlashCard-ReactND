import AsyncStorage from '@react-native-community/async-storage';

export const DECK_STORAGE_KEY = 'Mobileflashcard:deck'
export const QUIZ_STORAGE_KEY = 'Mobileflashcard:quiz'
export const NOTIFICATION_KEY = 'Mobileflashcard:notification'

const intialObject = {
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

export function storeQuiz(key, quiz) {
    return AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({[key]:quiz}))
    .then(()=>(
        AsyncStorage.getItem(QUIZ_STORAGE_KEY)
        .then(data=>console.log(data, 'storeQuiz key'))
    ))
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
  }
  
//   function createNotification() {
//     return {
//       title: 'Log your stats',
//       body: "👋 Don't forget to log your stats for today!",
//       ios: {
//         sound: true
//       },
//       android: {
//         sound: true,
//         priority: 'high',
//         sticky: false,
//         vibrate: true
//       }
//     }
//   }
  
//   export function setLocalNotification() {
//     AsyncStorage.getItem(NOTIFICATION_KEY)
//       .then(JSON.parse)
//       .then((data)=> {
//         if(data!== null) {
//           Permissions.askAsync(Permissions.NOTIFICATIONS)
//             .then(({ status })=> {
//               if(status === 'granted') {
//                 Notifications.cancelAllScheduledNotificationsAsync()
//                 let tomorrow = new Date()
//                 tomorrow.setDate(tomorrow.getDate() + 1)
//                 tomorrow.setHours(20)
//                 tomorrow.setMinutes(0)
  
//                 Notifications.scheduleLocalNotificationAsync(
//                   createNotification(),
//                   {
//                     time: tomorrow,
//                     repeat: 'day'
//                   }
//                 )
  
//                 AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//               }
//             })
//         }
//       })
//   }