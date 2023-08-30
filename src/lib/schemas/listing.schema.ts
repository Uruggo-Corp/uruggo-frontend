import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;

export const ListingSchema = z.object({
	images: z.array(
		z
			.any()
			.refine((image) => image.size < MAX_FILE_SIZE, 'Image is too large')
			.refine(
				(image) => image.type.startsWith('image/') || image.type === 'application/octet-stream',
				'Only .jpg, .jpeg, .png and .webp formats are supported.'
			)
	),
	title: z
		.string({ required_error: 'Title is required' })
		.min(3, 'Title must be at least 3 characters long'),
	description: z
		.string({ required_error: 'Description is required' })
		.min(10, 'Description must be at least 10 characters long'),
	street_address: z
		.string({ required_error: 'Street address is required' })
		.min(3, 'Street address must be at least 3 characters long'),
	city: z
		.string({ required_error: 'City is required' })
		.min(3, 'City must be at least 3 characters long'),
	state: z
		.string({ required_error: 'State is required' })
		.min(3, 'State must be at least 3 characters long'),
	zip_code: z.string().min(3, 'Zip code must be at least 3 characters long').optional(),

	country: z.string({ required_error: 'Country is required' }),
	price: z // In naira symbol
		.number({ required_error: 'Price is required' })
		.min(1, 'Price must be at least ₦1'),
	bedrooms: z
		.number({ required_error: 'Bedrooms is required' })
		.min(1, 'Bedrooms must be at least 1'),
	bathrooms: z
		.number({ required_error: 'Bathrooms is required' })
		.min(1, 'Bathrooms must be at least 1')
});

export type ListingValidationError = {
	images: string[];
	title: string[];
	description: string[];
	street_address: string[];
	city: string[];
	state: string[];
	zip_code: string[];
	country: string[];
	price: string[];
	bedrooms: string[];
	bathrooms: string[];
	server: string[];
};
