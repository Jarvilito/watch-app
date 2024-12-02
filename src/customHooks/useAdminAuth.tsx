import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUserIsAdmin } from '../Utils';
import { SelectorState } from '../redux/sharedActionTypes';

const mapState = (state: SelectorState) => ({
	currentUser: state.user.currentUser,
});

const useAdminAuth = () => {
	const navigate = useNavigate();
	const { currentUser } = useSelector(mapState);

	useEffect(() => {
		if (!currentUser || !checkUserIsAdmin(currentUser)) {
			navigate('/'); // Redirect to home if not admin
		}
	}, [currentUser, navigate]);

	return currentUser; // Return the user for further usage
};

export default useAdminAuth;
