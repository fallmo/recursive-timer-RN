import React, {useState} from 'react';
import {View, StyleSheet, Switch, Text as ReactText} from 'react-native';
import {Text, CircleButton, SquareButton} from '../../components';

export default function Settings({startTimer, config}) {
  const [time, setTime] = useState(config.time);
  const [delay, setDelay] = useState(config.delay);
  const [sound, setSound] = useState(config.sound);
  return (
    <View style={styles.container}>
      {/* Time */}
      <View style={input.container}>
        <View>
          <Text style={input.label}>TIME</Text>
        </View>
        <View style={input.line}>
          <SquareButton
            text="-"
            onPress={() => setTime((time) => time - 1)}
            disabled={time < 1}
          />
          <Text style={input.num}>{fmTime(time)}</Text>
          <SquareButton
            text="+"
            onPress={() => setTime((time) => time + 1)}
            disabled={time > 29}
          />
        </View>
      </View>
      {/*  */}
      <View style={input.container}>
        <View>
          <Text style={input.label}>DELAY</Text>
        </View>
        <View style={input.line}>
          <SquareButton
            text="-"
            onPress={() => setDelay((delay) => delay - 1)}
            disabled={delay < 1}
          />
          <Text style={input.num}>{fmTime(delay)}</Text>
          <SquareButton
            text="+"
            onPress={() => setDelay((delay) => delay + 1)}
            disabled={delay > 9}
          />
        </View>
      </View>
      {/*  */}
      <View style={input.container}>
        <View>
          <Text style={input.label}>SOUND</Text>
        </View>
        <View style={input.switchGroup}>
          <ReactText style={sound ? input.soundNot : input.soundOff}>
            OFF
          </ReactText>
          <Switch
            style={input.switch}
            value={sound}
            onValueChange={() => setSound(!sound)}
          />
          <ReactText style={sound ? input.soundOn : input.soundNot}>
            ON
          </ReactText>
        </View>
      </View>
      {/*  */}
      <View style={input.submitBox}>
        <CircleButton
          text="Start"
          disabled={time < 3}
          onPress={() => startTimer({time, delay, sound})}
        />
      </View>
      {/*  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

const input = StyleSheet.create({
  container: {marginBottom: 20, marginHorizontal: 'auto'},
  label: {fontSize: 20, textAlign: 'center'},
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 70,
    marginHorizontal: 10,
  },
  switchGroup: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {marginHorizontal: 10, marginVertical: 10},
  soundOn: {fontWeight: 'bold', color: 'lime'},
  soundNot: {color: 'gray'},
  soundOff: {fontWeight: 'bold', color: 'red'},
  submitBox: {alignItems: 'center', marginTop: 20},
});

function fmTime(time) {
  let prefix = time > 9 ? '' : '0';
  return prefix + time;
}
