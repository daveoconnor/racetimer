import React from 'react';
import 'antd/dist/antd.css';
import RaceTimer from './components/raceTimer/raceTimer';
import RaceProvider from './contexts/raceContext';
import LogProvider from './contexts/logContext';

function App() {
  return (
    <LogProvider>
    	<RaceProvider>
	    	<RaceTimer />
    	</RaceProvider>
	</LogProvider>
  );
}

export default App;
