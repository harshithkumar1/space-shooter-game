import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ScoreDisplay = ({ score }) => {
  return (
    <Text style={styles.score}>SCORE: {score}</Text>
  );
};

const styles = StyleSheet.create({
  score: {
    position: 'absolute',
    top: 50,
    left: 20,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default ScoreDisplay;
