import React from 'react';
import { IMAGE_KIT_URL } from '../../config';
import { IKVideo } from 'imagekitio-react';

const urlEndPoint = IMAGE_KIT_URL;

const Video = (props: any) => {
	return <IKVideo urlEndpoint={urlEndPoint} {...props} />;
};

export default Video;
