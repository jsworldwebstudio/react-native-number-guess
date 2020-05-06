import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

class App extends React.Component {
  state = {
    userNumber: null,
    guessRounds: 0,
    fontLoaded: false
  };
  // const [userNumber, setUserNumber] = useState();
  // const [guessRounds, setGuessRounds] = useState(0);
  // const [fontLoaded, setFontLoaded] = useState(false);

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  };

  render() {

  if (!this.state.fontLoaded) {
    return
      <AppLoading />;
  };

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }; 

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (userNumber && guessRounds > 0) {
    content = <GameOverScreen gameNumber={userNumber} gameRounds={guessRounds} onRestart={configureNewGameHandler} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      { content }
    </View>
  );
  
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});

export default App;
