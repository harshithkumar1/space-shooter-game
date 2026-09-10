import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const GAME = {
  width,
  height,
  backgroundColor: '#000000',
};

export const SHIP = {
  size: 40,
  color: '#FFFFFF',
  speed: 5,
  maxX: width - 40,
  maxY: height - 100,
  minY: 100,
};

export const ENEMY = {
  size: 30,
  color: '#FFFFFF',
  speed: 3,
  spawnInterval: 2000,
  maxEnemies: 5,
};

export const BULLET = {
  width: 4,
  height: 15,
  color: '#FFFFFF',
  speed: 10,
};

export const GAME_STATE = {
  START: 'start',
  PLAYING: 'playing',
  GAME_OVER: 'gameover',
};

export const INITIAL_LIVES = 3;
export const SCORE_PER_ENEMY = 10;
