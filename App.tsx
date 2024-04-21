/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react';
import RootStack from './src/navigations/RootStack';
import { ThemeProvider } from './src/globals/ThemeProvider';
import { SocketProvider } from "./src/globals/SocketProvider";
import { Provider } from 'react-redux';
import store from './src/redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SocketProvider>
            <RootStack />
        </SocketProvider>
      </ThemeProvider>
    </Provider>
  )
}
export default App;
