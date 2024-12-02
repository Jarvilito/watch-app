import React from 'react';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface DataTalbeProps extends Partial<DataGridProps> {
	columns: GridColDef[];
	rows: any[];
	paginationModel?: { page: number; pageSize: number };
}

const DataTable = ({
	columns = [],
	rows = [],
	paginationModel,
	...rest
}: DataTalbeProps) => {
	return (
		<Paper variant='outlined' sx={{ width: '100%', marginTop: '2rem' }} square>
			<DataGrid
				rows={rows}
				columns={columns.map((col) => ({ ...col, flex: 1 }))}
				{...rest}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
				sx={{
					padding: '0 2rem',
					border: 0,
					'& .MuiDataGrid-columnHeaders': {
						textAlign: 'center', // Optional: Center-align headers
					},
				}}
			/>
		</Paper>
	);
};

export default DataTable;
