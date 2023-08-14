import { error, redirect } from '@sveltejs/kit';
import Util from '$lib/util';

export async function  load({cookies, fetch}) {
	const token = cookies.get('jwtToken');
	const isLogin = await Util.loginValid(token);
	if(isLogin){
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
			siCode : await getSiCodeJson()
		};
	} else {
		throw redirect(302, '/login');
	}
}