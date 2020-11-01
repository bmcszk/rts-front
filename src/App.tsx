import React from 'react';
import './reset.css';
import './App.css';
import Game from './game/components/Game';
import { initStore } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={initStore()}>
        <Game />
    </Provider>
  );
}

export default App;
