import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

import Ship from './src/entities/Ship';
import Enemy from './src/entities/Enemy';
import Bullet from './src/entities/Bullet';

import { startGyroscope, stopGyroscope } from './src/systems/gyroscope';
import { updateShipPosition, updateBulletPosition, updateEnemyPosition } from './src/systems/movement';
import { canShoot, createBullet, isBulletOffScreen } from './src/systems/shooting';
import { checkBulletEnemyCollision, checkShipEnemyCollision, isEnemyOffScreen } from './src/systems/collision';
import { canSpawnEnemy, createEnemy } from './src/systems/spawner';

import ScoreDisplay from './src/ui/ScoreDisplay';
import LivesDisplay from './src/ui/LivesDisplay';
import GameOver from './src/ui/GameOver';
import StartScreen from './src/ui/StartScreen';
import { GAME_STATE, INITIAL_LIVES, GAME } from './src/constants';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATE.START);
  const [ship, setShip] = useState({ x: GAME.width / 2 - 20, y: GAME.height - 150 });
  const [enemies, setEnemies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [highScore, setHighScore] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);

  const gameLoopRef = useRef(null);
  const lastTimeRef = useRef(0);
  const shipRef = useRef(ship);
  const enemiesRef = useRef(enemies);
  const bulletsRef = useRef(bullets);
  const scoreRef = useRef(score);
  const isBoostingRef = useRef(isBoosting);

  shipRef.current = ship;
  enemiesRef.current = enemies;
  bulletsRef.current = bullets;
  scoreRef.current = score;
  isBoostingRef.current = isBoosting;

  useEffect(() => {
    return () => {
      stopGyroscope();
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameState === GAME_STATE.PLAYING) {
      startGyroscope((data) => {
        const newShipPos = updateShipPosition(shipRef.current, data, 1, isBoostingRef.current);
        setShip(newShipPos);
      });
      lastTimeRef.current = Date.now();
      runGameLoop();
    } else {
      stopGyroscope();
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }
  }, [gameState]);

  const runGameLoop = () => {
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

    gameLoopRef.current = requestAnimationFrame(runGameLoop);
  };

  const checkCollisions = () => {
    bulletsRef.current.forEach((bullet) => {
      enemiesRef.current.forEach((enemy) => {
        if (checkBulletEnemyCollision(bullet, enemy)) {
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
            setHighScore((prevHigh) => Math.max(prevHigh, scoreRef.current));
            setGameState(GAME_STATE.GAME_OVER);
          }
          return newLives;
        });
        setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
      }
    });
  };

  const handleShoot = useCallback(() => {
    if (gameState !== GAME_STATE.PLAYING) return;

    const currentTime = Date.now();
    if (canShoot(currentTime)) {
      const newBullet = createBullet(shipRef.current.x, shipRef.current.y);
      setBullets((prev) => [...prev, newBullet]);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState(GAME_STATE.PLAYING);
    setShip({ x: GAME.width / 2 - 20, y: GAME.height - 150 });
    setEnemies([]);
    setBullets([]);
    setScore(0);
    setLives(INITIAL_LIVES);
    setIsBoosting(false);
  };

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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.gameArea}
        activeOpacity={1}
        onPress={handleShoot}
      >
        <ScoreDisplay score={score} />
        <LivesDisplay lives={lives} />
        <Ship x={ship.x} y={ship.y} />
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} x={enemy.x} y={enemy.y} />
        ))}
        {bullets.map((bullet) => (
          <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
        ))}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.boosterButton,
          isBoosting && styles.boosterButtonActive
        ]}
        activeOpacity={0.7}
        onPressIn={() => setIsBoosting(true)}
        onPressOut={() => setIsBoosting(false)}
      >
        <Text style={styles.boosterText}>▲</Text>
        <Text style={styles.boosterLabel}>BOOST</Text>
      </TouchableOpacity>
    </View>
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
  boosterButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boosterButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  boosterText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  boosterLabel: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
