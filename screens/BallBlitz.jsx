import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import { Audio } from 'expo-av';
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
  const route = useRoute();
  console.log('size platform>>>',route.params.size);
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [music, setMusic] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const ballLeft = screenWidth / 3;
  const [ballBottom, setBallBottom] = useState(screenHeight / 2);
  const [jumpPower, setJumpPower] = useState(50);
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
  const gap = 200;
  const obstacleSpeed = route.params.speed;
  const gravity = 15;
  let renderSpeed = 40;

  //position platform
  const platformValueChange = (xPosition) => {
    console.log(platformPosition.y);
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
      setJumpPower(Math.floor(Math.random() * (250 - 50 + 1)) + 50);
      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [ballBottom, isGameOver]);

  //start music
  useEffect(() => {
    if (music && isGameOver) {
      playMusic();
    }
  }, [isGameOver]);

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
      setObstaclesHeight(Math.floor(Math.random() * (284 + 1)));
      setBonusPosition((bonusPosition) => ({
        ...bonusPosition,
        x: Math.floor(Math.random() * (350 + 1)),
      }));
    }
  }, [isGameOver, obstaclesLeft]);
  //bonus position
  useEffect(() => {
    if (obstaclesLeft < screenWidth && isGameOver) {
      bonusTimerId = setInterval(() => {
        setBonusPosition((bonusPosition) => ({
          ...bonusPosition,
          y: obstaclesLeft - 150,
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
  //bonus visibility
  useEffect(() => {
    if (obstaclesLeft - 150 > platformPosition.y && isGameOver) {
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

  const playSound = async () => {
    console.log('play shot');
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sound.mp3'));
      await soundObject.playAsync();
      // Обязательно выгрузите звуковой объект после воспроизведения
      await soundObject.unloadAsync();
    } catch (error) {
      console.log('Ошибка при воспроизведении звука', error);
    }
  };

  const playMusic = async () => {
    console.log('music');
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/music.mp3'));
      await soundObject.playAsync();
      // Обязательно выгрузите звуковой объект после воспроизведения
      await soundObject.unloadAsync();
    } catch (error) {
      console.log('Ошибка при воспроизведении звука', error);
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

      // ||
      // ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      // birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
      // (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
      // )
    ) {
      console.log('game over');
      gameOver();
    }
  });

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
    setBallBottom(screenHeight / 2);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <Ball ballBottom={ballBottom} ballLeft={ballLeft} />
        <Obstacles
          leftCoordinate={obstaclesLeft}
          gap={gap}
          screenHeight={screenHeight}
          obstaclesHeight={obstaclesHeight}
        />
        {/*bonus.visibility && <UpgradePlatform bonusPosition={bonusPosition} />*/}
        <StyledText>Score:{isGameOver ? score + bonus.quantity : 0}</StyledText>
        <StartMessage isGameOver={isGameOver} />
        <Platform platformValueChange={platformValueChange} platformWidth={route.params.size} />
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default BallBlitz;
