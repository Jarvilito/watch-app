import { Dispatch } from 'redux';
import {
	handleAddCategory,
	handleGetCategories,
	handleGetParentCategories,
} from '../../firebase/categories';
import categoryType, {
	CategoryFormState,
	CategoryActionTypes,
} from './category.type';

export const addCategory =
	(payload: CategoryFormState) =>
	async (dispatch: Dispatch<CategoryActionTypes>) => {
		dispatch({ type: categoryType.IS_LOADING_TOGGLE });
		try {
			await handleAddCategory(payload);
			dispatch({ type: categoryType.IS_SUCCESS });
		} catch (error: any) {
			dispatch({ type: categoryType.IS_ERROR, payload: error });
			return error;
		} finally {
			dispatch({ type: categoryType.IS_LOADING_TOGGLE });
		}
	};

export const updateCategory =
	(payload: CategoryFormState) =>
	async (dispatch: Dispatch<CategoryActionTypes>) => {
		dispatch({ type: categoryType.IS_LOADING_TOGGLE });

		try {
			await handleAddCategory(payload);
			dispatch({ type: categoryType.IS_SUCCESS });
		} catch (error: any) {
			const errorPayload = {
				code: error.code || 'unknown_error',
				message: error.message || 'An unexpected error occurred',
			};
			dispatch({ type: categoryType.IS_ERROR, payload: errorPayload });
		} finally {
			dispatch({ type: categoryType.IS_LOADING_TOGGLE });
		}
	};

export const getCategoriesAll =
	() => async (dispatch: Dispatch<CategoryActionTypes>) => {
		dispatch({ type: categoryType.IS_LOADING_TOGGLE });

		try {
		} catch (error: any) {
			dispatch({ type: categoryType.IS_ERROR, payload: error });
		} finally {
			dispatch({ type: categoryType.IS_LOADING_TOGGLE });
		}
	};

export const getParentsCategories =
	() => async (dispatch: Dispatch<CategoryActionTypes>) => {
		console.log('fetching');
		dispatch({ type: categoryType.IS_LOADING_TOGGLE });

		try {
			const categories = await handleGetParentCategories();
			dispatch({ type: categoryType.GET_CATEGORIES, payload: categories });
		} catch (error: any) {
			const errorPayload = {
				code: error.code || 'unknown_error',
				message: error.message || 'An unexpected error occurred',
			};
			dispatch({ type: categoryType.IS_ERROR, payload: errorPayload });
		} finally {
			dispatch({ type: categoryType.IS_LOADING_TOGGLE });
		}
	};

export const resetAlert = (dispatch: Dispatch<CategoryActionTypes>) => {
	dispatch({ type: categoryType.RESET_ALERT });
};
