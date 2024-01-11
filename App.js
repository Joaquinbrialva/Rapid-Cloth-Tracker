import React from 'react'
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
      <StatusBar />
      <Navigation />
    </>
  )
}

export default App