import { Audio } from 'expo-av';

let laserSound = null;
let explosionSound = null;

export const loadSounds = async () => {
  try {
    const { sound: laser } = await Audio.Sound.createAsync(
      require('../../assets/sounds/laser.mp3')
    );
    laserSound = laser;

    const { sound: explosion } = await Audio.Sound.createAsync(
      require('../../assets/sounds/explosion.mp3')
    );
    explosionSound = explosion;
  } catch (error) {
    console.log('Error loading sounds:', error);
  }
};

export const playLaserSound = async () => {
  if (laserSound) {
    try {
      await laserSound.replayAsync();
    } catch (error) {
      console.log('Error playing laser:', error);
    }
  }
};

export const playExplosionSound = async () => {
  if (explosionSound) {
    try {
      await explosionSound.replayAsync();
    } catch (error) {
      console.log('Error playing explosion:', error);
    }
  }
};

export const unloadSounds = async () => {
  if (laserSound) {
    await laserSound.unloadAsync();
  }
  if (explosionSound) {
    await explosionSound.unloadAsync();
  }
};
