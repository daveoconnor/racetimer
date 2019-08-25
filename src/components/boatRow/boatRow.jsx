import React from 'react';
import { timeRenderer } from '../helpers/timeRenderer';
import { classNameBuilder } from '../helpers/classNameBuilder';

import Counter from '../counter/counter';

export default function BoatRow({boatNumber, startTime, stopTime}) {
	const startStopDifference = stopTime ? stopTime - startTime : null;
	const rowClasses = classNameBuilder(
		['boat-row'],
		['boat-row'],
		stopTime === null ? 'active' : 'complete'
	);

	return (
		<tr className={rowClasses}>
			<td>{boatNumber}</td>
			<td>{timeRenderer(startTime)}</td>
			<td>{stopTime ? timeRenderer(stopTime) : ''}</td>
			<td>{startStopDifference / 1000}</td>
			<td><Counter startTime={startTime} stopTime={stopTime} /></td>
		</tr>
	);
}
