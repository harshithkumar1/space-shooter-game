import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LivesDisplay = ({ lives }) => {
  return (
    <View style={styles.container}>
      {[...Array(lives)].map((_, index) => (
        <View key={index} style={styles.triangle} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
  },
});

export default LivesDisplay;
