/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import RootStack from './src/navigations/RootStack';
import { ThemeProvider } from './src/globals/ThemeProvider';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {io}  from "socket.io-client";
const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </Provider>
  )
}
export default App;
