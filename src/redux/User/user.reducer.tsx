import userTypes, {
	CurrentUser,
	UserState,
	SignInLoadingToggleAction,
	SignInSuccessAction,
	SignInErrorAction,
} from './user.types';

// Define types for User and the menu items

// Define the action types
interface SetCurrentUserAction {
	type: typeof userTypes.SET_CURRENT_USER;
	payload: CurrentUser | null;
}

interface SignOutAction {
	type: typeof userTypes.SIGN_OUT;
	payload?: any;
	// No payload here
}

// Define the initial state
const INITIAL_STATE: UserState = {
	currentUser: null,
	signInSuccess: false,
	loading: false,
	errors: [],
};

type UserActionTypes =
	| SetCurrentUserAction
	| SignInSuccessAction
	| SignOutAction
	| SignInErrorAction
	| SignInLoadingToggleAction;

// Reducer
const userReducer = (
	state: UserState = INITIAL_STATE,
	action: UserActionTypes
): UserState => {
	switch (action.type) {
		case userTypes.SET_CURRENT_USER:
			if ('payload' in action)
				return {
					...state,
					currentUser: action.payload, // TypeScript knows payload is `User | null` here
				};
			break;

		case userTypes.SIGN_IN_SUCCESS:
			if ('payload' in action)
				return {
					...state,
					signInSuccess: action.payload, // TypeScript knows payload is `boolean` here
					errors: [],
				};

			break;

		case userTypes.SIGN_OUT:
			return {
				...state,
				currentUser: null,
				signInSuccess: false,
			};

		case userTypes.SIGN_IN_ERROR:
			if ('payload' in action)
				return {
					...state,
					errors: action.payload, // TypeScript knows payload is `string[]` here
				};
			break;

		case userTypes.SIGN_IN_LOADING_TOGGLE:
			return {
				...state,
				loading: !state.loading, // No payload here, safe to toggle loading
			};

		default:
			return state;
	}

	return state;
};

export default userReducer;
