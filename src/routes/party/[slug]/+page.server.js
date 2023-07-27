import { error } from '@sveltejs/kit';
import db from '$lib/server/database';

export async function load({ params, cookies, fetch }) {
	const nickName = fetch("https://nickname.hwanmoo.kr/?format=json&count=1&max_length=6")
	.then((response)=>{
		return response.json()
	})
	.then((json)=>{
		return json
	})
	const comments = await db.getComments(params.slug, "party");
    const liked = cookies.get(`party_like_${params.slug}`);
	return {
		params,
		liked,
		nickName,
		comments
	};
}