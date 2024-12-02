import { auth, handleUserProfile } from './firebase/utility';
import {
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	onSnapshot,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux/User/user.actions';
import { Route, Routes, Navigate } from 'react-router-dom';
import './sassStyles/_global.scss';
import './sassStyles/_typography.scss';
import './sassStyles/_utilities.scss';
import './default.scss';
import { Backdrop, CircularProgress, ThemeProvider } from '@mui/material';
import MainLayout from './components/layout/MainLayout';

import { theme } from './theme/theme';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import Admin from './pages/Admin';
import HomeGraphQL from './pages/GraphQLSample/HomeGraphQL';

//auth guard
import WithAdminAuth from './hoc/withAdminAuth';
import WithAuth from './hoc/withAuth';
import { SelectorState } from './redux/sharedActionTypes';
import { AppDispatch } from './redux/createStore';

const userInitialState = {
	email: '',
	password: '',
};

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = useSelector<SelectorState>(
		(state) => state.user.currentUser
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		setIsLoading(true);
		const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
			if (user) {
				try {
					// Handle user profile data
					const userRef = await handleUserProfile(user);

					if (!userRef) {
						throw new Error('Invalid user reference');
					}

					if (userRef instanceof DocumentReference) {
						// Optionally use `onSnapshot` to listen for real-time changes to user data
						onSnapshot(userRef, (snapshot: DocumentSnapshot<DocumentData>) => {
							const data = snapshot.data();
							dispatch(
								setUser({
									id: snapshot.id,
									email: data?.email,
									password: data?.password,
									...snapshot.data(),
									createdDate: snapshot
										.data()
										?.createdDate?.toDate()
										.toISOString(),
								})
							);
						});
					}
				} catch (error) {
					console.error('Error fetching user profile:', error);
					dispatch(setUser(userInitialState)); // Dispatch null if there's an error
				}
			} else {
				dispatch(setUser(userInitialState));
			}

			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [dispatch]);

	if (isLoading) {
		return (
			<Backdrop
				sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
				open={isLoading}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<MainLayout>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={currentUser ? <Navigate to='/' /> : <Login />}
					/>
					<Route
						path='/account/*'
						element={
							<WithAuth>
								<Account />
							</WithAuth>
						}
					/>

					<Route
						path='/admin/*'
						element={
							<WithAdminAuth>
								<Admin />
							</WithAdminAuth>
						}
					/>

					<Route path='/graphql' element={<HomeGraphQL />} />
				</Routes>
			</MainLayout>
		</ThemeProvider>
	);
}

export default App;
