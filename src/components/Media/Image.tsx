import React from 'react';
import { IKImage } from 'imagekitio-react';
import { IMAGE_KIT_URL } from '../../config';
const urlEndPoint = IMAGE_KIT_URL;

const Image: React.FC<Record<string, any>> = ({ src, ...props }) => {
	return (
		<IKImage
			src={src}
			urlEndpoint={urlEndPoint}
			{...props}
			lqip={{ active: true, quality: 20 }}
			loading='lazy'
		/>
	);
};

export default Image;
