import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productReducer from './Product/product.reducer';
import categoryReducer from './Category/category.reducer';

export default combineReducers({
	user: userReducer,
	product: productReducer,
	category: categoryReducer,
});
