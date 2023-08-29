import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Platform from '../components/Platform';
import styled from 'styled-components/native';
import Obstacles from '../components/Obstacles';
import Bonus from '../components/Bonus';
import StartMessage from '../components/StartMessage';
import Ball from '../components/Ball';
import Header from '../components/Header';
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
  const route = useRoute();
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const [isGameOver, setIsGameOver] = useState(false);
  const ballLeft = screenWidth / 3;
  const [ballBottom, setBallBottom] = useState(screenHeight / 2);
  const [jumpPower, setJumpPower] = useState(50);
  const [platformPosition, setPlatformPosition] = useState({ x: 175, y: 490 });
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState({ quantity: 0, visibility: true });
  const [bonusPosition, setBonusPosition] = useState({
    x: screenWidth / 1.3 - 25,
    y: Math.floor(Math.random() * (490 - 300 + 1)) + 300,
  });
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesHeight, setObstaclesHeight] = useState(100);
  let obstaclesTimerId;
  let bonusTimerId;
  let gameTimerId;
  const gap = 250;
  const obstacleSpeed = route.params.speed;
  const gravity = route.params.speedBall;
  let renderSpeed = 20;
  let ballTop = screenHeight - ballBottom - 50;
  //position platform
  const platformValueChange = (xPosition) => {
    setPlatformPosition((platformPosition) => ({
      ...platformPosition,
      x: xPosition,
    }));
  };
  //ball drop
  useEffect(() => {
    if (ballBottom > 0 && isGameOver) {
      gameTimerId = setInterval(() => {
        setBallBottom((ballBottom) => ballBottom - gravity);
      }, 10);
      setJumpPower(Math.floor(Math.random() * (200 - 50 + 1)) + 50);
      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [ballBottom, isGameOver]);

  //start  obstacles
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
      setObstaclesHeight(Math.floor(Math.random() * (400 - 300 + 1)) + 300);
      setBonusPosition((bonusPosition) => ({
        ...bonusPosition,
        x: Math.floor(Math.random() * (350 + 1)),
      }));
      soundObject.unloadAsync();
    }
  }, [isGameOver, obstaclesLeft]);

  //bonus position
  useEffect(() => {
    if (obstaclesLeft < screenWidth && isGameOver) {
      bonusTimerId = setInterval(() => {
        setBonusPosition((bonusPosition) => ({
          ...bonusPosition,
          x: obstaclesLeft - 150,
        }));
      
      }, renderSpeed);
      return () => {
        clearInterval(bonusTimerId);
      };
    }
  }, [obstaclesLeft]);

  //bonus used
  useEffect(() => {
    if (
      bonusPosition.x >= ballLeft-30 &&
      bonusPosition.x <= ballLeft+ 80 &&
      bonusPosition.y >= ballTop &&
      bonusPosition.y <= ballTop + 50
    ) {
      clearInterval(bonusTimerId);
      if(bonus.visibility){
        setBonus((bonus) => ({
        ...bonus,
        quantity: bonus.quantity + 1,
        visibility: false,
      }));
      playSound2();
    }
      
    }
  }, [bonusPosition]);

  //bonus visibility
  useEffect(() => {
    if (obstaclesLeft - 150 > ballLeft+50 && isGameOver) {
      setBonus((bonus) => ({
        ...bonus,
        visibility: true,
      }));
    }
  }, [obstaclesLeft]);

  //jump event
  useEffect(() => {
    if (
      platformPosition.x <= ballLeft - 25 &&
      ballLeft <= platformPosition.x + 75 &&
      platformPosition.y >= ballBottom &&
      ballBottom <= 300
    ) {
      jump();
      playSound();
    }
  }, [ballBottom]);

  //jump function
  const jump = () => {
    if (isGameOver && ballBottom < screenHeight) {
      setBallBottom((ballBottom) => ballBottom + jumpPower);
      console.log('jumped');
    }
  };

  //sound effect
  const soundObject = new Audio.Sound();
  const playSound = async () => {
    console.log('play shot');
    try {
      await soundObject.loadAsync(require('../assets/sound.mp3'));
      await soundObject.playAsync();
      // Обязательно выгрузите звуковой объект после воспроизведения
      await soundObject.unloadAsync();
    } catch (error) {
      console.log('Sound error>>>', error);
    }
  };
  const soundObject2 = new Audio.Sound();
  const playSound2 = async () => {
    console.log('play bonus');
    try {
      await soundObject2.loadAsync(require('../assets/bonus.mp3'));
      await soundObject2.playAsync();
      // Обязательно выгрузите звуковой объект после воспроизведения
      await soundObject2.unloadAsync();
    } catch (error) {
      console.log('Sound error>>>', error);
    }
  };  
  //check for collisions
  useEffect(() => {
    if (
      (ballBottom <= obstaclesHeight - 25 ||
        ballBottom >= obstaclesHeight + gap + 25 ||
        ballBottom < 250) &&
      obstaclesLeft > ballLeft - 25 &&
      obstaclesLeft < ballLeft + 25
    ) {
      console.log('game over');
      gameOver();
    }
  });

  const gameOver = () => {
    soundObject.unloadAsync();
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
      y: Math.floor(Math.random() * (490 - 300 + 1)) + 300,
    });
    setObstaclesLeft(0);
    setObstaclesHeight(100);
    setIsGameOver(false);
  };
  const startGame = () => {
    console.log('game start');
    setBallBottom(screenHeight / 2);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <Header gameOver={gameOver} />
        <Ball ballBottom={ballBottom} ballLeft={ballLeft} />
        <Obstacles
          leftCoordinate={obstaclesLeft}
          gap={gap}
          screenHeight={screenHeight}
          obstaclesHeight={obstaclesHeight}
        />
        {bonus.visibility && <Bonus bonusPosition={bonusPosition} />}
        <StyledText>Score:{isGameOver ? score + bonus.quantity : 0}</StyledText>
        <StartMessage isGameOver={isGameOver} />
        <Platform
          platformValueChange={platformValueChange}
          platformWidth={route.params.size ? route.params.size : 75}
        />
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default BallBlitz;
