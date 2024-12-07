import { Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './drawer-style.scss';
import { deepOrange } from '@mui/material/colors';
import LogoutBtn from '../Form/LogoutBtn';
import { useSelector } from 'react-redux';
import { SelectorState } from '../../redux/sharedActionTypes';
import { ReactNode, useEffect } from 'react';
import Icon from '@mui/material/Icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

interface MenuItem {
	name: string;
	link: string;
	icon: ReactNode;
}

const userMenu: MenuItem[] = [
	{
		name: 'My Details',
		link: '/account/my-account',
		icon: <AccountCircleOutlinedIcon />,
	},
	{
		name: 'Order History',
		link: '/account/order-history',
		icon: <HistoryToggleOffOutlinedIcon />,
	},
	{
		name: 'Cart',
		link: '/account/cart',
		icon: <ShoppingCartOutlinedIcon />,
	},
	{
		name: 'Favorite',
		link: '/account/favorite',
		icon: <FavoriteBorderOutlinedIcon />,
	},
];

const adminMenu: MenuItem[] = [
	{
		name: 'Products',
		link: '/admin/products',
		icon: <WatchOutlinedIcon />,
	},
	{
		name: 'Category',
		link: '/admin/categories',
		icon: <CategoryOutlinedIcon />,
	},
	{
		name: 'Users',
		link: '/admin/users',
		icon: <SupervisedUserCircleOutlinedIcon />,
	},
];
const DrawerLayout = () => {
	const location = useLocation();

	const isAdminRoute = location.pathname.startsWith('/admin');
	const menus = isAdminRoute ? adminMenu : userMenu || [];

	const { currentUser } = useSelector((state: SelectorState) => state.user);
	return (
		<div className='drawer'>
			<div className='drawer__header'>
				<Avatar sx={{ bgcolor: deepOrange[500] }}>
					{currentUser?.displayName?.[0]}
				</Avatar>
				<h3>Hi {currentUser?.displayName || 'Guess'}</h3>
			</div>
			<ul className='drawer__list'>
				{menus.map((item) => (
					<Link to={item.link} key={item.link}>
						<li className='drawer__item'>
							{item.icon}
							{item.name}
						</li>
					</Link>
				))}
			</ul>

			<div className='drawer__footer'>
				<LogoutBtn />
			</div>
		</div>
	);
};

export default DrawerLayout;
