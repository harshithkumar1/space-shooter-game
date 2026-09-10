import React from 'react';
import { View } from 'react-native';
import { BULLET } from '../constants';

const Bullet = ({ x, y }) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: BULLET.width,
        height: BULLET.height,
        backgroundColor: BULLET.color,
        borderRadius: 2,
      }}
    />
  );
};

export default Bullet;
