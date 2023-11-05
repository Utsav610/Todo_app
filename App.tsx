import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TodoNavigation from './src/navigation/todoNavigation';
import rootReducer from './src/redux/store';
import { createStore,applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
   <Provider store={store}>
    <TodoNavigation/>
    </Provider>
  )
}

const styles = StyleSheet.create({})