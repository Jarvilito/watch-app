import { Alert, Snackbar } from '@mui/material';
import { ReactNode } from 'react';

interface AlertPopupProps extends React.ComponentProps<typeof Alert> {
	children?: ReactNode;
	onClose: () => void;
	position?: {
		vertical: 'bottom' | 'top';
		horizontal: 'left' | 'center' | 'right';
	};
	severity: 'success' | 'error' | 'info' | 'warning';
	variant?: 'filled' | 'standard' | 'outlined';
	open: boolean;
	autoHideDuration?: 6000;
}

const AlertPopup = ({
	children,
	onClose,
	variant = 'filled',
	position,
	open,
	autoHideDuration = 6000,
	severity,
	...props
}: AlertPopupProps) => {
	return (
		<Snackbar
			onClose={onClose}
			open={open}
			autoHideDuration={6000}
			anchorOrigin={position}
		>
			<Alert
				{...props}
				severity={severity}
				variant={variant}
				sx={{ width: '100%' }}
			>
				{children}
			</Alert>
		</Snackbar>
	);
};

export default AlertPopup;
