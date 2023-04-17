import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface RandomNumberProps{
  number:number, 
  id:number, 
  isDisabled:Boolean, 
  onPress: (id:number) => void
}
const RandomNumber = ({number, id, isDisabled, onPress}:RandomNumberProps) =>{
  const handlePress = () => {
    if (isDisabled) { return }
    onPress(id);
  };

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.random, isDisabled && styles.disabled]}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 50,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#999',
  },
});
export default RandomNumber;
