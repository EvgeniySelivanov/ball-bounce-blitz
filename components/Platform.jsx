import React, { useState } from 'react';


import { View, StyleSheet, PanResponder, ImageBackground } from 'react-native';

const bgImage = require('../assets/platform.png');

const Platform = ({ platformValueChange }) => {
  const [position, setPosition] = useState({ x: 175, y: 490 });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      platformValueChange(gesture.moveX);
      if (gesture.moveX >= 10 && gesture.moveX <= 330)
        setPosition({
          x: gesture.moveX,
        });
    },
  });
  return (
    <View
      style={[styles.draggable, { left: position.x, top: 490 }]}
      {...panResponder.panHandlers}
    >
      <ImageBackground source={bgImage} style={styles.containerImg}>
        {/* Контент компонента */}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  draggable: {
    position: 'absolute',
    width: 75,
    height: 50,
    zIndex: 10,
  },
  containerImg: {
    width: 100,
    height: 50,
  },
});
export default Platform;
