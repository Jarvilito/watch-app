import productTypes, {
	ProductFormState,
	GetProductsAction,
	ProductInitialState,
} from './product.types';
import { SharedActionTypes, SHARED_ACTIONS } from '../sharedActionTypes';

//REDUCER MEANS DISPATCH

type ProductActions = SharedActionTypes | GetProductsAction;

const INITIAL_STATE: ProductInitialState = {
	loading: false,
	isSuccess: false,
	error: '',
	products: [],
};

const productReducer = (
	state: ProductInitialState = INITIAL_STATE,
	action: ProductActions
): ProductInitialState => {
	switch (action.type) {
		case productTypes.SET_PRODUCT_LIST:
			return {
				...state,
				// Add logic if needed
			};

		case productTypes.GET_PRODUCTS:
			if ('payload' in action && Array.isArray(action.payload))
				return {
					...state,
					products: action.payload, // Update products list
				};
			break;

		case SHARED_ACTIONS.IS_LOADING_TOGGLE:
			return {
				...state,
				loading: !state.loading, // Toggle loading state
			};

		case SHARED_ACTIONS.IS_SUCCESS:
			return {
				...state,
				isSuccess: true, // Mark success
			};

		case SHARED_ACTIONS.RESET_ALERT:
			return {
				...state,
				isSuccess: false,
				error: '',
			};

		case SHARED_ACTIONS.IS_ERROR:
			if ('payload' in action && typeof action.payload === 'string')
				return {
					...state,
					isSuccess: false,
					error: action.payload, // Update error message
				};
			break;

		default:
			return state;
	}

	return state;
};

export default productReducer;
