import React, { useState } from 'react';

export const LogContext = React.createContext();

export default function LogProvider({client, children}) {
	const [logs, setLogs] = useState([]);
	const [backupName, setBackupName ] = useState('log-backup-' + Date.now());

	const log = async (message) => {
		logs.push(message);
		setLogs([...logs]);
		backupLog(message);
		return 1;
	}

	const backupLog = async () => {
		let logData = JSON.parse(localStorage.getItem('logs'));
		if (!logData) {
			logData = [];
		}
		localStorage.setItem(backupName, JSON.stringify(logs));
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
