import { GAME, SHIP } from '../constants';

export const updateShipPosition = (ship, gyroscopeData, deltaTime) => {
  const sensitivity = 3;
  let newX = ship.x + gyroscopeData.y * sensitivity * deltaTime;
  let newY = ship.y - gyroscopeData.x * sensitivity * deltaTime;

  newX = Math.max(0, Math.min(newX, SHIP.maxX));
  newY = Math.min(SHIP.maxY, Math.max(newY, SHIP.minY));

  return { x: newX, y: newY };
};

export const updateBulletPosition = (bullet, deltaTime) => {
  return {
    ...bullet,
    y: bullet.y - 10 * deltaTime,
  };
};

export const updateEnemyPosition = (enemy, deltaTime) => {
  return {
    ...enemy,
    y: enemy.y + 3 * deltaTime,
  };
};
