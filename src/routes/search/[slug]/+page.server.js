import { error, redirect } from '@sveltejs/kit';
import db from '$lib/server/database';
import Util from '$lib/util';


export async function load({ cookies, params, fetch }) {
	const token = cookies.get('jwtToken');
	const isLogin = await Util.loginValid(token);
	if(isLogin){
		const nickName = fetch("https://nickname.hwanmoo.kr/?format=json&count=1&max_length=6")
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			return json
		})
		const comments = await db.getComments(params.slug, "buddy");
		return {
			params,
			nickName,
			comments
		};
	} else {
		throw redirect(302, '/login');
	}
}