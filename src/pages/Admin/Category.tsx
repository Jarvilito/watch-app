import React, { useEffect, useState } from 'react';
import AlertPopup from '../../components/layout/AlertPopup';
import BaseBtn from '../../components/Form/BaseBtn';
import { Add } from '@mui/icons-material';
import AddCategoryForm from '../../components/Form/AddCategoryForm';
import CategoryLists from '../../components/layout/CategoryLists';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/createStore';
import { resetAlert } from '../../redux/Category/category.actions';

const Category = () => {
	const [category, setCategory] = useState(null);
	const [openAlert, setOpenAlert] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const dispatch = useDispatch<AppDispatch>();

	const handleCloseDialog = () => {
		setCategory(null);
		setOpenDialog(false);
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

			<AddCategoryForm open={openDialog} setCloseDialog={handleCloseDialog} />

			<CategoryLists />
		</div>
	);
};

export default Category;
