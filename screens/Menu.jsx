import React, { useState, useEffect } from 'react';
import { View, Text,ImageBackground, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
const Space = styled(ImageBackground)`
  flex: 1;
  justify-content:center;
  /* align-items:center; */
  margin-top: 25px;
  margin-bottom: 25px;
  background-color:blue;
`;

const StyledText = styled.Text`
 
  margin-top:10px;
  color: #31aa02;
  font-size: 50px;
  font-weight: 700;
  border:2px yellow solid;
  padding:7px;
  border-radius:5px;
`;
const Menu = () => {

 const [speed,setSpeed]=useState(5);
 const [size,setSize]=useState(75);

  const changeSpeed=async ()=>{
   await setSpeed((speed) => speed*2);
   
   await navigation.navigate('BallBlitz', { speed ,size});
  }
  const play=()=>{
    navigation.navigate('BallBlitz',{speed ,size});
  }
  const changeSize=async ()=>{
    await setSize((size) => size+25);
   
   await navigation.navigate('BallBlitz', { size ,speed});

  }
  const defaultOption=async()=>{
    await setSpeed(5);
    await setSize(75);
    console.log('speed&size>>', `${speed}&${size}`);
  }
  const navigation = useNavigation();
  return (
    <Space>
      <StyledText onPress={play}>Play</StyledText>
      <StyledText onPress={changeSpeed}>Game speed X2</StyledText>
      <StyledText onPress={changeSize}>Increase platform size</StyledText>
      <StyledText onPress={defaultOption}>Default option</StyledText>
    </Space>
  );
};

export default Menu;
