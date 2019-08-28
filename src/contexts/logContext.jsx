import React, { useState } from 'react';

export const LogContext = React.createContext();

export default function LogProvider({client, children}) {
	const [logs, setLogs] = useState([]);

	const log = async (message) => {
		logs.push(message);
		setLogs([...logs]);
		return 1;
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
