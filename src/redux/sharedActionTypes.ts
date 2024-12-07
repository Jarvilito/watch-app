import { CategoryInitialState } from './Category/category.type';
import { ProductInitialState } from './Product/product.types';
import { UserState } from './User/user.types';

export const SHARED_ACTIONS = {
	IS_LOADING_TOGGLE: 'IS_LOADING_TOGGLE',
	IS_SUCCESS: 'IS_SUCCESS',
	IS_ERROR: 'IS_ERROR',
	IS_SUCCESS_RESET: 'IS_SUCCESS_RESET',
	RESET_ALERT: 'RESET_ALERT',
};

export type SharedActionTypes =
	| { type: typeof SHARED_ACTIONS.IS_LOADING_TOGGLE }
	| { type: typeof SHARED_ACTIONS.IS_SUCCESS; payload: boolean }
	| {
			type: typeof SHARED_ACTIONS.IS_ERROR;
			payload: { message: string } | string;
	  }
	| { type: typeof SHARED_ACTIONS.IS_SUCCESS_RESET };

export interface SelectorState {
	user: UserState;
	product: ProductInitialState;
	category: CategoryInitialState;
}
