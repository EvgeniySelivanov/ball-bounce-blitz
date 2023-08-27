import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';



const Obstacles = ({leftCoordinate,gap,screenHeight,obstaclesHeight}) => {
  const Figure = styled(View)`
  position: 'absolute';
  height: ${obstaclesHeight}px;
  border: 2px solid #fffb23;
  background-color: #fffb23;
  left:${leftCoordinate}px;
  top: 0px;
  width:30px;
`;
const Figure2 = styled(View)`
  position: 'absolute';
  height:${screenHeight-gap-obstaclesHeight}px;
  border: 2px solid #fffb23;
  background-color: #fffb23;
  left: ${leftCoordinate}px;
  top:  ${obstaclesHeight+gap}px;
  width: 30px;
  margin-bottom:25px;
`;
  return (
    <>
      <Figure></Figure>
      <Figure2></Figure2>

    </>
  );
};

export default Obstacles;
