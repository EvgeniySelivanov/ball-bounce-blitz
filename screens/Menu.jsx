import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const Space = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  padding: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: blue;
`;

const StyledText = styled.Text`
  margin-top: 10px;
  color: #cbceca;
  font-size: 30px;
  font-weight: 700;
  border: 2px yellow solid;
  padding: 7px;
  border-radius: 5px;
`;
const StyledMenu = styled.Text`
  margin-top: 10px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const Span=styled.Text`
 margin-top: 10px;
  color: #29f505;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const Menu = () => {
  const [speed, setSpeed] = useState(5);
  const [size, setSize] = useState(75);

  const changeSpeed =  () => {
    setSpeed((speed) => speed * 2);
    // console.log('speed>>', speed);
    // await navigation.navigate('BallBlitz', {speed,size});
  };
  const play = () => {
    navigation.navigate('BallBlitz', {speed,size});
  };
  const changeSize =() => {
     setSize((size) => size + 25);
    //  console.log('size>>', size);
    //  navigation.navigate('BallBlitz', { speed,size });
    
  };
  const defaultOption = () => {
    setSpeed(5);
    setSize(75);
    
  };
  const navigation = useNavigation();
  return (
    <Space colors={['rgba(124,189,214,1) 0%', 'rgba(34,108,223,1) 28%']}>
      <StyledMenu>Menu</StyledMenu>
      <StyledText onPress={play}>Play</StyledText>
      <StyledText onPress={changeSpeed}>Game speed X2:  <Span>{speed}</Span></StyledText>
      <StyledText onPress={changeSize}>Increase {`\n`}platform size: <Span>{size}</Span></StyledText>
      <StyledText onPress={defaultOption}>Reset options</StyledText>
    </Space>
  );
};

export default Menu;
