import React, { useContext, useReducer } from 'react';
import _ from 'lodash';

import { LogContext } from './logContext';
export const RaceContext = React.createContext();
let logger = null;

const raceReducer = (state, action) => {
	const createBoat = (boatNumber, startTime) => {
		return {
			boatNumber: boatNumber,
			startTime: startTime,
			stopTime: null
		};
	}
	const createBoats = (numberOfBoats) => {
		const startTime = Date.now();
		const boats = {}
		for (let i = 1; i < action.payload.numberOfBoats + 1; i++) {
			boats[i] = createBoat(i, startTime);
		}
		return boats;
	}
	switch(action.type) {
		case 'startAllBoats':
			const numberOfBoats = action.payload.numberOfBoats;
			const allStartTimes = action.payload.startTime;
			const allBoats = createBoats(numberOfBoats, allStartTimes);
			_.each(allBoats, boat => logger.log('allBoats, boat number ' + boat.boatNumber + ' marked as started at ' + boat.startTime));
			return { ...state, boats: allBoats };
		case 'startBoat':
			const boatNumber = action.payload.boatNumber;
			const boatStartTime = action.payload.startTime;
			const boats = state.boats;
			const newBoat = createBoat(boatNumber, boatStartTime);
			boats[boatNumber] = newBoat;
			logger.log('startBoat: boat number ' + newBoat.boatNumber + ' marked as started at ' + newBoat.startTime);
			return { ...state, boats: boats };
		case 'stopBoat':
			const existingBoat = state.boats[action.payload.boatNumber];
			existingBoat.stopTime = action.payload.stopTime;
			logger.log('stopBoat: boat number ' + existingBoat.boatNumber + ' marked as stopped at ' + existingBoat.stopTime);
			return {...state};
		default:
			return state;
	}
};

export default function RaceProvider({client, children}) {
	logger = useContext(LogContext);
	const defaultState = {
		boats: {}
	};
	const [state, dispatch] = useReducer(raceReducer, defaultState);
	const startBoat = (boatNumber) => {
		dispatch({
			type: 'startBoat',
			payload: {
				boatNumber: boatNumber,
				startTime: Date.now()
			}
		});
	}

	const startAllBoats = (numberOfBoats) => {
		dispatch({
			type: 'startAllBoats',
			payload: {
				numberOfBoats: numberOfBoats,
				startTime: Date.now()
			}
		});
	}

	const stopBoat = (boatNumber) => {
		dispatch({
			type: 'stopBoat',
			payload: {
				boatNumber: boatNumber,
				stopTime: Date.now()
			}
		});
	}

	const raceDataExists = (raceNumber) => {
		let raceData = JSON.parse(localStorage.getItem('raceData'));
		return raceData !== null && raceData[raceNumber] !== undefined;
	};

	const saveRace = (raceNumber) => {
		let raceData = JSON.parse(localStorage.getItem('raceData'));
		if (!raceData) {
			raceData = {};
		}
		raceData[raceNumber] = state;
		localStorage.setItem('raceData', JSON.stringify(raceData));
		logger.log('race data saved for race ' + raceNumber);
	};

	return (
		<RaceContext.Provider value={{
			state: state,
			startBoat: startBoat,
			startAllBoats: startAllBoats,
			stopBoat: stopBoat,
			saveRace: saveRace,
			raceDataExists: raceDataExists,
		}}>
			{children}
		</RaceContext.Provider>
	);
}
