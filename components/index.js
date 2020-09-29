import React, {useState} from 'react';
import {
  Text as ReactText,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export const Text = ({children, style, ...rest}) => (
  <ReactText {...rest} style={{...style, color: '#fff'}}>
    {children}
  </ReactText>
);

export const RadioButton = ({pressed, ...rest}) => (
  <TouchableOpacity activeOpacity={0.7} {...rest}>
    <View style={radio.container}>
      <View style={pressed ? radio.inside : null} />
    </View>
  </TouchableOpacity>
);

const radio = StyleSheet.create({
  container: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  inside: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'darkgray',
  },
});

export const CircleButton = ({color = 'lime', text, disabled, ...rest}) => (
  <TouchableOpacity {...rest} disabled={disabled} activeOpacity={0.8}>
    <View
      style={{
        ...circleBtn.container,
        borderColor: color,
        opacity: disabled ? 0.5 : 1,
      }}>
      <ReactText style={{...circleBtn.text, color}}>{text}</ReactText>
    </View>
  </TouchableOpacity>
);

const circleBtn = StyleSheet.create({
  container: {
    height: 85,
    width: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
  },
  text: {fontSize: 20, fontWeight: 'bold'},
});

export const SquareButton = ({
  text,
  background = '#fff',
  color = '#000',
  disabled,
  ...rest
}) => (
  <TouchableOpacity disabled={disabled} {...rest} activeOpacity={0.8}>
    <View
      style={{
        ...btn.container,
        backgroundColor: background,
        opacity: disabled ? 0.5 : 1,
      }}>
      <ReactText style={{...btn.text, color}}>{text}</ReactText>
    </View>
  </TouchableOpacity>
);

const btn = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 35,
    height: 35,
  },
  text: {fontSize: 30, fontWeight: 'bold', marginTop: -2},
});
