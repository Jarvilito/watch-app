import React, { useState, useEffect } from 'react';
import AddProductForm from '../../components/Form/AddProductForm/index';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getProducts,
	resetAlert,
} from '../../redux/Product/product.actions';
import DataTable from '../../components/layout/DataTable';
import { Edit, Visibility, Delete, Add } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { SelectorState } from '../../redux/sharedActionTypes';
import { AppDispatch } from '../../redux/createStore';
import AlertPopup from '../../components/layout/AlertPopup';
import BaseBtn from '../../components/Form/BaseBtn';
// import
const paginationModel = { page: 0, pageSize: 5 };

const Product = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { products, loading } = useSelector(
		(state: SelectorState) => state.product
	);
	const [deleteDialog, setDeleteDialog] = useState(false);

	const [product, setProduct] = useState<any>();
	const [openAlert, setOpenAlert] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const handleDeleteProduct = () => {
		dispatch(deleteProduct(product.id));
		setDeleteDialog(false);
		setOpenAlert(true);
		dispatch(getProducts());
	};

	const handleDelete = (row: any) => {
		setProduct(row);
		setDeleteDialog(true);
		// handle delete product logic
	};

	const handleCloseDialog = () => {
		setProduct(null);
		setOpenDialog(false);
	};
	const columns = [
		{ field: 'brand', headerName: 'Brand' },
		{ field: 'model', headerName: 'Model' },
		{
			field: 'price',
			headerName: 'Price',
			valueGetter: (value: string, row: any) => {
				const price = Number(row.price);
				if (isNaN(price)) {
					return 'No Price Display';
				}
				return `₱ ${price.toLocaleString()}`;
			},
		},
		{ field: 'quantity', headerName: 'Quantity', width: 150 },
		{ field: 'color', headerName: 'Color' },
		{ field: 'condition', headerName: 'Condition' },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 200,
			renderCell: (params: any) => (
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<IconButton
						color='success'
						onClick={() => {
							setProduct(params.row);
							setOpenDialog(true); // Open the form dialog when editing
						}}
					>
						<Edit />
					</IconButton>
					{/* <IconButton
            color="info"
            onClick={() => handleView(params.row.id)}
          >
            <Visibility />
          </IconButton> */}
					<IconButton color='error' onClick={() => handleDelete(params.row)}>
						<Delete />
					</IconButton>
				</div>
			),
		},
	];

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(resetAlert);
	}, []);

	return (
		<div className='product'>
			<h1 className='page-header'>Products</h1>
			<AlertPopup
				onClose={() => setOpenAlert(false)}
				severity='success'
				position={{ vertical: 'top', horizontal: 'center' }}
				open={openAlert}
			>
				Product Delete Successfully!
			</AlertPopup>
			<BaseBtn
				className='btn is-square is-action-with-icon'
				color='addBtn'
				startIcon={<Add />}
				onClick={() => setOpenDialog(true)}
				variant='contained'
				label='Add Product'
			/>

			<AddProductForm
				product={product}
				setCloseDialog={handleCloseDialog}
				open={openDialog}
			/>

			<DataTable
				checkboxSelection={false}
				rowSelection={false}
				autosizeOnMount={true}
				columns={columns}
				paginationModel={paginationModel}
				rows={products}
			/>

			{/* DELETE DIALOG */}

			<Dialog
				open={deleteDialog}
				onClose={() => setDeleteDialog(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Delete {product?.brand} - {product?.model} ?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Once deleted, this product cannot be recover anymore, are you sure
						you want to proceed?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
					<BaseBtn
						loading={loading}
						color='error'
						variant='contained'
						onClick={() => handleDeleteProduct()}
						label='Delete'
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Product;
