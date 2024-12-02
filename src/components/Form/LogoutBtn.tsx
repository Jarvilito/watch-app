import React from 'react';
import BaseBtn from './BaseBtn';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/User/user.actions';
import { AppDispatch } from '../../redux/createStore';

const LogoutBtn = () => {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<BaseBtn
			className='form__btn btn btn--primary btn--full-width'
			color='primaryBtn'
			variant='contained'
			label='Logout'
			onClick={() => dispatch(signOutUser())}
		></BaseBtn>
	);
};

export default LogoutBtn;
