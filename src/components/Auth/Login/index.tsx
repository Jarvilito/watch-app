import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PasswordInput from '../../Form/PasswordInput';
import '../../../sassStyles/_global.scss';
import { signInWithGoogle } from '../../../firebase/utility';
import BaseBtn from '../../Form/BaseBtn';
import { signInUser } from '../../../redux/User/user.actions';
import { useNavigate } from 'react-router-dom';
import { SelectorState } from '../../../redux/sharedActionTypes';
import { AppDispatch } from '../../../redux/createStore';
const initialForm = {
	email: '',
	password: '',
};

interface InitialForm {
	email: string;
	password: string;
}
const mapState = ({ user }: SelectorState) => ({
	signInSuccess: user.signInSuccess,
	errors: user.errors,
	loading: user.loading,
});

const LoginComponent = () => {
	const navigate = useNavigate();
	const { signInSuccess, errors, loading } = useSelector(mapState);
	const dispatch = useDispatch<AppDispatch>();

	const [form, setForm] = useState<InitialForm>(initialForm);

	useEffect(() => {
		if (signInSuccess) {
			navigate('/');
		}
	}, [signInSuccess]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const { email, password } = form;
		dispatch(signInUser({ email, password }));
	};
	return (
		<>
			{errors.map((error) => (
				<p className='sub-text u-message u-message--error'>{error}</p>
			))}

			<form className='form' onSubmit={() => handleSubmit}>
				<TextField
					required
					id='outlined-basic'
					label='Email'
					name='email'
					type='email'
					variant='outlined'
					margin='dense'
					onChange={handleChange}
				/>
				<PasswordInput
					required
					margin='dense'
					label='Password'
					name='password'
					onChange={() => handleChange}
				/>

				<BaseBtn
					type='submit'
					className='form__btn btn btn--primary form__btn--site'
					loading={loading}
					variant='contained'
					color='primaryBtn'
					label='Login'
				/>

				<Button className='form__btn form__btn--facebook' variant='contained'>
					Login with Facebook
				</Button>

				<Button
					className='form__btn form__btn--google'
					variant='contained'
					onClick={signInWithGoogle}
				>
					Login with Google
				</Button>
			</form>
		</>
	);
};

export default LoginComponent;
