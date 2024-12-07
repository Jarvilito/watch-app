import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BaseBtn from '../BaseBtn';
import AddIcon from '@mui/icons-material/Add';
import {
	Box,
	Divider,
	Grid2,
	IconButton,
	InputAdornment,
	SelectChangeEvent,
} from '@mui/material';
import Upload from '../../Media/Upload';
import Image from '../../Media/Image';
import './style.scss';
import SelectInput from '../SelectInput';
import RadioInput from '../RadioInput';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import { DeleteForever } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProduct,
	getProducts,
	resetAlert,
	updateProduct,
} from '../../../redux/Product/product.actions';
import AlertPopup from '../../layout/AlertPopup';
import { AppDispatch } from '../../../redux/createStore';
import { SelectorState } from '../../../redux/sharedActionTypes';
import { ProductFormState } from '../../../redux/Product/product.types';
import MultipleSelectInput from '../MultipleSelectInput';
const initialForm: ProductFormState = {
	brand: '',
	crystal: '',
	condition: '',
	diameter: 0,
	model: '',
	gender: '',
	color: '',
	type: '',
	price: 0,
	quantity: 1,
	description: '',
	images: [],
	categories: [],
	subCategories: [],
	customField: [],
	createdBy: '',
	dateCreated: new Date(),
	createdByID: '',
};

const gender = ['Men', 'Women', 'Unisex'];

const conditionLists = ['Brand New', 'Good as new', 'Well used'];

interface AddProductFormProps {
	product?: any;
	open: boolean;
	setCloseDialog: () => void;
}

