import { useAuth } from '../customHooks';

const WithAuth: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const isAuthenticated = useAuth(); // Use the hook to check authentication.

	if (!isAuthenticated) {
		return null; // Render nothing if the user is not authenticated.
	}

	return <>{children}</>; // Render children if authenticated.
};

export default WithAuth;
