import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react';

interface CustomComponentProps extends ButtonProps {
	loading?: boolean;
	label: string;
	startIcon?: ReactNode;
	loadingVariant?: 'determinate' | 'indeterminate';
	loadingProgressCount?: number;
	startIconSize?: number;
}

const BaseBtn = ({
	loading = false,
	label,
	startIcon,
	loadingVariant = 'indeterminate',
	loadingProgressCount,
	startIconSize = 20,
	...props
}: CustomComponentProps) => {
	return (
		<Button
			{...props}
			disabled={loading}
			startIcon={
				loading ? (
					<CircularProgress
						variant={loadingVariant}
						value={loadingProgressCount}
						size={startIconSize}
					/>
				) : (
					startIcon
				)
			}
		>
			{loading ? 'Loading...' : label}
		</Button>
	);
};

export default BaseBtn;
