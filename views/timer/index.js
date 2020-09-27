import React, {useState, useEffect, useRef, createRef, forwardRef} from 'react';
import {View, StyleSheet, Animated, TextInput} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {CircleButton, Text} from '../../components';
import {playSoundEffect, stopSoundEffect} from '../../sound';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function Timer({config, endTimer}) {
  const [running, setRunning] = useState(!config.delay);
  const [stopped, setStopped] = useState(false);
  let clockRef = createRef();
  const delayRef = createRef();
  const startCountdown = () => {
    setRunning(true);
    if (clockRef.current) clockRef.current.startAnimation();
  };
  const startDelay = () => {
    setRunning(false);
    if (delayRef.current) delayRef.current.startDelay();
  };
  const resetCountdown = () => {
    if (clockRef.current) clockRef.current.resetValues();
  };
  const resetDelay = () => {
    if (delayRef.current) delayRef.current.resetValue();
  };
  const countFinished = () => {
    if (config.delay) {
      startDelay();
    } else {
      resetCountdown();
      startCountdown();
    }
  };

  const delayFinished = () => {
    resetDelay();
    resetCountdown();
    startCountdown();
  };

  const resetAll = () => {
    resetCountdown();
    resetDelay();
    setStopped(true);
    setRunning(true);
  };

  const fragStart = () => {
    setStopped(false);
    startCountdown();
  };
  useEffect(() => {
    if (config.delay) {
      startDelay();
    } else {
      startCountdown();
    }
  }, []);
  return (
    <View style={styles.container}>
      {/*  */}
      <View style={{...styles.group, opacity: running ? 1 : 0.3}}>
        <Text style={styles.label}>CLOCK</Text>
        <Clock
          ref={clockRef}
          sound={config.sound}
          countFinished={countFinished}
          duration={config.time * 1000}
          longDelay={config.delay > 2}
        />
      </View>
      {/*  */}
      <View style={{...styles.group, opacity: running ? 0.3 : 1}}>
        <Text style={styles.label}>DELAY</Text>
        <Delay
          delayFinished={delayFinished}
          ref={delayRef}
          duration={config.delay * 1000}
          active={config.delay > 0}
        />
      </View>
      {/*  */}
      <View style={{...styles.buttons, ...styles.group}}>
        <CircleButton text="Cancel" color="#fc6c85" onPress={endTimer} />

        <CircleButton
          text={stopped ? 'Start' : 'Stop'}
          color={stopped ? undefined : '#7c5295'}
          onPress={stopped ? fragStart : resetAll}
        />
      </View>
      {/*  */}
    </View>
  );
}

const Clock = forwardRef(({duration, countFinished, sound, longDelay}, ref) => {
  const circleRef = useRef();
  const inputRef = useRef();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = 130;
  const strokeWidth = 10;
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * radius * Math.PI;
  const timeAnimation = Animated.timing(animatedValue, {
    toValue: circumference,
    duration,
    delay: 0,
    useNativeDriver: true,
  });
  const resetValues = () => {
    timeAnimation.stop();
    animatedValue.setValue(0);
  };
  const startAnimation = () => {
    const buzzer = longDelay ? 'long_buzzer' : 'short_buzzer';
    if (sound) {
      playSoundEffect('regular_ticking');
    }
    timeAnimation.start(({finished}) => {
      if (sound) {
        stopSoundEffect('regular_ticking');
      }
      if (finished) {
        countFinished();
        playSoundEffect(buzzer);
      }
    });
  };

  ref.current = {startAnimation, resetValues};

  useEffect(() => {
    animatedValue.addListener((v) => {
      if (circleRef.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset: v.value,
        });
      }
      if (inputRef.current) {
        const ratio = v.value / circumference;
        const time = duration - duration * ratio;
        inputRef.current.setNativeProps({
          text: '' + fmTime(time),
        });
      }
    });
    return () => {
      timeAnimation.stop();
      animatedValue.stopAnimation();
      animatedValue.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.circleView}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke="#fff"
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            opacity={0.3}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke="#fff"
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue={`${fmTime(duration)}`}
        style={[StyleSheet.absoluteFillObject, styles.time]}
      />
    </View>
  );
});

const Delay = forwardRef(({duration, delayFinished, active}, ref) => {
  const [delay, setDelay] = useState(duration);
  const interval = useRef();
  const startDelay = () => {
    interval.current = setInterval(() => {
      setDelay((delay) => delay - 1000);
    }, 1000);
  };

  const resetValue = () => {
    clearInterval(interval.current);
    interval.current = null;
    setDelay(duration);
  };

  ref.current = {startDelay, resetValue};
  useEffect(() => {
    if (active && delay === 0) {
      delayFinished();
    }
  }, [delay]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  return (
    <View>
      <Text style={styles.delay}>{fmTime(delay)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1,
  },
  group: {marginBottom: 20, marginHorizontal: 'auto'},
  label: {fontSize: 20, textAlign: 'center'},
  circleView: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 120,
    color: '#fff',
    textAlign: 'center',
  },
  delay: {
    fontSize: 80,
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

function fmTime(time) {
  let seconds = +time / 1000;
  let long = seconds >= 10;
  let roundedSeconds = Math.round(seconds);
  let prefix = long ? '' : '0';
  return prefix + roundedSeconds;
}
