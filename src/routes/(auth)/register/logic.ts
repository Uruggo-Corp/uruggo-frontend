import type { CreateAgent, CreateUser, User } from '$lib/types/user.types';
import { client } from '../../../lib/utils/client';

export const createUser = async (data: CreateUser): Promise<User> => {
	const response = await client.post<User>('/users', data);
	return response.data;
};

export const createAgent = async (data: CreateAgent): Promise<User> => {
	const response = await client.post<User>('/users/agent', data);
	return response.data;
};

interface UploadResponse {
	url: string;
}

export const uploadImage = async (image: Blob, name: string): Promise<string> => {
	const formData = new FormData();
	formData.append('image', image, name);
	const response = await client.post<UploadResponse>('/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data.url;
};
