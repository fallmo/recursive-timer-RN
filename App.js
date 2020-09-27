import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import Settings from './views/settings';
import Timer from './views/timer';

const App = () => {
  const [config, setConfig] = useState({delay: 0, time: 0, sound: true});
  const [view, setView] = useState(0);
  const startTimer = (settings) => {
    setConfig(settings);
    setView(1);
  };
  const endTimer = () => {
    setView(0);
  };
  useEffect(() => {}, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.app}>
        <SafeAreaView style={styles.view}>
          {view === 1 ? (
            <Timer config={config} endTimer={endTimer} />
          ) : (
            <Settings startTimer={startTimer} config={config} />
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  app: {padding: 20, backgroundColor: 'black', flex: 1},
  view: {flex: 1, backgroundColor: 'black'},
});

export default App;
