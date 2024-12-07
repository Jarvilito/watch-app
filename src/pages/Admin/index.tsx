import DashboardLayout from '../../components/layout/DashboardLayout';
import Product from './Product';
import { Route, Routes, Navigate } from 'react-router-dom';
import Category from './Category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/createStore';
import { useEffect } from 'react';
import { getCategoriesAll } from '../../redux/Category/category.actions';
const Admin = () => {
	//  const DrawerLayout
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getCategoriesAll());
	}, []);

	return (
		<DashboardLayout>
			<Routes>
				<Route path='/' element={<Navigate to='products' replace />} />
				<Route path='products' element={<Product />} />
				<Route path='categories' element={<Category />} />
			</Routes>
		</DashboardLayout>
	);
};

export default Admin;
