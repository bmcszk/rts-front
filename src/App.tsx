import React from 'react';
import {RecoilRoot} from 'recoil';
import './App.css';
import Game from './game/components/Game';

function App() {
  return (
    <RecoilRoot>
        <Game />
    </RecoilRoot>
  );
}

export default App;
