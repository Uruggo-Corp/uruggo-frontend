import type { Image } from '@prisma/client';
import toast from 'svelte-french-toast';

export const showToastr = (message: string, type: string | null) => {
	if (message) {
		if (type === 'success') {
			toast(message, {
				style: 'background: #9BA809; color: #06111F;',
				position: 'bottom-right'
			});
		} else if (type === 'error') {
			toast(message, {
				style: 'background: #c72302; color: #fff;',
				position: 'bottom-right'
			});
		} else if (type === 'warning') {
			toast(message, {
				style: 'background: #fff3cd; color: #fbbf24;',
				position: 'bottom-right'
			});
		} else if (type === 'info') {
			// Blue background with white text
			toast(message, {
				style: 'background: #06111F; color: #fff;',
				position: 'bottom-right'
			});
		} else {
			toast(message, {
				style: 'background: #06111F; color: #fff;',
				position: 'bottom-right'
			});
		}
	}
};

export const getDefaultImage = (images: Image[]) => {
	let defaultImage = images.find((image) => image.isDefault === true);

	if (!defaultImage) {
		defaultImage = images[0];
	}

	return defaultImage;
};

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'NGN',
		minimumFractionDigits: 0,
		// Use the naira sign, instead of the Naira code
		currencyDisplay: 'symbol'
	})
		.format(amount)
		.replace('NGN', '₦');
};

import slugify from 'slugify';

export const slugifyTitle = (title: string) => {
	return (
		slugify(title, {
			lower: true,
			strict: true
		}) +
		'-' +
		Math.floor(Math.random() * 1000000)
	);
};
