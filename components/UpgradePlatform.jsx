import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

const bgImage = require('../assets/bonus.png');

const UpgradePlatform = ({ bonusPosition }) => {
  const MyUpgradePlatform = styled(ImageBackground)`
  position: 'absolute';
  top: ${bonusPosition.y}px;
  left: ${bonusPosition.x}px;
  width: 50px;
  height: 50px;
  z-index: 10;
`;

  return (
    <View>
      <MyUpgradePlatform source={bgImage}>
        {/* Контент компонента */}
      </MyUpgradePlatform>
    </View>
  );
};
export default UpgradePlatform;
