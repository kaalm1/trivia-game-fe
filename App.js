import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import {Root} from 'native-base'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import AppWithNavigationState from './navigators/AppNavigator';


// create our store

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {

  render () {
    return (
      <Root>
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </Root>
    )
  }
}

AppRegistry.registerComponent('App', () => App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
