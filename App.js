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
import { createStackNavigator } from '@react-navigation/stack';
import DeckDetails from './components/deckDetails';
import Quiz from './components/Quiz';
import NewQuiz from './components/NewQuiz';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={myTabs} />
      <Stack.Screen name="Detail" component={DeckDetails} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="New Quiz" component={NewQuiz} />
    </Stack.Navigator>
  );
  }

  function myTabs() {
    const Tab = createMaterialTopTabNavigator();
    return(
      <Tab.Navigator>
        <Tab.Screen name="Decks" component={AllDecks} />
        <Tab.Screen name="New Deck" component={CreateDeck} />
      </Tab.Navigator>
    )
  }
export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <UdaciStatusBar backgroundColor='purple' barStyle='light-content'  />
      <NavigationContainer>
          <MyStack />
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