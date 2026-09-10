import React from 'react';
import { View } from 'react-native';
import { ENEMY } from '../constants';

const Enemy = ({ x, y }) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: ENEMY.size,
        height: ENEMY.size,
        backgroundColor: ENEMY.color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  );
};

export default Enemy;
