import { Audio } from 'expo-av';

let laserSound = null;
let explosionSound = null;
let soundsLoaded = false;

export const loadSounds = async () => {
  try {
    const { sound: laser } = await Audio.Sound.createAsync(
      require('../../assets/sounds/laser.wav')
    );
    laserSound = laser;

    const { sound: explosion } = await Audio.Sound.createAsync(
      require('../../assets/sounds/explosion.wav')
    );
    explosionSound = explosion;
    soundsLoaded = true;
  } catch (error) {
    console.log('Sounds not available - game will run without audio');
    soundsLoaded = false;
  }
};

export const playLaserSound = async () => {
  if (laserSound && soundsLoaded) {
    try {
      await laserSound.replayAsync();
    } catch (error) {
      // Silently fail if sound not available
    }
  }
};

export const playExplosionSound = async () => {
  if (explosionSound && soundsLoaded) {
    try {
      await explosionSound.replayAsync();
    } catch (error) {
      // Silently fail if sound not available
    }
  }
};

export const unloadSounds = async () => {
  try {
    if (laserSound) {
      await laserSound.unloadAsync();
    }
    if (explosionSound) {
      await explosionSound.unloadAsync();
    }
  } catch (error) {
    // Silently fail
  }
};
