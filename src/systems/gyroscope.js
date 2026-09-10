import { Gyroscope } from 'expo-sensors';

let subscription = null;
let gyroscopeData = { x: 0, y: 0, z: 0 };

export const startGyroscope = (callback) => {
  Gyroscope.setUpdateInterval(16);
  subscription = Gyroscope.addListener((data) => {
    gyroscopeData = data;
    if (callback) callback(data);
  });
};

export const stopGyroscope = () => {
  if (subscription) {
    subscription.remove();
    subscription = null;
  }
};

export const getGyroscopeData = () => gyroscopeData;
