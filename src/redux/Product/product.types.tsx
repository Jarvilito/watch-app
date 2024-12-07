const productTypes = {
	SET_PRODUCT_LIST: 'SET_PRODUCT_LISTS',
	GET_PRODUCTS: 'GET_PRODUCTS',
	DELETE_PRODUCT: 'DELETE_PRODUCT',
};

type customField = {
	description: string;
	id: string;
	label: string;
};

export interface ProductInitialState {
	loading: boolean;
	isSuccess: boolean;
	error: string;
	products: Array<ProductFormState>;
}

export interface ProductFormState {
	id?: string;
	brand: string;
	color: string;
	condition: string;
	model: string;
	price: number;
	quantity: number;
	type?: string;
	createdBy: string;
	createdByID: string;
	crystal: string;
	dateCreated: Date;
	dateUpdated?: Date;
	description?: string;
	diameter?: number | string;
	gender: string;
	images: any[];
	customField?: Array<customField>;
	categories: string[];
	subCategories: string[];
}

export interface GetProductsAction {
	type: typeof productTypes.GET_PRODUCTS;
	payload: ProductFormState[];
}
export default productTypes;
