const userTypes = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
	SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
	SIGN_IN_LOADING_TOGGLE: 'SIGN_IN_LOADING_TOGGLE',
	SIGN_IN_ERROR: 'SIGN_IN_ERROR',
	SIGN_OUT: 'SIGN_OUT',
};

// Define the initial state interface
export interface UserState {
	currentUser: CurrentUser | null;
	signInSuccess: boolean;
	loading: boolean;
	errors: string[];
}

export interface CurrentUser {
	id?: string | number;
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	mobile?: string | null; // Ensure null is allowed
	createdDate?: Date;
	confirmPassword?: string;
	userRoles?: string[];
}

// Typing the parameters of registerUser
export interface RegisterUserParams {
	firstName: string;
	lastName?: string;
	email: string;
	mobile?: string | null;
	password: string;
	confirmPassword: string;
}
export interface SignInLoadingToggleAction {
	type: typeof userTypes.SIGN_IN_LOADING_TOGGLE;
}

export interface SignInSuccessAction {
	type: typeof userTypes.SIGN_IN_SUCCESS;
	payload: boolean; // Success or failure
}

export interface SignInErrorAction {
	type: typeof userTypes.SIGN_IN_ERROR;
	payload: string[]; // Error messages
}

export default userTypes;
