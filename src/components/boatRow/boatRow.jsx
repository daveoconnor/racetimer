import React from 'react';
import { timeRenderer } from '../helpers/timeRenderer';
import Counter from '../counter/counter';

export default function BoatRow({boatNumber, startTime, stopTime}) {
	const startStopDifference = stopTime ? stopTime - startTime : null;

	return (
		<tr>
			<td>Boat {boatNumber}</td>
			<td>{timeRenderer(startTime)}</td>
			<td><Counter startTime={startTime} stopTime={stopTime} /></td>
			<td>{stopTime ? timeRenderer(stopTime) : ''}</td>
			<td>{startStopDifference / 1000}</td>
		</tr>
	);
}
