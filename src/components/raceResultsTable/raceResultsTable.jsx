import React, { useContext, useState } from 'react';
import { InputNumber, Button } from 'antd';
import _ from 'lodash';

import { RaceContext } from '../../contexts/raceContext';

export default function RaceResultsTable() {
	const raceCtxt = useContext(RaceContext);
	const [raceNumber, setRaceNumber] = useState(1);

	const [raceData, setRaceData] = useState({})


	const loadData = () => {
		let data = raceCtxt.getRaceData(raceNumber)
		if (data) {
			data = _.sortBy(data, b => b.stopTime - b.startTime);
			setRaceData(data);
		}
	};
	const deleteData = () => {
		raceCtxt.deleteRaceResult(raceNumber);
		setRaceNumber(1);
	};
	return (
		<React.Fragment>
			<div>
				<label>
					Race results to load:
					<InputNumber
						min={1}
						defaultValue={raceNumber}
						onChange={(value) => setRaceNumber(value)}
					/>
				</label>
				<br />
				<Button type="primary" onClick={() => loadData()}>Load Race Result</Button>
				<br />
				<br />
			</div>
			{_.size(raceData) ? (
				<React.Fragment>
					<ol>
						{ raceData.map(b => <li key={b.boatNumber}>Boat {b.boatNumber} - {(b.stopTime - b.startTime) / 1000 }</li>)}
					</ol>
					<Button type="danger" onClick={() => deleteData()}>Delete Race Result</Button>
				</React.Fragment>
			) : ''}
		</React.Fragment>
	)
}
