export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const FETCH_ALL_DECKS = 'FETCH_ALL_DECKS'


export function fetchAllDecks(decks) {
    return {
        type: FETCH_ALL_DECKS,
        decks
    }
}

export function addDeck(deckName) {
    const data={}
    data[deckName] = {
        name:[deckName],
        questions:[]
    }
    return {
        type: ADD_NEW_DECK,
        data
    }
}

export function deleteDeck(id) {
    return{
        type: REMOVE_DECK,
        id
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}