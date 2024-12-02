import { InputAdornment, TextField } from '@mui/material';

const MobileInput = ({ label = 'Mobile Number', ...props }) => {
	return (
		<TextField
			label={label}
			id='outlined-start-adornment'
			type='tel'
			margin='dense'
			{...props}
			slotProps={{
				input: {
					startAdornment: <InputAdornment position='start'>+63</InputAdornment>,
				},
			}}
		/>
	);
};

export default MobileInput;
