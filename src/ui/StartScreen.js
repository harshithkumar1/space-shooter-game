import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StartScreen = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPACE</Text>
      <Text style={styles.subtitle}>SHOOTER</Text>
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>TILT to move</Text>
        <Text style={styles.instructionText}>TAP to shoot</Text>
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
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 10,
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
