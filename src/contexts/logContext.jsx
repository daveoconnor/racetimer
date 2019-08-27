import React, { useState } from 'react';

export const LogContext = React.createContext();

export default function LogProvider({client, children}) {
	const [logs, setLogs] = useState([]);

	const log = (message) => {
		const tempLogs = [...logs];
		tempLogs.push(message);
		setLogs(tempLogs);
	}

	return (
		<LogContext.Provider value={{
			logs: logs,
			log: log
		}}>
			{children}
		</LogContext.Provider>
	);
}
