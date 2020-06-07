import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateDeck from './components/CreateDeck';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllDecks from './components/AllDecks';
import { Provider, connect } from 'react-redux';

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Provider>
      <NavigationContainer>
          <View style={{marginTop: 30}} />
          <Tab.Navigator>
            <Tab.Screen name="Decks" component={AllDecks} />
            <Tab.Screen name="New Deck" component={CreateDeck} />
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>

  );
}
