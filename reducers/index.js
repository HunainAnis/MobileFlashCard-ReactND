import { ADD_NEW_DECK, REMOVE_DECK, FETCH_ALL_DECKS } from "../actions";

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
                ...state.decks,
                [action.deckName]:[]
            }
        case REMOVE_DECK:
            return {
                ...state
            }
        default:
            return state
    }
}