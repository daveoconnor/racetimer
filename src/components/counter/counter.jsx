import React, { useState } from 'react';
import ReactInterval from 'react-interval';

export default function Counter({startTime, stopTime}) {
	const [timerInfo, setTimerInfo] = useState(0);

	const counterTime = () => {
		const endTime = stopTime ? stopTime : Date.now();
		setTimerInfo(endTime - startTime);
	};

	const displayTime = (milliseconds) => {
		return milliseconds / 1000;
	}

	return (
		<React.Fragment>
			{ stopTime ? '-' : displayTime(timerInfo)}
			<ReactInterval timeout={100} enabled={ stopTime ? false : true} callback={() => counterTime()} />
		</React.Fragment>
	);
}