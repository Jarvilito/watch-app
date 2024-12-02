import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface SelectInputProps {
	labelId: string;
	id: string;
	label: string;
	items: any[];
	value: string;
	name?: string;
	fullWidth?: boolean;
	onChange: () => void;
}

const SelectInput = ({
	labelId,
	id,
	label,
	items,
	value,
	fullWidth,
	onChange,
	...props
}: SelectInputProps) => {
	return (
		<FormControl fullWidth>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				value={value}
				onChange={onChange}
				label={label} // Ensure the label is explicitly passed
				{...props}
			>
				{items.map((item) => (
					<MenuItem key={item} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectInput;
