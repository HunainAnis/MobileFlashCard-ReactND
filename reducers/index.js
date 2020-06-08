import { ADD_NEW_DECK, REMOVE_DECK, FETCH_ALL_DECKS, ADD_QUESTION } from "../actions";

export default function decks ( state={}, action ) {
    switch(action.type) {
        case FETCH_ALL_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_NEW_DECK:
            return {
                ...state,
                [action.deck.deckName]:action.deck.data
            }
        case REMOVE_DECK:
             const AllDeck = state
             delete AllDeck[action.id]
            return { 
                ...AllDeck,

            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]:{
                    ...state[action.question.id],
                    questions:state[action.question.id].questions.concat(action.question.questionAnwer)
                }
            }
        default:
            return state
    }
}