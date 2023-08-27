import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ImageBackground, Dimensions } from 'react-native';
import Platform from '../components/Platform';
import styled from 'styled-components/native';
import Obstacles from '../components/Obstacles';
import UpgradePlatform from '../components/UpgradePlatform';
import StartMessage from '../components/StartMessage';
import Ball from '../components/Ball';
const bgImage = require('../assets/backGround.png');

const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const StyledText = styled.Text`
  position: absolute;
  top: 43px;
  left: 110px;
  color: #31aa02;
  font-size: 50px;
  font-weight: 700;
`;

const BallBlitz = () => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [isGameOver, setIsGameOver] = useState(false);
  const ballLeft = screenWidth / 2 ;
  const [ballBottom, setBallBottom]= useState(screenHeight / 2)
  const [platformPosition, setPlatformPosition] = useState({ x: 175, y: 490 });
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState({ quantity: 0, visibility: true });
  const [bonusPosition, setBonusPosition] = useState({
    x: screenWidth / 2 - 25,
    y: 350,
  });
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesHeight, setObstaclesHeight] = useState(100);
  let obstaclesTimerId;
  let bonusTimerId;
  let gameTimerId;
  const gap = 100;
  const obstacleSpeed = 5;
  const gravity = 3;
  let renderSpeed = 30;

  const platformValueChange = (xPosition) => {
    setPlatformPosition((platformPosition) => ({
      ...platformPosition,
      x: xPosition,
    }));
  };

  useEffect(() => {
    if (ballBottom > 0&& isGameOver) {
      gameTimerId = setInterval(() => {
        setBallBottom(ballBottom => ballBottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId);
      }
    }
  }, [ballBottom,isGameOver])
  
  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60 && isGameOver) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - obstacleSpeed);
      }, renderSpeed);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesLeft(screenWidth);
      setObstaclesHeight(Math.floor(Math.random() * (284 + 1)));
      setBonusPosition((bonusPosition) => ({
        ...bonusPosition,
        x: Math.floor(Math.random() * (350 + 1)),
      }));
    }
  }, [isGameOver, obstaclesLeft]);

  useEffect(() => {
    if (obstaclesLeft < screenWidth && isGameOver) {
      bonusTimerId = setInterval(() => {
        setBonusPosition((bonusPosition) => ({
          ...bonusPosition,
          y: obstaclesLeft + 150,
        }));
      }, renderSpeed);
      return () => {
        clearInterval(bonusTimerId);
      };
    }
  }, [obstaclesLeft]);
  
  useEffect(() => {
    if ((obstaclesLeft-150) > platformPosition.y && isGameOver) {
      setBonus((bonus) => ({
        ...bonus,
        visibility: true,
      }));
    }
  }, [obstaclesLeft]);


  //check collisions
  useEffect(() => {
    if (
      (platformPosition.x <= obstaclesHeight - 25 ||
        platformPosition.x >= obstaclesHeight+ gap + 25) &&
      platformPosition.y <= obstaclesLeft + 30 &&
      obstaclesLeft < platformPosition.y + 100
    ) {
      console.log('game over');
      gameOver();
    }
  }, [obstaclesLeft]);

  useEffect(() => {
    if (
      bonusPosition.x >= platformPosition.x - 50 &&
      bonusPosition.x <= platformPosition.x + 50 &&
      bonusPosition.y >= platformPosition.y &&
      bonusPosition.y <= platformPosition.y + 15
    ) {
      clearInterval(bonusTimerId);
      setBonus((bonus) => ({
        ...bonus,
        quantity: bonus.quantity + 1,
        visibility: false,
      }));
    }
  }, [bonusPosition]);

  const gameOver = () => {
    clearInterval(bonusTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(gameTimerId);
    setScore(0);
    setBonus((bonus) => ({
      ...bonus,
      quantity: 0,
    }));
    setBonusPosition({
      x: screenWidth / 2 - 25,
      y: 150,
    });
    setObstaclesLeft(0);
    setObstaclesHeight(100);
    setIsGameOver(false);
  };
  const startGame = () => {
    console.log('game start');
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={startGame}>
    <Space source={bgImage}>
      <Ball ballBottom={ballBottom} ballLeft={ballLeft}/>
      <Obstacles
        leftCoordinate={obstaclesLeft}
        gap={gap}
        screenHeight={screenHeight}
        obstaclesHeight={obstaclesHeight}
      />
      {bonus.visibility && <UpgradePlatform bonusPosition={bonusPosition} />}
      <StyledText>Score:{isGameOver?(score + bonus.quantity):0}</StyledText>
      <StartMessage isGameOver={isGameOver}/>
      <Platform platformValueChange={platformValueChange} />
      
    </Space>
    </TouchableWithoutFeedback>
  );
};


export default BallBlitz;
