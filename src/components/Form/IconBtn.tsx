import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

interface IconBtnProps {
	title: string;
	color?: any;
	icon: ReactNode;
	loading?: boolean;
	onClick: (e: any) => void;
}

const IconBtn = ({
	title,
	onClick,
	icon,
	color = 'success',
	loading = false,
}: IconBtnProps) => {
	return (
		<Tooltip title={title}>
			<span>
				<IconButton color={color} disabled={loading} onClick={onClick}>
					{loading ? <CircularProgress size={24} /> : icon}
				</IconButton>
			</span>
		</Tooltip>
	);
};

export default IconBtn;
