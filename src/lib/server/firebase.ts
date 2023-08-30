import {
	PRIVATE_FIREBASE_CLIENT_EMAIL,
	PRIVATE_FIREBASE_PRIVATE_KEY,
	PRIVATE_FIREBASE_PROJECT_ID,
	PRIVATE_FIREBASE_STORAGE_BUCKET
} from '$env/static/private';
import { credential, initializeApp, type ServiceAccount } from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import { getApps } from 'firebase-admin/app';

const adminConfig: ServiceAccount = {
	projectId: PRIVATE_FIREBASE_PROJECT_ID,
	clientEmail: PRIVATE_FIREBASE_CLIENT_EMAIL,
	privateKey: PRIVATE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

const apps = getApps();

if (!apps.length)
	initializeApp({
		credential: credential.cert(adminConfig),
		storageBucket: PRIVATE_FIREBASE_STORAGE_BUCKET
	});

// Custom error class
export class UploadError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UploadError';
	}
}

const generateUniqueFileName = (originalFileName: string) => {
	const arr = originalFileName.split('.');
	const extension = arr[arr.length - 1];
	return `${new Date().getTime()}.${extension}`;
};

export const uploadImage = async (file: File) => {
	const bucket = getStorage().bucket();
	const fileName = generateUniqueFileName(file.name);

	try {
		const fileUpload = bucket.file(fileName);
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		await fileUpload.save(buffer, {
			metadata: {
				contentType: file.type
			},
			public: true
		});

		const url = await fileUpload.getSignedUrl({
			action: 'read',
			expires: '03-09-2491'
		});

		return url[0];
	} catch (error: any) {
		throw new UploadError(error.message || 'An error occurred while uploading image');
	}
};

export const deleteImage = async (url: string) => {
	const bucket = getStorage().bucket();
	let fileName = url.split('/').pop()?.split('?')[0];

	try {
		if (fileName) {
			await bucket.file(fileName).delete();
		}
	} catch (error: any) {
		console.log(error);
		throw new UploadError(error.message || 'An error occurred while deleting image');
	}
};
