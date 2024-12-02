import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	isLoggedIn: boolean;
	children: ReactNode;
}
const ProtectedRoute = ({ isLoggedIn, children }: ProtectedRouteProps) => {
	return isLoggedIn ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
