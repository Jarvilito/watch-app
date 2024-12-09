import React, { ReactNode, useEffect } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { SelectorState } from '../../redux/sharedActionTypes';
import MenImage from '../../assets/men_nav.png';
import WomenImage from '../../assets/women_nav.png';
import BrandsImage from '../../assets/brands_nav.png';
import CollectionImage from '../../assets/collection_nav.png';
import { Grid2 } from '@mui/material';

interface NavDesktopProps {
	isOpen: boolean;
	selectedNav?: string;
}

const images: Record<string, any> = {
	men: MenImage,
	women: WomenImage,
	brands: BrandsImage,
	collection: CollectionImage,
};

const NavDesktop = ({ isOpen, selectedNav }: NavDesktopProps) => {
	const { products } = useSelector((state: SelectorState) => state.product);

	const filterBySelectedNav =
		selectedNav === 'brands'
			? products
			: products.filter(
					(product) =>
						product.gender.toLocaleLowerCase() ===
						selectedNav?.toLocaleLowerCase()
			  );

	const filterBrands = Array.from(
		new Set(filterBySelectedNav.map((item) => item.brand))
	);

	useEffect(() => {
		console.log(filterBySelectedNav);
	}, [filterBySelectedNav]);

	return (
		<div
			className={`${
				isOpen ? 'nav-desktop--is-visible' : 'nav-desktop--is-hidden'
			} nav-desktop`}
		>
			<div className="nav-desktop__wrapper">
				<Grid2 container spacing={2}>
					<Grid2 container offset={3} size={6}>
						{filterBrands.map((brand) => (
							<Grid2 size={4}>
								<ul className="nav-desktop__item">
									<li key={brand} className="nav-desktop__brand-title">
										<h2 className="link-hover-animation">{brand}</h2>
									</li>
									{[
										...new Set(
											filterBySelectedNav
												.filter((nav) => nav.brand === brand)
												.map((filterCat) => filterCat?.model)
										),
									].map((uniqueModel) => (
										<li className="nav-desktop__brand-item" key={uniqueModel}>
											<span className="link-hover-animation">
												{uniqueModel}
											</span>
										</li>
									))}

									<li className="text-bold cursor-pointer">
										<span className="nav-desktop__brand-see-all">See all</span>
									</li>
								</ul>
							</Grid2>
						))}
					</Grid2>
					<Grid2 size={3}>
						{selectedNav && selectedNav?.toLocaleLowerCase() in images && (
							<img
								height="auto"
								width="100%"
								src={images[selectedNav?.toLowerCase() ?? ''] || ''}
								alt={`${selectedNav ?? 'unknown'} category`}
							/>
						)}
					</Grid2>
				</Grid2>
			</div>
		</div>
	);
};

export default NavDesktop;
