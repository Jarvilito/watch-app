import { SHARED_ACTIONS, SharedActionTypes } from '../sharedActionTypes';
const categoryType = {
	ADD_CATEGORY: 'ADD_CATEGORY',
	GET_CATEGORIES: 'GET_CATEGORIES',
	DELETE_CATEGORY: 'DELETE_CATEGORY',
	TOGGLE_CATEGORY_VISIBILITY: 'TOGGLE_CATEGORY_VISIBILITY',
	SET_CATEGORIES: 'SET_CATEGORIES',
	...SHARED_ACTIONS,
};

export interface CategoryFormState {
	name: string;
	parentCategory?: string[];
	isEnable: boolean;
}

export interface CategoryInitialState {
	loading: boolean;
	isSuccess: boolean;
	error: string;
	categories: string[];
	category?: {};
}

interface GetCategoriesAction {
	type: typeof categoryType.GET_CATEGORIES;
	payload: CategoryFormState[];
}

export type CategoryActionTypes = GetCategoriesAction | SharedActionTypes;

export default categoryType;
