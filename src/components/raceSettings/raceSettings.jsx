import React from 'react';
import { InputNumber } from 'antd';

export default function RaceSettings({numberOfBoats, setNumberOfBoats}) {
	return (
		<React.Fragment>
			<label>
			Number of boats:
			<InputNumber
				addOnBefore="Number of boats"
				min={1}
				max={9}
				placeholder="Boats"
				defaultValue={numberOfBoats}
				onChange={(value) => setNumberOfBoats(value)}
			/>
			</label>
		</React.Fragment>
	);
}