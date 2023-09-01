import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

const bgImage = require('../assets/additionalObtacles.png');

const Bonus = ({ bonusPosition }) => {
  const MyBonus = styled(ImageBackground)`
  position: 'absolute';
  top: ${bonusPosition.y}px;
  left: ${bonusPosition.x}px;
  width: 75px;
  height: 75px;
  z-index: 10;
`;

  return (
    <View>
      <MyBonus source={bgImage}>
        {/* Контент компонента */}
      </MyBonus>
    </View>
  );
};
export default Bonus;
