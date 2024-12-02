import { useAdminAuth } from '../customHooks';

// Check if user is admin, if true, render props.children; otherwise, render null
const WithAdminAuth: React.FC<React.PropsWithChildren> = (props) => {
	return useAdminAuth() ? <>{props.children}</> : null;
};

export default WithAdminAuth;
