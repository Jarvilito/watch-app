import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseBtn from '../BaseBtn';
import MultipleSelectInput from '../MultipleSelectInput';
import SwitchInput from '../SwitchInput';
import {
	addCategory,
	getParentsCategories,
	resetAlert,
	updateCategory,
} from '../../../redux/Category/category.actions';
import AlertPopup from '../../layout/AlertPopup';
import { AppDispatch } from '../../../redux/createStore';
import { SelectorState } from '../../../redux/sharedActionTypes';

const initialForm = {
	name: '',
	parentCategory: [],
	isEnable: true,
};

interface AddCategoryFormProps {
	open: boolean;
	category?: {};
	setCloseDialog: () => void;
}

const AddCategoryForm = ({
	open,
	category,
	setCloseDialog,
	...props
}: AddCategoryFormProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const [alertType, setAlertType] = useState<
		'success' | 'error' | 'info' | 'warning'
	>('success');
	const [openPopup, setOpenPopup] = useState(false);

	const [alertMessage, setAlertMessage] = useState('');
	const { loading, isSuccess, error, categories } = useSelector(
		(state: SelectorState) => state.category
	);

	const [form, setForm] = useState(initialForm);

	const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (!category) {
			await dispatch(addCategory(form));
		} else {
			await dispatch(updateCategory(form));
		}
	};
	const handleCloseAlert = () => {
		dispatch(resetAlert);
		setOpenPopup(false);
	};
	const handleClose = (
		e: React.ChangeEvent<HTMLInputElement>,
		reason?: string
	) => {
		// reason params automatically pass by mui handleclose
		if (reason === 'backdropClick') {
			return;
		}
		handleClearForm();
	};

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;
		console.log(checked);
		setForm({
			...form,
			isEnable: checked,
		});
	};

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log(e);
		const { value, name } = e.target;
		// console.log(value);
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSelectChange = (e: SelectChangeEvent<string | string[]>) => {
		const { value, name } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: Array.isArray(value) ? value : value.split(','),
		}));
	};

	const handleClearForm = () => {
		setForm(initialForm);
		setCloseDialog();
	};

	const viewMode = category ? 'edit' : 'create';

	useEffect(() => {
		if (isSuccess) {
			setAlertType('success');
			setAlertMessage(
				`Category Successfully ${viewMode ? 'Updated' : 'Added'}!`
			);
			setOpenPopup(true);
			dispatch(getParentsCategories());
			handleClearForm();
		}
		if (error) {
			setAlertType('error');
			setAlertMessage(error);
			setOpenPopup(true);
		}
	}, [isSuccess, error]);

	return (
		<React.Fragment>
			<AlertPopup
				variant='standard'
				onClose={() => handleCloseAlert()}
				severity={alertType}
				position={{ vertical: 'top', horizontal: 'center' }}
				open={openPopup}
			>
				{alertMessage}
			</AlertPopup>
			<Dialog
				disableEscapeKeyDown
				maxWidth='sm'
				fullWidth={true}
				className='add-product-dialog'
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: (event: React.ChangeEvent<HTMLInputElement>) => {
						handleSubmit(event);
					},
				}}
			>
				<DialogTitle>{category ? 'Edit' : 'Add'} Category Form</DialogTitle>

				<DialogContent>
					<div className='add-product-dialog__content'>
						<Grid2 container spacing={2} alignItems='center'>
							<Grid2 size={{ xs: 12, sm: 6 }}>
								<TextField
									autoFocus
									required
									name='name'
									value={form.name}
									onChange={handleFormChange}
									label='Name'
									type='text'
									fullWidth
									variant='outlined'
								/>
							</Grid2>
							<Grid2 size={{ xs: 12, sm: 6 }}>
								<MultipleSelectInput
									name='parentCategory'
									label='Select Categories'
									value={form.parentCategory}
									labelKey='name' // Use the key for category names
									valueKey='id' // Use the key for category IDs
									items={categories} // Array of category objects
									onChange={handleSelectChange} // Handler to update the state
								/>
							</Grid2>

							<Grid2 size={12}>
								<SwitchInput
									label='Enable Category?'
									name='isEnable'
									value={form.isEnable}
									checked={form.isEnable}
									onChange={handleSwitchChange}
									color='success'
								/>
							</Grid2>
						</Grid2>
					</div>
				</DialogContent>

				<DialogActions>
					<Button variant='text' onClick={handleClearForm}>
						Cancel
					</Button>
					<BaseBtn
						loading={loading}
						type='submit'
						className='btn btn-submit'
						color='addBtn'
						variant='contained'
						label={viewMode === 'create' ? 'Create' : 'Update'}
					/>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default AddCategoryForm;
