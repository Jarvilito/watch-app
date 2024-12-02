import {
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Box,
	Pagination,
} from '@mui/material';
import React, { useState } from 'react';
import { GET_CHARACTERS } from '../../components/api/graphQL/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import SearchInput from '../../components/Form/SearchInput';

const CharacterLists = () => {
	const { data, error, loading } = useQuery(GET_CHARACTERS);
	const [searchName, setSearchName] = useState('');
	const [page, setPage] = useState(1);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchName(e.target.value);
	};

	const [
		fetchFilteredCharacters,
		{ data: filterData, error: filterError, loading: filterLoading },
	] = useLazyQuery(GET_CHARACTERS);

	const dataResponse = filterData?.characters || data?.characters;
	const characters = dataResponse?.results;
	const pages = dataResponse?.info.pages;

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent page reload on form submit
		fetchFilteredCharacters({ variables: { name: searchName, page } });
	};

	const handlePaginationChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		value: number
	) => {
		setPage(value); // Update the page state
		fetchFilteredCharacters({ variables: { name: searchName, page: value } });
	};

	// Handle loading and error states
	if (loading || filterLoading) return <div>Loading...</div>;
	if (error || filterError)
		return <div>Error: {error?.message || filterError?.message}</div>;

	return (
		<div>
			<form onSubmit={handleSearchSubmit}>
				<Box sx={{ padding: '2rem' }}>
					<SearchInput
						type='submit'
						label='Search by name'
						variant='standard'
						name='searchName'
						value={searchName}
						onChange={() => handleSearchInput}
						handleSearch={() => handleSearchSubmit}
					/>
					<Pagination
						page={page}
						onChange={() => handlePaginationChange}
						count={pages}
						color='secondary'
					/>
				</Box>
			</form>

			<List>
				{characters?.length ? (
					characters.map(
						(item: {
							id: string;
							name: string;
							image: string;
							status: string;
							location: { name: string };
						}) => (
							<ListItem
								key={item.id}
								secondaryAction={
									<IconButton edge='end' aria-label='delete'></IconButton>
								}
							>
								<ListItemAvatar>
									<Avatar alt={item.name} src={item.image} />
								</ListItemAvatar>
								<ListItemText
									primary={item.name}
									secondary={
										item.status && (
											<div style={{ display: 'flex', flexDirection: 'column' }}>
												<span>
													<strong>Status</strong>: {item.status}
												</span>
												<span>
													<strong>Location</strong>: {item.location.name}
												</span>
											</div>
										)
									}
								/>
							</ListItem>
						)
					)
				) : (
					<div>No character found</div>
				)}
			</List>
		</div>
	);
};

export default CharacterLists;
