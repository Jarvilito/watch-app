import DashboardLayout from '../../components/layout/DashboardLayout';
import Product from './Product';
import { Route, Routes, Navigate } from 'react-router-dom';
import Category from './Category';

const Admin = () => {
	//  const DrawerLayout

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
