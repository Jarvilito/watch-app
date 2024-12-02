import {
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	Input,
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface PasswordInputProps {
	label: string;
	margin?: 'dense' | 'normal' | 'none' | undefined;
	variant?: 'standard' | 'outlined' | 'filled' | undefined;
	handleSearch: () => void;
	type?: string;
	helperText?: string;
	name?: string;
	value: string | number;
	onChange: () => void;
}

const PasswordInput = ({
	label = 'Search',
	margin,
	variant = 'standard',
	handleSearch,
	type = 'text', // Default to 'text' type
	helperText,
	...rest
}: PasswordInputProps) => {
	const handleMouseDownPassword = (event: React.FormEvent<HTMLFormElement>) =>
		event.preventDefault();

	return (
		<FormControl variant={variant} margin={margin}>
			<InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
			<Input
				id='outlined-adornment-password'
				type={type}
				{...rest}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='Search'
							onClick={handleSearch}
							onMouseDown={() => handleMouseDownPassword}
							edge='end'
						>
							<Search />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default PasswordInput;
