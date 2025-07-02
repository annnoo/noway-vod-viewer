import type { PageServerLoad } from './$types';
import type { ExtendedVodResponse } from '$lib/types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { vodId } = params;
	
	try {
		const response = await fetch(`http://website-backend.noway.gg/vod/${vodId}/events`);
		
		if (!response.ok) {
			throw new Error(`Failed to load VOD data: ${response.status} ${response.statusText}`);
		}
		
		const vodData: ExtendedVodResponse = await response.json();
		
		return {
			vodData,
			vodId
		};
	} catch (error) {
		console.error('Error loading VOD data:', error);
		throw error;
	}
};