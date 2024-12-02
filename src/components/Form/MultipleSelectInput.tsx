import React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

// Updated getStyles function to accept `selected` properly
const getStyles = (name: string, selected: string[]): React.CSSProperties =>
	selected.includes(name)
		? {
				fontWeight: 'bold',
				backgroundColor: '#e1f5fe',
		  }
		: {};

interface MultipleSelectInputProps {
	items: any[];
	label: string;
	name: string;
	value: string[];
	labelKey: string;
	valueKey: string | number;
	onChange: (event: SelectChangeEvent<string | string[]>) => void;
}

const MultipleSelectInput = ({
	items,
	label,
	name,
	value,
	labelKey,
	valueKey,
	onChange,
	...props
}: MultipleSelectInputProps) => {
	return (
		<div>
			<FormControl fullWidth>
				<InputLabel id='demo-multiple-chip-label'>{label}</InputLabel>
				<Select
					labelId='demo-multiple-chip-label'
					id='demo-multiple-chip'
					name={name}
					multiple
					value={value || []}
					onChange={onChange}
					input={<OutlinedInput id='select-multiple-chip' label={label} />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((id) => {
								const item = items.find((item) => item[valueKey] === id);
								return item ? <Chip key={id} label={item[labelKey]} /> : null;
							})}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{items.map((item, index) => (
						<MenuItem
							key={index}
							value={item[valueKey]}
							style={getStyles(item[valueKey], value || [])}
						>
							{item[labelKey]}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default MultipleSelectInput;
