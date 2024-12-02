import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CHARACTER } from '../../components/api/graphQL/mutations';
import { GET_CHARACTERS } from '../../components/api/graphQL/queries';
import { Box, TextField } from '@mui/material';
import BaseBtn from '../../components/Form/BaseBtn';

const AddButton = () => {
	const [name, setName] = useState('');

	const [createPost, { loading }] = useMutation(CREATE_CHARACTER, {
		refetchQueries: [{ query: GET_CHARACTERS }],
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createPost({ variables: { name } });
		setName('');
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<form onSubmit={handleSubmit}>
				<TextField
					name='title'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<BaseBtn
					loading={loading}
					type='submit'
					className='btn btn-submit'
					color='addBtn'
					variant='contained'
					label='Add Field'
				/>
			</form>
		</Box>
	);
};

export default AddButton;
