/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Game from './Game';

const App = () => {
  const [gameId, setGameId] = useState(1);
  const handlePlayAgain = ()=> {
    setGameId(gameId+1)
  }
    return <Game key={gameId} time={10} randomNumberCount={6} onPlayAgain={handlePlayAgain}/>;
}

export default App;
