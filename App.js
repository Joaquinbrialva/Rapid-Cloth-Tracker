import React from 'react';
import Navigation from './src/navigation/Navigation';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <StatusBar />
      <Navigation />
    </PaperProvider>
  );
}

export default App;