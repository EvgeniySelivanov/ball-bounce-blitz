import React, { useState } from 'react';

import { View, StyleSheet, PanResponder, ImageBackground } from 'react-native';

const bgImage = require('../assets/platform.png');

const Platform = ({ platformValueChange, platformWidth }) => {
  console.log(platformWidth);
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
      style={{
        position: 'absolute',
        width: platformWidth,
        height: 50,
        zIndex: 10,
         left: position.x, 
         top: 490 ,
      }}
      {...panResponder.panHandlers}
    >
      <ImageBackground
        source={bgImage}
        style={{ width: platformWidth, height: 50 }}
      >
        {/* Контент компонента */}
      </ImageBackground>
    </View>
  );
};
export default Platform;
