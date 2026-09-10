import React from 'react';
import { View } from 'react-native';
import { SHIP } from '../constants';

const Ship = ({ x, y }) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        borderLeftWidth: SHIP.size / 2,
        borderRightWidth: SHIP.size / 2,
        borderBottomWidth: SHIP.size,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: SHIP.color,
      }}
    />
  );
};

export default Ship;
