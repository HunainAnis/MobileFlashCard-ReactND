import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import CreateDeck from './components/CreateDeck';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllDecks from './components/AllDecks';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Constants from 'expo-constants';
import  reducer from './reducers'

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Provider store={createStore(reducer)}>
      <UdaciStatusBar backgroundColor='purple' barStyle='light-content'  />
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

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return(
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}