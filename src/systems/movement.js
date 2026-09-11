import { GAME, SHIP } from '../constants';

export const updateShipPosition = (ship, gyroscopeData, deltaTime, isBoosting) => {
  const sensitivity = 3;
  const boostSpeed = 6;
  const gravity = 2;

  let newX = ship.x + gyroscopeData.y * sensitivity * deltaTime;

  let newY;
  if (isBoosting) {
    newY = ship.y - boostSpeed * deltaTime;
  } else {
    newY = ship.y + gravity * deltaTime;
  }

  newX = Math.max(0, Math.min(newX, SHIP.maxX));
  newY = Math.max(SHIP.minY, Math.min(newY, SHIP.maxY));

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
