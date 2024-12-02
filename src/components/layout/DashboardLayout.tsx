import React, { ReactNode } from 'react';
import DrawerLayout from './DrawerLayout';
import './dashboard-style.scss';

interface DashboardProps {
	children?: ReactNode;
	drawerChildren?: ReactNode;
}
const Dashboard = ({ children, drawerChildren, ...rest }: DashboardProps) => {
	return (
		<div className='dashboard-page'>
			<DrawerLayout></DrawerLayout>
			<div className='dashboard-main'>{children}</div>
		</div>
	);
};

export default Dashboard;
