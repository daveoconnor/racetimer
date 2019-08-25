import React, { useContext } from 'react';
import _ from 'lodash';

import BoatRow from '../boatRow/boatRow';
import { RaceContext } from '../../contexts/raceContext';

export default function BoatTable() {
	const raceCtxt = useContext(RaceContext);
	const boats = raceCtxt.state.boats;

	return (
		<React.Fragment>
		{ _.size(boats) ? (
			<table>
				<thead>
					<tr>
						<td>Boat number</td>
						<td>Start time</td>
						<td></td>
						<td>Stop time</td>
						<td>Result time</td>
					</tr>
				</thead>
				<tbody>
					{ _.map(boats, boat => (
						<BoatRow
							key={boat.boatNumber}
							boatNumber={boat.boatNumber}
							startTime={boat.startTime}
							stopTime={boat.stopTime}
						/>
					))}
				</tbody>
			</table>
			) : <div>No boats currently being tracked</div>}
		</React.Fragment>
	)
}
