import { FormControlLabel, Switch } from '@mui/material';

interface SwitchInputProps {
	required?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	label: string;
	checked: boolean;
	color: any;
	value: boolean;
}

const SwitchInput = ({
	required = false,
	onChange,
	checked,
	label,
	...props
}: SwitchInputProps) => {
	return (
		<FormControlLabel
			label={label}
			required={required}
			control={
				<Switch
					checked={checked}
					{...props}
					onChange={onChange}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			}
		/>
	);
};

export default SwitchInput;
