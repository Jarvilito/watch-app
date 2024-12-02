import categoryType, {
	CategoryInitialState,
	CategoryActionTypes,
} from './category.type';

//REDUCER MEANS DISPATCH

const INITIAL_STATE = {
	loading: false,
	isSuccess: false,
	error: '',
	categories: [],
	category: {},
};

const categoryReducer = (
	state: CategoryInitialState = INITIAL_STATE,
	action: CategoryActionTypes
) => {
	switch (action.type) {
		case categoryType.GET_CATEGORIES:
			if ('payload' in action)
				return {
					...state,
					categories: action.payload,
				};
			break;

		case categoryType.IS_LOADING_TOGGLE:
			return {
				...state,
				loading: !state.loading,
			};

		case categoryType.IS_SUCCESS:
			return {
				...state,
				isSuccess: true,
				error: '',
			};

		case categoryType.TOGGLE_CATEGORY_VISIBILITY:
			return {
				...state,
				loading: false,
				isSuccess: true,
			};

		case categoryType.RESET_ALERT:
			return {
				...state,
				isSuccess: false,
				error: '',
			};

		case categoryType.IS_ERROR:
			if ('payload' in action) {
				console.log(action.payload);
				return {
					...state,
					isSuccess: false,
					error: `${action.payload}`,
				};
			}

			break;
		default:
			return state;
	}
};

export default categoryReducer;
