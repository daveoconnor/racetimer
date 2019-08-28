import React, { useContext, useState } from 'react';
import { Button, InputNumber, Modal } from 'antd';

import { RaceContext } from '../../contexts/raceContext';
import { LogContext } from '../../contexts/logContext';
import RaceResultsTable from '../raceResultsTable/raceResultsTable';

export default function ResultsView() {
	const raceCtxt = useContext(RaceContext);
	const logger = useContext(LogContext);
	const [raceNumber, setRaceNumber] = useState(1);

	const { confirm } = Modal;

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

	return (
		<React.Fragment>
			<div id="save-results">
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
			</div>
			<hr />
			<div id="race-results">
				<RaceResultsTable />
			</div>
		</React.Fragment>
	);
}

