import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

import Ship from './src/entities/Ship';
import Enemy from './src/entities/Enemy';
import Bullet from './src/entities/Bullet';

import { startGyroscope, stopGyroscope } from './src/systems/gyroscope';
import { updateShipPosition, updateBulletPosition, updateEnemyPosition } from './src/systems/movement';
import { canShoot, createBullet, isBulletOffScreen } from './src/systems/shooting';
import { checkBulletEnemyCollision, checkShipEnemyCollision, isEnemyOffScreen } from './src/systems/collision';
import { canSpawnEnemy, createEnemy } from './src/systems/spawner';
import { loadSounds, playLaserSound, playExplosionSound, unloadSounds } from './src/utils/sounds';

import ScoreDisplay from './src/ui/ScoreDisplay';
import LivesDisplay from './src/ui/LivesDisplay';
import GameOver from './src/ui/GameOver';
import StartScreen from './src/ui/StartScreen';
import { GAME_STATE, INITIAL_LIVES, GAME, SHIP } from './src/constants';

let GameWidget = null;
if (Platform.OS === 'ios') {
  try {
    GameWidget = require('./src/widgets/GameWidget').default;
  } catch (e) {
    console.log('Widget not available');
  }
}

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATE.START);
  const [ship, setShip] = useState({ x: GAME.width / 2 - 20, y: GAME.height - 150 });
  const [enemies, setEnemies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [highScore, setHighScore] = useState(0);

  const gameLoopRef = useRef(null);
  const lastTimeRef = useRef(0);
  const shipRef = useRef(ship);
  const enemiesRef = useRef(enemies);
  const bulletsRef = useRef(bullets);

  shipRef.current = ship;
  enemiesRef.current = enemies;
  bulletsRef.current = bullets;

  useEffect(() => {
    loadSounds();
    return () => {
      unloadSounds();
      stopGyroscope();
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameState === GAME_STATE.PLAYING) {
      startGyroscope((data) => {
        const newShipPos = updateShipPosition(shipRef.current, data, 1);
        setShip(newShipPos);
      });
      lastTimeRef.current = Date.now();
      gameLoop();
    } else {
      stopGyroscope();
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    }
  }, [gameState]);

  const gameLoop = () => {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTimeRef.current) / 16;
    lastTimeRef.current = currentTime;

    if (canSpawnEnemy(currentTime)) {
      const newEnemy = createEnemy();
      setEnemies((prev) => [...prev, newEnemy]);
    }

    setBullets((prev) =>
      prev
        .map((bullet) => updateBulletPosition(bullet, deltaTime))
        .filter((bullet) => !isBulletOffScreen(bullet))
    );

    setEnemies((prev) =>
      prev
        .map((enemy) => updateEnemyPosition(enemy, deltaTime))
        .filter((enemy) => !isEnemyOffScreen(enemy))
    );

    checkCollisions();

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const checkCollisions = () => {
    bulletsRef.current.forEach((bullet) => {
      enemiesRef.current.forEach((enemy) => {
        if (checkBulletEnemyCollision(bullet, enemy)) {
          playExplosionSound();
          setScore((prev) => prev + 10);
          setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
          setBullets((prev) => prev.filter((b) => b.id !== bullet.id));
        }
      });
    });

    enemiesRef.current.forEach((enemy) => {
      if (checkShipEnemyCollision(shipRef.current, enemy)) {
        setLives((prev) => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setHighScore((prevHigh) => Math.max(prevHigh, score));
            setGameState(GAME_STATE.GAME_OVER);
          }
          return newLives;
        });
        setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
      }
    });
  };

  const handleTap = (event) => {
    if (gameState !== GAME_STATE.PLAYING) return;

    const currentTime = Date.now();
    if (canShoot(currentTime)) {
      playLaserSound();
      const newBullet = createBullet(ship.x, ship.y);
      setBullets((prev) => [...prev, newBullet]);

      if (Platform.OS === 'ios' && GameWidget) {
        GameWidget.update({ score, lives, highScore, isPlaying: true });
      }
    }
  };

  const startGame = () => {
    setGameState(GAME_STATE.PLAYING);
    setShip({ x: GAME.width / 2 - 20, y: GAME.height - 150 });
    setEnemies([]);
    setBullets([]);
    setScore(0);
    setLives(INITIAL_LIVES);
  };

  const tapGesture = Gesture.Tap().onEnd(() => {
    handleTap();
  });

  if (gameState === GAME_STATE.START) {
    return <StartScreen onStart={startGame} />;
  }

  if (gameState === GAME_STATE.GAME_OVER) {
    return (
      <GameOver
        score={score}
        highScore={highScore}
        onRestart={startGame}
      />
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.gameArea}>
          <ScoreDisplay score={score} />
          <LivesDisplay lives={lives} />
          <Ship x={ship.x} y={ship.y} />
          {enemies.map((enemy) => (
            <Enemy key={enemy.id} x={enemy.x} y={enemy.y} />
          ))}
          {bullets.map((bullet) => (
            <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
          ))}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
