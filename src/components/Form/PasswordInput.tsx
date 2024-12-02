import React, { useState } from 'react';
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps {
	label: string;
	name?: string;
	margin: 'dense' | 'normal' | 'none' | undefined;
	helperText?: string;
	required?: boolean;
	onChange: () => void;
}

const PasswordInput = ({
	label = 'Password',
	margin,
	helperText,
	required,
	onChange,
	...props
}: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (
		event: React.ChangeEvent<HTMLInputElement>
	) => event.preventDefault();

	return (
		<FormControl variant='outlined' margin={margin}>
			<InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
			<OutlinedInput
				type={showPassword ? 'text' : 'password'}
				label={label}
				required={required}
				onChange={onChange}
				{...props}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label={
								showPassword ? 'hide the password' : 'display the password'
							}
							onClick={() => handleClickShowPassword}
							onMouseDown={() => handleMouseDownPassword}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default PasswordInput;
