import { auth, handleUserProfile } from '../../firebase/utility';
import { AppThunk } from '../createStore';
import userTypes, {
	CurrentUser,
	SignInLoadingToggleAction,
	SignInSuccessAction,
	SignInErrorAction,
	RegisterUserParams,
} from './user.types';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { Dispatch } from 'redux';

// Define the CurrentUser interface
// Action types
interface SetUserAction {
	type: typeof userTypes.SET_CURRENT_USER;
	payload: CurrentUser;
}

interface SignOutAction {
	type: typeof userTypes.SIGN_OUT;
}

// Union type for all actions related to user
type UserActionTypes =
	| SetUserAction
	| SignInLoadingToggleAction
	| SignInSuccessAction
	| SignInErrorAction
	| SignOutAction;

// Typing the action creators

// Set user action creator
export const setUser = (user: CurrentUser): SetUserAction => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

// Typing the parameters of signInUser
interface SignInUserParams {
	email: string;
	password: string;
}

// Sign in user action creator
export const signInUser =
	({ email, password }: SignInUserParams): AppThunk =>
	async (dispatch: Dispatch) => {
		try {
			dispatch({ type: userTypes.SIGN_IN_LOADING_TOGGLE });
			await signInWithEmailAndPassword(auth, email, password);
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		} catch (error) {
			dispatch({
				type: userTypes.SIGN_IN_ERROR,
				payload: ['Email or Password is incorrect'],
			});
			console.log(error);
		} finally {
			dispatch({ type: userTypes.SIGN_IN_LOADING_TOGGLE });
		}
	};

// Register user action creator
export const registerUser =
	(user: RegisterUserParams) => async (dispatch: Dispatch<UserActionTypes>) => {
		const { firstName, lastName, email, mobile, password, confirmPassword } =
			user;

		if (password !== confirmPassword) {
			dispatch({
				type: userTypes.SIGN_IN_ERROR,
				payload: ['Password does not match'],
			});
			return; // Early exit if passwords don't match
		}

		try {
			dispatch({ type: userTypes.SIGN_IN_LOADING_TOGGLE });
			const { user: firebaseUser }: any = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await handleUserProfile(firebaseUser, {
				displayName: `${firstName} ${lastName}`,
				email,
				mobile,
			});
		} catch (error) {
			dispatch({
				type: userTypes.SIGN_IN_ERROR,
				payload: ['Something went wrong'],
			});
		} finally {
			dispatch({ type: userTypes.SIGN_IN_LOADING_TOGGLE });
		}
	};

// Sign out user action creator
export const signOutUser = (): AppThunk => async (dispatch) => {
	try {
		await auth.signOut();
		dispatch({
			type: userTypes.SIGN_OUT,
		});
	} catch (error) {
		console.log(error);
	}
};
