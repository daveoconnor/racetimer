import React from 'react';
import 'antd/dist/antd.css';
import RaceTimer from './components/raceTimer/raceTimer';
import RaceProvider from './contexts/raceContext';

function App() {
  return (
    <RaceProvider>
      <RaceTimer />
    </RaceProvider>
  );
}

export default App;
