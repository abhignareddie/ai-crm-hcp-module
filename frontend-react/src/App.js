import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LogInteraction from './components/LogInteraction';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LogInteraction />
      </div>
    </Provider>
  );
}

export default App;