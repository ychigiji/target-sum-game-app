import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import RandomNumber from './RandomNumber';

interface GameProps {
  randomNumberCount: number;
  time: number;
  onPlayAgain: () => void;
}

const generateRandomNumbers = (randomNumberCount: number) => {
  return Array.from({length: randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random())
  );
};

const Game = ({randomNumberCount, time, onPlayAgain}: GameProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [remainingTime, setRemainingTime] = useState(time);
  const [randomNumbers] = useState<number[]>(
    generateRandomNumbers(randomNumberCount)
  );
  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    if (remainingTime === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);

    // Clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  const handleNumberSelected = (numberIndex: any) => {
    setSelectedIds(prevSelectedNumbers => {
      if (prevSelectedNumbers?.includes(numberIndex)) {
        return prevSelectedNumbers.filter(num => num !== numberIndex);
      }
      return [...(prevSelectedNumbers || []), numberIndex];
    });
  };

  const gameStatus = useMemo(() => {
    const total = selectedIds.reduce(
      (accumulator, number) => randomNumbers[number] + accumulator,
      0
    );

    if (total === target) {
      return 'WON';
    }

    if (total < target && remainingTime > 0) {
      return 'PLAYING';
    }
    return 'LOST';
  }, [selectedIds, remainingTime, target, randomNumbers]);

  useEffect(() => {
    const status = gameStatus;
    if (status === 'WON') {
      setRemainingTime(0);
    }
  }, [gameStatus]);

  return (
    <View style={styles.container}>
     {gameStatus === 'PLAYING' && <Text style={styles.remainingTime}>{ `Remaining Time: ${remainingTime}` }</Text> }
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={selectedIds.includes(index) || gameStatus !== 'PLAYING'}
            onPress={() => handleNumberSelected(index)}
          />
        ))}
      </View>
      {gameStatus !== 'PLAYING' && (
        <Button onPress={onPlayAgain} title={'Play again'} color={'green'}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  remainingTime:{
    fontSize: 25,
    marginHorizontal: 50,
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 100
  },
  target: {
    fontSize: 50,
    marginHorizontal: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center'
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  }
});
export default Game;
