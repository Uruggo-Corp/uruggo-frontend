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
