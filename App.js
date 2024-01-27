import React from 'react'
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import COLOR_APP from './src/utils/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR_APP.primary,
    secondary: COLOR_APP.secondary,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme} >
      <StatusBar />
      <Navigation />
    </PaperProvider>
  )
}

export default App