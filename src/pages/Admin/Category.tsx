import React, { useEffect, useState } from 'react';
import AlertPopup from '../../components/layout/AlertPopup';
import BaseBtn from '../../components/Form/BaseBtn';
import { Add } from '@mui/icons-material';
import AddCategoryForm from '../../components/Form/AddCategoryForm';
import CategoryLists from '../../components/layout/CategoryLists';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/createStore';
import {
	getCategoriesAll,
	resetAlert,
} from '../../redux/Category/category.actions';
import { CategoryFormState } from '../../redux/Category/category.type';

const initialForm = {
	name: '',
	parentCategory: [],
	isEnable: true,
};

const Category = () => {
	const [category, setCategory] = useState<CategoryFormState>(initialForm);
	const [openAlert, setOpenAlert] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const dispatch = useDispatch<AppDispatch>();

	const handleCloseDialog = () => {
		setCategory(initialForm);
		setOpenDialog(false);
	};

	const handleUpdate = (val: CategoryFormState) => {
		console.log(val);
		setCategory(val);
		setOpenDialog(true);
	};

	useEffect(() => {
		dispatch(resetAlert);
	}, []);

	return (
		<div className='categories'>
			<h1 className='page-header'>Categories</h1>
			<AlertPopup
				onClose={() => setOpenAlert(false)}
				open={openAlert}
				severity='success'
				position={{ vertical: 'top', horizontal: 'center' }}
			>
				Category Deleted Successfully!
			</AlertPopup>

			<BaseBtn
				className='btn is-square is-action-with-icon'
				color='addBtn'
				startIcon={<Add />}
				onClick={() => setOpenDialog(true)}
				variant='contained'
				label='Add Category'
			/>

			<AddCategoryForm
				open={openDialog}
				setCloseDialog={handleCloseDialog}
				category={category}
			/>

			<CategoryLists handleUpdate={handleUpdate} />
		</div>
	);
};

export default Category;
