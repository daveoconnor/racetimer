import React, { useContext } from 'react';

import { LogContext } from '../../contexts/logContext';

export default function LogList() {
	const logCtxt = useContext(LogContext);

	return logCtxt.logs.length ? (
		<ul>
			{ logCtxt.logs.map((message, index) => <li key={index}>{message}</li>) }
		</ul>
	) : <div>No events logged</div>;
};
