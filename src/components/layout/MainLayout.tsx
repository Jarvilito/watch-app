import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className='app-container'>
			<Header />
			<main className='main-content'>{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
