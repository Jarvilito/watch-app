import React from 'react';
import './style.scss';

const sampleData = [
	{
		brand: 'Tissot',
		items: [
			{
				model: 'Gentleman',
				url: '/tissot/gentleman',
			},

			{
				model: 'PRX',
				url: '/tissot/prx',
			},
			{
				model: 'Gentleman',
				url: '/tissot/gentleman',
			},

			{
				model: 'PRX',
				url: '/tissot/prx',
			},
		],
	},

	{
		brand: 'Certina',
		items: [
			{
				model: 'Gentleman',
				url: '/tissot/gentleman',
			},

			{
				model: 'PRX',
				url: '/tissot/prx',
			},
			{
				model: 'Gentleman',
				url: '/tissot/gentleman',
			},

			{
				model: 'PRX',
				url: '/tissot/prx',
			},
		],
	},

	{
		brand: 'Rolex',
		items: [
			{
				model: 'Gentleman',
				url: '/tissot/gentleman',
			},

			{
				model: 'PRX',
				url: '/tissot/prx',
			},
			{
				model: 'Gentleman',
				url: '/tissot/gentleman',
			},

			{
				model: 'PRX',
				url: '/tissot/prx',
			},
		],
	},
];

interface NavDesktopProps {
	isOpen: boolean;
}

const NavDesktop = ({ isOpen }: NavDesktopProps) => {
	return (
		<div
			className={`${
				isOpen ? 'nav-desktop--is-visible' : 'nav-desktop--is-hidden'
			} nav-desktop`}
		></div>
	);
};

export default NavDesktop;
