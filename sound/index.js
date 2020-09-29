import Sound, {MAIN_BUNDLE} from 'react-native-sound';

const shortBuzzer = new Sound('short_buzzer.wav', MAIN_BUNDLE);
const longBuzzer = new Sound('long_buzzer.wav', MAIN_BUNDLE);
const regularTicking = new Sound('regular_ticking.wav', MAIN_BUNDLE);
regularTicking.setVolume(0.7);

export const playSoundEffect = (sound) => {
  switch (sound) {
    case 'short_buzzer':
      return shortBuzzer.play();
    case 'long_buzzer':
      return longBuzzer.play();
    case 'regular_ticking':
      return regularTicking.play();
    default:
      return;
  }
};

export const stopSoundEffect = (sound) => {
  switch (sound) {
    case 'short_buzzer':
      return shortBuzzer.stop();
    case 'long_buzzer':
      return longBuzzer.stop();
    case 'regular_ticking':
      return regularTicking.stop();
    default:
      return;
  }
};
