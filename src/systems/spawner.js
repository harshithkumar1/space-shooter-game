import { GAME, ENEMY } from '../constants';

let lastSpawnTime = 0;

export const canSpawnEnemy = (currentTime) => {
  if (currentTime - lastSpawnTime >= ENEMY.spawnInterval) {
    lastSpawnTime = currentTime;
    return true;
  }
  return false;
};

export const createEnemy = () => {
  const x = Math.random() * (GAME.width - ENEMY.size);
  return {
    id: Date.now() + Math.random(),
    x,
    y: -ENEMY.size,
    active: true,
  };
};
