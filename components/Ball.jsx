import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components/native';




const Ball = ({ ballBottom, ballLeft }) => {
  const ballDiameter = 50;
  const bgBall = require('../assets/ball.png');
console.log(ballBottom);
const BallStyle=styled(ImageBackground)`
position: absolute;
width: ${ballDiameter}px;
height: ${ballDiameter}px;
left: ${ballLeft-(ballDiameter/2)}px;
 bottom: ${ballBottom-(ballDiameter/2)}px; 
z-index: 11;
`;
  return (
    
      <BallStyle source={bgBall}>
        {/* Контент компонента */}
      </BallStyle>
    
  );
};

export default Ball;
