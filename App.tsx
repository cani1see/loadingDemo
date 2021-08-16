/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Loadings } from './src/component/Loadings';
import Slider from '@react-native-community/slider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [progressValue, setProgressValue] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
        style={backgroundStyle}>
        <View style={styles.mainView}>
          <Loadings size={300} primaryColor={'red'} count={8} />
          {/*<Chase size={300} color={'cyan'} animating />*/}
        </View>
        <Text>{progressValue}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          onValueChange={setProgressValue}
          value={progressValue}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1 },
  mainView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
