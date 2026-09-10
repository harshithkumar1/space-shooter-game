import { SHIP, ENEMY } from '../constants';

export const checkBulletEnemyCollision = (bullet, enemy) => {
  const bulletCenterX = bullet.x + 2;
  const bulletCenterY = bullet.y + 7;

  const enemyCenterX = enemy.x + ENEMY.size / 2;
  const enemyCenterY = enemy.y + ENEMY.size / 2;

  const distance = Math.sqrt(
    Math.pow(bulletCenterX - enemyCenterX, 2) +
    Math.pow(bulletCenterY - enemyCenterY, 2)
  );

  return distance < (ENEMY.size / 2 + 10);
};

export const checkShipEnemyCollision = (ship, enemy) => {
  const shipCenterX = ship.x + SHIP.size / 2;
  const shipCenterY = ship.y + SHIP.size / 2;

  const enemyCenterX = enemy.x + ENEMY.size / 2;
  const enemyCenterY = enemy.y + ENEMY.size / 2;

  const distance = Math.sqrt(
    Math.pow(shipCenterX - enemyCenterX, 2) +
    Math.pow(shipCenterY - enemyCenterY, 2)
  );

  return distance < (SHIP.size / 2 + ENEMY.size / 2);
};

export const isEnemyOffScreen = (enemy) => {
  return enemy.y > 800;
};
