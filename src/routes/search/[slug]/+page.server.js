import { error } from '@sveltejs/kit';

export function load({ params }) {
    
    // const buddy = buddies_value.find((buddy)=>buddy.id == params.slug)
	return {
		params
	};
}