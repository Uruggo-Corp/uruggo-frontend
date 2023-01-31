import axios from 'axios';
import { PUBLIC_BASE_API_URL } from '$env/static/public';

export const client = axios.create({
	baseURL: PUBLIC_BASE_API_URL,
	withCredentials: true
});
