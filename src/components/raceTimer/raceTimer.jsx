import React, { useContext, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, InputNumber, Modal } from 'antd';

import { LogContext } from '../../contexts/logContext';
import { RaceContext } from '../../contexts/raceContext';
import BoatTable from '../boatTable/boatTable';
import LogList from '../logList/logList';
import './raceTimer.css';

export default function RaceTimer() {
	const raceCtxt = useContext(RaceContext);
	const logger = useContext(LogContext);
	const [numberOfBoats, setNumberOfBoats] = useState(1);
	const [raceNumber, setRaceNumber] = useState(1);
	const [raceStarted, setRaceStarted] = useState(false);
	const { confirm } = Modal;

	const startAllBoatsRacing = useCallback(() => {
		raceCtxt.startAllBoats(numberOfBoats);
	}, [raceCtxt]);	// eslint-disable-line react-hooks/exhaustive-deps

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

	const saveRace = async () => {
		if (!raceCtxt.raceDataExists(raceNumber)) {
			raceCtxt.saveRace(raceNumber);
		}
		else {
			logger.log('Requesting confirmation of race number ' + raceNumber + ' overwrite');
			confirm({
				title: 'Warning',
				content: 'Are you sure you want to overwrite race number ' + raceNumber,
				okText: 'Overwrite',
				okType: 'danger',
				cancelTxt: 'No',
				onOk: () => {
					logger.log('Overwriting of race ' + raceNumber + ' confirmed');
					raceCtxt.saveRace(raceNumber);
				},
				onCancel: () => logger.log('Overwriting of race ' + raceNumber + ' cancelled')
			});
		}
		return 1;
	}

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
			<section id="logging">
				<LogList />
			</section>
			<section id="settings">
				<label>
				Number of boats:
				<InputNumber
					addOnBefore="Number of boats"
					min={1}
					max={9}
					placeholder="Boats"
					defaultValue={numberOfBoats}
					onChange={(value) => setNumberOfBoats(value)}
				/>
				</label>
			</section>
			<section id="main">
				<h2>Timer</h2>
				<BoatTable />
			</section>
			<hr />
			<section id="save-results">
				<label>Race Number:
					<InputNumber
						placeholder="Race number"
						min={1}
						defaultValue={raceNumber}
						onChange={((value) => setRaceNumber(value))}
					/>
				</label>
				<br />
				<Button type="primary" onClick={() => saveRace()}>Save Results</Button>
			</section>
		</div>
	)
}
