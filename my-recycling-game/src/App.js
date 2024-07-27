import React from 'react';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <StartScreen />
      <Game />
      <EndScreen />
    </div>
  );
}

export default App;
