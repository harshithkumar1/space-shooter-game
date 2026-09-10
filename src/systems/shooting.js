import { BULLET, GAME } from '../constants';

let lastShotTime = 0;
const SHOOT_COOLDOWN = 300;

export const canShoot = (currentTime) => {
  if (currentTime - lastShotTime >= SHOOT_COOLDOWN) {
    lastShotTime = currentTime;
    return true;
  }
  return false;
};

export const createBullet = (shipX, shipY) => {
  return {
    id: Date.now() + Math.random(),
    x: shipX + 18,
    y: shipY - 10,
    active: true,
  };
};

export const isBulletOffScreen = (bullet) => {
  return bullet.y < -20;
};
