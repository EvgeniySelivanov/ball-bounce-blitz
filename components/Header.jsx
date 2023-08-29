import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Header = ({gameOver}) => {
  const navigation = useNavigation();
  const goToMenu=()=>{
    gameOver();
     navigation.navigate('Menu');
  }
  return (
    <View style={styles.bg}>
      <Text style={styles.text} onPress={goToMenu}>MENU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg:{
    position:'absolute',
    padding:5,
    height:40,
    width:'100%',
    backgroundColor:'#9b21d3',
    textAlign:'center',
  },
  text:{
    textAlign:'center',
    fontSize:20,
   color:'white',
  }
})

export default Header;

