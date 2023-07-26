import db from '$lib/server/database';

export async function  load({fetch}) {
	const getSiCodeJson = async ()=>{
		const result = await fetch("/si_code.json")
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			return json;
		})
		return result;
	}
	return {
		parties : await db.getParties(),
		siCode : await getSiCodeJson()
	};
}