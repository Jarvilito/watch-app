import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import './style.scss';
import LoginComponent from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';

interface HandleTab {
	event: React.ChangeEvent<HTMLInputElement>;
	newValue: string;
}
const Login = () => {
	const [tabValue, setTabValue] = useState('login');

	const handleTabNav = ({ event, newValue }: HandleTab) => {
		setTabValue(newValue);
	};
	return (
		<div className='login'>
			<div className='login__wrap'>
				<h1 className='text-align-center'>Login or create an account</h1>

				<Tabs
					value={tabValue}
					onChange={() => handleTabNav}
					aria-label='Login registration tab'
					variant='fullWidth'
				>
					<Tab label='Register' className='login__tab' value='register' />
					<Tab label='Login' value='login' />
				</Tabs>
				<div className='login__form'>
					{tabValue === 'login' && <LoginComponent />}

					{tabValue === 'register' && <Register />}
				</div>
			</div>
		</div>
	);
};

export default Login;
