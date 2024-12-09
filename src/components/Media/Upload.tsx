import React, { ReactNode, useRef, useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { IMAGE_KIT_PUBLIC_KEY, IMAGE_KIT_URL } from '../../config';
import BaseBtn from '../Form/BaseBtn';
import { CloudUploadOutlined } from '@mui/icons-material';
const publicKey = IMAGE_KIT_PUBLIC_KEY;
const urlEndpoint = IMAGE_KIT_URL;
const authenticator = async () => {
	try {
		const response = await fetch('http://localhost:3001/auth');

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`
			);
		}

		const data = await response.json();
		const { signature, expire, token } = data;
		return { signature, expire, token };
	} catch (error) {
		const err = error as { message: string };
		throw new Error(`Authentication request failed: ${err.message}`);
	}
};

const onError = (err: string) => {
	console.log('Error', err);
};

interface CalculatePercentageProps {
	loaded: number;
	total: number;
}

const calculatePercentage = ({ loaded, total }: CalculatePercentageProps) => {
	if (total === 0) {
		return 0; // Avoid division by zero
	}
	return (loaded / total) * 100;
};

interface UploadImageProps {
	label?: string;
	handleImageUpload: (res: string) => void;
	children: ReactNode;
	folderPath: string;
}

const UploadImage = ({
	label = 'Upload Images',
	handleImageUpload,
	children,
	folderPath = '/',
	...props
}: UploadImageProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const [loadingPercentage, setLoadingPercentage] = useState(0);

	const onUploadProgress = ({ loaded, total }: CalculatePercentageProps) => {
		setLoadingPercentage(calculatePercentage({ loaded, total }));
	};

	const onSuccess = (res: any) => {
		console.log('Success', res);
		handleImageUpload(res);
		setIsLoading(false);
		setLoadingPercentage(0);
	};

	const ikUploadRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<IKContext
				publicKey={publicKey}
				urlEndpoint={urlEndpoint}
				authenticator={authenticator}
			>
				<IKUpload
					fileName="test-upload.png"
					onError={() => onError}
					onSuccess={onSuccess}
					onUploadStart={() => setIsLoading(true)}
					onUploadProgress={onUploadProgress}
					style={{ display: 'none' }}
					folder={folderPath}
					isPrivateFile={false}
					useUniqueFileName={true}
					{...props}
					accept="image/*,video/*"
					ref={ikUploadRef}
				/>
				<BaseBtn
					loadingProgressCount={loadingPercentage}
					loadingVariant="determinate"
					loading={isLoading}
					onClick={() => ikUploadRef?.current?.click()}
					label={label}
					startIcon={<CloudUploadOutlined />}
					variant="contained"
					color="secondary"
				/>

				{children}
			</IKContext>
		</>
	);
};

export default UploadImage;
