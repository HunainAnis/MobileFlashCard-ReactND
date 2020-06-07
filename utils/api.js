import AsyncStorage from '@react-native-community/async-storage';

export const DECK_STORAGE_KEY = 'Mobileflashcard:deck'

export function saveDeck({ key,  }) {
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, )
}