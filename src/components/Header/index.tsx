import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import './style.scss';
import Logo from '../../assets/logo.png';
import NavDesktop from '../NavDesktop';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import { checkUserIsAdmin } from '../../Utils';
import { SelectorState } from '../../redux/sharedActionTypes';
const leftNavLists = [
	{
		label: 'Brands',
		url: '/brands',
	},
	{
		label: 'New Release',
		url: '/new-release',
	},
];

const mainNavList = [
	{
		label: 'Men',
		url: '/men',
	},

	{
		label: 'Women',
		url: '/women',
	},

	{
		label: 'Collection',
		url: '/man',
	},

	{
		label: 'Strap',
		url: '/man',
	},
];

const Header = () => {
	const currentUser = useSelector(
		(state: SelectorState) => state.user.currentUser
	);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isHomePageState, setIsHomePageState] = useState(false);
	const location = useLocation();

	const accountList = [
		{ label: 'Search', icon: <SearchOutlinedIcon /> },
		{ label: 'Cart', icon: <ShoppingCartOutlinedIcon /> },
		{ label: 'Favorite', icon: <FavoriteBorderOutlinedIcon /> },
		{
			label: `${currentUser ? 'Account' : 'Login'}`,
			icon: <AccountCircleOutlinedIcon />,
			link: `${currentUser ? '/account' : '/login'}`,
		},
	];

	useEffect(() => {
		const isHomePage = location.pathname === '/';
		setIsHomePageState(isHomePage);

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		if (isHomePage) {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	}, [location.pathname]);

	return (
		<header
			className={`header
            ${isHomePageState ? 'header--homepage' : ''}
            ${isScrolled || !isHomePageState ? 'header--scrolled' : ''}
        `}
		>
			<div className='header__wrap'>
				<div className='header__left'>
					{leftNavLists.map((list) => {
						return (
							<a
								href={list.url}
								key={list.label}
								className='header__nav-label link-hover-animation'
							>
								{list.label}
							</a>
						);
					})}
				</div>

				<div className='header__main'>
					<Box sx={{ mb: 2 }}>
						<Link to='/'>
							<img src={Logo} alt='Watch Logo' width={55} height={50} />
						</Link>
					</Box>

					<div className='header__main-list'>
						{mainNavList.map((list) => {
							return (
								<a
									href={list.url}
									key={list.label}
									className='header__nav-label link-hover-animation'
								>
									{list.label}
								</a>
							);
						})}
					</div>
				</div>

				<div className='header__account'>
					{accountList.map((item) => {
						return (
							<Tooltip key={item.label} title={item.label}>
								<Link to={item.link || '#'} className='header__account-icon'>
									<span>{item.icon}</span>
								</Link>
							</Tooltip>
						);
					})}

					{}
					{checkUserIsAdmin(currentUser) && (
						<Tooltip title='Admin Page'>
							<Link to='/admin' className='header__account-icon text-special'>
								<DisplaySettingsOutlinedIcon />
							</Link>
						</Tooltip>
					)}
				</div>
			</div>
			<NavDesktop />
		</header>
	);
};

export default Header;
