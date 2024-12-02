import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import React from 'react';

interface RadioInputProps {
	label: string;
	items: string[];
	value: string;
	ariaLabelledBy?: string;
	defaultValue: string;
	row: boolean;
	onChange: () => void;
	name?: string;
}

const RadioInput = ({
	label,
	items,
	value,
	ariaLabelledBy,
	defaultValue = '',
	onChange,
	...props
}: RadioInputProps) => {
	return (
		<FormControl>
			<FormLabel id={ariaLabelledBy}>{label}</FormLabel>
			<RadioGroup
				defaultValue={defaultValue}
				onChange={onChange}
				value={value}
				{...props}
			>
				{items.map((item) => (
					<FormControlLabel
						key={item}
						value={item}
						control={<Radio />}
						label={item}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioInput;
