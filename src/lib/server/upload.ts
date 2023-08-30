import { PRIVATE_UPLOAD_API_URL } from '$env/static/private';
import axios from 'axios';

// Custom error class
export class UploadError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UploadError';
	}
}

export const uploadImage = async (file: File) => {
	try {
		const dataToSend = new FormData();
		dataToSend.append('file', file);
		const { data } = await axios.post(`${PRIVATE_UPLOAD_API_URL}/upload`, dataToSend, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return data.url;
	} catch (error: any) {
		console.log(error);
		throw new UploadError(error.message || 'An error occurred while uploading image');
	}
};

export const deleteImage = async (url: string) => {
	let fileName = url.split('/').pop()?.split('?')[0];

	try {
		await axios.delete(`${PRIVATE_UPLOAD_API_URL}/delete/${fileName}`);
	} catch (error: any) {
		throw new UploadError(error.message || 'An error occurred while deleting image');
	}
};
