import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StartScreen = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPACE</Text>
      <Text style={styles.subtitle}>SHOOTER</Text>
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>TILT to move left/right</Text>
        <Text style={styles.instructionText}>TAP anywhere to shoot</Text>
        <Text style={styles.instructionText}>Hold BOOST to go up</Text>
        <Text style={styles.instructionText}>Release BOOST to fall down</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>START GAME</Text>
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
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 20,
  },
  subtitle: {
    fontSize: 32,
    color: '#FFFFFF',
    letterSpacing: 15,
    marginBottom: 60,
  },
  instructions: {
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 12,
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

export default StartScreen;
