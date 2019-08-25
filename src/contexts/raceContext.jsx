import React, { useReducer } from 'react';

export const RaceContext = React.createContext();

const reducer = (state, action) => {
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
			boats[i] = (createBoat(i, startTime));
		}
		return boats;
	}
	switch(action.type) {
		case 'startAllBoats':
			const allBoats = createBoats(action.payload.numberOfBoats);
			return { ...state, boats: allBoats };
		case 'startBoat':
			const boatNumber = action.payload.boatNumber;
			const boats = state.boats;
			boats[boatNumber] = createBoat(boatNumber, Date.now());
			return { ...state, boats: boats };
		case 'stopBoat':
			const existingBoat = state.boats[action.payload.boatNumber];
			existingBoat.stopTime = Date.now()
			return {...state};
		default:
			return {...state};
	}
}

export default function RaceProvider({client, children}) {
	const defaultState = {
		boats: {}
	};
	const [state, dispatch] = useReducer(reducer, defaultState);
	const startBoat = (boatNumber) => {
		dispatch({type: 'startBoat', payload: { boatNumber: boatNumber }})
	}

	const startAllBoats = (numberOfBoats) => {
		dispatch({type: 'startAllBoats', payload: { numberOfBoats: 6 }})
	}

	const stopBoat = (boatNumber) => {
		dispatch({type: 'stopBoat', payload: { boatNumber: boatNumber }})
	}

	return (
		<RaceContext.Provider value={{
			state: state,
			startBoat: startBoat,
			startAllBoats: startAllBoats,
			stopBoat: stopBoat,
		}}>
			{children}
		</RaceContext.Provider>
	);
}
