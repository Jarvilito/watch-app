import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PasswordInput from '../../Form/PasswordInput';
import '../../../sassStyles/_global.scss';
import MobileInput from '../../Form/MobileInput';
import BaseBtn from '../../Form/BaseBtn';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/User/user.actions';
import { SelectorState } from '../../../redux/sharedActionTypes';
import { AppDispatch } from '../../../redux/createStore';
import { RegisterUserParams } from '../../../redux/User/user.types';
const formInitialState = {
	firstName: '',
	lastName: '',
	email: '',
	mobile: null, // This should now match the interface
	password: '',
	confirmPassword: '',
};

const mapState = ({ user }: SelectorState) => ({
	signInSuccess: user.signInSuccess,
	errors: user.errors,
	loading: user.loading,
});

const Register = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const { signInSuccess, errors, loading } = useSelector(mapState);

	const [form, setForm] = useState<RegisterUserParams>(formInitialState);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(registerUser(form));
	};

	useEffect(() => {
		if (signInSuccess) {
			navigate('/account');
		}
	}, [signInSuccess]);

	const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};
	return (
		<>
			{errors.map((error) => (
				<span className='sub-text u-message--error'>{error}</span>
			))}
			<form className='form' onSubmit={handleSubmit}>
				<TextField
					type='text'
					label='First Name'
					variant='outlined'
					margin='dense'
					value={form.firstName}
					name='firstName'
					onChange={() => handleChange}
					required
				/>

				<TextField
					type='text'
					name='lastName'
					label='Last Name'
					variant='outlined'
					margin='dense'
					value={form.lastName}
					onChange={() => handleChange}
				/>

				<TextField
					type='email'
					name='email'
					label='Email'
					variant='outlined'
					margin='dense'
					onChange={() => handleChange}
					required
				/>

				<MobileInput
					name='mobile'
					margin='normal'
					label='Mobile Number'
					value={form.mobile}
					onChange={handleChange}
					required
				/>

				<PasswordInput
					margin='dense'
					name='password'
					label='Password'
					onChange={() => handleChange}
				/>

				<PasswordInput
					margin='dense'
					name='confirmPassword'
					label='Confirm Password'
					onChange={() => handleChange}
				/>

				<BaseBtn
					loading={loading}
					type='submit'
					className='form__btn btn btn--primary form__btn--site'
					variant='contained'
					color='primaryBtn'
					label='Register'
				/>
			</form>
		</>
	);
};

export default Register;
