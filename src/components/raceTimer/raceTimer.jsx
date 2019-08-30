import React, { useContext, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Modal } from 'antd';

import { LogContext } from '../../contexts/logContext';
import { RaceContext } from '../../contexts/raceContext';
import BoatTable from '../boatTable/boatTable';
import LogList from '../logList/logList';
import ResultsView from '../resultsView/resultsView';
import RaceSettings from '../raceSettings/raceSettings';
import './raceTimer.css';

export default function RaceTimer() {
	const raceCtxt = useContext(RaceContext);
	const logger = useContext(LogContext);
	const [numberOfBoats, setNumberOfBoats] = useState(1);
	const [raceStarted, setRaceStarted] = useState(false);
	const { confirm } = Modal;

	const startAllBoatsRacing = useCallback(() => {
		raceCtxt.startAllBoats(numberOfBoats);
	}, [raceCtxt, numberOfBoats]);

	useEffect(() => {
		logger.log('Number of boats in this race set to ' + numberOfBoats);
	}, [numberOfBoats]);	// eslint-disable-line react-hooks/exhaustive-deps

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
				if (numKeys.includes(e.key) || e.key === 'a'){
					setRaceStarted(true);
				}
				if (numKeys.includes(e.key)) {
					const boatNumber = parseInt(e.key, 10);
					toggleRace(boatNumber);
				}
				if (e.key === 'a') {
					if (!raceStarted) {
						startAllBoatsRacing();
					}
					else {
						confirm({
							title: 'Warning',
							content: 'Are you sture you want to restart the race',
							okText: 'Restart',
							okType: 'danger',
							cancelTxt: 'No',
							onOk: () => startAllBoatsRacing(),
						});
					}
				}
			}
		}
		window.addEventListener('keydown', buttonPress);
		attainFocus();

		return () => {
			window.removeEventListener('keydown', buttonPress);
		}
	}, [confirm, raceStarted, toggleRace, startAllBoatsRacing]);

	return (
		<div tabIndex="0" className="race-timer-wrapper">
			<header className="focus-status">
				<h1>Race timer</h1>
				<div className="active">Active</div>
				<div className="inactive">Inactive</div>
			</header>
			<section id="instructions">
				<dl>
					<dt>Start all boats racing</dt>
					<dd>Alt + a</dd>
					<dt>Start/stop timing a boat</dt>
					<dd>Alt + $num</dd>
				</dl>
			</section>
			<section id="logging">
				<LogList />
			</section>
			<section id="settings">
				<RaceSettings
					numberOfBoats={numberOfBoats}
					setNumberOfBoats={setNumberOfBoats}
				/>
			</section>
			<section id="main">
				<h2>Timer</h2>
				<BoatTable />
			</section>
			<hr />
			<section id="results">
				<ResultsView />
			</section>
		</div>
	)
}
