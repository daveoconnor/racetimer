import React, { useContext, useEffect, useCallback } from 'react';
import _ from 'lodash';

import BoatTable from '../boatTable/boatTable';
import { RaceContext } from '../../contexts/raceContext';
import './raceTimer.css';

export default function RaceTimer() {
	const raceCtxt = useContext(RaceContext);

	const startAllBoatsRacing = useCallback(() => {
		raceCtxt.startAllBoats(6);
	}, [raceCtxt]);

	const toggleRace = useCallback((boatNumber) => {
		if (_.find(raceCtxt.state.boats, b => b.boatNumber === boatNumber)) {
			raceCtxt.stopBoat(boatNumber);
		}
		else {
			raceCtxt.startBoat(boatNumber);
		}
	}, [raceCtxt]);

	useEffect(() => {
		const attainFocus = () => {
			const wrapper = document.querySelector('.race-timer-wrapper');
			wrapper.focus();
		}
		const buttonPress = e => {
			const numKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
			if (e.altKey) {
				if (numKeys.includes(e.key)) {
					const boatNumber = parseInt(e.key, 10);
					toggleRace(boatNumber);
				}
				if (e.key === 'a') {
					startAllBoatsRacing();
				}
			}
		}
		window.addEventListener('keydown', buttonPress);
		attainFocus();

		return () => {
			window.removeEventListener('keydown', buttonPress);
		}
	}, [toggleRace, startAllBoatsRacing]);

	return (
		<div tabIndex="0" className="race-timer-wrapper">
			<header><h1>Race timer</h1></header>
			<section className="focus-status">
				<div className="active">Active</div>
				<div className="inactive">Inactive</div>
			</section>
			<section id="instructions">
				<dl>
					<dt>Start all boats racing</dt>
					<dd>Alt + a</dd>
					<dt>Start/stop timing a boat</dt>
					<dd>Alt + $num</dd>
				</dl>
			</section>
			<section id="command-log">
				context here for logs
			</section>
			<section id="main">
				<BoatTable />
			</section>
		</div>
	)
}
