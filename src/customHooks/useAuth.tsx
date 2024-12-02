import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectorState } from '../redux/sharedActionTypes';

const mapState = (state: SelectorState) => ({
	currentUser: state.user.currentUser,
});

const useAuth = () => {
	const navigate = useNavigate();

	const { currentUser } = useSelector(mapState);
	useEffect(() => {
		if (currentUser === undefined) return;
		if (!currentUser) {
			navigate('/login');
		}
	}, [currentUser, navigate]);
	return currentUser;
};

export default useAuth;
