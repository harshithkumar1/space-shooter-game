import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameOver = ({ score, highScore, onRestart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
      <Text style={styles.score}>SCORE: {score}</Text>
      <Text style={styles.highScore}>HIGH SCORE: {highScore}</Text>
      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>PLAY AGAIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  score: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  highScore: {
    fontSize: 24,
    color: '#888888',
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GameOver;
