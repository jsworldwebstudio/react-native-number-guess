import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import MainButton from '../components/MainButton';

import defaultStyles from '../constants/default-styles';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
  
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>The Game is Over!!!</Text>
        <View style={{...styles.imageContainer, ...{
          width: availableDeviceWidth * 0.7,
          height: availableDeviceHeight * 0.7,
          borderRadius: (availableDeviceWidth * 0.7) / 2,
          marginVertical: availableDeviceHeight / 30
        }}}>
          <Image
            source={require('../assets/images/original.png')}
            // source={{uri: 'https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_1280.jpg'}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={{...styles.resultContainer,
          ...{marginVertical: availableDeviceHeight / 60}}}>
          <Text style={{...defaultStyles.bodyText, ...{...styles.resultText},
            ...{fontSize: availableDeviceHeight < 400 ? 16 : 20}
        }}>This game needed <Text style={styles.highlight}>{props.gameRounds}</Text> rounds to guess the original number, which was: <Text style={styles.highlight}>{props.gameNumber}</Text>.</Text>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    // width: 300,
    // height: 300,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30
  },
  resultText: {
    textAlign: 'center'
  }
});

export default GameOverScreen;
