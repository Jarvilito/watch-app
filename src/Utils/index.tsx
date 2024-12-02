import { CurrentUser } from '../redux/User/user.types';

export const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => {
	return !!currentUser?.userRoles?.includes('admin');
};
