import { error, redirect } from '@sveltejs/kit';
import Util from '$lib/util';

export async function load({ params, cookies, fetch }) {
	const token = cookies.get('jwtToken');
	console.log("🚀 ~ file: +page.server.js:6 ~ load ~ token:", token)
	const isLogin = await Util.loginValid(token);
	if(isLogin){
		throw redirect(302, '/party');
	}
}