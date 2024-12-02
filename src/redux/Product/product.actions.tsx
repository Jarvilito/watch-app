import productTypes, {
	ProductFormState,
	GetProductsAction,
} from './product.types';

import {
	handleAddProduct,
	handleDeleteProduct,
	handleGetProducts,
	handleUpdateProduct,
} from '../../firebase/products';
import { Dispatch } from 'redux';
import { SHARED_ACTIONS, SharedActionTypes } from '../sharedActionTypes';

type ProductActionTypes = SharedActionTypes | GetProductsAction;

export const addProduct =
	(payload: ProductFormState) =>
	async (dispatch: Dispatch<ProductActionTypes>) => {
		dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
		try {
			//call firebase to store payload in products collection
			await handleAddProduct(payload);
			dispatch({ type: SHARED_ACTIONS.IS_SUCCESS });
		} catch (error) {
			console.error('Error in addProduct thunk:', error);
			dispatch({ type: SHARED_ACTIONS.IS_ERROR, payload: error });
		} finally {
			dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
		}
	};

export const updateProduct =
	(payload: ProductFormState) =>
	async (dispatch: Dispatch<ProductActionTypes>) => {
		const { id } = payload;

		dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
		try {
			if (id) {
				await handleUpdateProduct(id, payload);
				dispatch({ type: SHARED_ACTIONS.IS_SUCCESS });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: SHARED_ACTIONS.IS_ERROR, payload: error });
		} finally {
			dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
		}
	};

export const getProducts =
	() => async (dispatch: Dispatch<ProductActionTypes>) => {
		dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });

		const response = await handleGetProducts();

		if (response.success) {
			dispatch({ type: productTypes.GET_PRODUCTS, payload: response.data });
		} else {
			dispatch({ type: SHARED_ACTIONS.IS_ERROR, payload: response.error });
		}

		dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
	};

export const deleteProduct =
	(id: string) => async (dispatch: Dispatch<ProductActionTypes>) => {
		dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
		try {
			await handleDeleteProduct(id);
		} catch (error) {
			dispatch({ type: SHARED_ACTIONS.IS_ERROR, payload: error });
		} finally {
			dispatch({ type: SHARED_ACTIONS.IS_LOADING_TOGGLE });
		}
	};

export const resetAlert = (dispatch: Dispatch<ProductActionTypes>) => {
	dispatch({ type: SHARED_ACTIONS.RESET_ALERT });
};