const AddProductForm = ({
	product,
	open,
	setCloseDialog,
}: AddProductFormProps) => {
	const { loading, error, isSuccess } = useSelector(
		(state: SelectorState) => state.product
	);

	const { allCategories } = useSelector(
		(state: SelectorState) => state.category
	);

	const parentCategories = allCategories.filter(
		(category) => !category.parentCategory.length
	);

	const subCategories = allCategories.filter(
		(category) => category.parentCategory.length
	);

	const [alertType, setAlertType] = useState<
		'success' | 'error' | 'info' | 'warning'
	>('success');

	const [alertMessage, setAlertMessage] = useState('');

	const [openPopup, setOpenPopup] = useState(false);

	const [viewMode, setViewMode] = useState('create');

	const [form, setForm] = useState(initialForm);

	const [customField, setCustomField] = useState<any[]>([]);

	const [imagesUpload, setImagesUpload] = useState<any[]>([]);

	const dispatch = useDispatch<AppDispatch>();

	const handleClose = (
		e: React.FormEventHandler<HTMLFormElement>,
		reason: string
	) => {
		// reason params automatically pass by mui handleclose
		if (reason === 'backdropClick') {
			return;
		}
		handleClearForm();
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
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
		setImagesUpload([]);
		setCustomField([]);
		setCloseDialog();
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const payload: ProductFormState = {
			...form,
			customField: customField || [],
			images: imagesUpload || [],
		};
		if (!product) {
			await dispatch(addProduct(payload));
		} else {
			await dispatch(updateProduct(payload));
		}

		dispatch(getProducts());
	};

	const handleImageUpload = (res: string) => {
		setImagesUpload([...imagesUpload, res]);
	};

	const handleAddCustomField = () => {
		setCustomField([
			...customField,
			{
				id: uuidv4(),
				label: '',
				description: '',
			},
		]);
	};

	const handleProductUpdate = () => {
		const { customField, images } = product;
		const mergeForm = Object.keys(initialForm).reduce(
			(acc: Record<string, any>, key) => {
				if (product[key] !== undefined) {
					acc[key] = product[key];
				}
				return acc;
			},
			{}
		);

		const updatedForm = {
			id: product.id,
			...initialForm,
			...mergeForm,
		};

		setForm(updatedForm);

		if (images.length) setImagesUpload(images);
		if (customField.length) setCustomField(customField);
	};

	useEffect(() => {
		if (isSuccess) {
			setAlertType('success');
			setAlertMessage(`Product Successfully ${product ? 'Updated' : 'Added'}!`);
			setOpenPopup(true);
			setCloseDialog();
		}

		if (error) {
			setAlertType('error');
			setAlertMessage(error);
			setOpenPopup(true);
		}
	}, [isSuccess, error]);

	useEffect(() => {
		if (product) {
			setViewMode('update');
			handleProductUpdate();
		} else setViewMode('create');
	}, [product]);

	const handleImageDelete = async ({ fileId }: { fileId: string }) => {
		try {
			const response = await fetch(
				`http://localhost:3001/delete?fileId=${fileId}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				setImagesUpload((prevField) =>
					prevField.filter((image) => image.fileId !== fileId)
				);
			} else {
				const error = await response.json();
				setOpenPopup(true);
				setAlertType('error');
				setAlertMessage(error);
			}
		} catch (err: any) {
			setOpenPopup(true);
			setAlertType('error');
			setAlertMessage(err);
		}
	};

	const handleCustomFieldInputChange = (
		id: string,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setCustomField(
			(
				prevFields // Use functional state update
			) =>
				prevFields.map((field, fieldIndex) =>
					field.id === id ? { ...field, [name]: value } : field
				)
		);
	};

	const handleCloseAlert = () => {
		dispatch(resetAlert);
		setOpenPopup(false);
	};

	const handleDeleteCustomField = (id: string | number) => {
		setCustomField((prevField) =>
			prevField.filter((field, i) => field.id !== id)
		);
	};

	return (
		<React.Fragment>
			<AlertPopup
				onClose={() => handleCloseAlert()}
				severity={alertType}
				position={{ vertical: 'top', horizontal: 'center' }}
				open={openPopup}
			>
				{alertMessage}
			</AlertPopup>
			<Dialog
				disableEscapeKeyDown
				maxWidth='md'
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
				<DialogTitle>{product ? 'Edit' : 'Add'} Watch Form</DialogTitle>
				<DialogContent>
					<div className='add-product-dialog__content'>
						<Grid2 container spacing={2} alignItems='center'>
							<Grid2 size={{ xs: 12, sm: 6 }}>
								<TextField
									autoFocus
									required
									name='brand'
									value={form.brand}
									onChange={handleFormChange}
									label='Brand'
									type='text'
									fullWidth
									variant='outlined'
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<TextField
									required
									name='model'
									label='Model'
									type='text'
									fullWidth
									variant='outlined'
									value={form.model}
									onChange={handleFormChange}
								/>
							</Grid2>

							<Grid2 size={{ xs: 8, sm: 4 }}>
								<TextField
									name='price'
									label='Price'
									type='number'
									fullWidth
									variant='outlined'
									value={form.price}
									onChange={handleFormChange}
									slotProps={{
										input: {
											startAdornment: (
												<InputAdornment position='start'>₱</InputAdornment>
											),
										},
									}}
								/>
							</Grid2>

							<Grid2 size={{ xs: 4, sm: 2 }}>
								<TextField
									name='quantity'
									label='Quantity'
									type='number'
									fullWidth
									variant='outlined'
									value={form.quantity}
									onChange={handleFormChange}
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<TextField
									name='diameter'
									label='Diameter (mm)'
									type='number'
									fullWidth
									variant='outlined'
									value={form.diameter}
									onChange={handleFormChange}
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<SelectInput
									fullWidth
									labelId='select-gender-label'
									id='select-gender'
									name='gender'
									value={form.gender}
									label='Gender'
									items={gender}
									onChange={handleFormChange}
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<TextField
									name='color'
									label='Color'
									type='text'
									fullWidth
									variant='outlined'
									value={form.color}
									onChange={handleFormChange}
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<TextField
									name='crystal'
									label='Crystal Type (e.g. Sapphire)'
									type='text'
									fullWidth
									variant='outlined'
									value={form.crystal}
									onChange={handleFormChange}
								/>
							</Grid2>
							<Grid2 size={{ xs: 12, sm: 6 }}>
								<RadioInput
									row
									aria-labelledby='radio-condition-label'
									name='condition'
									defaultValue='New'
									onChange={handleFormChange}
									value={form.condition}
									items={conditionLists}
									label='Condition'
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<MultipleSelectInput
									name='categories'
									label='Select Parent Categories'
									value={form.categories}
									labelKey='name'
									valueKey='id'
									items={parentCategories}
									onChange={handleSelectChange}
								/>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<MultipleSelectInput
									name='subCategories'
									label='Select Child Categories'
									value={form.subCategories}
									labelKey='name'
									valueKey='id'
									items={subCategories}
									onChange={handleSelectChange}
								/>
							</Grid2>

							<Grid2 size={12}>
								<TextField
									label='Description'
									multiline
									fullWidth
									rows={4}
									variant='outlined'
									name='description'
									value={form.description}
									onChange={handleFormChange}
								/>
							</Grid2>

							<Grid2 size={12}>
								<Box
									className='image-upload'
									sx={{ paddingBottom: `${!imagesUpload.length && '5rem'}` }}
								>
									<Upload
										handleImageUpload={handleImageUpload}
										folderPath='/watch-products'
									>
										<div className='image-upload__wrap'>
											{imagesUpload.map((image) => (
												<div
													className='image-upload__item image-zoom-transition'
													key={image.fileId}
												>
													<Image
														path={image.filePath}
														transformation={[
															{
																height: 150,
																width: 100,
															},
														]}
													/>
													<div className='image-upload__delete'>
														<IconButton
															size='medium'
															onClick={() => handleImageDelete(image)}
														>
															<DeleteForever color='error' fontSize='inherit' />
														</IconButton>
													</div>
												</div>
											))}
										</div>
									</Upload>
								</Box>

								<Divider />
							</Grid2>

							<Grid2 size={12}>
								<Box>
									<BaseBtn
										className='btn btn-submit'
										color='secondary'
										onClick={() => handleAddCustomField()}
										startIcon={<AddIcon />}
										variant='contained'
										label='Add New Field'
									/>
									<Box sx={{ ml: 1, mt: 1 }} className='sub-text'>
										Add new label and description, e.g. (Movement: PowerMatic
										80)
									</Box>
								</Box>
							</Grid2>

							{customField.map((field, index) => (
								<React.Fragment key={index}>
									<Grid2 size={{ xs: 12, sm: 3 }}>
										<TextField
											fullWidth
											label='Label'
											name='label'
											type='text'
											value={field.label}
											onChange={(event) =>
												handleCustomFieldInputChange(field.id, event)
											}
										/>
									</Grid2>
									<Grid2 size={{ xs: 12, sm: 8 }}>
										<TextField
											fullWidth
											label='Description'
											name='description'
											type='text'
											value={field.description}
											onChange={(event) =>
												handleCustomFieldInputChange(field.id, event)
											}
										/>
									</Grid2>
									<Grid2 size='auto'>
										<IconButton
											aria-label='delete'
											onClick={() => handleDeleteCustomField(field.id)}
										>
											<CloseIcon color='error' />
										</IconButton>
									</Grid2>
								</React.Fragment>
							))}
							{/* <Grid  */}
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

export default AddProductForm;
