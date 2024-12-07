import React, { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './accordion-style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SelectorState } from '../../redux/sharedActionTypes';
import { CategoryFormState } from '../../redux/Category/category.type';
import BaseBtn from '../Form/BaseBtn';
import IconBtn from '../Form/IconBtn';
import {
	Edit,
	EditAttributesOutlined,
	RemoveRedEye,
	RemoveRedEyeOutlined,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { AppDispatch } from '../../redux/createStore';
import {
	getCategoriesAll,
	updateCategory,
} from '../../redux/Category/category.actions';
import AlertPopup from './AlertPopup';
import { resetAlert } from '../../redux/Product/product.actions';

const CategoryLists = ({ handleUpdate }: any) => {
	const { loading, error, isSuccess, categories } = useSelector(
		(state: SelectorState) => state.category
	);
	const dispatch = useDispatch<AppDispatch>();
	const handleEditClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		item: any
	) => {
		e.stopPropagation(); // Prevent the event from triggering the accordion toggle
		handleUpdate(item);
	};

	const handleDisableButton = async (
		e: React.MouseEvent<HTMLButtonElement>,
		item: CategoryFormState
	) => {
		e.stopPropagation();
		console.log('Button clicked!');
		const payload = {
			...item,
			isEnable: !item.isEnable,
		};
		dispatch(updateCategory(item.id, payload));
	};

	const { allCategories } = useSelector(
		(state: SelectorState) => state.category
	);

	const parentCategories = allCategories.filter(
		(category: CategoryFormState) => !category.parentCategory?.length
	);

	const subCategories = allCategories.filter(
		(category: CategoryFormState) => category.parentCategory?.length
	);

	const handleAccordionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(getCategoriesAll());
		}
	}, [isSuccess]);

	return (
		<div className='accordion'>
			{parentCategories.map((parentCat) => (
				<Accordion onChange={() => handleAccordionChange} key={parentCat.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1-content'
						id='panel1-header'
					>
						<div className='accordion-list__main'>
							<IconBtn
								loading={loading}
								icon={parentCat.isEnable ? <Visibility /> : <VisibilityOff />}
								title={parentCat.isEnable ? 'Disable' : 'Enable'}
								color={parentCat.isEnable ? 'info' : 'error'}
								onClick={(e) => handleDisableButton(e, parentCat)}
							/>

							<IconBtn
								icon={<Edit />}
								color='success'
								title='Edit'
								onClick={(e) => handleEditClick(e, parentCat)}
							/>
							<h4 className='text-capitalize title'>{parentCat.name}</h4>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<ul className='accordion-list__sub'>
							{subCategories
								.filter(
									(child) =>
										Array.isArray(child.parentCategory) &&
										child.parentCategory?.includes(parentCat.id)
								)
								.map((child) => (
									<li className='accordion-list__sub-item' key={child.id}>
										<IconBtn
											loading={loading}
											icon={child.isEnable ? <Visibility /> : <VisibilityOff />}
											title={child.isEnable ? 'Disable' : 'Enable'}
											color={child.isEnable ? 'info' : 'error'}
											onClick={(e) => handleDisableButton(e, child)}
										/>

										<IconBtn
											icon={<Edit />}
											color='success'
											title='Edit'
											onClick={(e) => handleEditClick(e, child)}
										/>

										<h4 className='text-capitalize'>{child.name}</h4>
									</li>
								))}

							{subCategories.filter((child) =>
								child.parentCategory?.includes(parentCat.id)
							).length === 0 && <li>No subcategories</li>}
						</ul>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default CategoryLists;
